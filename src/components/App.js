import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "googlebase";

function App() {
  const [init, setInit] = useState(false);

  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        <h2>Loading......</h2>
      )}
      <footer>&copy; {new Date().getFullYear()} ErrorChat</footer>
    </>
  );
}
export default App;
