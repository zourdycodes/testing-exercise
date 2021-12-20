import { randomNumberInBetween } from './randomBetween';

// mock Math.random: -> args: (object, 'props')
const randomSpy = jest.spyOn(Math, 'random');

describe('random number between two range of number', () => {
  describe('when Math.random() return 0', () => {
    beforeEach(() => {
      // find a way to mock Math.random() and return 0
      randomSpy.mockClear().mockReturnValue(0);
    });

    it('should called with min = 3 and max = 5, return 3', () => {
      expect(randomNumberInBetween(3, 5)).toBe(3);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });

  describe('when Math.random() return 0.5', () => {
    beforeEach(() => {
      // find a way to mock Math.random() and return 0.5
      randomSpy.mockClear().mockReturnValue(0.5);
    });

    it('should called with min = 3 and max = 5, return 4', () => {
      expect(randomNumberInBetween(3, 5)).toBe(4);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });

  describe('when Math.random() return 0.999999', () => {
    beforeEach(() => {
      // find a way to mock Math.random() and return 0.999999
      randomSpy.mockClear().mockImplementation(() => 0.999999);
    });

    it('should called with min = 3 and max = 5, return 5', () => {
      expect(randomNumberInBetween(3, 5)).toBe(5);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });
});
