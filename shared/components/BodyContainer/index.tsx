'use client';

import { CategorySlug } from '@/shared/components/CategorySlug';
import { ProductsSection } from '../ProductsSection';
import { IQuery } from '@/shared/types/types';

import styles from './BodyContainer.module.scss';

type BodyContainerProps = Omit<IQuery, 'author'>;

export function BodyContainer({ categories, items }: BodyContainerProps) {
  return (
    <div className={styles['body-container']} data-testid='app-products'>
      {categories.length ? <CategorySlug categories={categories} /> : null}
      {items.length ? <ProductsSection products={items} /> : null}
    </div>
  );
}
