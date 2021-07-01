import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "googlebase";

function App() {
  const [init, setInit] = useState(false);

  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (any) => user.updateProfile(any),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const loadUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (any) => user.updateProfile(any),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          loadUser={loadUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <h2>Loading......</h2>
      )}
      <footer>&copy; {new Date().getFullYear()} ErrorChat</footer>
    </>
  );
}
export default App;
