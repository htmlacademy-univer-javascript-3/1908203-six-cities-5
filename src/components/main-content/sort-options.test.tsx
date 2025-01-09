import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../utils/mock-component';
import { SortOptions } from './sort-options';
import { SortType } from '../../types/sort-type';

describe('SortOptions Component', () => {
  it('should render sort options', () => {
    const sortTypes = Object.values(SortType);
    const sortType = sortTypes[Math.floor(Math.random() * sortTypes.length)];

    renderWithProvider(
      <SortOptions
        sortType={sortType}
        onSortingChoose={() => { }}
      />
    );

    sortTypes.forEach((value) => {
      if (value !== sortType) {
        expect(screen.getByText(value)).toBeInTheDocument();
      } else {
        expect(screen.getAllByText(value).length).toBe(2);
      }
    });
  });
});
