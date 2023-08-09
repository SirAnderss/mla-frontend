import { FetchingStatus } from '../enums/Fetching';
import { actionTypes, reducer } from './AppReducer';
import { ContextState } from './types';

describe('reducer', () => {
  let initialState: ContextState;

  beforeEach(() => {
    initialState = {
      products: [],
      categories: [],
      isLoading: FetchingStatus.IDDLE,
    };
  });

  test('returns the initial state', () => {
    const result = reducer(initialState, { type: 'unknown', payload: null });

    expect(result).toEqual(initialState);
  });

  test('handles the products action', () => {
    const products = [{ id: 1, name: 'Product 1' }];
    const action = { type: 'products', payload: products };

    const result = reducer(initialState, action);

    expect(result).toEqual({ ...initialState, products });
  });

  test('handles the categories action', () => {
    const categories = ['Category 1', 'Category 2'];
    const action = { type: 'categories', payload: categories };

    const result = reducer(initialState, action);

    expect(result).toEqual({ ...initialState, categories });
  });

  test('handles the isLoading action', () => {
    const isLoading = FetchingStatus.FETCHING;
    const action = { type: 'isLoading', payload: isLoading };

    const result = reducer(initialState, action);

    expect(result).toEqual({ ...initialState, isLoading });
  });

  test('throws an error if no state is provided', () => {
    expect(() =>
      // @ts-ignore
      reducer(undefined, { type: 'unknown', payload: null })
    ).toThrowError('Reducer params has not been provided');
  });

  test('throws an error if no action is provided', () => {
    // @ts-ignore
    expect(() => reducer(initialState, undefined)).toThrowError(
      'Reducer params has not been provided'
    );
  });

  it('should return modified state when action type is valid', () => {
    const payload = [
      {
        id: 'MLA122',
        title: 'product name',
      },
    ];

    const action = { type: actionTypes.products, payload };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      isLoading: FetchingStatus.IDDLE,
      categories: [],
      products: payload,
    });
  });
});
