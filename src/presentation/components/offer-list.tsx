import { useState } from 'react';
import { Offer } from '../../domain/models/offer';
import { OfferItem } from './offer-item';

export type OfferListProps = {
  offers: Offer[];
}

export function OfferList({ offers }: OfferListProps) {
  const [activeOfferId, setActiveOfferId] = useState('');

  function onMouseEnter(id: string) {
    setActiveOfferId(id);
  }

  function onMouseLeave(id: string) {
    if (activeOfferId === id){
      setActiveOfferId('');
    }
  }

  return (
    <div>
      {
        offers.map((offer) =>
          (
            <OfferItem
              key={offer.title}
              offer={offer}
              onMouseLeave={onMouseLeave}
              onMouseEnter={onMouseEnter}
            />
          )
        )
      }
    </div>
  );
}
