import { FavoritePageContent } from './favorite-page-content';
import { renderWithProvider } from '../../utils/mock-component';
import { screen } from '@testing-library/react';

describe('FavoritePageContent Component', () => {
  it('should render favorite page content', () => {
    renderWithProvider(
      <FavoritePageContent
        offers={[]}
        onFavoriteStatusChanged={() => { }}
      />
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
