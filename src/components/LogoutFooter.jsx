import { Container, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function LogoutFooter() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        pt: "0.5rem",
        pl: "1rem",
        height: "3rem",
        left: 0,
        right: 0,
        zIndex: 25,
        borderTop: "1px",
        borderColor: "lightGrey",
      }}
    >
      <Link as={RouterLink} to="/logout">
        <Text sx={{ mb: "0.5rem", textDecoration: "none", color: "blue" }}>
          Logout
        </Text>
      </Link>
    </Container>
  );
}
