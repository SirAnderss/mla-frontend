import { getDataFromAPI } from '@/shared/api/apiService';
import { getItemsList } from './items-page-actions';

jest.mock('../../shared/api/apiService');

const mockResponse = {
  autor: {
    name: '',
    lastname: '',
  },
  categories: ['Category 1', 'Category 2'],
  items: [
    {
      id: 'MLA123',
      title: 'Product 1',
      price: {
        currency: 'ARS',
        amount: 1200,
        decimals: 0,
      },
      picture:
        'https://http2.mlstatic.com/D_728833-MLA45774482741_052021-I.jpg',
      condition: 'new',
      free_shipping: true,
    },
  ],
};

describe('getItemsList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns correct response from the API', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getItemsList('test');

    expect(response).toEqual(mockResponse);
    expect(getDataFromAPI).toHaveBeenCalledWith({
      url: 'http://localhost:3000/api/items?q=test',
    });
  });

  it('returns just categories', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue({
      ...mockResponse,
      items: [],
    });

    const response = await getItemsList('test');

    expect(response).toEqual({
      ...mockResponse,
      items: [],
    });
  });

  it('returns just items', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue({
      ...mockResponse,
      categories: [],
    });

    const response = await getItemsList('test');

    expect(response).toEqual({
      ...mockResponse,
      categories: [],
    });
  });

  it('returns empty categories and items if service fails', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue({
      ...mockResponse,
      categories: [],
      items: [],
    });

    const response = await getItemsList('test');

    expect(response).toEqual({
      ...mockResponse,
      categories: [],
      items: [],
    });
  });
});
