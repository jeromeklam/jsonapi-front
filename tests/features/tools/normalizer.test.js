import {
  getNewNormalizedObject,
  jsonApiNormalizer,
  wrap,
  extractErrors,
  normalizedObjectUpdate,
  normalizedObjectRemove,
} from '../../../src/features/tools/normalizer.js';

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
  const result = extractErrors([{ code: '45', meta: { field: 'test' } }]);
  expect(result).toEqual([{ code: '45', isFlash: false, meta: { field: 'test' } }]);
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
  expect(result).toEqual({
    MAINELEM: 'Free_Test',
    SORTEDELEMS: [],
    Free_Test: {},
    TOTAL: 0,
    errors: [],
    length: 0
  });
});
test('getNewNormalizedObject : Verify simple', () => {
  const result = getNewNormalizedObject('Free_Test', '45');
  expect(result).toEqual({
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['45'],
    Free_Test: { '45': { attributes: {}, id: '45' } },
    TOTAL: 1,
    errors: [],
    length: 1,
  });
});

/**
 * normalizedObjectUpdate
 */
test('normalizedObjectUpdate : Verify empty items without object', () => {
  const result = normalizedObjectUpdate({}, 'Free_Test', {});
  expect(result).toEqual({});
});
test('normalizedObjectUpdate : Verify empty items with object ignoreAdd', () => {
  const result = normalizedObjectUpdate({}, 'Free_Test', {
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['45'],
    Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
    TOTAL: 1,
    errors: [],
    length: 1,
  });
  expect(result).toEqual({});
});
test('normalizedObjectUpdate : Verify empty items with object not ignoreAdd', () => {
  const result = normalizedObjectUpdate(
    {},
    'Free_Test',
    {
      MAINELEM: 'Free_Test',
      SORTEDELEMS: ['45'],
      Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
      errors: [],
      length: 1,
    },
    false
  );
  expect(result).toEqual({
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['45'],
    Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
    TOTAL: 1,
    errors: [],
    length: 1,
  });
});
test('normalizedObjectUpdate : Verify items without object', () => {
  const result = normalizedObjectUpdate({ MAINELEM: 'Free_Test', OTHERELEMENTS: [], Free_Test: {} }, 'Free_Test', {});
  expect(result).toEqual({ MAINELEM: 'Free_Test', OTHERELEMENTS: [], Free_Test: {} });
});
test('normalizedObjectUpdate : Verify items with other object', () => {
  const result = normalizedObjectUpdate(
    {
      MAINELEM: 'Free_Test',
      OTHERELEMENTS: ['Free_Other'],
      Free_Test: {},
      Free_Other: { '66': { attributes: { name: 'old' }, id: '66' } },
    },
    'Free_Test',
    { MAINELEM: 'Free_Other', Free_Other: { '66': { attributes: { name: 'label' }, id: '66' } } }
  );
  expect(result).toEqual({
    MAINELEM: 'Free_Test',
    OTHERELEMENTS: ['Free_Other'],
    Free_Test: {},
    Free_Other: { '66': { attributes: { name: 'label' }, id: '66' } },
  });
});
test('normalizedObjectUpdate : Verify items with complex object', () => {
  const result = normalizedObjectUpdate(
    {
      MAINELEM: 'Free_Test',
      OTHERELEMENTS: ['Free_Other'],
      SORTEDELEMS: ['1'],
      Free_Test: { '1': { attributes: { name: 'text 1' }, id: '1' } },
      Free_Other: { '66': { attributes: { name: 'elem 1' }, id: '66' } },
      length: 1,
    },
    'Free_Test',
    {
      MAINELEM: 'Free_Test',
      OTHERELEMENTS: ['Free_Other'],
      Free_Test: { '1': { attributes: { name: 'text 1' }, id: '1' } },
      Free_Other: { '77': { attributes: { name: 'elem 2' }, id: '77' } },
      length: 1,
    }
  );
  expect(result).toEqual({
    MAINELEM: 'Free_Test',
    OTHERELEMENTS: ['Free_Other'],
    SORTEDELEMS: ['1'],
    Free_Test: { '1': { attributes: { name: 'text 1' }, id: '1' } },
    Free_Other: { '66': { attributes: { name: 'elem 1' }, id: '66' }, '77': { attributes: { name: 'elem 2' }, id: '77' } },
    TOTAL: 1,
    length: 1,
  });
});
test('normalizedObjectUpdate : Verify items with very complex object', () => {
  const result = normalizedObjectUpdate(
    {
      MAINELEM: 'Free_Test',
      OTHERELEMENTS: ['Free_Other', 'Free_Third'],
      SORTEDELEMS: ['1'],
      Free_Test: { '1': { attributes: { name: 'text 1' }, id: '1' } },
      Free_Other: { '66': { attributes: { name: 'elem 1' }, id: '66' } },
      Free_Third: { '665': { attributes: { name: 'elem 665' }, id: '665' } },
      length: 1,
    },
    'Free_Test',
    {
      MAINELEM: 'Free_Other',
      OTHERELEMENTS: ['Free_Third'],
      Free_Other: { '66': { attributes: { name: 'elem 1' }, id: '66' } },
      Free_Third: { '667': { attributes: { name: 'elem 667' }, id: '667' } },
      length: 1,
    }
  );
  expect(result).toEqual({
    MAINELEM: 'Free_Test',
    OTHERELEMENTS: ['Free_Other', 'Free_Third'],
    SORTEDELEMS: ['1'],
    Free_Test: { '1': { attributes: { name: 'text 1' }, id: '1' } },
    Free_Other: { '66': { attributes: { name: 'elem 1' }, id: '66' } },
    Free_Third: {
      '665': { attributes: { name: 'elem 665' }, id: '665' },
      '667': { attributes: { name: 'elem 667' }, id: '667' }
    },
    length: 1,
  });
});

