import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../domain/models/offer';
import { chooseCity } from './action';
import { offers } from '../../mocks/offers';

export type AppState = {
  offers: Offer[];
  city: string;
}

const initialState = {
  offers: offers,
  city: 'Paris'
};


export const reducer = createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.city = action.payload;
    });
});

