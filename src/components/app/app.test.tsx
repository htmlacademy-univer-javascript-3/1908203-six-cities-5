import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCities, makeFakeStore } from '../../utils/mocks';
import { App } from './app';
import { SortType } from '../../types/sort-type';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const fakeCities = makeFakeCities();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.Main]: {
        offers: [],
        cities: fakeCities,
        selectedCity: '',
        selectedSortType: SortType.Popular,
        isOffersLoading: false,
      }
    }));

    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    fakeCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should render "LoginPage" when user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigates to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        favoriteOffers: [],
      },
    }));

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigates to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Tap to return home')).toBeInTheDocument();
  });

  it('should render "LoginPage" when guest navigates to favorites route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render "MainPage" when user navigates to login route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeCities = makeFakeCities();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Main]: {
        offers: [],
        cities: fakeCities,
        selectedCity: '',
        selectedSortType: SortType.Popular,
        isOffersLoading: false,
      }
    }));

    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    fakeCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });
});
