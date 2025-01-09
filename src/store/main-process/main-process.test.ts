import { SortType } from '../../types/sort-type';
import { MainState } from '../../types/state';
import { mainProcess, selectCity, selectSorting } from './main-process';

describe('MainProcess Slice', () => {
  const initialState: MainState = {
    selectedCity: 'Paris',
    selectedSortType: SortType.Popular,
    offers: [],
    cities: [],
    isOffersLoading: false,
  };

  it('should not change state after empty action', () => {
    const emptyAction = { type: '' };
    const result = mainProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change city after "selectCity" action', () => {
    const newCity = 'Amsterdam';
    const expectedState = { ...initialState, selectedCity: newCity };

    const result = mainProcess.reducer(initialState, selectCity(newCity));

    expect(result).toEqual(expectedState);
  });

  it('should change sort type after "selectSorting" action', () => {
    const newSortOption = SortType.PriceHighToLow;
    const expectedState = { ...initialState, selectedSortType: newSortOption };

    const result = mainProcess.reducer(initialState, selectSorting(newSortOption));

    expect(result).toEqual(expectedState);
  });
});
