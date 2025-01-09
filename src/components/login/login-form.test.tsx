import { render, screen } from '@testing-library/react';
import { LoginForm } from './login-form';

describe('LoginForm Component', () => {
  it('should render login form', () => {
    render(
      <LoginForm
        onFormSubmit={() => { }}
        onInvalidPassword={() => { }}
        onLoginRequired={() => { }}
      />
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
