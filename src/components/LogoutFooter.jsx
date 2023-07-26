import { Container, Link, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import TodoModal from "../components/TodoModal";

export default function LogoutFooter() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModal = () => {
    navigate("logout");
    onClose();
  };

  const navigate = useNavigate();

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
      <Link
        // as={RouterLink}
        //   to="/logout"
        onClick={onOpen}
      >
        <Text sx={{ mb: "0.5rem", textDecoration: "none", color: "blue" }}>
          Logout
        </Text>
      </Link>
      <TodoModal
        title={"Confirmation"}
        description={"Logout?"}
        actionName={"Yes"}
        colorScheme="green"
        // actionIcon={<AiTwotoneDelete />}
        callback={handleModal}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  );
}
