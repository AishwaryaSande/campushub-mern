import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">◆</span> CampusHub
        </Link>

        <nav className="main-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/items">Browse Items</NavLink>
          <NavLink to="/report">Report an Item</NavLink>
          {isAuthed && <NavLink to="/my-items">My Items</NavLink>}
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="auth-area">
          {isAuthed ? (
            <>
              <span className="welcome">Hi, {user?.name?.split(' ')[0]}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Log in</Link>
              <Link to="/register" className="btn btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
