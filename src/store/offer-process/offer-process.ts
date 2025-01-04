import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferState } from '../../types/state';
import { addReviewAction, changeFavoriteStatusAction, fetchOfferDetailsAction, logoutAction } from '../api-actions';

const initialState: OfferState = {
  selectedOffer: undefined,
  isSelectedOfferLoading: false,
  isReviewFormSending: false,
  comment: '',
  rating: 0,
  error: undefined,
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    updateComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
    updateRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(changeFavoriteStatusAction.fulfilled, (state, { payload }) => {
        if (state.selectedOffer?.offer.id === payload.id) {
          state.selectedOffer.offer = payload;
        }

        if (state.selectedOffer?.offersNearby !== undefined) {
          state.selectedOffer.offersNearby = state.selectedOffer?.offersNearby.map((offer) =>
            offer.id === payload.id ? payload : offer,
          );
        }
      })
      .addCase(fetchOfferDetailsAction.pending, (state) => {
        state.error = undefined;
        state.isSelectedOfferLoading = true;
      })
      .addCase(fetchOfferDetailsAction.fulfilled, (state, { payload }) => {
        state.isSelectedOfferLoading = false;
        state.selectedOffer = payload;
      })
      .addCase(fetchOfferDetailsAction.rejected, (state, { error }) => {
        state.isSelectedOfferLoading = false;
        state.error = error.message;
      })
      .addCase(addReviewAction.fulfilled, (state, { payload }) => {
        state.isReviewFormSending = false;
        state.comment = '';

        if (state.selectedOffer !== undefined) {
          state.selectedOffer.reviews.unshift(payload);
        }
      })
      .addCase(addReviewAction.pending, (state) => {
        state.error = undefined;
        state.isReviewFormSending = true;
      })
      .addCase(addReviewAction.rejected, (state, { error }) => {
        state.isReviewFormSending = false;
        state.error = error.message;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        if (state.selectedOffer !== undefined) {
          state.selectedOffer.offer.isFavorite = false;

          state.selectedOffer.offersNearby.forEach((offer) => {
            offer.isFavorite = false;
          });
        }
      });
  }
});

export const { updateComment, updateRating } = offerProcess.actions;
