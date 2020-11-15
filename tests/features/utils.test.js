import { lambert93toWGPS } from '../../src/features/tools/utils.js';

/**
 * lambert93toWGPS
 */
test('lambert93toWGPS : Verify ""', () => {
  const result = lambert93toWGPS(960467.919, 6459404.189);
  expect(result).toEqual([6.317365754647306, 45.184698460463636]);
});
test('lambert93toWGPS : Verify ""', () => {
  const result = lambert93toWGPS(961055.157, 6468811.914);
  expect(result).toEqual([6.329885894853984, 45.269110416825335]);
});
