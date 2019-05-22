import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { Button } from 'baseui/button';
import HeaderStyles from './Header.module.css';

const Header = () => (
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
          <NavLink to="/login">
            <Button className={HeaderStyles.Button}>Login</Button>
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

export default Header;
