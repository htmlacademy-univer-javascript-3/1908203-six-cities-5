import { Offer } from '../domain/models/offer';
import { OfferType } from '../domain/models/offer-type';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: OfferType.Apartment,
    price: 120,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.864716,
        longitude: 2.349014,
        zoom: 10,
      }
    },
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 1,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.5,
    previewImage: 'img/apartment-01.jpg',
    bedrooms: 2,
    maxAdults: 2,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: OfferType.Room,
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 10,
      }
    },
    location: {
      latitude: 52.377956,
      longitude: 4.897070,
      zoom: 1,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.8,
    previewImage: 'img/room.jpg',
    bedrooms: 5,
    maxAdults: 5,
    goods: [
      'Wi-Fi',
      'Washing machine',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: OfferType.Apartment,
    price: 132,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.551086,
        longitude: 53.551086,
        zoom: 10,
      }
    },
    location: {
      latitude: 53.551086,
      longitude: 53.551086,
      zoom: 1,
    },
    isFavorite: true,
    isPremium: false,
    rating: 2,
    previewImage: 'img/apartment-02.jpg',
    bedrooms: 3,
    maxAdults: 3,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: OfferType.Apartment,
    price: 180,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 10,
      }
    },
    location: {
      latitude: 52.377956,
      longitude: 4.897070,
      zoom: 1,
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.3,
    previewImage: 'img/apartment-03.jpg',
    bedrooms: 4,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: OfferType.Apartment,
    price: 180,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.935173,
        longitude: 6.953101,
        zoom: 10,
      }
    },
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 1,
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.3,
    previewImage: 'img/apartment-03.jpg',
    bedrooms: 4,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: OfferType.Apartment,
    price: 132,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.233334,
        longitude: 6.783333,
        zoom: 10,
      }
    },
    location: {
      latitude: 51.233334,
      longitude: 6.783333,
      zoom: 1,
    },
    isFavorite: true,
    isPremium: false,
    rating: 2,
    previewImage: 'img/apartment-02.jpg',
    bedrooms: 3,
    maxAdults: 3,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: OfferType.Apartment,
    price: 120,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.85045,
        longitude: 4.34878,
        zoom: 10,
      }
    },
    location: {
      latitude: 50.85045,
      longitude: 4.34878,
      zoom: 1,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.5,
    previewImage: 'img/apartment-01.jpg',
    bedrooms: 2,
    maxAdults: 2,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
];
