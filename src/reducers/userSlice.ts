import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { ITenants } from '@/types/user';
import { UserRolesIdType } from '@/constants';
interface IUserState {
  name: string;
  email: string;
  username: string;
  accessToken: string;
  id: string;
  loginStatus: boolean;
  roles: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    roleType: number;
  }[];
  tenant: ITenants;
  createdAt: string;
  updatedAt: string;
}

const initialState: IUserState = {
  name: '',
  email: '',
  username: '',
  accessToken: '',
  id: '',
  loginStatus: false,
  roles: [],
  tenant: {} as ITenants,
  createdAt: '',
  updatedAt: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<IUserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.loginStatus = action.payload.loginStatus;
      state.roles = action.payload.roles;
      state.tenant = action.payload.tenant;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    removeUser: (state) => {
      state.name = '';
      state.email = '';
      state.id = '';
      state.username = '';
      state.accessToken = '';
      state.loginStatus = false;
      state.roles = [];
      state.tenant = {} as ITenants;
      state.createdAt = '';
      state.updatedAt = '';
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    updateStoreImg: (
      state,
      action: PayloadAction<{
        storeImg: string | null;
      }>
    ) => {
      state.tenant.storeImg = action.payload.storeImg;
    },
  },
});

export const { createUser, removeUser, updateAccessToken, updateStoreImg } =
  userSlice.actions;

export const selectedUser = (state: RootState) => state.user;

export const isSuperAdmin = (state: RootState) =>
  state.user?.roles?.some((i) => i.roleType === UserRolesIdType.SUPER_ADMIN);

export default userSlice.reducer;
