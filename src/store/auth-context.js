import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  uid: null,
  login: (uid) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const loginHandler = (uid) => {
    setIsAuthenticated(true);
    setUserId(uid);
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
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
