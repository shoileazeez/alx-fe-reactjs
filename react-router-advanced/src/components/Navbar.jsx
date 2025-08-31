import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">React Router Advanced</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog/react-router-tutorial">Sample Blog Post</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <span className="user-greeting">Hello, {user?.name}!</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar