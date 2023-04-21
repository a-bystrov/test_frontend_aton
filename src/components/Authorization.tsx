import { Link } from 'react-router-dom';

export default function Authorization() {
  return (
    <form action="" className="authorization">
      <h1>Авторизация</h1>
      <input type="email" placeholder="Электронный адрес" />
      <input type="password" placeholder="Пароль" />
      <button type="submit" className="login">Вход</button>
      <Link to="/registration">
        <button type="button" className="registration">Регистрация</button>
      </Link>
    </form>
  );
}
