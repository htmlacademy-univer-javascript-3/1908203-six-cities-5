import { Offer } from '../../domain/models/offer';
import { Link } from 'react-router-dom';


export type OfferItemProps = {
  offer: Offer;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

export function OfferItem({ offer, onMouseEnter, onMouseLeave }: OfferItemProps) {
  const bookmarkedClassName = offer.isFavorite && 'place-card__bookmark-button--active';

  return (
    <Link to={`/offer/${offer.id}`} >
      <article
        className="cities__card place-card"
        onMouseEnter={() => onMouseEnter(offer.id)}
        onMouseLeave={() => onMouseLeave(offer.id)}
      >
        {
          offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button ${bookmarkedClassName} button`}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${Math.floor(offer.rating) * 20}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">

            {offer.title}
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    </Link>
  );
}
