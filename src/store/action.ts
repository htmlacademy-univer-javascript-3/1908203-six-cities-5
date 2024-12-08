import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { OfferDetails } from '../types/offer-details';
import { SortType } from '../types/sort-type';
import { Offer } from '../types/offer';
import { UserData } from '../types/user-data';

export const selectCity = createAction<string>('chooseCity');

export const selectSorting = createAction<SortType>('chooseSorting');

export const setOffers = createAction<Offer[]>('loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');

export const setSelectedOffer = createAction<OfferDetails | undefined>('setSelectedOffer');
export const setSelectedOfferLoadingStatus = createAction<boolean>('setSelectedOfferLoadingStatus');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');
export const setUserData = createAction<UserData>('setUserData');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
