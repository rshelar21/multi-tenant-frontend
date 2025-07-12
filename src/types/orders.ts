import { ICommonResponse } from './utils';
import { IProduct } from './product';
import { IUser } from './user';

export interface Orders extends ICommonResponse {
  product: IProduct[];
  user: IUser;
  name: string;
}
