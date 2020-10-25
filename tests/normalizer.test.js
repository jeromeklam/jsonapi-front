import { getNewNormalizedObject, jsonApiNormalizer, wrap, extractErrors, normalizedObjectUpdate, normalizedObjectRemove } from '../src/normalizer.js';

/**
 * wrap
 */
test('wrap : Verify {}', () => {
  const result = wrap({});
  expect(result).toEqual([{}]);
});
test('wrap : Verify []', () => {
  const result = wrap([]);
  expect(result).toEqual([]);
});

/**
 * extractErrors
 */
test('extractErrors : Verify []', () => {
  const result = extractErrors([]);
  expect(result).toEqual([]);
});
test('extractErrors : Verify {}', () => {
  const result = extractErrors({});
  expect(result).toEqual([]);
});
test('extractErrors : Verify null', () => {
  const result = extractErrors(null);
  expect(result).toEqual([]);
});
test('extractErrors : Verify simple', () => {
  const result = extractErrors([{code: "45", meta: { field: 'test' }}]);
  expect(result).toEqual([{"code": "45", "isFlash": false, "meta": {"field": "test"}}]);
});

/**
 * getNewNormalizedObject
 */
 test('getNewNormalizedObject : Verify vide', () => {
   const result = getNewNormalizedObject();
   expect(result).toEqual({});
 });
 test('getNewNormalizedObject : Verify ""', () => {
   const result = getNewNormalizedObject('Free_Test');
   expect(result).toEqual({MAINELEM: "Free_Test", SORTEDELEMS: [], Free_Test: {}, errors: [], length: 0});
 });
 test('getNewNormalizedObject : Verify simple', () => {
   const result = getNewNormalizedObject('Free_Test', "45");
   expect(result).toEqual({MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                          Free_Test: { "45": {attributes: {}, id: "45"}}, errors: [], length: 1});
 });

/**
 * normalizedObjectUpdate
 */
test('normalizedObjectUpdate : Verify empty items without object', () => {
 const result = normalizedObjectUpdate({}, 'Free_Test', {});
 expect(result).toEqual({});
});
test('normalizedObjectUpdate : Verify empty items with object ignoreAdd', () => {
 const result = normalizedObjectUpdate({}, 'Free_Test', {MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                                      Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1});
 expect(result).toEqual({});
});
test('normalizedObjectUpdate : Verify empty items with object not ignoreAdd', () => {
 const result = normalizedObjectUpdate({}, 'Free_Test', {MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                                      Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1}, false);
 expect(result).toEqual({MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                        Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1});
});
test('normalizedObjectUpdate : Verify items without object', () => {
 const result = normalizedObjectUpdate({MAINELEM: "Free_Test", OTHERELEMENTS: [], Free_Test: {}}, 'Free_Test', {});
 expect(result).toEqual({MAINELEM: "Free_Test", OTHERELEMENTS: [], Free_Test: {}});
});
test('normalizedObjectUpdate : Verify items with other object', () => {
 const result = normalizedObjectUpdate({MAINELEM: "Free_Test", OTHERELEMENTS: ['Free_Other'], Free_Test: {}, Free_Other: {"66": {attributes: {name: "old"}, id: "66"}}}, 'Free_Test', {MAINELEM: 'Free_Other', Free_Other: {"66": {attributes: {name: "label"}, id: "66"}}});
 expect(result).toEqual( {"Free_Other": {"0": {"attributes": {"name": "label"}, "id": "66"}, "66": {"attributes": {"name": "label"}, "id": "66"}}, "Free_Test": {}, "MAINELEM": "Free_Test", "OTHERELEMENTS": ["Free_Other"]});
});


/**
 * normalizedObjectRemove (json, key, value) {
 */
