import { logger } from '@/logger';
import { getDataFromAPI } from '@/shared/api/apiService';
import { IProvider, IQuery } from '@/shared/types/types';
import {
  handleCategories,
  handleItems,
  headersForAPIRoute,
} from '@/shared/utils';
import { type NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  const headers = headersForAPIRoute(request);

  return NextResponse.json({}, { headers });
}

export async function GET(request: NextRequest): Promise<NextResponse<IQuery>> {
  const headers = headersForAPIRoute(request);

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const itemsList = await getDataFromAPI<Record<string, any>>({
      url: `${process.env.API_URL}/sites/MLA/search?q=${query}`,
    });

    const categoriesList = await getDataFromAPI<IProvider[]>({
      url: `${process.env.API_URL}/sites/MLA/domain_discovery/search?q=${query}`,
    });

    const categories = handleCategories(categoriesList);
    const items = handleItems(itemsList);

    const response: IQuery = {
      author: {
        name: '',
        lastname: '',
      },
      categories,
      items,
    };

    return NextResponse.json(response, { headers });
  } catch (error) {
    const e = error as Error;
    logger.error(e.message);

    const response: IQuery = {
      author: {
        name: '',
        lastname: '',
      },
      categories: [],
      items: [],
    };

    return NextResponse.json(response, { headers });
  }
}
