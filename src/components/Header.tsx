import { Link, useNavigate } from 'react-router-dom';

export default function Header({ logOut }: { logOut: () => void }) {
  const navigate = useNavigate();

  function logOutAndRedirect() {
    logOut();
    navigate('/');
  }

  return (
    <header>
      <div className="navigationItems">
        <Link to="/colors">
          <p>Цвета</p>
        </Link>
        <Link to="/objects">
          <p>Объекты</p>
        </Link>
      </div>
      <button type="button" className="logOut" onClick={logOutAndRedirect}>Выйти</button>
    </header>
  );
}
