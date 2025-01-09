import { render, screen } from '@testing-library/react';
import { LoadingScreen } from './loading-screen';

describe('LoadingScreen Component', () => {
  it('should render loading screen', () => {
    render(
      <LoadingScreen />
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
