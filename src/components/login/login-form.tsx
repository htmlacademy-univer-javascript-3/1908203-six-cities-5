import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { AuthData } from '../../types/auth-data';

export type LoginFormProps = {
  onFormSubmit: (data: AuthData) => void;
  onInvalidPassword: () => void;
  onEmailRequired: () => void;
};

export function LoginForm({ onFormSubmit, onInvalidPassword, onEmailRequired }: LoginFormProps) {
  const [authData, setAuthData] = useState<AuthData>({
    login: '',
    password: '',
  });

  function handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
    setAuthData({
      login: event.target.value,
      password: authData.password,
    });
  }

  function handlePasswordChanged(event: ChangeEvent<HTMLInputElement>) {
    setAuthData({
      login: authData.login,
      password: event.target.value,
    });
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (authData.login === '') {
      onEmailRequired();
      return;
    }

    const passwordRegex = /^(?=.*?[0-9])(?=.*?[A-Za-z]).+/;

    if (!passwordRegex.test(authData.password)) {
      onInvalidPassword();
      return;
    }

    onFormSubmit(authData);
  }


  return (
    <form className="login__form form" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input className="login__input form__input" type="email" name="email" placeholder="Email" required={false}
          value={authData.login}
          onChange={handleLoginChange}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input className="login__input form__input" type="password" name="password" placeholder="Password" required={false}
          value={authData.password}
          onChange={handlePasswordChanged}
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}
