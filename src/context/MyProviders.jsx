import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export const AuthContext = createContext(null);
export const DatabaseContext = createContext(null);
export const StoreContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

export default function MyProviders({ children }) {
  const firebaseAuth = getAuth();

  useEffect(() => {
    setDatabase(db);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      // TODO: Add firestore listener on auth change

      if (user) {
        setAuth(user);

        localStorage.setItem("auth", user);
      } else {
        // User is signed out

        // TODO: Add firestore listener unmount on auth error
        setAuth(null);
        localStorage.clear();
      }
    });

    // TODO: Unsub firestore listener on unmount
    return () => unsubscribe();
  }, [firebaseAuth]);

  const [auth, setAuth] = useState();
  const [database, setDatabase] = useState();
  const [store, setStore] = useState([]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <DatabaseContext.Provider value={{ database, setDatabase }}>
        <StoreContext.Provider value={{ store, setStore }}>
          {children}
        </StoreContext.Provider>
      </DatabaseContext.Provider>
    </AuthContext.Provider>
  );
}
