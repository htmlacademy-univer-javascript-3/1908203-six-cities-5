import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppNavBar } from '../app-navbar/app-navbar';
import { UserData } from '../../types/user-data';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { AppRoute } from '../../const';


export function AppLayout() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = path !== AppRoute.Main.toString();
  const isFavoritePage = path === AppRoute.Favorites.toString();
  const isNotLoginPage = path !== AppRoute.Login.toString();

  const userData = useSelector<AppState, UserData | undefined>((state) => state.userData);

  const pageClassLambda = (route: string) => {
    if (route === AppRoute.Main.toString()) {
      return 'page page--gray page--main';
    } else if (route === AppRoute.Login.toString()) {
      return 'page page--gray page--login';
    } else {
      return 'page';
    }
  };

  const pageClass = pageClassLambda(path);

  return (
    <div className={pageClass}>
      <AppNavBar
        isActive={isActive}
        email={userData?.email}
        favoriteCount={100}
        showOptions={isNotLoginPage}
        onSignOutClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Outlet />
      {
        isFavoritePage &&
        <footer className="footer container">
          <Link to={AppRoute.Main} className='footer__logo-link'>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      }
    </div>
  );
}
