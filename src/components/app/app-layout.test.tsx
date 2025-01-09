import { renderWithProvider } from '../../utils/mock-component';
import { screen } from '@testing-library/react';
import { AppLayout } from './app-layout';

describe('AppLayout Component', () => {
  it('should render app layout', () => {
    renderWithProvider(
      <AppLayout
        onSignOutClick={() => { }}
      />
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
