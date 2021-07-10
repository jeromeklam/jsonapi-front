/**
 * @module jsonapi
 */

/**
 * getNewJsonApi : Renvoi un objet JsonApi vide
 *
 * @param p_type {string} - Type de l'objet JsonApi
 * @param p_id {string} - Identifiant de l'objet JsonApi
 * @param p_attributes {Object} - Attributs à ajouter à l'objet JsonApi vide
 *
 * @return {Object} - L'objet JsonApi vide
 *
 */
export function getNewJsonApi(p_type, p_id = '', p_attributes = {}) {
  let id = p_id;
  if (id === null || id === 0 || id === '0' ) {
    id = '';
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
 * @param obj {Object} - Le modèle
 * @param type {string} - Le type
 * @param includes {array} - Les objets inclus
 *
 * @return {Object} - L'objet JsonApi
 */
export function getJsonApi(obj, type = null, includes = []) {
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
  //includes.push({id: id, type: myType});
  const attributes = getJsonApiAttributes(obj);
  const relations = getJsonApiRelationships(obj);
  const included = getJsonApiIncluded(obj, includes);
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
 * @ignore
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
 * @ignore
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
 * @ignore
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
        } else if (obj[key] && obj[key].id && obj[key].type && obj[key].type !== '') {
          let locId = obj[key].id;
          if (locId === '0' || locId === 0) {
            locId = '';
          }
          rels[key] = {
            data: {
              id: locId,
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
function getJsonApiIncluded(obj, includes = [], debug = false) {
  let included = [];
  if (obj) {
    const keys = Object.getOwnPropertyNames(obj);
    keys.forEach((key) => {
      if (key.substring(0, 1) !== '_') {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((elem) => {
            const idx1 = includes.findIndex(el1 => el1.id == elem.id && el1.type == elem.type);
            //console.log(idx1, elem.id, elem.type);
            if (idx1 < 0) {
              includes.push({id: elem.id, type: elem.type});
              const obj2 = getJsonApi(elem, elem.type, includes);
              if (obj2.included) {
                included = included.concat(obj2.included);
                delete obj2.included;
              }
              if (obj2.data && obj2.data.attributes && Object.keys(obj2.data.attributes).length) {
                included.push(obj2.data);
              }
            }
          });
        } else if (obj[key] && obj[key].id && obj[key].id !== '0' && obj[key].type) {
          const idx2 = includes.findIndex(el2 => el2.id == obj[key].id && el2.type == obj[key].type);
          //console.log(idx2, obj[key].id, obj[key].type, includes);
          if (idx2 < 0) {
            includes.push({id: obj[key].id, type: obj[key].type});
            const obj3 = getJsonApi(obj[key], obj[key].type, includes);
            if (obj3.included) {
              included = included.concat(obj3.included);
              delete obj3.included;
            }
            if (obj3.data && obj3.data.attributes && Object.keys(obj3.data.attributes).length) {
              included.push(obj3.data);
            }
          }
        }
      }
    });
  }
  return included;
}

/**
 * @ignore
 */
export function addRelationships(name, type, obj) {
  let jsonApiRelationships = getJsonApi(obj, type, 0);
  let jsonApi = {};
  jsonApi[name] = { ...jsonApiRelationships };
  return jsonApi;
}
