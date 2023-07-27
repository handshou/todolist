import { Container, Text, Spacer } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
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
        color: "white",
        left: 0,
        right: 0,
        top: 0,
        zIndex: "25",
        borderBottom: "1px",
        borderColor: "blue.300",
      }}
    >
      <CheckIcon />
      <Text as="b" pl="0.4rem">
        Todolist
      </Text>
      <Spacer />
      <Text>{auth ? auth.email : ""}</Text>
    </Container>
  );
}
