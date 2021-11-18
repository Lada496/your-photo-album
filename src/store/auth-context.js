import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  uid: null,
  accessToken: null,
  login: (uid, token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const loginHandler = (uid, token) => {
    setIsAuthenticated(true);
    setUserId(uid);
    setAccessToken(token);
  };
  const logoutHandler = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        uid: userId,
        accessToken,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
