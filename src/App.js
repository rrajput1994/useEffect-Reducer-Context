import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
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
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
