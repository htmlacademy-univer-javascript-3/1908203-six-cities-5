import { Offer } from '../../domain/models/offer';
import { OfferItem } from './offer-item';

export type OfferListProps = {
  offers: Offer[];
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

export function OfferList({ offers, onMouseEnter, onMouseLeave }: OfferListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers
          .map((offer) => (
            <OfferItem
              key={offer.id}
              offer={offer}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />)
          )
      }
    </div>
  );
}
