import { OfferType } from '../../../domain/models/offer-type';
import { OfferList } from './components/offer-list';

export function MainPage() {

  const offers = [
    {
      bookmarked: false,
      premium: true,
      price: 120,
      title: 'Beautiful & luxurious apartment at great location',
      stars: 4,
      type: OfferType.Apartment,
      imageLink: 'img/apartment-01.jpg',
    },
    {
      bookmarked: true,
      premium: false,
      price: 80,
      title: 'Wood and stone place',
      stars: 4,
      type: OfferType.Room,
      imageLink: 'img/room.jpg',
    },
    {
      bookmarked: false,
      premium: false,
      price: 132,
      title: 'Canal View Prinsengracht',
      stars: 4,
      type: OfferType.Apartment,
      imageLink: 'img/apartment-02.jpg',
    },
    {
      bookmarked: false,
      premium: true,
      price: 180,
      title: 'Nice, cozy, warm big bed apartment',
      stars: 5,
      type: OfferType.Apartment,
      imageLink: 'img/apartment-03.jpg',
    },
    {
      bookmarked: true,
      premium: false,
      price: 80,
      title: 'Wood and stone place',
      stars: 4,
      type: OfferType.Room,
      imageLink: 'img/room.jpg'
    }
  ];

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>

        <OfferList offers={offers} />
      </main>
    </div >
  );
}
