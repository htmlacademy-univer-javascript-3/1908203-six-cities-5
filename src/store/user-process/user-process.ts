import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserState } from '../../types/state';
import { changeFavoriteStatusAction, checkAuthAction, fetchFavoriteOffersAction, loginAction, logoutAction } from '../api-actions';
import { UserData } from '../../types/user-data';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: undefined,
  favoriteOffers: undefined,
  error: undefined,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.error = undefined;
      })
      .addCase(logoutAction.pending, (state) => {
        state.error = undefined;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.rejected, (state, { error }) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = error.message;
      })
      .addCase(logoutAction.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = undefined;
        state.favoriteOffers = undefined;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, { payload }) => {
        state.favoriteOffers = state.favoriteOffers?.filter((offer) => offer.id !== payload.id);

        if (payload.isFavorite) {
          state.favoriteOffers?.push(payload);
        }
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, { payload }) => {
        state.favoriteOffers = payload;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      });
  }
});

export const { setAuthorizationStatus, setUserData } = userProcess.actions;
