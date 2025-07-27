export interface IUserRoles {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  roleType: number;
}

export interface ITenants {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  slug: string;
  stripeAccountId: string;
  stripeDetailsSubmitted: boolean;
  storeImg: string | null;
}
export interface IUser {
  name: string;
  email: string;
  username: string;
  id: string;
  roles: IUserRoles[];
  tenant: ITenants;
  createdAt: string;
  updatedAt: string;
}
