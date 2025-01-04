import { LoginForm } from '../../components/login/login-form';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';

export function LoginPage() {

  const dispatch = useAppDispatch();

  const handleLogin = (data: AuthData) => {
    dispatch(loginAction(data));
  };

  const handleRequiredEmail = () => toast.warn('The email must be filled.');
  const handleInvalidPassword = () => toast.warn('The password must contain at least one letter and one digit.');

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm
            onFormSubmit={handleLogin}
            onInvalidPassword={handleInvalidPassword}
            onEmailRequired={handleRequiredEmail}
          />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
