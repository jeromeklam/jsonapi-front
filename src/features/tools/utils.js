/**
 * @module utils
 */

//function definition
export function lambert93toWGPS(lambertE, lambertN) {

  var constantes = {
    GRS80E: 0.081819191042816,
    LONG_0: 3,
    XS: 700000,
    YS: 12655612.0499,
    n: 0.7256077650532670,
    C: 11754255.4261
  }

  var delX = lambertE - constantes.XS;
  var delY = lambertN - constantes.YS;
  var gamma = Math.atan(-delX / delY);
  var R = Math.sqrt(delX * delX + delY * delY);
  var latiso = Math.log(constantes.C / R) / constantes.n;
  var sinPhiit0 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * Math.sin(1)));
  var sinPhiit1 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit0));
  var sinPhiit2 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit1));
  var sinPhiit3 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit2));
  var sinPhiit4 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit3));
  var sinPhiit5 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit4));
  var sinPhiit6 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit5));
  var longRad = Math.asin(sinPhiit6);
  var latRad = gamma / constantes.n + constantes.LONG_0 / 180 * Math.PI;

  var longitude = latRad / Math.PI * 180;
  var latitude = longRad / Math.PI * 180;

  // return {longitude: longitude, latitude: latitude};
  return [longitude, latitude]
}

/**
 * deepClone : Copie complète d'un objet
 *
 * @param obj {Object} - L'objet à copier
 *
 * @return {Object} - La copie de l'objet
 */
export function deepClone(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if(obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (typeof obj === 'object' || Array.isArray(obj)) {
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(
      key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
    );
    return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
  }
  return obj;
}


/**
 * deepCompare : Renvoi les différences entre deux objets 
 *  sous la forme d'un nouvelle objet en conservant les structures de chaque différences
 *  à ceci près que le différences en elle-même sont sous la forme d'un tableau à 2 cases,
 *  la valeur du premier étant dans la première case et celle du second dans l'autre.
 *
 * Peut-être un peu lent s'il y a beaucoup d'objet imbriqué.
 *
 * @param obj1 {Object} - Premier objet à comparer
 * @param obj2 {Object} - Second objet à comparer
 * @param returnValue {Object} - valeurs de retour si il n'y a aucune différence, par défaut = {}
 *
 * @return {Object} - L'objet JsonApi vide
 *
 */
export function deepCompare(obj1, obj2, returnValue = {}) {
  let rels = {};
  let empty = true;
  if (obj1 && obj2) {
    const keys1 = Object.getOwnPropertyNames(obj1);
    const keys2 = Object.getOwnPropertyNames(obj2);

    keys1.forEach((key) => {  //parcours du première objet
      if (typeof obj2[key] === "undefined") {  //si le champ existe ou pas dans le deuxième objet
        rels[key] = obj1[key];
        empty = false;
      }

      else if (obj1[key] !== obj2[key]) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {  //si les deux sont des objets alors les compare
          const result = deepCompare(obj1[key], obj2[key], 0);
          if (result !== 0) {
            rels[key] = { ...result };
            empty = false;
          }
        }

        else {
          const value1 = obj1[key];
          const value2 = obj2[key];
          rels[key] = [value1, value2];
          empty = false;
        }

      }
    });
    keys2.forEach((key) => {  //On vérifie qu'il n'y a pas de champ supplémentaire dans le second objet
      if (!rels[key] && typeof obj1[key] === "undefined") {
        rels[key] = obj2[key];
        empty = false;
      }
    });
  }
  if (!empty) {
    return rels;
  }
  return returnValue;
}