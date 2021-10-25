import React, { useState, useEffect } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // -----This code takes to infinite loop ulternatlty use
  // useEffect hook---------

  // const userLocalInfo = localStorage.getItem("user-info");
  // if (userLocalInfo === "1") {
  //   setIsLoggedIn(true);
  // }

  useEffect(() => {
    const userLocalInfo = localStorage.getItem("user-info");
    if (userLocalInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem("user-info", "1");

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user-info");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
