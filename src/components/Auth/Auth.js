import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const prevAuthenticated = window.localStorage.getItem('authenticated') || '';
  const prevScope = window.localStorage.getItem('scope') || '';
  const [authenticated, setAuthenticated] = useState(prevAuthenticated);
  const [scope, setScope] = useState(prevScope); // scope can be 'admin' or 'reviewer'

  useEffect(() => {
    window.localStorage.setItem('authenticated', authenticated);
    window.localStorage.setItem('scope', scope);
  }, [authenticated, scope]);

  const defaultContext = {
    authenticated,
    setAuthenticated,
    scope,
    setScope,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
