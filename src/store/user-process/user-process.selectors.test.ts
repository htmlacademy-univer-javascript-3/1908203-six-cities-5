import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffer, makeFakeStore, makeFakeUserData } from '../../utils/mocks';
import { getAuthorizationStatus, getFavorites, getUserData, getUserError } from './selectors';

describe('OfferProcess selectors', () => {
  const fakeOffers = [
    makeFakeOffer(),
    makeFakeOffer(),
    makeFakeOffer(),
  ];

  const state = makeFakeStore({
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: makeFakeUserData(),
      favoriteOffers: fakeOffers,
      error: undefined,
    },
  });

  it('should return user data from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toBe(userData);
  });

  it('should return user error from state', () => {
    const { error } = state[NameSpace.User];
    const result = getUserError(state);
    expect(result).toBe(error);
  });

  it('should return auth status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });
  it('should return favorite offers from state', () => {
    const { favoriteOffers } = state[NameSpace.User];
    const result = getFavorites(state);
    expect(result).toBe(favoriteOffers);
  });
});
