import { Review } from '../domain/models/review';

export const reviews: Review[] = [
  {
    id: 1,
    content: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    timestamp: new Date(2019, 3),
    rating: 4,
  },
  {
    id: 2,
    content: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    timestamp: new Date(2018, 5),
    rating: 3,
  }
];
