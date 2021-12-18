import { sumNum } from './sum';

describe('sum the 2 number and return new value', () => {
  it('should return 9', () => {
    const value = sumNum(6, 3);
    expect(value).toBe(9);
  });
});
