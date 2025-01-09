import { render, screen } from '@testing-library/react';
import { ReviewForm } from './review-form';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';

describe('ReviewForm Component', () => {
  it('should render review form', () => {
    const mockOffer = makeFakeOffer();
    const review = makeFakeReview();

    render(
      <ReviewForm
        offerId={mockOffer.id}
        comment={review.comment}
        rating={review.rating}
        isDisabled={false}
        onCommentChanged={() => { }}
        onRatingChanged={() => { }}
        onFormSubmit={() => { }}
      />
    );

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();
  });
});
