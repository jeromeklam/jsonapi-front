/**
 * @module model
 */

/**
 * get uniqueId
 *
 *  @ignore
 * 
 * @param {String} pObjectName - Nom de l'objet
 * @param {Mixed} pId - Identifiant de l'object
 * 
 * @return {String}
 */
export function uniqueId(pObjectName, pId) {
  if (!pId) {
    return null;
  }
  return `${pObjectName}${pId}`;
}

/**
 * setModelValue : Affecte une valeur à une clef d'un modèle, niveaux séparés par .
 * 
 * @param pModel {Object} - Le modèle
 * @param pKey {String} - La clef à mettre à jour
 * @param pValue {Mixed} - La valeur à affecter
 */
 export function setModelValue(pModel, pKey, pValue) {
  try {
    let datas = null;
    let fromObj = pModel;
    let elems = pKey.split('.');
    let first = null;
    while (elems.length > 0) {
      if (first !== null) {
        fromObj = fromObj[first];
      }
      first = elems.shift();
    }
    fromObj[first] = pValue;
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * getNewModel : Retourne un nouveau modèle de travail
 *
 * @param pType {string} - Le type
 * @param pId {(string|number)} - l'identifiant
 * @param pAttributes {Object} - Les attributs
 *
 * @return {Object}
 */
export function getNewModel(pType, pId, pAttributes = {}) {
  let id = pId;
  if (id && !Number.isNaN(id)) {
    id = parseInt(id, 10);
  }
  const newItem = {
    id,
    type: pType,
  };
  if (Object.keys(pAttributes).length > 0) {
    return { ...pAttributes, ...newItem };
  }
  return newItem;
}

/**
 * @ignore
 */
function buildModelRelationship(
  reducer,
  target,
  relationship,
  options,
  cache,
  level = 0,
  done = [],
) {
  const { ignoreLinks } = options;
  const rel = target.relationships[relationship];
  if (typeof rel.data !== 'undefined') {
    if (Array.isArray(rel.data)) {
      return rel.data.map(child => normalizedObjectModeler(
        reducer,
        child.type,
        child.id,
        options,
        cache,
        level + 1,
        done,
      ) || child);
    } else if (rel.data === null) {
      return null;
    }
    return normalizedObjectModeler(
      reducer,
      rel.data.type,
      rel.data.id,
      options,
      cache,
      level + 1,
      done,
    ) || rel.data;
  }
  if (Array.isArray(rel)) {
    return rel.map(child => normalizedObjectModeler(
      reducer,
      child.type,
      child.id,
      options,
      cache,
      level + 1,
      done,
    ) || child);
  }
  if (!ignoreLinks && rel.links) {
    throw new Error("Remote lazy loading is not supported. To disable this error, include option 'ignoreLinks: true' in the normalizedObjectModeler function like so: normalizedObjectModeler(reducer, type, id, { ignoreLinks: true })");
  }
  return [];
}

/**
 * get a model from a NormalizedObject
 *
 * @param pObj {Object} - NormalizedObject objet unique ou liste d'objets
 * @param pType {string} - Nom du model
 * @param pId {(string|number)} - Identifiant de l'objet
 * @param providedOpts {Object} - Options
 * @param cache {Object} - Champ technique cache
 * @param level {number} - Champ technique niveau
 * @param done {Object} - Champ technique terminé
 * 
 * @return {Object}
 */
export function normalizedObjectModeler(
  pObj,
  pType,
  pId = null,
  providedOpts = {},
  cache = {},
  level = 0,
  done = [],
) {
  const defOpts = {
    eager: false,
    ignoreLinks: false,
    includeType: true,
    includeId: true,
  };
  const options = Object.assign({}, defOpts, providedOpts);
  const { eager, includeType, includeId } = options;
  if (!pObj || !pObj[pType]) {
    return null;
  }
  if ((level === 0 && pId === null) || Array.isArray(pId)) {
    if (pObj.MAINELEM === pType) {
      const idList = pObj.SORTEDELEMS;
      return idList.map(e => normalizedObjectModeler(pObj, pType, e, options, cache, level + 1));
    }
    const idList2 = pId || Object.keys(pObj[pType]);
    return idList2.map(e => normalizedObjectModeler(pObj, pType, e, options, cache, level + 1));
  }
  const ids = pId.toString();
  const uuid = uniqueId(pType, ids);
  const cachedObject = cache[uuid];
  if (cachedObject && eager) {
    const clone = JSON.parse(JSON.stringify(cachedObject));
    return clone;
  }
  const ret = {};
  const target = pObj[pType][ids];
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
    ret.type = pType;
  }
  cache[uuid] = ret;
  const found = done.find(elem => elem.type === ret.type && elem.id === ret.id);
  if (target.relationships && !found) {
    done.push({ type: ret.type, id: ret.id });
    Object.keys(target.relationships).forEach((relationship) => {
      if (eager) {
        ret[relationship] = buildModelRelationship(
          pObj,
          target,
          relationship,
          options,
          cache,
          level,
          done,
        );
      } else {
        Object.defineProperty(ret, relationship, {
          get: () => {
            const field = `__${relationship}`;
            if (ret[field]) {
              return ret[field];
            }
            ret[field] = buildModelRelationship(
              pObj,
              target,
              relationship,
              options,
              cache,
              level,
              done,
            );
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
 * @param pObj {Object} - L'object au format normalisé
 * @param pType {string} - Le type de l'objet
 *
 * @return {(Object|null)} - Modèle demandé ou null si non trouvé
 */
export function normalizedObjectFirstModel(pObj, pType) {
  const models = normalizedObjectModeler(pObj, pType);
  if (models && models.length > 0) {
    return models[0];
  }
  return null;
}
