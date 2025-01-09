import { OfferState } from '../../types/state';
import { offerProcess, updateComment, updateRating } from './offer-process';

describe('OfferProcess Slice', () => {
  const initialState: OfferState = {
    isSelectedOfferLoading: false,
    isReviewFormSending: false,
    comment: '',
    rating: 0,
  };

  it('should not change state after empty action', () => {
    const emptyAction = { type: '' };
    const result = offerProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change comment after "updateComment" action', () => {
    const newComment = 'New comment';
    const expectedState = { ...initialState, comment: newComment };

    const result = offerProcess.reducer(initialState, updateComment(newComment));

    expect(result).toEqual(expectedState);
  });

  it('should change rating after "updateRating" action', () => {
    const newRating = 5;
    const expectedState = { ...initialState, rating: newRating };

    const result = offerProcess.reducer(initialState, updateRating(newRating));

    expect(result).toEqual(expectedState);
  });
});
