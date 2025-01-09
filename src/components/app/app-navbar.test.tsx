import { renderWithProvider } from '../../utils/mock-component';
import { screen } from '@testing-library/react';
import { AppNavBar } from './app-navbar';
import { makeFakeUserData } from '../../utils/mocks';

describe('AppNavBar Component', () => {
  it('should render app navbar with options', () => {
    const user = makeFakeUserData();
    const favoriteCount = 100;

    renderWithProvider(
      <AppNavBar
        email={user.email}
        onSignOutClick={() => { }}
        favoriteCount={favoriteCount}
        isActive
        showOptions
      />
    );

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(favoriteCount)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should render app navbar without options', () => {

    renderWithProvider(
      <AppNavBar
        onSignOutClick={() => { }}
        showOptions
        isActive
      />
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});
