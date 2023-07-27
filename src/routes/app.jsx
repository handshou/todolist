import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";

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
  return (
    <>
      <Box sx={{ w: "100vw" }}>
        <Navbar />
        <Container>
          <Box id="App" sx={{ pt: "4rem", pb: "4rem" }}>
            <Outlet />
          </Box>
        </Container>
        <LogoutFooter />
      </Box>
    </>
  );
}
