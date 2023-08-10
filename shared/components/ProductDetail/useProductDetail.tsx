import { mobileMaxWidth } from '@/shared/constants/global';
import { useHandleUtils } from '@/shared/hooks/useHandleUtils';
import { useWindowSize } from '@/shared/hooks/useWindowSize';

export function useProductDetail({
  itemCondition,
  itemPrice,
}: {
  itemCondition: string;
  itemPrice: {
    amount: number;
    currency: string;
    decimals: number;
  };
}) {
  const { condition, price } = useHandleUtils({
    productCondition: itemCondition,
    productPrice: itemPrice,
  });

  const { width } = useWindowSize();

  const isDesktop = Number(width) > mobileMaxWidth;

  const handleClick = () => {
    window.open('https://www.mercadolibre.com/', '_blank');
  };

  return { condition, price, isDesktop, handleClick };
}
