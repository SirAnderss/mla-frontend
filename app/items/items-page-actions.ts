import { getDataFromAPI } from '@/shared/api/apiService';
import { IQuery } from '@/shared/types/types';

export async function getItemsList(query: string) {
  const response = await getDataFromAPI<IQuery>({
    url: `https://mla-frontend.vercel.app//api/items?q=${query}`,
  });

  return response;
}
