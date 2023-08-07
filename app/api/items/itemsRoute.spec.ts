/**
 * @jest-environment node
 */

import { type NextRequest, NextResponse } from 'next/server';
import * as api from '@/shared/api/apiService';

import { OPTIONS, GET } from './route';

jest.mock('next/server', () => ({
  NextResponse,
}));
jest.mock('../../../shared/api/apiService');

const request = {
  headers: [{ 'x-forwarded-host': 'localhost' }],
} as unknown as NextRequest;

const mockResponseItems = {
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

const mockResponseCategories = [
  {
    category_name: 'Category 1',
    attributes: [
      { id: 'BRAND', value_name: 'Brand 1' },
      { id: 'MODEL', value_name: 'Model 1' },
    ],
  },
];

describe('API GET items', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return options header', async () => {
    const response = await OPTIONS(request);

    expect(response).toHaveProperty('headers');
    expect(response).toHaveProperty('body');
  });

  test('should return items data', async () => {
    jest
      .spyOn(api, 'getDataFromAPI')
      .mockResolvedValueOnce(mockResponseItems)
      .mockResolvedValueOnce(mockResponseCategories);

    const response = await GET({
      ...request,
      url: 'http://localhost:3000/api/items?q=iphone',
    } as unknown as NextRequest);

    expect(response).toHaveProperty('body');

    const json = await response.json();

    expect(json).toEqual({
      author: { name: '', lastname: '' },
      categories: ['Category 1', 'Brand 1', 'Model 1'],
      items: [
        {
          id: 'MLA123',
          title: 'Product 1',
          price: {
            currency: 'ARS',
            amount: 100,
            decimals: 0,
          },
          picture: 'https://example.com/product1.jpg',
          condition: 'new',
          free_shipping: true,
        },
        {
          id: 'MLA456',
          title: 'Product 2',
          price: {
            currency: 'ARS',
            amount: 200,
            decimals: 0,
          },
          picture: 'https://example.com/product2.jpg',
          condition: 'used',
          free_shipping: false,
        },
      ],
    });
  });

  test('should return empty items and categories data if some service fails', async () => {
    jest
      .spyOn(api, 'getDataFromAPI')
      .mockResolvedValueOnce(mockResponseItems)
      .mockRejectedValueOnce(new Error('Something went wrong'));

    const response = await GET({
      ...request,
      url: 'http://localhost:3000/api/items?q=iphone',
    } as unknown as NextRequest);

    expect(response).toHaveProperty('body');

    const json = await response.json();

    expect(json).toEqual({
      author: {
        name: '',
        lastname: '',
      },
      categories: [],
      items: [],
    });
  });
});
