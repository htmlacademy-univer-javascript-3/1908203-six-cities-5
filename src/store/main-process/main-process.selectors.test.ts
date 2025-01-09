import { NameSpace } from '../../const';
import { SortType } from '../../types/sort-type';
import { makeFakeCities, makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { getCities, getError, getIsOffersLoading, getOffers, getSelectedCity, getSelectedSortType } from './selectors';

describe('OfferProcess selectors', () => {
  const fakeOffers = [
    makeFakeOffer(),
    makeFakeOffer(),
    makeFakeOffer(),
  ];

  const fakeCities = makeFakeCities();
  const fakeCity = fakeCities[Math.floor(Math.random() * fakeCities.length)];

  const state = makeFakeStore({
    [NameSpace.Main]: {
      offers: fakeOffers,
      cities: fakeCities,
      selectedCity: fakeCity,
      selectedSortType: SortType.Popular,
      isOffersLoading: false,
    }
  });

  it('should return selected city from state', () => {
    const { selectedCity } = state[NameSpace.Main];
    const result = getSelectedCity(state);
    expect(result).toBe(selectedCity);
  });

  it('should return selected sort type from state', () => {
    const { selectedSortType } = state[NameSpace.Main];
    const result = getSelectedSortType(state);
    expect(result).toBe(selectedSortType);
  });

  it('should return cities from state', () => {
    const { cities } = state[NameSpace.Main];
    const result = getCities(state);
    expect(result).toBe(cities);
  });

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Main];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return offers loading status from state', () => {
    const { isOffersLoading } = state[NameSpace.Main];
    const result = getIsOffersLoading(state);
    expect(result).toBe(isOffersLoading);
  });

  it('should return error from state', () => {
    const { error } = state[NameSpace.Main];
    const result = getError(state);
    expect(result).toBe(error);
  });
});
