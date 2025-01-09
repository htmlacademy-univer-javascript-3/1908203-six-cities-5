import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import { OfferGallery } from './offer-gallery';

describe('OfferGallery Component', () => {
  it('should render offer gallery', () => {
    const mockOffer = makeFakeOffer();

    render(
      <OfferGallery
        images={mockOffer.images}
      />
    );

    const images = screen.getAllByRole('img');
    const actualLength = images.length;
    const expectedLength = mockOffer.images.length;

    expect(actualLength).toBe(expectedLength);
  });

  it('should render empty list without images', () => {
    render(
      <OfferGallery
        images={[]}
      />
    );

    expect(screen.queryByRole('image')).not.toBeInTheDocument();
  });
});
