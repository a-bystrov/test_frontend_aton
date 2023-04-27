import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactSession } from 'react-client-session';
import Header from './Header';
import Authorization from './Authorization';
import Registration from './Registration';
import Colors from './Colors';
import Objects from './Objects';
import Alert from './Alert';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusResponse, setStatusResponse] = useState(0);

  ReactSession.setStoreType('sessionStorage');

  // Вход в аккаунт
  const logIn = () => {
    ReactSession.set('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  // Выход из аккаунта
  const logOut = () => {
    ReactSession.set('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (ReactSession.get('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Изменение состояния статуса ответа на запросы
  const setStatusFromChild = (status: number) => {
    setStatusResponse(status);
    setTimeout(() => {
      setStatusResponse(0);
    }, 5000);
  };

  return (
    <div className="App">
      {statusResponse
        ? <Alert handlerClick={() => setStatusResponse(0)} status={statusResponse} />
        : <p />}
      {isLoggedIn
       && <Header logOut={logOut} />}

      <Routes>
        <Route path="/" element={<Authorization logIn={logIn} setStatus={setStatusFromChild} />} />
        <Route path="/registration" element={<Registration setStatus={setStatusFromChild} />} />
        {isLoggedIn && <Route path="/colors" element={<Colors setStatus={setStatusFromChild} />} />}
        {isLoggedIn && <Route path="/objects" element={<Objects />} />}
      </Routes>
    </div>
  );
}
