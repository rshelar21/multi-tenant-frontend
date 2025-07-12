import { ICommonResponse } from './utils';
import { IProduct } from './product';
import { IUser } from './user';

export interface Reviews extends ICommonResponse {
  description: string;
  rating: number;
  product: IProduct;
  user: IUser;
}
