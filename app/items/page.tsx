import BodyContainer from '@/shared/components/BodyContainer';
import { getItemsList } from './items-page-actions';

export default async function Items({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q } = searchParams;

  if (q) {
    const data = await getItemsList(q as string);

    return <BodyContainer items={data.items} categories={data.categories} />;
  }

  return <></>;
}
