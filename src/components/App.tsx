import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Authorization from './Authorization';
import Registration from './Registration';
import Colors from './Colors';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authorization changeIsLoggedIn={changeIsLoggedIn} />} />
        <Route path="/registration" element={<Registration />} />
        {isLoggedIn && <Route path="/colors" element={<Colors />} />}
      </Routes>
    </div>
  );
}
