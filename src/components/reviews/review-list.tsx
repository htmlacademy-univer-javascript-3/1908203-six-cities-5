import { Review } from '../../types/review';
import { MemoizedReviewItem } from './review-item';

export type ReviewListProps = {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {
        reviews
          .map((review) => (
            <MemoizedReviewItem
              key={review.id}
              review={review}
            />)
          )
      }
    </ul>
  );
}

