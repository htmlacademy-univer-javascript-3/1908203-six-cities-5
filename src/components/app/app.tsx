import { FavoritesPage } from '../../pages/favorites/favorites-page';
import { LoginPage } from '../../pages/login/login-page';
import { MainPage } from '../../pages/main/main-page';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { OfferPage } from '../../pages/offer/offer-page';
import { PrivateRoute } from '../private-route/private-route';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { LoadingScreen } from '../../pages/main/components/loading-screen';
import { AppLayout } from '../app-layout/app-layout';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { Route, Routes } from 'react-router-dom';

export function App() {
  const authorizationStatus = useSelector<AppState, AuthorizationStatus>((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (<LoadingScreen />);
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute isAuthenticated={authorizationStatus === AuthorizationStatus.Auth}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}
