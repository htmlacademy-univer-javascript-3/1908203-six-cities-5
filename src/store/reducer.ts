import { createReducer } from '@reduxjs/toolkit';
import { selectCity, selectSorting, setAuthorizationStatus, setOffers, setOffersLoadingStatus, setSelectedOffer, setSelectedOfferLoadingStatus, setUserData } from './action';
import { Offer } from '../types/offer';
import { SortType } from '../types/sort-type';
import { OfferDetails } from '../types/offer-details';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

export type AppState = {
  offers: Offer[];
  cities: string[];
  selectedCity: string;
  sortType: SortType;
  selectedOffer?: OfferDetails;
  isOffersLoading: boolean;
  isSelectedOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData?: UserData;
}

const initialState: AppState = {
  offers: [],
  cities: [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf'
  ],
  selectedCity: 'Paris',
  sortType: SortType.Popular,
  selectedOffer: undefined,
  isOffersLoading: false,
  isSelectedOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: undefined,
};

export const reducer = createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(selectSorting, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSelectedOfferLoadingStatus, (state, action) => {
      state.isSelectedOfferLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

