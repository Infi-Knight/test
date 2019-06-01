import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { Button } from 'baseui/button';
import history from '../../history';
import AuthContext from '../Auth';
import HeaderStyles from './Header.module.css';

const Header = props => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const _handleLogout = () => {
    setAuthenticated('');
    history.push({ pathname: '/', state: { from: history.location } });
  };

  return (
    <header>
      <HeaderNavigation className={HeaderStyles.HeaderContainer}>
        <NavigationList align={ALIGN.left}>
          <NavigationItem>
            <NavLink className={HeaderStyles.Brand} to="/">
              TEST
            </NavLink>
          </NavigationItem>
        </NavigationList>

        <NavigationList align={ALIGN.right}>
          <NavigationItem>
            {!authenticated ? (
              <NavLink to="/login">
                <Button className={HeaderStyles.Button}>Login</Button>
              </NavLink>
            ) : (
              <Button onClick={_handleLogout} className={HeaderStyles.Button}>
                Logout
              </Button>
            )}
          </NavigationItem>

          <NavigationItem>
            <NavLink to="/create">
              <Button className={HeaderStyles.Button}>Write a review</Button>
            </NavLink>
          </NavigationItem>

          <NavigationItem>
            <NavLink to="/dashboard">
              <Button className={HeaderStyles.Button}>Dashboard</Button>
            </NavLink>
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
    </header>
  );
};

export default Header;
