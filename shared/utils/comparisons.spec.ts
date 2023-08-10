import { isMiddleComparison } from './comparisons';

describe('isMiddleComparison', () => {
  it('returns true when the index is less than the length minus one', () => {
    const result = isMiddleComparison(2, 5);

    expect(result).toEqual(true);
  });

  it('returns false when the index is equal to the length minus one', () => {
    const result = isMiddleComparison(4, 5);

    expect(result).toEqual(false);
  });

  it('returns false when the index is greater than the length minus one', () => {
    const result = isMiddleComparison(6, 5);

    expect(result).toEqual(false);
  });
});
