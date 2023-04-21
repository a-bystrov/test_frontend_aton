import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Authorization() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
  }

  function handlerLogIn() {
    const requestObj = {
      email,
      password,
    };

    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestObj),
    }).then((response) => {
      if (response.ok) {
        navigate('/');
        setEmail('');
        setPassword('');
        alert('Вы успешно авторизовались!');
      } else {
        alert('Неверные данные!');
      }
    });
  }

  return (
    <form action="" className="authorization">
      <h1>Авторизация</h1>
      <input type="email" placeholder="Электронный адрес" name="email" onChange={handlerChangeInput} />
      <input type="password" placeholder="Пароль" name="password" onChange={handlerChangeInput} />
      <button type="button" className="logIn" onClick={handlerLogIn}>Вход</button>
      <Link to="/registration">
        <button type="button" className="registration">Регистрация</button>
      </Link>
    </form>
  );
}
