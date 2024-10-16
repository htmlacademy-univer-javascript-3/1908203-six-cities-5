import { FavoritesPage } from './screens/favorites/favorites-page';
import { LoginPage } from './screens/login/login-page';
import { MainPage } from './screens/main/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './screens/not-found/not-found';
import { OfferPage } from './screens/offer/offer-page';
import { PrivateRoute } from '../routing/private-route';
import { AppRoutes } from '../routing/app-routes';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.login} element={<LoginPage />} />
        <Route path={AppRoutes.main} element={<MainPage />} />
        <Route path={AppRoutes.offer} element={<OfferPage />} />
        <Route path={AppRoutes.favorites}
          element={
            <PrivateRoute isAuthenticated={false}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
