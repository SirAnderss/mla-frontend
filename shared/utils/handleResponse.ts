import { IProductItem, IProvider } from '../types/types';

/**
 *
 * @param providers IProvider[]
 * @description This function is used to get the categories from the providers obtained from the API
 * @returns string[]
 */
function handleCategories(providers: IProvider[]): string[] {
  const categories: string[] = [];

  providers.forEach(provider => {
    categories.push(provider.category_name);

    provider.attributes.forEach(attribute => {
      if (
        attribute.id === 'BRAND' ||
        attribute.id === 'MODEL' ||
        attribute.id === 'LINE'
      )
        categories.push(attribute.value_name);
    });
  });

  return [...new Set(categories)];
}

/**
 *
 * @param searchResult Record<string, any>
 * @description This function is used to format the items obtained from the API
 * @returns IProductItem[]
 */
function handleItems(searchResult: Record<string, any>): IProductItem[] {
  const items: IProductItem[] = [];

  searchResult.results.forEach((result: Record<string, any>) => {
    const item: IProductItem = {
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: result.price,
        decimals: 0,
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
    };

    items.push(item);
  });

  return items;
}

export { handleCategories, handleItems };
