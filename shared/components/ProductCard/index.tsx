import Image from 'next/image';
import Link from 'next/link';
import { Shipping } from '../Icons/Shipping';

import styles from './ProductCard.module.scss';
import { IProductItem } from '@/shared/types/types';
import { useHandleUtils } from '@/shared/hooks/useHandleUtils';

type ProductCardProps = {
  product: IProductItem;
  isMiddle: boolean;
};

export function ProductCard({ product, isMiddle }: ProductCardProps) {
  const { condition, price } = useHandleUtils({
    productCondition: product.condition,
    productPrice: product.price,
  });

  return (
    <Link href={`/items/${product.id}`}>
      <div className={styles['product-card']} data-testid='product-card'>
        <div className={styles['product-card__image']}>
          <Image
            src={product.picture}
            alt={product.title}
            loading='lazy'
            sizes='(max-width: 768px) 120px, 180px'
            fill
          />
        </div>
        <div className={styles['product-card__detail']}>
          <div className={styles['product-card__detail__title']}>
            <h2>{price}</h2>
            {product.free_shipping && <Shipping />}
          </div>
          <div className={styles['product-card__detail__body']}>
            <h3>{product.title}</h3>
            <p>{condition}</p>
          </div>
        </div>
      </div>
      {isMiddle && <hr />}
    </Link>
  );
}
