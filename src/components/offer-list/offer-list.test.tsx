import { screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import { OfferList } from './offer-list';
import { renderWithProvider } from '../../utils/mock-component';

describe('OfferList Component', () => {
  it('should render offers', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    renderWithProvider(
      <OfferList
        offers={mockOffers}
        className={''}
        onFavoriteStatusChanged={() => { }}
      />
    );

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should render empty list without offers', () => {
    renderWithProvider(
      <OfferList
        offers={[]}
        className={''}
        onFavoriteStatusChanged={() => { }}
      />
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
