import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import LogoutFooter from "../components/LogoutFooter";

export default function App() {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Box sx={{ w: "100vw" }}>
        <Navbar />
        <Container>
          <Box id="App" sx={{ pt: "4rem" }}>
            <Outlet />
          </Box>
        </Container>
        <LogoutFooter />
      </Box>
    </>
  );
}
