import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import { ReviewList } from './review-list';

describe('ReviewList Component', () => {
  it('should render review list', () => {
    const reviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];

    render(
      <ReviewList
        reviews={reviews}
      />
    );

    reviews.forEach((item) => {
      expect(screen.getByText(item.comment)).toBeInTheDocument();
      expect(screen.getByText(item.user.name)).toBeInTheDocument();
    });
  });

  it('should render empty review list', () => {
    render(
      <ReviewList
        reviews={[]}
      />
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
