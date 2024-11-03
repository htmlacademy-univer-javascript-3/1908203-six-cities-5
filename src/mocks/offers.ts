import { Offer } from '../domain/models/offer';
import { OfferType } from '../domain/models/offer-type';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: OfferType.Apartment,
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 1,
      }
    },
    location: {
      latitude: 1,
      longitude: 1,
      zoom: 1,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.5,
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: OfferType.Room,
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 1,
      }
    },
    location: {
      latitude: 1,
      longitude: 1,
      zoom: 1,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.8,
    previewImage: 'img/room.jpg',
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: OfferType.Apartment,
    price: 132,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 1,
      }
    },
    location: {
      latitude: 1,
      longitude: 1,
      zoom: 1,
    },
    isFavorite: false,
    isPremium: false,
    rating: 2,
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: OfferType.Apartment,
    price: 180,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 1,
      }
    },
    location: {
      latitude: 1,
      longitude: 1,
      zoom: 1,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.3,
    previewImage: 'img/apartment-03.jpg',
  },
];
