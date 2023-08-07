'use client';

import Image from 'next/image';
import { useAppLogo } from './useAppLogo';

import styles from './AppLogo.module.scss';

export function AppLogo() {
  const { isLoading, alt, height, src, width } = useAppLogo();

  if (isLoading) {
    return null;
  }

  return (
    <div data-testid='logo-image'>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles['app-logo']}
        priority
      />
    </div>
  );
}
