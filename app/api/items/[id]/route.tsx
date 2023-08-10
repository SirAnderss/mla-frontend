import { logger } from '@/logger';
import { getDataFromAPI } from '@/shared/api/apiService';
import { IProductDetail, IProvider } from '@/shared/types/types';
import { headersForAPIRoute, handleCategories } from '@/shared/utils';
import { type NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  const headers = headersForAPIRoute(request);

  return NextResponse.json({}, { headers });
}

export async function GET(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  }
): Promise<NextResponse<IProductDetail>> {
  const headers = headersForAPIRoute(request);

  const response: IProductDetail = {
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
  };

  try {
    const itemResponse = await getDataFromAPI<Record<string, any>>({
      url: `${process.env.API_URL}/items/${id}`,
    });

    const description = await getDataFromAPI<Record<string, any>>({
      url: `${process.env.API_URL}/items/${id}/description`,
    });

    const categoriesList = await getDataFromAPI<IProvider[]>({
      url: `${process.env.API_URL}/sites/MLA/domain_discovery/search?q=${itemResponse.title}&limit=1`,
    });

    const categories = handleCategories(categoriesList);

    const item = {
      condition: itemResponse.condition,
      free_shipping: itemResponse.shipping.free_shipping,
      id: itemResponse.id,
      picture: itemResponse.pictures?.[0].url ?? itemResponse.thumbnail,
      price: {
        amount: itemResponse.price,
        currency: itemResponse.currency_id,
        decimals: 0,
      },
      title: itemResponse.title,
      sold_quantity: itemResponse.sold_quantity,
      description: description.plain_text,
    };

    response.categories = categories;
    response.item = item;

    return NextResponse.json(response, { headers });
  } catch (error) {
    const e = error as Error;
    logger.error(e.message);

    return NextResponse.json(response, { headers });
  }
}
