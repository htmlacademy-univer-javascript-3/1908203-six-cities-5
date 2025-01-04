import { useState } from 'react';
import { OfferList } from '../../components/offer-list/offer-list';
import { Map } from '../../components/map/map';
import { CityHeader } from '../../components/main-content/city-header';
import { SortOptions } from '../../components/main-content/sort-options';
import { LoadingScreen } from '../../components/loading/loading-screen';
import { SortType } from '../../types/sort-type';
import { Offer } from '../../types/offer';
import { FavoriteAction } from '../../types/favorite-action';
import { selectCity, selectSorting } from '../../store/main-process/main-process';
import { getSelectedCity, getSelectedSortType } from '../../store/main-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';

export type MainPageProps = {
  offers: Offer[];
  cities: string[];
  isOffersLoading: boolean;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
};

export function MainPage({ offers, cities, isOffersLoading, onFavoriteStatusChanged }: MainPageProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  function handleMouseEnter(id: string) {
    setActiveOfferId(id);
  }

  function handleMouseLeave(id: string) {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }

  const choosenCity = useAppSelector(getSelectedCity);
  const choosenSortType = useAppSelector(getSelectedSortType);

  const dispatch = useAppDispatch();

  if (isOffersLoading) {
    return (<LoadingScreen />);
  }

  const activeOffers = offers
    .filter((offer) => offer.city.name === choosenCity)
    .sort(
      (left, right) => {
        if (choosenSortType === SortType.PriceHighToLow) {
          return right.price - left.price;
        } else if (choosenSortType === SortType.PriceLowToHigh) {
          return left.price - right.price;
        } else if (choosenSortType === SortType.TopRatedFirst) {
          return right.rating - left.rating;
        }

        return 0;
      }
    );

  const isEmpty = activeOffers.length <= 0;

  const handleCityChoose = (city: string) => {
    dispatch(selectCity(city));
  };

  const handleSortingChoose = (sortType: SortType) => {
    dispatch(selectSorting(sortType));
  };

  return (
    <main className={`page__main page__main--index ${isEmpty && 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <CityHeader
        city={choosenCity}
        cities={cities}
        onCityClicked={handleCityChoose}
      />
      <div className="cities">
        {
          !isEmpty ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{activeOffers.length} places to stay in {choosenCity}</b>
                <SortOptions
                  sortType={choosenSortType}
                  onSortingChoose={handleSortingChoose}
                />
                <OfferList
                  offers={activeOffers}
                  className={'cities__places-list places__list tabs__content'}
                  onFavoriteStatusChanged={onFavoriteStatusChanged}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </section>
              {
                !isEmpty &&
                <div className="cities__right-section">
                  <Map
                    city={activeOffers[0].city}
                    offers={activeOffers}
                    activeOfferId={activeOfferId}
                    className="cities__map map"
                  />
                </div>
              }
            </div> :
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {choosenCity}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
        }
      </div>
    </main>
  );
}
