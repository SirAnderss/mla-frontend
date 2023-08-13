import { getDataFromAPI } from '@/shared/api/apiService';
import { IProductDetail } from '@/shared/types/types';

export async function getItemsDetail(id: string) {
  const response = await getDataFromAPI<IProductDetail>({
    url: `https://mla-frontend.vercel.app/api/items/${id}`,
  });

  return response;
}
