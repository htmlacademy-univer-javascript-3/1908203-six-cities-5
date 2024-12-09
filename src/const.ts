export enum APIRoute {
  Offers = '/offers',
  OfferDetails = '/offers/:id',
  OfferReviews = '/comments/:id',
  OffersNearby = '/offers/:id/nearby',
  Favorite = '/favorite',
  ChangeFavoriteStatus = '/favorite/:id/:status',
  Login = '/login',
  Logout = '/logout'
}

export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ReviewCommentMaxLength = 300;
export const ReviewCommentMinLength = 50;
export const MinRating = 1;
