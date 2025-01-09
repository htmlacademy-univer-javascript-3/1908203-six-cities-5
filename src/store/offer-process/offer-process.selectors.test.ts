import { NameSpace } from '../../const';
import { makeFakeOfferDetail, makeFakeStore } from '../../utils/mocks';
import { getComment, getRating, getOfferError, getIsSelectedOfferLoading, getIsReviewFormSending, getSelectedOffer, getOffersNearby, getReviews, } from './selectors';

describe('OfferProcess selectors', () => {
  const mockOfferDetail = makeFakeOfferDetail();

  const state = makeFakeStore({
    [NameSpace.Offer]: {
      selectedOffer: mockOfferDetail,
      isSelectedOfferLoading: false,
      isReviewFormSending: false,
      comment: '',
      rating: 1,
      error: undefined,
    }
  });

  it('should return comment from state', () => {
    const { comment } = state[NameSpace.Offer];
    const result = getComment(state);
    expect(result).toBe(comment);
  });

  it('should return rating from state', () => {
    const { rating } = state[NameSpace.Offer];
    const result = getRating(state);
    expect(result).toBe(rating);
  });

  it('should return offer error from state', () => {
    const { error } = state[NameSpace.Offer];
    const result = getOfferError(state);
    expect(result).toBe(error);
  });

  it('should return selected offer loading status from state', () => {
    const { isSelectedOfferLoading } = state[NameSpace.Offer];
    const result = getIsSelectedOfferLoading(state);
    expect(result).toBe(isSelectedOfferLoading);
  });

  it('should return review form sending status from state', () => {
    const { isReviewFormSending } = state[NameSpace.Offer];
    const result = getIsReviewFormSending(state);
    expect(result).toBe(isReviewFormSending);
  });

  it('should return selected offer from state', () => {
    const offer = state[NameSpace.Offer].selectedOffer?.offer;
    const result = getSelectedOffer(state);
    expect(result).toBe(offer);
  });

  it('should return offers nearby from state', () => {
    const offersNearby = state[NameSpace.Offer].selectedOffer?.offersNearby;
    const result = getOffersNearby(state);
    expect(result).toBe(offersNearby);
  });

  it('should return reviews from state', () => {
    const reviews = state[NameSpace.Offer].selectedOffer?.reviews;
    const result = getReviews(state);
    expect(result).toBe(reviews);
  });
});
