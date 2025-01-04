import { LoginForm } from '../../components/login/login-form';
import { toast } from 'react-toastify';
import { AuthData } from '../../types/auth-data';

export type LoginPageProps = {
  cities: string[];
  onNavigateToCity: (city: string) => void;
  onLoginClick: (data: AuthData) => void;
}

export function LoginPage({ cities, onNavigateToCity, onLoginClick }: LoginPageProps) {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  const handleNavigateToCity = () => onNavigateToCity(randomCity);

  const handleLoginRequired = () => toast.warn('The email must be filled.');
  const handleInvalidPassword = () => toast.warn('The password must contain at least one letter and one digit.');

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm
            onFormSubmit={onLoginClick}
            onInvalidPassword={handleInvalidPassword}
            onLoginRequired={handleLoginRequired}
          />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a onClick={handleNavigateToCity} className="locations__item-link">
              <span>{randomCity}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
