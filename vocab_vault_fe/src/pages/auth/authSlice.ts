import { createSlice } from '@reduxjs/toolkit';
import { AuthStateType } from 'types';
import { setTokenByLocalStorage } from 'utils/common';

const initialState: AuthStateType = {
   accessToken: null,
   user: null,
};

// Tạo Slice cho Auth
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      updateInformationUser: (state, actions) => {
         state.user = actions.payload;
      },
      updateToken: (state, actions) => {
         state.accessToken = actions.payload;
         setTokenByLocalStorage(actions.payload);
      },
      logout: (state) => {
         state.accessToken = null;
         state.user = null;
         localStorage.clear();
      }
   },
});

export const { updateInformationUser, updateToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
