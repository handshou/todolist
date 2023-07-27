import { createContext, useState } from "react";

export const AuthContext = createContext(null);
export const ListContext = createContext(null);

export default function MyProviders({ children }) {
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
