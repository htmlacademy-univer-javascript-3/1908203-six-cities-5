import { renderWithProvider } from '../../utils/mock-component';
import { screen } from '@testing-library/react';
import { MemoizedFavoriteCard } from './favorite-card';
import { makeFakeOffer } from '../../utils/mocks';

describe('FavoriteCard Component', () => {
  it('should render favorite card', () => {
    const offer = makeFakeOffer();

    renderWithProvider(
      <MemoizedFavoriteCard
        offer={offer}
        onFavoriteStatusChanged={() => { }}
      />
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
