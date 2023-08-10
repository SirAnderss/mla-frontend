'use client';

import Image from 'next/image';
import { useAppLogo } from './useAppLogo';

import styles from './AppLogo.module.scss';
import Link from 'next/link';

export function AppLogo() {
  const { isLoading, alt, height, src, width } = useAppLogo();

  if (isLoading) {
    return null;
  }

  return (
    <Link href={'/'}>
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
    </Link>
  );
}
