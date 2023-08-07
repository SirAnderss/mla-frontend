import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.loader} data-testid='loader'>
      <span className={styles.loader__spinner}></span>
    </div>
  );
}
