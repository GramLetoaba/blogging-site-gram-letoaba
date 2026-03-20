import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authcontext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="nav-bar">
      <Link to="/">📝 Blog</Link>

      <div>
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <Link to="/create">New Post</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
