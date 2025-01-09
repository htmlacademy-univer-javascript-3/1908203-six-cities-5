import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { OfferDetails } from '../types/offer-details';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { ReviewAction } from '../types/review-action';
import { FavoriteAction } from '../types/favorite-action';
import { setAuthorizationStatus, setUserData } from './user-process/user-process';
import { State } from '../types/state';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);

    return data;
  },
);

export const fetchOfferDetailsAction = createAsyncThunk<OfferDetails, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async (offerId: string, { extra: api }) => {
    const offerData = await api.get<Offer>(APIRoute.OfferDetails.replace(':id', offerId));
    const reviewsData = await api.get<Review[]>(APIRoute.OfferReviews.replace(':id', offerId));
    const offersNearbyData = await api.get<Offer[]>(APIRoute.OffersNearby.replace(':id', offerId));

    const offerDetails: OfferDetails = {
      offer: offerData.data,
      reviews: reviewsData.data.sort((a: Review, b: Review) => (new Date(b.date).getTime() - new Date(a.date).getTime())),
      offersNearby: offersNearbyData.data,
    };

    return offerDetails;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<Offer, FavoriteAction, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/setFavoriteStatus',
  async ({ offerId: offerId, status }, { extra: api }) => {
    const numberStatus = status ? 1 : 0;
    const route = APIRoute.ChangeFavoriteStatus
      .replace(':id', offerId)
      .replace(':status', numberStatus.toString());

    const { data } = await api.post<Offer>(route);

    return data;
  }
);

export const addReviewAction = createAsyncThunk<Review, ReviewAction, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId: offerId, comment, rating }, { extra: api }) => {
    const route = APIRoute.OfferReviews.replace(':id', offerId);
    const { data } = await api.post<Review>(route, { comment: comment, rating: rating });

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthorizationStatus',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    dispatch(fetchFavoriteOffersAction());

    return data;
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);

    dispatch(setUserData(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
