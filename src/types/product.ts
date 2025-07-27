import { IUser } from './user';
import { ICommonResponse } from './utils';
import { Reviews } from './reviews';

export interface Tags extends ICommonResponse {
  name: string;
}

export interface ICategory extends ICommonResponse {
  name: string;
  slug: string;
  color?: string;
}

export interface ISubCategory extends ICommonResponse {
  name: string;
  slug: string;
  category: ICategory;
}

export type ReviewTypes = {} & Omit<Reviews, 'product' | 'user'>;
export interface Content {
  id: string;
  children: [];
  content: [];
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  props: {};
}
export interface IProduct extends ICommonResponse {
  name: string;
  description: string;
  price: string;
  productImg?: string;
  refundPolicy: string;
  category: ISubCategory;
  user: IUser;
  reviews: ReviewTypes[];
  tags: Tags[];
  content: Content[];
}

export interface IProductTag extends ICommonResponse {
  name: string;
}
