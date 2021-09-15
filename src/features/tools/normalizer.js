import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import log from 'loglevel';

/**
 * getNewNormalizedObject : Renvoie un nouvel objet normalisé du type spécifié
 *
 * @param {string} pType          Le type
 * @param {(string|number)} pId   L'identifiant
 *
 * @return {Object}                Nouvel objet normalisé
 */
export function getNewNormalizedObject(pType = '', pId = '') {
  const myLogger = log.getLogger('jsonapi-front.getNewNormalizedObject');
  myLogger.info('jsonapi-front.getNewNormalizedObject.start');
  let json = {};
  if (pType === '') {
    myLogger.error("jsonapi-front.getNewNormalizedObject : Type de l'objet non renseigné ");
    myLogger.info('jsonapi-front.getNewNormalizedObject.end');
    return json;
  }
  json[pType] = {};
  json.SORTEDELEMS = [];
  json.MAINELEM = pType;
  json.errors = [];
  json.length = 0;
  if (pId && pId !== null) {
    const id = isNaN(pId) ? pId : pId.toString();
    json.SORTEDELEMS.push(id);
    json[pType][id] = {
      id: id,
      attributes: {},
    };
    json.length = 1;
  }
  json.TOTAL = json.length;
  myLogger.debug(json);
  myLogger.info('jsonapi-front.getNewNormalizedObject.end');
  return json;
}

/**
 * wrap
 *
 * @ignore
 */
function wrap(pJson) {
  if (isArray(pJson)) {
    return pJson;
  }
  return [pJson];
}
if (process.env.NODE_ENV === 'test') {
  exports.wrap = wrap;
}

/**
 * extractRelationships
 *
 * @ignore
 */
function extractRelationships(relationships, { camelizeKeys }) {
  const ret = {};
  keys(relationships).forEach(key => {
    const relationship = relationships[key];
    const name = camelizeKeys ? camelCase(key) : key;
    ret[name] = {};
    if (typeof relationship.data !== 'undefined') {
      if (isArray(relationship.data)) {
        ret[name].data = relationship.data.map(e => ({
          id: e.id,
          type: camelizeKeys ? camelCase(e.type) : e.type,
        }));
      } else if (!isNull(relationship.data)) {
        ret[name].data = {
          id: relationship.data.id,
          type: camelizeKeys ? camelCase(relationship.data.type) : relationship.data.type,
        };
      } else {
        ret[name].data = relationship.data;
      }
    } else if (isArray(relationship)) {
      ret[name].data = relationship.map(e => ({
        id: e.data.id,
        type: camelizeKeys ? camelCase(e.type) : e.data.type,
      }));
    }
    if (relationship.links) {
      ret[name].links = relationship.links;
    }
  });
  return ret;
}

/**
 * extractErrors
 *
 * @ignore
 */
function extractErrors(p_json, p_opts = { camelizeKeys: true }) {
  let ret = [];
  if (Array.isArray(p_json)) {
    p_json.forEach((elem) => {
      elem['isFlash'] = true;
      if (elem.meta && elem.meta.field) {
        elem['isFlash'] = false;
      }
      ret.push(elem);
    });
  }
  return ret;
}
if (process.env.NODE_ENV === 'test') {
  exports.extractErrors = extractErrors;
}

/**
 * extractEntities
 *
 * @ignore
 */
function extractEntities(json, { camelizeKeys }, origin, mainElement = false) {
  let myLogger = log.getLogger('jsonapi-front.jsonApiNormalizer');
  myLogger.debug('jsonapi-front.jsonApiNormalizer.extractEntities.start');
  const ret = origin;
  wrap(json).forEach(elem => {
    let locId = `${elem.id}`;
    if (locId === '') {
      locId = '0';
    }
    if (!elem.errors) {
      const type = camelizeKeys ? camelCase(elem.type) : elem.type;
      if (mainElement) {
        ret.MAINELEM = type;
      } else {
        if (!ret.OTHERELEMENTS) {
          ret.OTHERELEMENTS = [];
        }
        if (ret.OTHERELEMENTS.indexOf(type) === -1) {
          ret.OTHERELEMENTS.push(type);
        }
      }
      ret[type] = ret[type] || {};
      ret[type][locId] = ret[type][locId] || {
        id: locId,
      };
      myLogger.debug('jsonapi-front.jsonApiNormalizer.extractEntities.type.' + (type || '~') + '.' + (locId || '~'));
      if (camelizeKeys) {
        ret[type][locId].attributes = {};
        keys(elem.attributes).forEach(key => {
          ret[type][locId].attributes[camelCase(key)] = elem.attributes[key];
        });
      } else {
        ret[type][locId].attributes = elem.attributes;
      }
      if (elem.links) {
        ret[type][locId].links = {};
        keys(elem.links).forEach(key => {
          ret[type][locId].links[key] = elem.links[key];
        });
      }
      if (elem.relationships) {
        ret[type][locId].relationships = extractRelationships(elem.relationships, { camelizeKeys });
      }
      if (mainElement) {
        ret['SORTEDELEMS'] = ret['SORTEDELEMS'] || [];
        ret['SORTEDELEMS'].push(locId);
      }
    }
  });
  ret.length = 0;
  if (ret.SORTEDELEMS) {
    ret.length = ret.SORTEDELEMS.length;
  }
  myLogger.debug('jsonapi-front.jsonApiNormalizer.extractEntities.end');
  return ret;
}

