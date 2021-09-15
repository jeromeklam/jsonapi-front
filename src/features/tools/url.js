/**
 * @module url
 */
import log from 'loglevel';

/**
 * queryStringToObject : Conversion d'une chaine de caractère vers un objet javascript.
 *
 * @summary Le but de cette fonction est de convertir un url du style ?param=1test vers un objet javascript
 *
 * @param queryString {string} - La chaine à convertir
 *
 * @return {Object} - L'url décodée sous forme d'objet
 */
export function queryStringToObject(queryString = '', first = true) {
  const myLogger = log.getLogger('jsonapi-front.queryStringToObject');
  myLogger.info('jsonapi-front.queryStringToObject.start');
  let params = {};
  if (queryString) {
    let hashes = [];
    if (queryString.indexOf('?') >= 0) {
      hashes = queryString.slice(queryString.indexOf('?') + 1).split('&');
    } else {
      if (queryString.indexOf('&') >= 0) {
        hashes = queryString.split('&');
      } else {
        if (!first) {
          myLogger.info('jsonapi-front.queryStringToObject.end');
          return decodeURIComponent(queryString);
        }
        myLogger.info('jsonapi-front.queryStringToObject.end');
        return {};
      }
    }
    hashes.forEach(hash => {
      const oneParam = hash.split('=');
      const pos = oneParam[0].indexOf('[');
      if (pos > 0) {
        const left = oneParam[0].substring(0, pos);
        if (!Array.isArray(params[left])) {
          params[left] = [];
        }
        params[left].push(queryStringToObject(oneParam[1], false));
      } else {
        if (params[oneParam[0]]) {
          if (!Array.isArray(params[oneParam[0]])) {
            const old = params[oneParam[0]];
            params[oneParam[0]] = [];
            params[oneParam[0]].push(old);
          }
          params[oneParam[0]].push(queryStringToObject(oneParam[1], false));
        } else {
          params[oneParam[0]] = queryStringToObject(oneParam[1], false);
        }
      }
    });
  }
  myLogger.info('jsonapi-front.queryStringToObject.end');
  return params;
}

/**
 * objectToQueryString : Conversion d'un objet javascript en uri
 *
 * @param {Object} queryObj                L'objet javascript à convertir
 * @param {Object} options                 Les options de conversion
 * @param {bool} options.numericKeys       Ajoute les indices numériques pour les tableaux, par défaut false
 * @param {bool} options.emptyBrackets     Ajoute des crochets vides pour les tableaux, par défaut true
 * @param {string} nesting_start           Paramètre technique
 * @param {Number} level                   Paramètre technique
 *
 * @return {string}
 */
export function objectToQueryString(queryObj, options = { emptyBrackets: true }, nesting_start = '', level = 0) {
  const myLogger = log.getLogger('jsonapi-front.objectToQueryString');
  myLogger.info('jsonapi-front.objectToQueryString.start');
  if (queryObj) {
    let l_nesting_start = nesting_start;
    let l_nesting_end = '';
    if (level > 0) {
      l_nesting_start += '[';
      l_nesting_end += ']';
    }
    const pairs = Object.entries(queryObj).map(([key, val]) => {
      if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
        myLogger.info('jsonapi-front.objectToQueryString.end');
        return objectToQueryString(val, options, l_nesting_start + `${key}` + l_nesting_end, level + 1);
      } else {
        const numKey = options && options.numericKeys && options.numericKeys === true ? true : false;
        const emptyBrackets = options && options.emptyBrackets && options.emptyBrackets === true ? true : false;
        let param = l_nesting_start + (isNaN(key) || numKey ? key : '') + l_nesting_end;
        if (!emptyBrackets && param === nesting_start + '[]') {
          param = nesting_start;
        }
        if (val !== null) {
          if (val instanceof Date) {
            val = val.toISOString();
          } else {
            if (val === true) {
              val = 1;
            } else {
              if (val === false) {
                val = 0;
              }
            }
          }
          myLogger.info('jsonapi-front.objectToQueryString.end');
          return [param, val].join('=');
        } else {
          myLogger.info('jsonapi-front.objectToQueryString.end');
          return [param, ''].join('=');
        }
      }
    });
    let queryString = pairs.join('&');
    if (level === 0 && queryString !== '') {
      queryString = '?' + queryString;
    }
    myLogger.info('jsonapi-front.objectToQueryString.end');
    return queryString;
  }
  myLogger.info('jsonapi-front.objectToQueryString.end');
  return '';
}
