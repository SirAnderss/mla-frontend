import styles from './BreadCrums.module.scss';

type BreadCrumsProps = {
  text: string;
  isMiddle?: boolean;
};

export function BreadCrums({ text, isMiddle }: BreadCrumsProps) {
  return (
    <span
      className={`${styles['slug']}${!isMiddle ? ` ${styles.bold}` : ''}`}
    >{`${text}${isMiddle ? ' > ' : ''}`}</span>
  );
}
