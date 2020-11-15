/**
 * getNewJsonApi : Renvoi un objet JsonApi vide
 *
 * @param {string} p_type         Type de l'objet JsonApi
 * @param {string} p_id           Identifiant de l'objet JsonApi
 * @param {Object} p_attributes   Attributs à ajouter à l'objet JsonApi vide
 *
 * @return {Object}               L'objet JsonApi vide
 *
 */
export function getNewJsonApi(p_type, p_id = "", p_attributes = {}) {
  let id = p_id;
  if (id === null || id === 0 || id === "0" ) {
    id = "";
  } else {
    id = isNaN(p_id) ? p_id : p_id.toString();
  }
  return {
    data: {
      id: id,
      type: p_type,
      attributes: p_attributes,
    }
  }
};

/**
 * getJsonApi : Converti un modèle en object JsonApi
 *
 * @param {Object} obj   Le modèle
 * @param {string} type  Le type
 *
 * @return {Object}      L'objet JsonApi
 */
export function getJsonApi(obj, type = null) {
  const attributes = getJsonApiAttributes(obj);
  const relations = getJsonApiRelationships(obj);
  const included = getJsonApiIncluded(obj);
  let myType = type;
  let id     = "";
  if (obj) {
    if (myType === null && obj.type) {
      myType = obj.type;
    }
    id = obj.id || "" ;
    if (id === "0") {
      id = "";
    }
    if (id && !isNaN(id)) {
      id = id;
    }
  }
  let jsonApi = {
    data: {
      type: myType,
      id: id,
      attributes: attributes,
    },
  };
  if (Object.keys(relations).length > 0) {
    jsonApi.data['relationships'] = relations;
  }
  if (Array.isArray(included) && included.length > 0) {
    const newIncluded = included.filter((v, i, a) => i === a.findIndex(elem => elem.type === v.type && elem.id === v.id));
    jsonApi.included = newIncluded;
  }
  return jsonApi;
}

/**
 *
 */
export function getJsonApiWithRelationships(name, id_field, attributes, relationships) {
  const jsonApi = {
    data: {
      id: id_field,
      type: name,
      attributes: { ...attributes },
      relationships: { ...relationships },
    },
  };
  return jsonApi;
}

/**
 *
 */
function getJsonApiAttributes(obj) {
  let ret = {};
  if (obj) {
    const keys = Object.getOwnPropertyNames(obj);
    keys.forEach((key) => {
      if (key.substring(0, 1) !== '_' && key !== 'id' && key !== 'type') {
        if (!Array.isArray(obj[key])) {
          if (!obj[key] || (!obj[key].id && !obj[key].type)) {
            if (!obj[key] || !obj[key].id || (obj[key].id && obj[key].id !== '0')) {
              const value = obj[key];
              ret = { ...ret, [key]: value };
            }
          }
        }
      }
    });
  }
  return ret;
}

/**
 *
 */
function getJsonApiRelationships(obj, debug = false) {
  let rels = {};
  if (obj) {
    const keys = Object.getOwnPropertyNames(obj);
    keys.forEach((key) => {
      if (key.substring(0, 1) !== '_') {
        if (Array.isArray(obj[key])) {
          rels[key] = { data: [] };
          obj[key].forEach((elem) => {
            rels[key].data.push({
              id: elem.id,
              type: elem.type,
            });
          });
        } else if (obj[key] && obj[key].id && obj[key].id !== '0' && obj[key].type) {
          rels[key] = {
            data: {
              id: obj[key].id,
              type: obj[key].type,
            },
          };
        }
      }
    });
  }
  return rels;
}

/**
 * @ignore
 */
function getJsonApiIncluded(obj, debug = false) {
  let included = [];
  if (obj) {
    const keys = Object.getOwnPropertyNames(obj);
    keys.forEach((key) => {
      if (key.substring(0, 1) !== '_') {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((elem) => {
            const obj2 = getJsonApi(elem, elem.type, debug);
            if (obj2.included) {
              included = included.concat(obj2.included);
              delete obj2.included;
            }
            if (obj2.data) {
              included.push(obj2.data);
            }
          });
        } else if (obj[key] && obj[key].id && obj[key].id !== '0' && obj[key].type) {
          const obj3 = getJsonApi(obj[key], obj[key].type, debug);
          if (obj3.included) {
            included = included.concat(obj3.included);
            delete obj3.included;
          }
          if (obj3.data) {
            included.push(obj3.data);
          }
        }
      }
    });
  }
  return included;
}

/**
 *
 */
export function addRelationships(name, type, obj) {
  let jsonApiRelationships = getJsonApi(obj, type, 0);
  let jsonApi = {};
  jsonApi[name] = { ...jsonApiRelationships };
  return jsonApi;
}
