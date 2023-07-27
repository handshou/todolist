import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);
export const ListContext = createContext(null);

export default function MyProviders({ children }) {
  const firebaseAuth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setAuth(user);
        localStorage.setItem("auth", user);
      } else {
        // User is signed out
        setAuth(null);
        localStorage.clear()
      }
    });
    return () => {
      unsubscribe();
    };
  });

  const [auth, setAuth] = useState();
  const [list, setList] = useState();
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <ListContext.Provider value={{ list, setList }}>
        {children}
      </ListContext.Provider>
    </AuthContext.Provider>
  );
}
