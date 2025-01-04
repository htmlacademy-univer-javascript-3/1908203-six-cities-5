import { AuthorizationStatus, NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getUserData = (state: State): UserData | undefined => state[NameSpace.User].userData;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getFavorites = (state: State): Offer[] | undefined => state[NameSpace.User].favoriteOffers;

