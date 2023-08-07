import { mobileMaxWidth } from '@/shared/constants/global';
import { useWindowSize } from '@/shared/hooks/useWindowSize';

export function useAppLogo() {
  const { width } = useWindowSize();

  const isDesktop = Number(width) > mobileMaxWidth;

  return {
    src: isDesktop ? '/assets/logo__large.png' : '/assets/logo__small.png',
    alt: 'Mercado Libre',
    width: isDesktop ? 114 : 44,
    height: 32,
    isLoading: typeof width === 'undefined',
  };
}
