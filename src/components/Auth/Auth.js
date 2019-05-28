import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);

  const defaultContext = {
    authenticated,
    setAuthenticated,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
