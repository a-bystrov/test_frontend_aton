import { Routes, Route } from 'react-router-dom';
import Authorization from './Authorization';
import Registration from './Registration';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}
