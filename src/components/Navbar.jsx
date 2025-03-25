import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, logout, cart } = useAppContext();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span>Shrek</span>X
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to= "/browse" className="navbar-item">Browse</Link>
        <Link to="/" className="navbar-item">New Releases</Link>
        <Link to="/" className="navbar-item">Top Brands</Link>
      </div>
      <div className="navbar-end">
        <Link to="/cart" className="navbar-item cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </Link>
        {user ? (
          <div className="user-menu">
            <span>{user.username}</span>
            <button onClick={logout} className="logout-button">Logout</button>
            {user.role === 'admin' && (
              <Link to="/admin" className="navbar-item admin-link">Admin</Link>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 