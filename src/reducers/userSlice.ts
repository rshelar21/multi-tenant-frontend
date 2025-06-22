import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  name: string;
  email: string;
  username: string;
  accessToken: string;
  id: string;
  loginStatus: boolean;
}

const initialState: IUserState = {
  name: '',
  email: '',
  username: '',
  accessToken: '',
  id: '',
  loginStatus: false,
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
    },
    removeUser: (state) => {
      state.name = '';
      state.email = '';
      state.id = '';
      state.username = '';
      state.accessToken = '';
      state.loginStatus = false;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { createUser, removeUser, updateAccessToken } = userSlice.actions;

export const selectedUser = (state: RootState) => state.user;

export default userSlice.reducer;
