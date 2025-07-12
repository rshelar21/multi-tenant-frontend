import { IUser } from './user';
import { ICommonResponse } from './utils';
import { Reviews } from './reviews';
export interface ICategory extends ICommonResponse {
  name: string;
  slug: string;
  color?: string;
}

export interface ISubCategory extends ICommonResponse {
  name: string;
  slug: string;
  category: ICategory[];
}

export type ReviewTypes = {} & Omit<Reviews, 'product' | 'user'>;

export interface IProduct extends ICommonResponse {
  name: string;
  description: string;
  price: string;
  productImg?: string;
  refundPolicy: string;
  category: ISubCategory;
  user: IUser;
  reviews: ReviewTypes[];
}

export interface IProductTag extends ICommonResponse {
  name: string;
}