/**
 * doFilterEndpoint
 *
 * @ignore
 */
function doFilterEndpoint(endpoint) {
  return endpoint.replace(/\?.*$/, '');
}

/**
 * extractMetaData
 *
 * @ignore
 */
function extractMetaData(json, endpoint, { camelizeKeys, filterEndpoint }) {
  const ret = {};
  ret.meta = {};
  let metaObject;
  if (!filterEndpoint) {
    const filteredEndpoint = doFilterEndpoint(endpoint);
    ret.meta[filteredEndpoint] = {};
    ret.meta[filteredEndpoint][endpoint.slice(filteredEndpoint.length)] = {};
    metaObject = ret.meta[filteredEndpoint][endpoint.slice(filteredEndpoint.length)];
  } else {
    ret.meta[endpoint] = {};
    metaObject = ret.meta[endpoint];
  }
  metaObject.data = {};
  if (json.data) {
    const meta = [];
    wrap(json.data).forEach(object => {
      const pObject = { id: object.id, type: camelizeKeys ? camelCase(object.type) : object.type };
      if (object.relationships) {
        pObject.relationships = extractRelationships(object.relationships, { camelizeKeys });
      }
      meta.push(pObject);
    });
    metaObject.data = meta;
    if (json.links) {
      metaObject.links = json.links;
      ret.meta[doFilterEndpoint(endpoint)].links = json.links;
    }
    if (json.meta) {
      metaObject.meta = json.meta;
    }
  }
  return ret;
}

/**
 * normalizedObjectUpdate : Essaye de modifier les objets normalisé, si présents, dans une liste, pour le type spécifié
 * @param {Object} json     La liste des objets du type spécifié en format "json normalisé"
 * @param {string} key      Le type des objets
 * @param {Object} value    L'objet ou les objets à modifier en format "json normalisé"
 * @param {bool} ignoreAdd  Si vrai pas de création automatique de l'objet s'il n'existe pas dans la liste
 *
 * @return {Object}         La liste des objets du type spécifié en format "json normalisé" sans l'objet (ou les objets)
 */
export function normalizedObjectUpdate(json, key, value, ignoreAdd = true) {
  if (!json || !value) {
    return json;
  }
  if (!json[key] && !ignoreAdd) {
    json = getNewNormalizedObject('Free_Test');
  }
  if (value[key] && json[key]) {
    if (!json.TOTAL || isNaN(json.TOTAL)) {
      json.TOTAL = 0;
      if (Array.isArray(json.SORTEDELEMS)) {
        json.TOTAL = json.SORTEDELEMS.length;
      }
    }
    if (value.MAINELEM === key) {
      const ids = json.SORTEDELEMS;
      keys(value[key]).forEach((elem) => {
        if (ids.indexOf(elem) >= 0) {
          json[key][elem] = { ...json[key][elem], ...value[key][elem] };
          if (json.SORTEDELEMS.indexOf(elem) < 0 && elem !== '0' && elem !== 0) {
            json.SORTEDELEMS.push(elem);
            json.TOTAL++;
          }
          if (value.OTHERELEMENTS) {
            value.OTHERELEMENTS.forEach((type) => {
              if (!json[type]) {
                json[type] = {};
              }
              json[type] = { ...json[type], ...value[type] };
            });
          }
        } else if (!ignoreAdd) {
          json[key] = { ...json[key], ...value[key] };
          if (elem !== '0' && elem !== 0) {
            json.SORTEDELEMS.push(elem);
            json.TOTAL++;
          }
          if (value.OTHERELEMENTS) {
            value.OTHERELEMENTS.forEach(type => {
              if (!json[type]) {
                json[type] = {};
              }
              json[type] = { ...json[type], ...value[type] };
            });
          }
        }
      });
    } else {
      keys(value[key]).forEach(elemNew => {
        const found = keys(json[key]).findIndex(jsonId => {
          return jsonId === value[key][elemNew].id;
        });
        if (found >= 0) {
          json[key][elemNew] = { ...value[key][elemNew] };
          if (value.OTHERELEMENTS) {
            value.OTHERELEMENTS.forEach(type => {
              if (!json[type]) {
                json[type] = {};
              }
              json[type] = { ...json[type], ...value[type] };
            });
          }
          return true;
        }
        return false;
      });
    }
    json.length = json.SORTEDELEMS.length;
  } else if (json[value.MAINELEM]) {
    keys(value[value.MAINELEM]).forEach(elemNew => {
      const found = keys(json[value.MAINELEM]).findIndex(jsonId => {
        return jsonId === elemNew;
      });
      if (found >= 0) {
        json[value.MAINELEM][elemNew] = { ...value[value.MAINELEM][elemNew] };
        if (value.OTHERELEMENTS) {
          value.OTHERELEMENTS.forEach(type => {
            if (!json[type]) {
              json[type] = {};
            }
            json[type] = { ...json[type], ...value[type] };
          });
        }
        return true;
      }
    });
  }
  return { ...json };
}

