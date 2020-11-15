import { queryStringToObject, objectToQueryString } from '../../src/features/tools/url.js';

/**
 * queryStringToObject
 */
test('queryStringToObject : Verify ""', () => {
  const result = queryStringToObject('');
  expect(result).toEqual({});
});

test('queryStringToObject : Verify null', () => {
  const result = queryStringToObject(null);
  expect(result).toEqual({});
});

test('queryStringToObject : Verify ?param1=45', () => {
  const result = queryStringToObject('?param1=45');
  expect(result).toEqual({param1: '45'});
});

test('queryStringToObject : Verify ?param1=45&param2=test', () => {
  const result = queryStringToObject('?param1=45&param2=test');
  expect(result).toEqual({param1: '45', param2: 'test'});
});

test('queryStringToObject : Verify ?param1=45&param2=test1&param2=test2', () => {
  const result = queryStringToObject('?param1=45&param2=test1&param2=test2');
  expect(result).toEqual({param1: '45', param2: ['test1', 'test2']});
});

test('queryStringToObject : Verify ?param1=45&param2[]=test1&param2[]=test2', () => {
  const result = queryStringToObject('?param1=45&param2[]=test1&param2[]=test2');
  expect(result).toEqual({param1: '45', param2: ['test1', 'test2']});
});

/**
 * objectToQueryString
 */
test('objectToQueryString : Verify null', () => {
  const result = objectToQueryString(null);
  expect(result).toEqual('');
});

test('objectToQueryString : Verify {}', () => {
  const result = objectToQueryString({});
  expect(result).toEqual('');
});

test('objectToQueryString : Verify {param1: 45}', () => {
  const result = objectToQueryString({param1: '45'});
  expect(result).toEqual('?param1=45');
});

test('objectToQueryString : Verify {param1: true}', () => {
  const result = objectToQueryString({param1: true});
  expect(result).toEqual('?param1=1');
});

test('objectToQueryString : Verify {param1: 45, param2: test}', () => {
  const result = objectToQueryString({param1: '45', param2: 'test'});
  expect(result).toEqual('?param1=45&param2=test');
});

test('objectToQueryString : Verify {param1: 45, param2: [test1, test2]}', () => {
  const result = objectToQueryString({param1: '45', param2: ['test1', 'test2']});
  expect(result).toEqual('?param1=45&param2[]=test1&param2[]=test2');
});

test('objectToQueryString : Verify {param1: 45, param2: [test1, test2]} with emptyBrackets', () => {
  const result = objectToQueryString({param1: '45', param2: ['test1', 'test2']}, {emptyBrackets: true});
  expect(result).toEqual('?param1=45&param2[]=test1&param2[]=test2');
});
