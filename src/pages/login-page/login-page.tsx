import { LoginForm } from '../../components/login/login-form';
import { toast } from 'react-toastify';
import { AuthData } from '../../types/auth-data';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export type LoginPageProps = {
  cities: string[];
  onSelectCity: (city: string) => void;
  onLoginClick: (data: AuthData) => void;
}

export function LoginPage({ cities, onSelectCity: onNavigateToCity, onLoginClick }: LoginPageProps) {
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
            <Link
              to={AppRoute.Main}
              onClick={handleNavigateToCity}
              className="locations__item-link"
            >
              <span>{randomCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
