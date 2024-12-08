import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { FavoriteList } from './components/favorite-list';
import { AppRoute } from '../../const';
import { AppState } from '../../store/reducer';
import { useSelector } from 'react-redux';

export function FavoritesPage() {
  const offers = useSelector<AppState, Offer[]>((state) => state.offers);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link to={AppRoute.Main} className="locations__item-link">
                    <span>Amsterdam</span>
                  </Link>
                </div>
              </div>
              <FavoriteList
                offers={offers.filter((offer) => offer.isFavorite)}
              />
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