/**
 * normalizedObjectRemove (json, key, value) {
 */
test('normalizedObjectRemove : Verify empty items without object', () => {
  const result = normalizedObjectRemove({}, 'Free_Test', {});
  expect(result).toEqual({});
});
test('normalizedObjectRemove : Verify empty items with object', () => {
  const result = normalizedObjectRemove({}, 'Free_Test', {
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['45'],
    Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
    errors: [],
    length: 1,
  });
  expect(result).toEqual({});
});
test('normalizedObjectRemove : Verify items without object', () => {
  const result = normalizedObjectRemove({ MAINELEM: 'Free_Test', OTHERELEMENTS: [], Free_Test: {} }, 'Free_Test', {});
  expect(result).toEqual({ MAINELEM: 'Free_Test', OTHERELEMENTS: [], Free_Test: {} });
});
test('normalizedObjectRemove : Verify items with object', () => {
  const result = normalizedObjectRemove(
    {
      MAINELEM: 'Free_Test',
      SORTEDELEMS: ['21', '45', '90'],
      OTHERELEMENTS: [],
      Free_Test: {
        '21': { attributes: { name: 'test' }, id: '21' },
        '45': { attributes: { name: 'test' }, id: '45' },
        '90': { attributes: { name: 'test' }, id: '90' },
      },
      errors: [],
      length: 3,
    },
    'Free_Test',
    {
      MAINELEM: 'Free_Test',
      SORTEDELEMS: ['45'],
      Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
      errors: [],
      length: 1,
    }
  );
  expect(result).toEqual({
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['21', '90'],
    OTHERELEMENTS: [],
    Free_Test: {
      '21': { attributes: { name: 'test' }, id: '21' },
      '90': { attributes: { name: 'test' }, id: '90' },
    },
    errors: [],
    length: 2,
  });
});

/**
 * jsonApiNormalizer
 */
