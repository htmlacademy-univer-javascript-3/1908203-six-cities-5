import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MainState } from '../../types/state';
import { changeFavoriteStatusAction, fetchOffersAction, logoutAction } from '../api-actions';
import { SortType } from '../../types/sort-type';

const initialState: MainState = {
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
  selectedSortType: SortType.Popular,
  isOffersLoading: false,
  error: undefined,
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    selectSorting: (state, action: PayloadAction<SortType>) => {
      state.selectedSortType = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.error = undefined;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.error = undefined;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, { payload }) => {
        state.offers = state.offers.map((offer) =>
          offer.id === payload.id ? payload : offer,
        );
      })
      .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
        state.isOffersLoading = false;
        state.offers = payload;
      })
      .addCase(fetchOffersAction.rejected, (state, { error }) => {
        state.isOffersLoading = false;
        state.error = error.message;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state, {error}) => {
        state.error = error.message;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.offers.forEach((offer) => {
          offer.isFavorite = false;
        });
      });
  }
});

export const { selectCity, selectSorting } = mainProcess.actions;
