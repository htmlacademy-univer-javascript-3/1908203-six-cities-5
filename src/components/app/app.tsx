import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainPage } from '../../pages/main-page/main-page';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { PrivateRoute } from '../private-route/private-route';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { LoadingScreen } from '../loading/loading-screen';
import { AppLayout } from './app-layout';
import { Route, Routes } from 'react-router-dom';
import { changeFavoriteStatusAction, logoutAction } from '../../store/api-actions';
import { FavoriteAction } from '../../types/favorite-action';
import { GuestRoute } from '../guest-route/guest-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsOffersLoading, getOffers } from '../../store/main-process/selectors';
import { getAuthorizationStatus, getFavorites, getUserData } from '../../store/user-process/selectors';
import { useCallback } from 'react';
import { redirectToRoute } from '../../store/action';

export function App() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const authorized = authorizationStatus === AuthorizationStatus.Auth;
  const isGuest = authorizationStatus === AuthorizationStatus.NoAuth;
  const userData = useAppSelector(getUserData);
  const offers = useAppSelector(getOffers);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const favorites = useAppSelector(getFavorites);

  const dispatch = useAppDispatch();

  const handleSignOutClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch],);

  const handleFavoriteClick = useCallback((action: FavoriteAction) => {
    if (authorized) {
      dispatch(changeFavoriteStatusAction(action));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  }, [authorized, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (<LoadingScreen />);
  }

  return (
    <Routes>
      <Route element={
        <AppLayout
          email={userData?.email}
          favoriteCount={favorites?.length}
          onSignOutClick={handleSignOutClick}
        />
      }
      >
        <Route path={AppRoute.Login}
          element={
            <GuestRoute isGuest={isGuest}>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route path={AppRoute.Main}
          element={
            <MainPage
              offers={offers}
              isOffersLoading={isOffersLoading}
              onFavoriteStatusChanged={handleFavoriteClick}
            />
          }
        />
        <Route path={AppRoute.Offer} element={
          <OfferPage
            onFavoriteStatusChanged={handleFavoriteClick}
            canWriteComments={authorized}
          />
        }
        />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute isAuthenticated={authorized}>
              <FavoritesPage
                offers={favorites}
                onFavoriteStatusChanged={handleFavoriteClick}
              />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