test('normalizedObjectRemove : Verify empty items without object', () => {
  const result = normalizedObjectRemove({}, 'Free_Test', {});
  expect(result).toEqual({});
});
test('normalizedObjectRemove : Verify empty items with object', () => {
  const result = normalizedObjectRemove({}, 'Free_Test', {MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                                        Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1});
  expect(result).toEqual({});
});
test('normalizedObjectRemove : Verify items without object', () => {
  const result = normalizedObjectRemove({MAINELEM: "Free_Test", OTHERELEMENTS: [], Free_Test: {}}, 'Free_Test', {});
  expect(result).toEqual({MAINELEM: "Free_Test", OTHERELEMENTS: [], Free_Test: {}});
});
test('normalizedObjectRemove : Verify items with object', () => {
  const result = normalizedObjectRemove({MAINELEM: "Free_Test", SORTEDELEMS: ["21", "45", "90"], OTHERELEMENTS: [],
                                        Free_Test: {"21": {attributes: {name: "test"}, id: "21"},
                                        "45": {attributes: {name: "test"}, id: "45"},
                                        "90": {attributes: {name: "test"}, id: "90"}
                                      }, errors: [], length: 3}, 'Free_Test',
                                      {MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                                      Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1});
  expect(result).toEqual( {MAINELEM: "Free_Test", SORTEDELEMS: ["21", "90"], OTHERELEMENTS: [],
                          Free_Test: {
                            "21": {attributes: {name: "test"}, id: "21"},
                            "90": {attributes: {name: "test"}, id: "90"}
                          }, errors: [], length: 2});
});


/**
 * jsonApiNormalizer
 */
test('jsonApiNormalizer : Verify null', () => {
 const result = jsonApiNormalizer(null);
 expect(result).toEqual({ errors: [] });
});
test('jsonApiNormalizer : Verify error ', () => {
 const result = jsonApiNormalizer({"errors": [{"status":4,"code":666000,"title":"Test erreur !","source":{"pointer":"\/data\/attributes\/type","parameter":"type"}}]});
 expect(result).toEqual({"errors":[{"isFlash":true,"status":4,"code":666000,"title":"Test erreur !","source":{"pointer":"\/data\/attributes\/type","parameter":"type"}}]});
});
test('jsonApiNormalizer : Verify errors ', () => {
  const result = jsonApiNormalizer({"errors": [{"status":4,"code":666000,"title":"Test erreur !","source":{"pointer":"\/data\/attributes\/type","parameter":"type"}},
                                              {"status":4,"code":666000,"title":"Test erreur !","source":{"pointer":"\/data\/attributes\/test","parameter":"test"}}]});
  expect(result).toEqual({"errors": [{"isFlash":true,"status":4,"code":666000,"title":"Test erreur !","source":{"pointer":"\/data\/attributes\/type","parameter":"type"}},
                                     {"isFlash":true,"status":4,"code":666000,"title":"Test erreur !","source":{"pointer":"\/data\/attributes\/test","parameter":"test"}}]});
});
test('jsonApiNormalizer : Verify simple object', () => {
 const result = jsonApiNormalizer({"data": {"attributes": { name: 'test'}, "id": "45", "type": "Free_Test"}});
 expect(result).toEqual({MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                        Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1});
});
test('jsonApiNormalizer : Verify simple object with items', () => {
 const result = jsonApiNormalizer({"data": {"attributes": { name: 'test'}, "id": "45", "type": "Free_Test"}},{MAINELEM: "Free_Test", SORTEDELEMS: ["21", "90"], OTHERELEMENTS: [], Free_Test: {"21": {attributes: {name: "test"}, id: "21"}, "90": {attributes: {name: "test"}, id: "90"}}, errors: [], length: 2});
 expect(result).toEqual({MAINELEM: "Free_Test", SORTEDELEMS: ["21", "90", "45"], OTHERELEMENTS: [],
                        Free_Test: {
                          "21": {attributes: {name: "test"}, id: "21"},
                          "45": {attributes: {name: "test"}, id: "45"},
                          "90": {attributes: {name: "test"}, id: "90"}
                        }, errors: [], length: 3});
});
test('jsonApiNormalizer : Verify list object with items', () => {
 const result = jsonApiNormalizer({"data": [{"attributes": { name: 'test1'}, "id": "45", "type": "Free_Test"},
                                            {"attributes": { name: 'test2'}, "id": "46", "type": "Free_Test"}]},
                                  {MAINELEM: "Free_Test", SORTEDELEMS: ["21", "90"], OTHERELEMENTS: [],
                                  Free_Test: {
                                    "21": {attributes: {name: "test"}, id: "21"},
                                    "90": {attributes: {name: "test"}, id: "90"}
                                  }, errors: [], length: 2});
 expect(result).toEqual({MAINELEM: "Free_Test", SORTEDELEMS: ["21", "90", "45", "46"], OTHERELEMENTS: [],
                        Free_Test: {
                          "21": {attributes: {name: "test"}, id: "21"},
                          "90": {attributes: {name: "test"}, id: "90"},
                          "45": {attributes: {name: "test1"}, id: "45"},
                          "46": {attributes: {name: "test2"}, id: "46"}
                        }, errors: [], length: 4});
});
