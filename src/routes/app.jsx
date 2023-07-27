import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/MyProviders";

import Navbar from "../components/Navbar";
import LogoutFooter from "../components/LogoutFooter";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default function App() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    // const user = localStorage.getItem("auth");
    // if (!auth && user) setAuth(user);

    if (pathname === "/") {
      if (!auth) navigate("login");
    }

    if (pathname === "/login" || pathname === "/register") {
      if (auth) navigate("/app/todolist");
    }
  });
  return (
    <>
      <Box sx={{ w: "100vw" }}>
        <Navbar />
        <Container>
          <Box id="App" sx={{ pt: "4rem", pb: "4rem" }}>
            <Outlet />
          </Box>
        </Container>
        {auth && <LogoutFooter />}
      </Box>
    </>
  );
}
