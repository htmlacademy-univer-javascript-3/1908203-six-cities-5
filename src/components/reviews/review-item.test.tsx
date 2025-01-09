import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import { MemoizedReviewItem } from './review-item';

describe('ReviewItem Component', () => {
  it('should render review item', () => {
    const review = makeFakeReview();

    render(
      <MemoizedReviewItem review={review} />
    );

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
