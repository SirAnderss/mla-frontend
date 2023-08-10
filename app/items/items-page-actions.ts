import { getDataFromAPI } from '@/shared/api/apiService';
import { IQuery } from '@/shared/types/types';

export async function getItemsList(query: string) {
  const response = await getDataFromAPI<IQuery>({
    url: `http://localhost:3000/api/items?q=${query}`,
  });

  return response;
}
