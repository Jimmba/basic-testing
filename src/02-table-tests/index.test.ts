import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 2, b: 4, action: Action.Subtract, expected: -2 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 4, b: 0, action: Action.Multiply, expected: 0 },
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },
  { a: 2, b: -3, action: Action.Multiply, expected: -6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 4, action: Action.Divide, expected: 0 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 8, b: 1 / 3, action: Action.Exponentiate, expected: 2 },
  { a: 0.25, b: -1 / 2, action: Action.Exponentiate, expected: 2 },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: true, b: 2, action: Action.Add, expected: null },
  { a: {}, b: 2, action: Action.Add, expected: null },
  { a: undefined, b: 2, action: Action.Add, expected: null },
  { a: null, b: 2, action: Action.Add, expected: null },
  { a: 1, b: null, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'It should return $expected when called with a: $a, b: $b, action: $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
