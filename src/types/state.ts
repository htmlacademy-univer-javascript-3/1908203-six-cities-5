import { AuthorizationStatus } from '../const';
import { appStateStore } from '../store';
import { Offer } from './offer';
import { OfferDetails } from './offer-details';
import { SortType } from './sort-type';
import { UserData } from './user-data';

export type OfferState = {
  selectedOffer?: OfferDetails;
  isSelectedOfferLoading: boolean;
  isReviewFormSending: boolean;
  comment: string;
  rating: number;
  error?: string;
}

export type MainState = {
  offers: Offer[];
  cities: string[];
  selectedCity: string;
  selectedSortType: SortType;
  isOffersLoading: boolean;
  error?: string;
}

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData?: UserData;
  favoriteOffers?: Offer[];
  error?: string;
}

export type State = ReturnType<typeof appStateStore.getState>;
