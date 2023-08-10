'use client';

import Image from 'next/image';
import { IProductItemDetail } from '@/shared/types/types';
import { CategorySlug } from '../CategorySlug';
import { Button } from '../Button';
import { useProductDetail } from './useProductDetail';

import styles from './ProductDetail.module.scss';

type ProductDetailProps = {
  categories: string[];
  item: IProductItemDetail;
};

export function ProductDetail({ categories, item }: ProductDetailProps) {
  const { condition, isDesktop, price, handleClick } = useProductDetail({
    itemCondition: item.condition,
    itemPrice: item.price,
  });

  return (
    <div className={styles['product-detail']}>
      {categories.length ? <CategorySlug categories={categories} /> : null}
      <div className={styles['product-detail__card']}>
        <div className={styles.info}>
          <span>{`${condition} | +${item.sold_quantity} Vendidos`}</span>
          <h3 className={styles['product-detail__card__title']}>
            {item.title}
          </h3>
          {isDesktop ? (
            <ButtonAndPrice onClick={handleClick} price={price} />
          ) : null}
        </div>
        <div
          className={`${styles['product-detail__card__image']} ${styles.image}`}
        >
          <Image
            src={item.picture}
            alt={item.title}
            loading='lazy'
            sizes='(max-width: 768px) 120px, 180px'
            fill
          />
        </div>
        {!isDesktop ? (
          <ButtonAndPrice onClick={handleClick} price={price} />
        ) : null}
        <div className={styles.description}>
          <h3 className={styles['product-detail__card__description-title']}>
            Descripción del producto
          </h3>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

function ButtonAndPrice({
  price,
  onClick,
}: {
  price: string;
  onClick: () => void;
}) {
  return (
    <div className={styles.info}>
      <h2>{price}</h2>
      <Button labelText='Comprar ahora' onClick={onClick} />
    </div>
  );
}
