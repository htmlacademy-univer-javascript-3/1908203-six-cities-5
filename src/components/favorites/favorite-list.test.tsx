import { renderWithProvider } from '../../utils/mock-component';
import { screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import { FavoriteList } from './favorite-list';

describe('FavoriteList Component', () => {
  it('should render favorite list', () => {
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    renderWithProvider(
      <FavoriteList
        offers={offers}
        onFavoriteStatusChanged={() => { }}
      />
    );

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should render empty favorite list', () => {
    renderWithProvider(
      <FavoriteList
        offers={[]}
        onFavoriteStatusChanged={() => { }}
      />
    );

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
