import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import { vi } from 'vitest';
import { appStateStore } from '../../store';
import { MemoizedOfferItem } from './offer-item';

describe('OfferItem Component', () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(
      <Provider store={appStateStore}>
        <Router>{ui}</Router>
      </Provider>
    );

  it('should render offer', () => {
    const mockOffer = makeFakeOffer();

    renderWithProvider(
      <MemoizedOfferItem
        offer={mockOffer}
        onFavoriteStatusChanged={() => { }}
        onMouseEnter={() => { }}
        onMouseLeave={() => { }}
      />
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should invoke onMouseEnter/onMouseLeave when an offer is hovered/unhovered', async () => {
    const mockOffer = makeFakeOffer();
    const handleMouseEnter = vi.fn();
    const handleMouseLeave = vi.fn();
    const user = userEvent.setup();

    renderWithProvider(
      <MemoizedOfferItem
        offer={mockOffer}
        onFavoriteStatusChanged={() => { }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );

    const firstOffer = screen.getByText(mockOffer.title);
    await user.hover(firstOffer);

    expect(handleMouseEnter).toHaveBeenCalledWith(mockOffer.id);

    await user.unhover(firstOffer);

    expect(handleMouseLeave).toHaveBeenCalledWith(mockOffer.id);
  });

  it('should invoke onFavoriteStatusChanged when clicked', async () => {
    const mockOffer = makeFakeOffer();
    const handleFavoriteStatusChanged = vi.fn();
    const user = userEvent.setup();

    renderWithProvider(
      <MemoizedOfferItem
        onFavoriteStatusChanged={handleFavoriteStatusChanged}
        offer={mockOffer}
        onMouseEnter={() => { }}
        onMouseLeave={() => { }}
      />
    );

    const firstOffer = screen.getByText('To bookmarks');
    await user.click(firstOffer);

    expect(handleFavoriteStatusChanged).toHaveBeenCalledWith({
      offerId: mockOffer.id,
      status: !mockOffer.isFavorite,
    });
  });
});
