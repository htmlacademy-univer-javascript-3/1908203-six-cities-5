import { NotFoundPage } from '../not-found/not-found';
import { Map } from '../../components/map/map';
import { OfferList } from '../../components/offer-list/offer-list';
import { ReviewList } from '../../components/reviews/review-list';
import { addReviewAction, fetchOfferDetailsAction } from '../../store/api-actions';
import { LoadingScreen } from '../../components/loading/loading-screen';
import { OfferGallery } from '../../components/offer/offer-gallery';
import { OfferGoodsList } from '../../components/offer/offer-goods-list';
import { FavoriteAction } from '../../types/favorite-action';
import { ReviewForm } from '../../components/reviews/review-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ReviewAction } from '../../types/review-action';
import { updateComment, updateRating } from '../../store/offer-process/offer-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getComment, getIsReviewFormSending, getIsSelectedOfferLoading, getSelectedOffer, getRating, getReviews, getOffersNearby } from '../../store/offer-process/selectors';

export type OfferPageProps = {
  canWriteComments: boolean;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}

export function OfferPage({ canWriteComments, onFavoriteStatusChanged }: OfferPageProps) {
  const { id } = useParams();

  const reviews = useAppSelector(getReviews);
  const offersNearby = useAppSelector(getOffersNearby);
  const offer = useAppSelector(getSelectedOffer);
  const isOfferLoading = useAppSelector(getIsSelectedOfferLoading);
  const reviewIsSending = useAppSelector(getIsReviewFormSending);
  const comment = useAppSelector(getComment);
  const rating = useAppSelector(getRating);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchOfferDetailsAction(id));
    }
  }, [dispatch, id]);

  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  if (offer === undefined) {
    return <NotFoundPage />;
  }

  const offerTypeString = offer.type.charAt(0).toUpperCase() + offer.type.slice(1);

  const selectedOffersNearby = offersNearby.slice(0, 3);
  const mapOffers = [...offersNearby.slice(0, 3), offer];

  const selectedReviews = reviews.slice(0, 10);

  const handleCommentFormSubmit = (action: ReviewAction) => {
    dispatch(addReviewAction(action));
  };

  const handleCommentChanged = (value: string) => {
    dispatch(updateComment(value));
  };

  const handleRatingChanged = (value: number) => {
    dispatch(updateRating(value));
  };

  const maxAdultString = `Max ${offer.maxAdults} ${offer.maxAdults % 10 === 1 ? 'adult' : 'adults'}`;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={offer.images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <button
                type='button'
                className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`}
                onClick={() => onFavoriteStatusChanged({ offerId: offer.id, status: !offer.isFavorite })}
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offerTypeString}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                {maxAdultString}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <OfferGoodsList goods={offer.goods} />
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{selectedReviews.length}</span></h2>
              <ReviewList reviews={selectedReviews} />
              {canWriteComments &&
                <ReviewForm
                  offerId={offer.id}
                  onFormSubmit={handleCommentFormSubmit}
                  isDisabled={reviewIsSending}
                  comment={comment}
                  rating={rating}
                  onCommentChanged={handleCommentChanged}
                  onRatingChanged={handleRatingChanged}
                />}
            </section>
          </div>
        </div>
        <section className="offer__map map">

          <Map
            city={mapOffers[0].city}
            offers={mapOffers}
            activeOfferId={offer.id}
            className={'offer__map map'}
          />

        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList
            offers={selectedOffersNearby}
            className={'near-places__list places__list'}
            onFavoriteStatusChanged={onFavoriteStatusChanged}
          />
        </section>
      </div>
    </main>
  );
}
