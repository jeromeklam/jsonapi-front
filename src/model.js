/**
 * uniqueId
 *
 * @ignore
 */
function uniqueId(objectName, id) {
  if (!id) {
    return null;
  }
  return `${objectName}${id}`;
}

/**
 * getNewModel : Retourne un nouveau modèle de travail
 *
 * @param {string}          p_type
 * @param {(string|number)} p_id
 * @param {Object}          p_attributes
 *
 * @returns {Object}
 */
export function getNewModel(p_type, p_id, p_attributes = {}) {
  let id = p_id;
  if (id && !isNaN(id)) {
    id = parseInt(id, 10);
  }
  const newItem = {
    id: id,
    type: p_type
  };
  if (p_attributes.length > 0) {
    return {...p_attributes, ...newItem};
  }
  return newItem;
}

/**
 * @ignore
 */
function buildModelRelationship(reducer, target, relationship, options, cache, level = 0, done = []) {
  const { ignoreLinks } = options;
  const rel = target.relationships[relationship];
  if (typeof rel.data !== 'undefined') {
    if (Array.isArray(rel.data)) {
      return rel.data.map(
        child => normalizedObjectModeler(reducer, child.type, child.id, options, cache, level + 1, done) || child,
      );
    } else if (rel.data === null) {
      return null;
    }
    return normalizedObjectModeler(reducer, rel.data.type, rel.data.id, options, cache, level + 1, done) || rel.data;
  } else {
    if (Array.isArray(rel)) {
      return rel.map(
        child => normalizedObjectModeler(reducer, child.type, child.id, options, cache, level + 1, done) || child,
      );
    }
    if (!ignoreLinks && rel.links) {
      throw new Error(
        "Remote lazy loading is not supported. To disable this error, include option 'ignoreLinks: true' in the normalizedObjectModeler function like so: normalizedObjectModeler(reducer, type, id, { ignoreLinks: true })",
      );
    }
  }
  return [];
}

/**
 * normalizedObjectModeler from a NormalizedObject
 *
 * @param {Object} p_obj             NormalizedObject objet unique ou liste d'objets
 * @param {string} p_type            Nom du model
 * @param {(string|number)}  p_id    Identifiant de l'objet
 * @param {Object} providedOpts      eager
 * @param {Object} cache
 * @param {number} level
 * @param {Object} done
 */
export function normalizedObjectModeler(p_obj, p_type, p_id = null, providedOpts = {}, cache = {}, level = 0, done = []) {
  const defOpts = { eager: false, ignoreLinks: false, includeType: true, includeId: true };
  const options = Object.assign({}, defOpts, providedOpts);
  const { eager, includeType, includeId } = options;
  if (!p_obj || !p_obj[p_type]) {
    return null;
  }
  if ((level === 0 && p_id === null) || Array.isArray(p_id)) {
    if (p_obj['MAINELEM'] === p_type) {
      const idList = p_obj['SORTEDELEMS'];
      return idList.map(e => normalizedObjectModeler(p_obj, p_type, e, options, cache, level + 1));
    }
    const idList2 = id || Object.keys(p_obj[p_type]);
    return idList2.map(e => normalizedObjectModeler(p_obj, p_type, e, options, cache, level + 1));
  }
  const ids = p_id.toString();
  const uuid = uniqueId(p_type, ids);
  const cachedObject = cache[uuid];
  if (cachedObject && eager) {
    const clone = JSON.parse(JSON.stringify(cachedObject));
    return clone;
  }
  const ret = {};
  const target = p_obj[p_type][ids];
  if (!target) {
    return null;
  }
  if (includeId && target.id) {
    ret.id = target.id;
  }
  Object.keys(target.attributes).forEach((key) => {
    ret[key] = target.attributes[key];
  });
  if (includeType && !ret.type) {
    ret.type = p_type;
  }
  cache[uuid] = ret;
  const found = done.find((elem) => { return (elem.type === ret.type && elem.id === ret.id); });
  if (target.relationships && !found) {
    done.push({ type: ret.type, id: ret.id });
    Object.keys(target.relationships).forEach((relationship) => {
      if (eager) {
        ret[relationship] = buildModelRelationship(p_obj, target, relationship, options, cache, level, done);
      } else {
        Object.defineProperty(ret, relationship, {
          get: () => {
            const field = `__${relationship}`;
            if (ret[field]) {
              return ret[field];
            }
            ret[field] = buildModelRelationship(p_obj, target, relationship, options, cache, level, done);
            return ret[field];
          },
          set: (value) => {
            const field = `__${relationship}`;
            ret[field] = value;
          },
        });
      }
    });
  }
  if (includeId && typeof ret.id === 'undefined') {
    ret.id = ids;
  }
  return ret;
}

/**
 * buildFirstModel : Retourne le premier modèle disponible dans une utilisateur
 *
 * @param {Object} p_obj   L'object au format normalisé
 * @param {string} p_type  Le type de l'objet
 *
 * @return {(Object|null)}
 */
export function normalizedObjectFirstModel(p_obj, p_type) {
  const models = normalizedObjectModeler(p_obj, p_type);
  if (models && models.length > 0) {
    return models[0];
  }
  return null;
}
