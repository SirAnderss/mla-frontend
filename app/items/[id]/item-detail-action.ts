import { getDataFromAPI } from '@/shared/api/apiService';
import { IProductDetail } from '@/shared/types/types';

export async function getItemsDetail(id: string) {
  const response = await getDataFromAPI<IProductDetail>({
    url: `http://localhost:3000/api/items/${id}`,
  });

  return response;
}
