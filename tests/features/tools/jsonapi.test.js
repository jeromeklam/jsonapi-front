import { getJsonApi, getNewJsonApi } from '../../../src/features/tools/jsonapi.js';

/**
 * getNewJsonApi
 */
test('getNewJsonApi : Verify simple number id', () => {
  const result = getNewJsonApi('Free_Test', 45);
  expect(result).toEqual({ data: { attributes: {}, id: '45', type: 'Free_Test' } });
});
test('getNewJsonApi : Verify simple string id', () => {
  const result = getNewJsonApi('Free_Test', '45');
  expect(result).toEqual({ data: { attributes: {}, id: '45', type: 'Free_Test' } });
});
test('getNewJsonApi : Verify simple number id 0', () => {
  const result = getNewJsonApi('Free_Test', 0);
  expect(result).toEqual({ data: { attributes: {}, id: '', type: 'Free_Test' } });
});
test('getNewJsonApi : Verify simple string id "0"', () => {
  const result = getNewJsonApi('Free_Test', '0');
  expect(result).toEqual({ data: { attributes: {}, id: '', type: 'Free_Test' } });
});
test('getNewJsonApi : Verify simple id empty', () => {
  const result = getNewJsonApi('Free_Test', '');
  expect(result).toEqual({ data: { attributes: {}, id: '', type: 'Free_Test' } });
});
test('getNewJsonApi : Verify simple id null', () => {
  const result = getNewJsonApi('Free_Test', null);
  expect(result).toEqual({ data: { attributes: {}, id: '', type: 'Free_Test' } });
});

/**
 * getJsonApi
 */
test('getJsonApi : Verify {}', () => {
  const result = getJsonApi({}, 'Free_Test');
  expect(result).toEqual({ data: { attributes: {}, id: '', type: 'Free_Test' } });
});

test('getJsonApi : Verify null', () => {
  const result = getJsonApi(null, 'Free_Test');
  expect(result).toEqual({ data: { attributes: {}, id: '', type: 'Free_Test' } });
});

test('getJsonApi : Verify simple object', () => {
  const result = getJsonApi({ id: '45', type: 'Free_Test', name: 'test' }, 'Free_Test');
  expect(result).toEqual({ data: { attributes: { name: 'test' }, id: '45', type: 'Free_Test' } });
});
test('getJsonApi : Verify object with relation', () => {
  const result = getJsonApi(
    { id: '45', type: 'Free_Test', name: 'test', test: { id: '0', type: 'FreeTest2' } },
    'Free_Test'
  );
  expect(result).toEqual({
    data: {
      attributes: { name: 'test' },
      id: '45',
      relationships: { test: { data: { id: '', type: 'FreeTest2' } } },
      type: 'Free_Test',
    },
  });
});
let parentObj1 = {id: '45', type: 'Free_Test', name: 'test'};
parentObj1.parent = parentObj1;
test('getJsonApi : Verify object with recursion', () => {
  const result = getJsonApi(
    parentObj1,
    'Free_Test'
  );
  expect(result).toEqual({
    data: {
      attributes: {"name": "test"},
      id: "45",
      relationships: {"parent": {"data": {"id": "45", "type": "Free_Test"}}},
      type: "Free_Test"
    },
    included: [{"attributes": {"name": "test"}, "id": "45", "relationships": {"parent": {"data": {"id": "45", "type": "Free_Test"}}}, "type": "Free_Test"}]
  });
});