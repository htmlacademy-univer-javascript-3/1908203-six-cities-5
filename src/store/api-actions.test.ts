import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeOfferDetail, makeFakeReview } from '../utils/mocks';
import { State } from '../types/state';
import { addReviewAction, changeFavoriteStatusAction, checkAuthAction, fetchFavoriteOffersAction, fetchOfferDetailsAction, fetchOffersAction, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import * as tokenStorage from '../services/token';
import { ReviewAction } from '../types/review-action';
import { FavoriteAction } from '../types/favorite-action';
import { Offer } from '../types/offer';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());
      const actions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(actions);
      const fetchOffersActionFulfilled = actions.at(1) as ReturnType<typeof fetchOfferDetailsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(APIRoute.OfferDetails.replace(':id', mockOffer.id)).reply(400, undefined);

      await store.dispatch(fetchOfferDetailsAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferDetailsAction.pending.type,
        fetchOfferDetailsAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferDetailsAction', () => {
    it('should dispatch "fetchOfferDetailsAction.pending", "fetchOfferDetailsAction.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOfferDetail();
      const offerId = mockOffer.offer.id;

      const route = APIRoute.OfferDetails.replace(':id', offerId);

      mockAxiosAdapter.onGet(route).reply(200, mockOffer.offer);
      mockAxiosAdapter.onGet(APIRoute.OfferReviews.replace(':id', offerId)).reply(200, mockOffer.reviews);
      mockAxiosAdapter.onGet(APIRoute.OffersNearby.replace(':id', offerId)).reply(200, mockOffer.offersNearby);

      await store.dispatch(fetchOfferDetailsAction(offerId));

      const actions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(actions);
      const fetchOfferDetailsActionFulfilled = actions.at(1) as ReturnType<typeof fetchOfferDetailsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferDetailsAction.pending.type,
        fetchOfferDetailsAction.fulfilled.type,
      ]);

      expect(fetchOfferDetailsActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferDetailsAction.pending", "fetchOfferDetailsAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(APIRoute.OfferDetails.replace(':id', mockOffer.id)).reply(400, undefined);

      await store.dispatch(fetchOfferDetailsAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferDetailsAction.pending.type,
        fetchOfferDetailsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoriteOffersAction());
      const actions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(actions);
      const fetchFavoriteOffersActionFulfilled = actions.at(1) as ReturnType<typeof fetchOfferDetailsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(APIRoute.OfferDetails.replace(':id', mockOffer.id)).reply(400, undefined);

      await store.dispatch(fetchOfferDetailsAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferDetailsAction.pending.type,
        fetchOfferDetailsAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch "changeFavoriteStatusAction.pending", "changeFavoriteStatusAction.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOffer();

      const favoriteAction: FavoriteAction = {
        offerId: mockOffer.id,
        status: !mockOffer.isFavorite,
      };

      const numberStatus = favoriteAction.status ? 1 : 0;

      const newOffer: Offer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };

      const route = APIRoute.ChangeFavoriteStatus
        .replace(':id', favoriteAction.offerId)
        .replace(':status', numberStatus.toString());

      mockAxiosAdapter.onPost(route).reply(200, newOffer);

      await store.dispatch(changeFavoriteStatusAction(favoriteAction));
      const actions = store.getActions();
      const changeFavoriteStatusActionFulfilled = actions.at(1) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;
      const extractedActionsTypes = extractActionsTypes(actions);

      expect(extractedActionsTypes).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);

      expect(changeFavoriteStatusActionFulfilled.payload).toEqual(newOffer);
    });

    it('should dispatch "changeFavoriteStatusAction.pending", "changeFavoriteStatusAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();

      const favoriteAction: FavoriteAction = {
        offerId: mockOffer.id,
        status: !mockOffer.isFavorite,
      };

      const numberStatus = favoriteAction.status ? 1 : 0;

      mockAxiosAdapter.onGet(APIRoute.ChangeFavoriteStatus
        .replace(':id', favoriteAction.offerId)
        .replace(':status', numberStatus.toString())
      ).reply(400, undefined);

      await store.dispatch(changeFavoriteStatusAction(favoriteAction));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.rejected.type,
      ]);
    });
  });

  describe('addReviewAction', () => {
    it('should dispatch "addReviewAction.pending", "addReviewAction.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const mockReview = makeFakeReview();

      const reviewAction: ReviewAction = {
        offerId: mockOffer.id,
        comment: mockReview.comment,
        rating: mockReview.rating,
      };

      const route = APIRoute.OfferReviews.replace(':id', reviewAction.offerId);

      mockAxiosAdapter.onPost(route).reply(200, mockReview);

      await store.dispatch(addReviewAction(reviewAction));
      const actions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(actions);
      const addReviewActionFulfilled = actions.at(1) as ReturnType<typeof addReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        addReviewAction.pending.type,
        addReviewAction.fulfilled.type,
      ]);

      expect(addReviewActionFulfilled.payload).toEqual(mockReview);
    });

    it('should dispatch "addReviewAction.pending", "addReviewAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      const mockReview = makeFakeReview();

      const reviewAction: ReviewAction = {
        offerId: mockOffer.id,
        comment: mockReview.comment,
        rating: mockReview.rating,
      };

      const route = APIRoute.OfferReviews.replace(':id', reviewAction.offerId);
      mockAxiosAdapter.onGet(route).reply(400, undefined);

      await store.dispatch(addReviewAction(reviewAction));
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContainEqual(checkAuthAction.fulfilled.type);
      expect(actions).toContainEqual(checkAuthAction.pending.type);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContainEqual(checkAuthAction.pending.type);
      expect(actions).toContainEqual(checkAuthAction.rejected.type);
    });
  });

  describe('loginAction', () => {
    it('should successfully login and save token', async () => {
      const mockAuthData = { login: 'test@example.com', password: 'password' };
      const mockUserData = {
        token: 'test-token',
        email: 'test@example.com',
        avatarUrl: 'http://test.com/avatar.jpg'
      };

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(mockAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContainEqual(loginAction.fulfilled.type);
      expect(mockSaveToken).toHaveBeenCalledWith(mockUserData.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});

