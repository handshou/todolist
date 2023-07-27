import { Container, Link, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import TodoModal from "../components/TodoModal";

export default function LogoutFooter() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModal = () => {
    signOut(auth).then(() => {
      navigate("login");
    });
    onClose();
  };

  const navigate = useNavigate();
  const auth = getAuth();

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        pt: "0.5rem",
        pl: "1rem",
        bg: "white",
        height: "3rem",
        left: 0,
        right: 0,
        zIndex: 25,
        borderTop: "1px",
        borderColor: "lightGrey",
      }}
    >
      <Link onClick={onOpen}>
        <Text sx={{ mb: "0.5rem", textDecoration: "none", color: "blue.600" }}>
          Logout
        </Text>
      </Link>
      <TodoModal
        title={"Logout"}
        description={"Proceed with logout?"}
        actionName={"Yes"}
        colorScheme="blue"
        // actionIcon={<AiTwotoneDelete />}
        callback={handleModal}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  );
}
