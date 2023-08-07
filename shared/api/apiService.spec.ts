import { getDataFromAPI } from './apiService';

global.fetch = jest.fn();

describe('api calls handler', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    } as Response);

    await getDataFromAPI({
      url: 'http://localhost:3000',
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000', {
      method: 'GET',
      headers,
      body: undefined,
    });
  });

  test('should call API with body', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    } as Response);

    const body = JSON.stringify({ name: 'John Doe' });

    await getDataFromAPI({
      method: 'POST',
      url: 'http://localhost:3000',
      body,
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000', {
      method: 'POST',
      headers,
      body,
    });
  });

  test('should return data from API', async () => {
    const expectedData = { name: 'John Doe' };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(expectedData),
    } as Response);

    const body = JSON.stringify({ name: 'John Doe' });

    const data = await getDataFromAPI({
      method: 'POST',
      url: 'http://localhost:3000',
      body,
    });

    expect(data).toEqual(expectedData);
  });
});
