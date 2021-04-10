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

export function deepClone(obj) {
  if (obj === null) {
    return null;
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
