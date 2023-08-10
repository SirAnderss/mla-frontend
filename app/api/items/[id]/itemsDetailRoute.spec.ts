/**
 * @jest-environment node
 */

import { type NextRequest, NextResponse } from 'next/server';
import * as api from '@/shared/api/apiService';

import { OPTIONS, GET } from './route';

jest.mock('next/server', () => ({
  NextResponse,
}));
jest.mock('../../../../shared/api/apiService');

const request = {
  headers: [{ 'x-forwarded-host': 'localhost' }],
} as unknown as NextRequest;

const mockResponseItem = {
  id: 'MLA123',
  title: 'Product 1',
  currency_id: 'ARS',
  price: 100,
  thumbnail: 'https://example.com/product1.jpg',
  pictures: [{ url: 'https://example.com/product1.jpg' }],
  condition: 'new',
  shipping: { free_shipping: true },
  sold_quantity: 100,
};

const mockResponseDescription = {
  plain_text: 'Description large',
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

describe('API Detail Item', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return options header', async () => {
    const response = await OPTIONS(request);

    expect(response).toHaveProperty('headers');
    expect(response).toHaveProperty('body');
  });

  test('should return item data', async () => {
    jest
      .spyOn(api, 'getDataFromAPI')
      .mockResolvedValueOnce(mockResponseItem)
      .mockResolvedValueOnce(mockResponseDescription)
      .mockResolvedValueOnce(mockResponseCategories);

    const response = await GET(request, {
      params: { id: 'MLA123' },
    });

    expect(response).toHaveProperty('body');

    const json = await response.json();

    expect(json).toEqual({
      author: { name: '', lastname: '' },
      categories: ['Category 1', 'Brand 1', 'Model 1'],
      item: {
        condition: 'new',
        free_shipping: true,
        id: 'MLA123',
        picture: 'https://example.com/product1.jpg',
        price: {
          amount: 100,
          currency: 'ARS',
          decimals: 0,
        },
        title: 'Product 1',
        sold_quantity: 100,
        description: 'Description large',
      },
    });
  });

  test('should return empty items and categories data if some service fails', async () => {
    jest
      .spyOn(api, 'getDataFromAPI')
      .mockResolvedValueOnce(mockResponseItem)
      .mockRejectedValueOnce(new Error('Something went wrong'))
      .mockResolvedValueOnce(mockResponseCategories);

    const response = await GET(request, {
      params: { id: 'MLA123' },
    });

    expect(response).toHaveProperty('body');

    const json = await response.json();

    expect(json).toEqual({
      author: {
        name: '',
        lastname: '',
      },
      categories: [],
      item: {
        condition: '',
        free_shipping: false,
        id: '',
        picture: '',
        price: {
          amount: 0,
          currency: '',
          decimals: 0,
        },
        title: '',
        sold_quantity: 0,
        description: '',
      },
    });
  });
});
