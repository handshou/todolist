import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";

import { useEffect, useContext } from "react";
import { AuthContext } from "../context/MyProviders";

import Navbar from "../components/Navbar";
import LogoutFooter from "../components/LogoutFooter";

export default function App() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      if (!auth) navigate("login");
    }

    if (pathname === "/login" || pathname === "/register") {
      if (auth) navigate("/app/todolist");
    }
  }, [auth, navigate, pathname]);
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
