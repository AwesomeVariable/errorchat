import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "googlebase";

function App() {
  const [init, setInit] = useState(false);
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  });
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Loading......"}
      <footer>&copy; {new Date().getFullYear()} ErrorChat</footer>
    </>
  );
}
export default App;
