import { name, internet, lorem, datatype } from 'faker';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { User } from '../types/user';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state.ts';
import { createAPI } from '../services/api.ts';
import { Action } from 'redux';
import { AuthorizationStatus, NameSpace } from '../const.ts';
import { OfferType } from '../types/offer-type.ts';
import { OfferDetails } from '../types/offer-details.ts';
import { SortType } from '../types/sort-type.ts';
import { UserData } from '../types/user-data.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export function makeFakeUser(): User {
  return {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: Math.random() > 0.5
  };
}

export function makeFakeUserData(): UserData {
  return {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: Math.random() > 0.5,
    email: internet.email(),
    token: internet.password(),
  };
}

export function makeFakeCities(): string[] {
  return ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
}

export function makeFakeOffer(): Offer {
  const cities = makeFakeCities();
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  return {
    id: datatype.uuid(),
    title: name.title(),
    description: lorem.words(100),
    type: OfferType.Apartment,
    price: Math.floor(Math.random() * 1000),
    city: {
      name: randomCity,
      location: {
        latitude: Math.random() * 90,
        longitude: Math.random() * 180,
        zoom: 10
      }
    },
    location: {
      latitude: Math.random() * 90,
      longitude: Math.random() * 180,
      zoom: 10
    },
    isFavorite: Math.random() > 0.5,
    isPremium: Math.random() > 0.5,
    rating: Math.random() * 5,
    previewImage: internet.url(),
    bedrooms: Math.floor(Math.random() * 5),
    goods: ['WiFi', 'Heating', 'Kitchen'],
    host: makeFakeUser(),
    images: [internet.url(), internet.url()],
    maxAdults: Math.floor(Math.random() * 6)
  };
}

export function makeFakeReview(): Review {
  return {
    id: name.title(),
    date: new Date().toISOString(),
    user: makeFakeUser(),
    comment: name.title(),
    rating: Math.floor(Math.random() * 5)
  };
}


export function makeFakeOfferDetail(): OfferDetails {
  return {
    offer: makeFakeOffer(),
    reviews: [
      makeFakeReview(),
      makeFakeReview(),
      makeFakeReview(),
      makeFakeReview(),
    ],
    offersNearby: [
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer()
    ],
  };
}

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: undefined,
    favoriteOffers: undefined,
    error: undefined,
    ...initialState?.User,
  },
  [NameSpace.Offer]: {
    isSelectedOfferLoading: false,
    isReviewFormSending: false,
    comment: '',
    rating: 0,
    ...initialState?.Offer,
  },
  [NameSpace.Main]: {
    offers: [],
    cities: [],
    selectedCity: '',
    selectedSortType: SortType.Popular,
    isOffersLoading: false,
    ...initialState?.Main,
  },
});
