import { useHandleUtils } from '@/shared/hooks/useHandleUtils';

import styles from './CategorySlug.module.scss';

export function CategorySlug({ categories }: { categories: string[] }) {
  const { breadcrumbs } = useHandleUtils({ categories });

  return (
    <div className={styles['slug-container']} data-testid='app-categories'>
      {breadcrumbs}
    </div>
  );
}
