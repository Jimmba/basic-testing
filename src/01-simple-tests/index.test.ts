import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toEqual(3);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toEqual(4);
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Add })).toEqual(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toEqual(
      2,
    );
    expect(simpleCalculator({ a: 7, b: 2, action: Action.Subtract })).toEqual(
      5,
    );
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Subtract })).toEqual(
      -2,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Multiply })).toEqual(
      8,
    );
    expect(simpleCalculator({ a: 4, b: 5, action: Action.Multiply })).toEqual(
      20,
    );
    expect(simpleCalculator({ a: 4, b: 0, action: Action.Multiply })).toEqual(
      0,
    );
    expect(simpleCalculator({ a: 0, b: 5, action: Action.Multiply })).toEqual(
      0,
    );
    expect(simpleCalculator({ a: 2, b: -3, action: Action.Multiply })).toEqual(
      -6,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toEqual(2);
    expect(simpleCalculator({ a: 4, b: 0, action: Action.Divide })).toEqual(
      Infinity,
    );
    expect(simpleCalculator({ a: 0, b: 4, action: Action.Divide })).toEqual(0);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate }),
    ).toEqual(16);
    expect(
      simpleCalculator({ a: 5, b: 0, action: Action.Exponentiate }),
    ).toEqual(1);
    expect(
      simpleCalculator({ a: 8, b: 1 / 3, action: Action.Exponentiate }),
    ).toEqual(2);
    expect(
      simpleCalculator({ a: 0.25, b: -1 / 2, action: Action.Exponentiate }),
    ).toEqual(2);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 1, b: 2, action: 'unknown action' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: true, b: 2, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: {}, b: 2, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: undefined, b: 2, action: Action.Add }),
    ).toBeNull();
    expect(simpleCalculator({ a: null, b: 2, action: Action.Add })).toBeNull();

    expect(simpleCalculator({ a: 1, b: null, action: Action.Add })).toBeNull();
  });
});
