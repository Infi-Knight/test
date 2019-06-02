import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../history';
import AuthContext from '../Auth';
import styles from './Header.module.css';

const Header = props => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const _handleLogout = () => {
    setAuthenticated('');
    history.push({ pathname: '/', state: { from: history.location } });
  };

  return (
    <header className={styles.Header}>
      <div className={styles.HeaderGroup}>
        <div className={styles.HeaderRow}>
          <NavLink className={styles.Brand} to="/">
            TEST
          </NavLink>
          {!authenticated ? (
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          ) : (
            <button onClick={_handleLogout}>Logout</button>
          )}
        </div>
        <div className={styles.HeaderRow}>
          <NavLink to="/create">
            <button>Write a review</button>
          </NavLink>
          <NavLink to="/dashboard">
            <button>Dashboard</button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
