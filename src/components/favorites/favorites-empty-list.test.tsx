import { render, screen } from '@testing-library/react';
import { FavoritesEmptyList } from './favorites-empty-list';

describe('FavoritesEmptyList Component', () => {
  it('should render favorites placeholder', () => {
    render(
      <FavoritesEmptyList />
    );

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
