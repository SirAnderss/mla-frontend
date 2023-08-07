import { IProvider } from '../types/types';
import { handleCategories, handleItems } from './handleResponse';

describe('handleCategories', () => {
  test('returns an empty array if no providers are provided', () => {
    const result = handleCategories([]);

    expect(result).toEqual([]);
  });

  test('returns an array of unique categories', () => {
    const providers = [
      {
        category_name: 'Category 1',
        attributes: [
          { id: 'BRAND', value_name: 'Brand 1' },
          { id: 'MODEL', value_name: 'Model 1' },
        ],
      },
      {
        category_name: 'Category 2',
        attributes: [
          { id: 'BRAND', value_name: 'Brand 2' },
          { id: 'MODEL', value_name: 'Model 2' },
          { id: 'LINE', value_name: 'Line 2' },
        ],
      },
      {
        category_name: 'Category 3',
        attributes: [{ id: 'BRAND', value_name: 'Brand 3' }],
      },
    ];

    const result = handleCategories(providers as IProvider[]);

    expect(result).toEqual([
      'Category 1',
      'Brand 1',
      'Model 1',
      'Category 2',
      'Brand 2',
      'Model 2',
      'Line 2',
      'Category 3',
      'Brand 3',
    ]);
  });

  test('returns an array of unique categories if some categories are repeated', () => {
    const providers = [
      {
        category_name: 'Category 1',
        attributes: [
          { id: 'BRAND', value_name: 'Brand 1' },
          { id: 'MODEL', value_name: 'Model 1' },
        ],
      },
      {
        category_name: 'Category 2',
        attributes: [
          { id: 'BRAND', value_name: 'Brand 2' },
          { id: 'MODEL', value_name: 'Model 2' },
          { id: 'LINE', value_name: 'Line 2' },
        ],
      },
      {
        category_name: 'Category 1',
        attributes: [{ id: 'BRAND', value_name: 'Brand 3' }],
      },
    ];

    const result = handleCategories(providers as IProvider[]);

    expect(result).toEqual([
      'Category 1',
      'Brand 1',
      'Model 1',
      'Category 2',
      'Brand 2',
      'Model 2',
      'Line 2',
      'Brand 3',
    ]);
  });
});

describe('handleItems', () => {
  test('returns an empty array if no search results are provided', () => {
    const result = handleItems({ results: [] });

    expect(result).toEqual([]);
  });

  test('returns an array of product items', () => {
    const searchResult = {
      results: [
        {
          id: 'MLA123',
          title: 'Product 1',
          currency_id: 'ARS',
          price: 100,
          thumbnail: 'https://example.com/product1.jpg',
          condition: 'new',
          shipping: { free_shipping: true },
        },
        {
          id: 'MLA456',
          title: 'Product 2',
          currency_id: 'ARS',
          price: 200,
          thumbnail: 'https://example.com/product2.jpg',
          condition: 'used',
          shipping: { free_shipping: false },
        },
      ],
    };

    const result = handleItems(searchResult);

    expect(result).toEqual([
      {
        id: 'MLA123',
        title: 'Product 1',
        price: { currency: 'ARS', amount: 100, decimals: 0 },
        picture: 'https://example.com/product1.jpg',
        condition: 'new',
        free_shipping: true,
      },
      {
        id: 'MLA456',
        title: 'Product 2',
        price: { currency: 'ARS', amount: 200, decimals: 0 },
        picture: 'https://example.com/product2.jpg',
        condition: 'used',
        free_shipping: false,
      },
    ]);
  });
});
