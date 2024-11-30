import { useState } from 'react';
import { Offer } from '../../../domain/models/offer';
import { OfferList } from '../../components/offer-list';
import { Map } from './components/map';
import { AppNavBar } from '../../components/app-navbar';
import { CityHeader } from './components/city-header';
import { chooseCity } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { AppState } from '../../store/reducer';

export function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  function onMouseEnter(id: string) {
    setActiveOfferId(id);
  }

  function onMouseLeave(id: string) {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }

  const choosenCity = useSelector<AppState, string>((state) => state.city);
  const offers = useSelector<AppState, Offer[]>((state) => state.offers);

  const choosenOffers = offers.filter((offer) => offer.city.name === choosenCity);

  const dispatch = useDispatch<AppDispatch>();

  const handleCityChoose = (city: string) => {
    dispatch(chooseCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <AppNavBar isActive={false} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityHeader city={choosenCity}
          onCityClicked={handleCityChoose}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{choosenOffers.length} places to stay in {choosenCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList
                offers={choosenOffers}
                className={'cities__places-list places__list tabs__content'}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            </section>

            <div className="cities__right-section">
              <Map
                city={choosenOffers[0].city}
                offers={choosenOffers}
                activeOfferId={activeOfferId}
                className="cities__map map"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
