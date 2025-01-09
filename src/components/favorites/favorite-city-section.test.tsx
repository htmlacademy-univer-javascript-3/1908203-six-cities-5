import { renderWithProvider } from '../../utils/mock-component';
import { screen } from '@testing-library/react';
import { FavoriteCitySection } from './favorite-city-section';
import { makeFakeOffer } from '../../utils/mocks';

describe('FavoriteCitySection Component', () => {
  it('should render favorite city section', () => {
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    const city = offers[0].city;

    renderWithProvider(
      <FavoriteCitySection
        offers={offers}
        city={city.name}
        onFavoriteStatusChanged={() => { }}
      />
    );

    expect(screen.getByText(city.name)).toBeInTheDocument();

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
