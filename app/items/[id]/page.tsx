import { ProductDetail } from '@/shared/components/ProductDetail';
import { getItemsDetail } from './item-detail-action';
import { IProductItemDetail } from '@/shared/types/types';

export default async function ItemDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getItemsDetail(id);

  return (
    <ProductDetail
      categories={data.categories}
      item={data.item as IProductItemDetail}
    />
  );
}
