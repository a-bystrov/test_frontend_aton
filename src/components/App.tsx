import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactSession } from 'react-client-session';
import Authorization from './Authorization';
import Registration from './Registration';
import Colors from './Colors';
import Objects from './Objects';
import Alert from './Alert';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusResponse, setStatusResponse] = useState(0);

  ReactSession.setStoreType('sessionStorage');
  const changeIsLoggedIn = () => {
    ReactSession.set('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (ReactSession.get('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

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

      <Routes>
        <Route path="/" element={<Authorization changeIsLoggedIn={changeIsLoggedIn} setStatus={setStatusFromChild} />} />
        <Route path="/registration" element={<Registration setStatus={setStatusFromChild} />} />
        {isLoggedIn && <Route path="/colors" element={<Colors setStatus={setStatusFromChild} />} />}
        {isLoggedIn && <Route path="/objects" element={<Objects />} />}
      </Routes>
    </div>
  );
}
