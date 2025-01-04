import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getComment = (state: State): string => state[NameSpace.Offer].comment;
export const getRating = (state: State): number => state[NameSpace.Offer].rating;

export const getIsSelectedOfferLoading = (state: State): boolean => state[NameSpace.Offer].isSelectedOfferLoading;

export const getIsReviewFormSending = (state: State): boolean => state[NameSpace.Offer].isReviewFormSending;

export const getSelectedOffer = (state: State): Offer | undefined => state[NameSpace.Offer].selectedOffer?.offer;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Offer].selectedOffer?.offersNearby ?? [];
export const getReviews = (state: State): Review[] => state[NameSpace.Offer].selectedOffer?.reviews ?? [];
