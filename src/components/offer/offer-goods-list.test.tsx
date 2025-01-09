import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import { OfferGoodsList } from './offer-goods-list';

describe('OfferGoodsList Component', () => {
  it('should render goods', () => {
    const mockOffer = makeFakeOffer();

    render(
      <OfferGoodsList
        goods={mockOffer.goods}
      />
    );

    mockOffer.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should render empty list without goods', () => {
    render(
      <OfferGoodsList
        goods={[]}
      />
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
