import { OfferType } from './offer-type';

export type Offer = {
  title: string;
  price: number;
  stars: number;
  type: OfferType;
  bookmarked: boolean;
  premium: boolean;
  imageLink: string;
}
