import React from 'react';
import { Button } from 'baseui/button';

const Home = props => {
  const login = () => props.auth.login();
  const logout = () => props.auth.logout();
  const { isAuthenticated } = props.auth;

  return (
    <div>
      Hi, there.
      {isAuthenticated() && (
        <div>
          You are logged in
          <Button onClick={logout}>Log out</Button>
        </div>
      )}
      {!isAuthenticated() && (
        <div>
          You are not logged in! <Button onClick={login}>Log In</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
