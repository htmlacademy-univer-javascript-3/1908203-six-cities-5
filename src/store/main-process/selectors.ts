import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { SortType } from '../../types/sort-type';
import { State } from '../../types/state';

export const getSelectedCity = (state: State): string => state[NameSpace.Main].selectedCity;
export const getSelectedSortType = (state: State): SortType => state[NameSpace.Main].selectedSortType;
export const getCities = (state: State): string[] => state[NameSpace.Main].cities;
export const getOffers = (state: State): Offer[] => state[NameSpace.Main].offers;
export const getIsOffersLoading = (state: State): boolean => state[NameSpace.Main].isOffersLoading;

