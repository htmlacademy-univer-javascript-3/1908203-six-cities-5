import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../domain/models/offer';
import { chooseCity, chooseSorting } from './action';
import { offers } from '../../mocks/offers';
import { SortType } from '../../domain/models/sort-type';

export type AppState = {
  offers: Offer[];
  sortType: SortType;
  city: string;
}

const initialState = {
  offers: offers,
  sortType: SortType.Popular,
  city: 'Paris'
};

export const reducer = createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(chooseSorting, (state, action) => {
      state.sortType = action.payload;
    });
});

