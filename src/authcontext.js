import React, {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase.js';

export const UserContext = createContext({
  userLoaded: false,
  user: null,
  listener: null,
});

// eslint-disable-next-line react/prop-types
function AuthContext({children}) {
  const [state, setState] = useState({
    userLoaded: false,
    user: null,
    listener: null,
  });

  useEffect(() => {
    if (state.listener == null) {
      setState((prevState) => {
        return ({
          ...prevState,
          listener: onAuthStateChanged(auth, (user) => {
            if (user) {
              setState((prevState) => ({
                ...prevState,
                userLoaded: true,
                user: user,
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                userLoaded: true,
                user: null,
              }));
            }
          }),
        });
      });
    }
  }, []);

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthContext;
