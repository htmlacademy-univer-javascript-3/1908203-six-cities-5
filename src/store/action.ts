import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { Offer } from '../types/offer';

export const setOffer = createAction<Offer>('setOfferFavoriteStatus');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
