import { internet } from 'faker';
import { AuthorizationStatus } from '../../const';
import { UserState } from '../../types/state';
import { UserData } from '../../types/user-data';
import { setAuthorizationStatus, setUserData, userProcess } from './user-process';

describe('UserProcess Slice', () => {
  const initialState: UserState = {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: undefined,
    favoriteOffers: undefined,
    error: undefined,
  };

  it('should not change state after empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change auth status after "setAuthorizationStatus" action', () => {
    const newAuthStatus = AuthorizationStatus.Auth;
    const expectedState = { ...initialState, authorizationStatus: newAuthStatus };

    const result = userProcess.reducer(initialState, setAuthorizationStatus(newAuthStatus));

    expect(result).toEqual(expectedState);
  });

  it('should change user data after "setUserData" action', () => {
    const newUserData: UserData = {
      name: internet.userName(),
      avatarUrl: internet.url(),
      email: internet.email(),
      token: internet.password(),
      isPro: true,
    };

    const expectedState = { ...initialState, userData: newUserData };

    const result = userProcess.reducer(initialState, setUserData(newUserData));

    expect(result).toEqual(expectedState);
  });
});
