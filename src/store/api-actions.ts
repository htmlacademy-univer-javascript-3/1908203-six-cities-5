import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { AppState } from './reducer';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { redirectToRoute, setAuthorizationStatus, setOffers, setOffersLoadingStatus, setSelectedOffer, setSelectedOfferLoadingStatus, setUserData } from './action';
import { saveToken } from '../services/token';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { OfferDetails } from '../types/offer-details';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    dispatch(setSelectedOffer(undefined));

    const { data } = await api.get<Offer[]>(APIRoute.Offers);

    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchOfferDetailsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async (offerId: string, { dispatch, extra: api }) => {
    dispatch(setSelectedOfferLoadingStatus(true));

    const offerData = await api.get<Offer>(APIRoute.OfferDetails.replace(':id', offerId));
    const reviewsData = await api.get<Review[]>(APIRoute.OfferReviews.replace(':id', offerId));
    const offersNearbyData = await api.get<Offer[]>(APIRoute.OffersNearby.replace(':id', offerId));

    const offerDetails: OfferDetails = {
      offer: offerData.data,
      reviews: reviewsData.data,
      offersNearby: offersNearbyData.data,
    };

    dispatch(setSelectedOfferLoadingStatus(false));
    dispatch(setSelectedOffer(offerDetails));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuthorizationStatus',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);

      dispatch(setUserData(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);

      dispatch(setUserData(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (err) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);