test('jsonApiNormalizer : Verify null', () => {
  const result = jsonApiNormalizer(null);
  expect(result).toEqual({ errors: [] });
});
test('jsonApiNormalizer : Verify error ', () => {
  const result = jsonApiNormalizer({
    errors: [
      {
        status: 4,
        code: 666000,
        title: 'Test erreur !',
        source: { pointer: '/data/attributes/type', parameter: 'type' },
      },
    ],
  });
  expect(result).toEqual({
    TOTAL: 0,
    errors: [
      {
        isFlash: true,
        status: 4,
        code: 666000,
        title: 'Test erreur !',
        source: { pointer: '/data/attributes/type', parameter: 'type' },
      },
    ],
  });
});
test('jsonApiNormalizer : Verify errors ', () => {
  const result = jsonApiNormalizer({
    errors: [
      {
        status: 4,
        code: 666000,
        title: 'Test erreur !',
        source: { pointer: '/data/attributes/type', parameter: 'type' },
      },
      {
        status: 4,
        code: 666000,
        title: 'Test erreur !',
        source: { pointer: '/data/attributes/test', parameter: 'test' },
      },
    ],
  });
  expect(result).toEqual({
    TOTAL: 0,
    errors: [
      {
        isFlash: true,
        status: 4,
        code: 666000,
        title: 'Test erreur !',
        source: { pointer: '/data/attributes/type', parameter: 'type' },
      },
      {
        isFlash: true,
        status: 4,
        code: 666000,
        title: 'Test erreur !',
        source: { pointer: '/data/attributes/test', parameter: 'test' },
      },
    ],
  });
});
test('jsonApiNormalizer : Verify simple object', () => {
  const result = jsonApiNormalizer({ data: { attributes: { name: 'test' }, id: '45', type: 'Free_Test' } });
  expect(result).toEqual({
    TOTAL: 1,
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['45'],
    Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
    errors: [],
    length: 1,
  });
});
test('jsonApiNormalizer : Verify simple object with count', () => {
  const result = jsonApiNormalizer({ meta: { count: 56 }, data: { attributes: { name: 'test' }, id: '45', type: 'Free_Test' } });
  expect(result).toEqual({
    TOTAL: 56,
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['45'],
    Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
    errors: [],
    length: 1,
  });
});
test('jsonApiNormalizer : Verify simple object id num', () => {
  const result = jsonApiNormalizer({ data: { attributes: { name: 'test' }, id: 45, type: 'Free_Test' } });
  expect(result).toEqual({
    TOTAL: 1,
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['45'],
    Free_Test: { '45': { attributes: { name: 'test' }, id: '45' } },
    errors: [],
    length: 1,
  });
});
test('jsonApiNormalizer : Verify simple object with items', () => {
  const result = jsonApiNormalizer(
    { data: { attributes: { name: 'test' }, id: '45', type: 'Free_Test' } },
    {
      MAINELEM: 'Free_Test',
      SORTEDELEMS: ['21', '90'],
      OTHERELEMENTS: [],
      Free_Test: { '21': { attributes: { name: 'test' }, id: '21' }, '90': { attributes: { name: 'test' }, id: '90' } },
      errors: [],
      length: 2,
    }
  );
  expect(result).toEqual({
    TOTAL: 3,
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['21', '90', '45'],
    OTHERELEMENTS: [],
    Free_Test: {
      '21': { attributes: { name: 'test' }, id: '21' },
      '45': { attributes: { name: 'test' }, id: '45' },
      '90': { attributes: { name: 'test' }, id: '90' },
    },
    errors: [],
    length: 3,
  });
});
test('jsonApiNormalizer : Verify list object with items', () => {
  const result = jsonApiNormalizer(
    {
      data: [
        { attributes: { name: 'test1' }, id: '45', type: 'Free_Test' },
        { attributes: { name: 'test2' }, id: '46', type: 'Free_Test' },
      ],
    },
    {
      MAINELEM: 'Free_Test',
      SORTEDELEMS: ['21', '90'],
      OTHERELEMENTS: [],
      Free_Test: {
        '21': { attributes: { name: 'test' }, id: '21' },
        '90': { attributes: { name: 'test' }, id: '90' },
      },
      errors: [],
      length: 2,
    }
  );
  expect(result).toEqual({
    TOTAL: 4,
    MAINELEM: 'Free_Test',
    SORTEDELEMS: ['21', '90', '45', '46'],
    OTHERELEMENTS: [],
    Free_Test: {
      '21': { attributes: { name: 'test' }, id: '21' },
      '90': { attributes: { name: 'test' }, id: '90' },
      '45': { attributes: { name: 'test1' }, id: '45' },
      '46': { attributes: { name: 'test2' }, id: '46' },
    },
    errors: [],
    length: 4,
  });
});
