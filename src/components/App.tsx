import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Authorization from './Authorization';
import Registration from './Registration';
import Colors from './Colors';
import Objects from './Objects';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeIsLoggedIn = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authorization changeIsLoggedIn={changeIsLoggedIn} />} />
        <Route path="/registration" element={<Registration />} />
        {isLoggedIn && <Route path="/colors" element={<Colors />} />}
        {isLoggedIn && <Route path="/objects" element={<Objects />} />}
      </Routes>
    </div>
  );
}
