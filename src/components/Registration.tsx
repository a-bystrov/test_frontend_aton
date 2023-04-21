import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlerChangeInput(event: React.FormEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value as string;
    switch (target.name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
    console.log(email, password);
  }

  function handlerRegister() {
    const requestObj = {
      email,
      password,
    };

    fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestObj),
    }).then((response) => response.json()).then((result) => console.log(result));
  }

  return (
    <form action="" className="registration">
      <h1>Регистрация</h1>
      <input type="email" placeholder="Электронный адрес" name="email" onChange={handlerChangeInput} />
      <input type="password" placeholder="Пароль" name="password" onChange={handlerChangeInput} />
      <button type="button" className="register" onClick={() => handlerRegister()}>Зарегистрироваться</button>
      <Link to="/authorization">
        <button type="button" className="authorization">Авторизация</button>
      </Link>
    </form>
  );
}
