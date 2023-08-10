import { useHandleUtils } from '@/shared/hooks/useHandleUtils';
import { IProductItem } from '@/shared/types/types';

import styles from './ProductsSection.module.scss';

type ProductsSectionProps = {
  products: IProductItem[];
};

export function ProductsSection({ products }: ProductsSectionProps) {
  const { productList } = useHandleUtils({ items: products });

  return (
    <div className={styles['products-section']} data-testid='products-section'>
      {productList}
    </div>
  );
}
