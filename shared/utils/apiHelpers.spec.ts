import { headersForAPIRoute } from './apiHelpers';
import { type NextRequest } from 'next/server';

const mockHeaders = new Headers();

const request = {
  headers: mockHeaders,
} as unknown as NextRequest;

describe('headersForAPIRoute', () => {
  test('should return headers for api route', () => {
    const headers = headersForAPIRoute(request);

    expect(headers).toHaveProperty('Access-Control-Allow-Methods');
    expect(headers).toHaveProperty('Access-Control-Allow-Headers');
    expect(headers).toHaveProperty('Access-Control-Allow-Origin');
  });
});