/**
 * normalizedObjectRemove : Essaye d'enlever les objets normalisés, si présents, dans une liste, pour le type spécifié
 *
 * @param {Object} json           La liste des objets du type spécifié en format "json normalisé"
 * @param {string} key            Le type des objets
 * @param {Object} value          L'objet ou les objets à supprimer en format "json normalisé"
 *
 * @return {Object}                La liste des objets du type spécifié en format "json normalisé" sans l'objet (ou les objets)
 */
export function normalizedObjectRemove(json, key, value) {
  if (!json || !value) {
    return json;
  }
  if (value[key] && json[key]) {
    if (value.MAINELEM === key) {
      const ids = json.SORTEDELEMS;
      Object.keys(value[key]).forEach(elem => {
        const idFind = ids.indexOf(elem);
        if (idFind >= 0) {
          json.SORTEDELEMS.splice(idFind, 1);
          if (json[key][elem]) {
            delete json[key][elem];
          }
        }
      });
    }
    json.length = json.SORTEDELEMS.length;
  }
  return { ...json };
}

/**
 * jsonApiNormalizer : Converti un résultat au format jsonApi en résultat "normalisé"
 *
 * @param {Object} json               Objet jsonApi à ajouter à la liste des objets existants (origin)
 * @param {Object} origin             Liste des objets normalisés déjà présents, à compléter
 * @param {Object} opts               Options
 * @param {string} opts.endpoint
 * @param {bool} opts.filterEndpoint
 * @param {bool} opts.camelizeKeys
 *
 * @return {Object}
 */
export function jsonApiNormalizer(json, origin = { errors: [] }, opts = {}) {
  let myLogger = log.getLogger('jsonapi-front.jsonApiNormalizer');
  myLogger.info('jsonapi-front.jsonApiNormalizer.start');
  if (json === null) {
    myLogger.info('jsonapi-front.jsonApiNormalizer.end.empty.json');
    return origin;
  }
  const { endpoint } = opts;
  let { filterEndpoint, camelizeKeys } = opts;
  if (typeof filterEndpoint === 'undefined') {
    filterEndpoint = true;
  }
  if (typeof camelizeKeys === 'undefined') {
    camelizeKeys = false;
  }
  if (json.data) {
    myLogger.debug('jsonapi-front.jsonApiNormalizer.data');
    const elems = extractEntities(json.data, { camelizeKeys }, origin, true);
    merge(origin, elems);
    if (json.data.errors) {
      origin.errors = extractErrors(json.data.errors, { camelizeKeys });
    }
  }
  if (json.errors) {
    myLogger.debug('jsonapi-front.jsonApiNormalizer.errors');
    origin.errors = extractErrors(json.errors, { camelizeKeys });
  }
  if (json.included) {
    myLogger.debug('jsonapi-front.jsonApiNormalizer.included');
    merge(origin, extractEntities(json.included, { camelizeKeys }, origin, false));
  }
  if (endpoint) {
    const endpointKey = filterEndpoint ? doFilterEndpoint(endpoint) : endpoint;
    merge(origin, extractMetaData(json, endpointKey, { camelizeKeys, filterEndpoint }));
  }
  if (origin.SORTEDELEMS && origin.SORTEDELEMS.length > 0) {
    const uniqueSet = new Set(origin.SORTEDELEMS);
    origin.SORTEDELEMS = [...uniqueSet];
  }
  origin.TOTAL = Array.isArray(origin.SORTEDELEMS) ? origin.SORTEDELEMS.length : 0;
  if (json.meta && json.meta.count) {
    origin.TOTAL = json.meta.count;
  }
  myLogger.info('jsonapi-front.jsonApiNormalizer.end');
  return origin;
}
