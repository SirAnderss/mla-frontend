/**
 * @jest-environment node
 */

import { type NextRequest, NextResponse } from 'next/server';

import { OPTIONS } from '../route';

jest.mock('next/server', () => ({
  NextResponse,
}));

const request = {
  headers: [{ 'x-forwarded-host': 'localhost' }],
} as unknown as NextRequest;

describe('API Detail Item', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return options header', async () => {
    const response = await OPTIONS(request);

    expect(response).toHaveProperty('headers');
    expect(response).toHaveProperty('body');
  });
});
