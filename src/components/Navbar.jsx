import { Link as RouterLink } from "react-router-dom";
import { Link, Container, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/MyProviders";

export default function Navbar() {
  const { auth } = useContext(AuthContext);
  return (
    <Container
      sx={{
        height: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        bg: "blue.500",
        left: 0,
        right: 0,
        top: 0,
        zIndex: "25",
        borderBottom: "1px",
        borderColor: "blue.300",
      }}
    >
      <Link as={RouterLink} to="/login">
        <Text>Login</Text>
      </Link>
      <Link as={RouterLink} to="/todolist">
        <Text>Todolist</Text>
      </Link>
      <Text>{auth ? auth.email : "username"}</Text>
    </Container>
  );
}
