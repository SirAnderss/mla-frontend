import { getDataFromAPI } from '@/shared/api/apiService';
import { getItemsDetail } from './item-detail-action';

jest.mock('../../../shared/api/apiService');

const mockResponse = {
  author: {
    name: '',
    lastname: '',
  },
  categories: ['Category 1', 'Category 2'],
  item: {
    condition: 'new',
    free_shipping: true,
    id: 'MLA123',
    picture: 'https://http2.mlstatic.com/D_728833-MLA45774482741_052021-I.jpg',
    price: {
      currency: 'ARS',
      amount: 1200,
      decimals: 0,
    },
    title: 'Product 1',
    sold_quantity: 100,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nobis?',
  },
};

describe('getItemsDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns correct response from the API', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getItemsDetail('MLA123');

    expect(response).toEqual(mockResponse);
    expect(getDataFromAPI).toHaveBeenCalledWith({
      url: 'https://mla-frontend.vercel.app/api/items/MLA123',
    });
  });

  it('returns just categories', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue({
      ...mockResponse,
      item: null,
    });

    const response = await getItemsDetail('MLA123');

    expect(response).toEqual({
      ...mockResponse,
      item: null,
    });
  });

  it('returns just item', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue({
      ...mockResponse,
      categories: [],
    });

    const response = await getItemsDetail('MLA123');

    expect(response).toEqual({
      ...mockResponse,
      categories: [],
    });
  });

  it('returns empty categories and items if service fails', async () => {
    (getDataFromAPI as jest.Mock).mockResolvedValue({
      ...mockResponse,
      categories: [],
      item: null,
    });

    const response = await getItemsDetail('test');

    expect(response).toEqual({
      ...mockResponse,
      categories: [],
      item: null,
    });
  });
});
