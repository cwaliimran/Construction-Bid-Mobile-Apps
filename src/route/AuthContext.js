import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (authToken, id) => {
    setToken(authToken);
    setUserId(id);
    setIsLoggedIn(true);
  };
  //   const login = authToken => {
  //     setToken(authToken);
  //     setIsLoggedIn(true);
  //   };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{userId, isLoggedIn, token, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
