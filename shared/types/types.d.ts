import { type } from 'os';

interface IQuery {
  author: IAuthor;
  categories: string[];
  items: IProductItem[];
}

interface IProductDetail extends Omit<IQuery, 'items'> {
  item: IProductItemDetail;
}

interface IAuthor {
  name: string;
  lastname: string;
}

interface IProductItem {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
}

interface IProductItemDetail extends IProductItem {
  sold_quantity: number;
  description: string;
}

interface IProvider {
  domain_id: string;
  domain_name: string;
  category_id: string;
  category_name: string;
  attributes: IProviderAttributes[];
}

interface IProviderAttributes {
  id: string;
  name: string;
  value_id: string;
  value_name: string;
}

export type { IQuery, IProductDetail, IProductItem, IProvider };
