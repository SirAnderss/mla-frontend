import { useMemo } from 'react';
import { currencyFormat, isMiddleComparison } from '../utils';
import { IProductItem } from '@/shared/types/types';
import { BreadCrums } from '../components/BreadCrums';
import { ProductCard } from '../components/ProductCard';

type UseHandleUtilsProps = {
  categories?: string[];
  productPrice?: {
    amount: number;
    currency: string;
    decimals: number;
  };
  productCondition?: string;
  items?: IProductItem[];
};

/**
 *
 * @param categories string[] | undefined
 * @param productPrice { amount: number; currency: string; decimals: number } | undefined
 * @param productCondition string | undefined
 * @param items IProductItem[] | undefined
 * @description This hook is used format the data to be used in the components
 * @returns Object { breadcrumbs: JSX.Element[], price: string, condition: string, productList: JSX.Element[]}
 */
export function useHandleUtils({
  categories,
  productPrice,
  productCondition,
  items,
}: UseHandleUtilsProps) {
  const breadcrumbs = useMemo(() => {
    if (!categories) return [];

    return categories.map((category, index) => {
      const isMiddle = isMiddleComparison(index, categories.length);

      return <BreadCrums text={category} isMiddle={isMiddle} key={index} />;
    });
  }, [categories]);

  const price = useMemo(() => {
    if (!productPrice) return '';

    return currencyFormat({
      value: productPrice?.amount,
      currency: productPrice?.currency,
      numberOfDecimals: productPrice?.decimals,
      locale: 'es-AR',
    });
  }, [productPrice]);

  const condition = useMemo(() => {
    return productCondition === 'new' ? 'Nuevo' : 'Usado';
  }, [productCondition]);

  const productList = useMemo(() => {
    if (!items) return [];

    return items.map((product, index) => {
      const isMiddle = isMiddleComparison(index, items.length);

      return (
        <ProductCard key={product.id} product={product} isMiddle={isMiddle} />
      );
    });
  }, [items]);

  return { breadcrumbs, price, condition, productList };
}
