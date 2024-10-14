import { FavoritesPage } from './screens/favorites/favorites-page';
import { LoginPage } from './screens/login/login-page';
import { MainPage } from './screens/main/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './screens/not_found/not-found';
import { OfferPage } from './screens/offer/offer-page';
import { PrivateRoute } from '../routing/private-route';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/offer/:id' element={<OfferPage />} />
        <Route path='/favorites'
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
