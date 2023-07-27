import { useState } from "react";
import {
  Button,
  ListItem,
  List,
  Heading,
  Checkbox,
  HStack,
  Text,
  Box,
  Stack,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

import TodoModal from "../components/TodoModal";

export default function Todolist() {
  const initItems = [
    { isChecked: true, link: "", description: "Go to www.mysql.com" },
    { isChecked: true, link: "", description: "Download installer" },
    { isChecked: false, link: "", description: "Execute" },
    { isChecked: false, link: "", description: "Review" },
    { isChecked: false, link: "", description: "Todo 1" },
    { isChecked: false, link: "", description: "Todo 2" },
  ];

  const [items, setItems] = useState(initItems);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModal = () => {
    console.log("handle modal");
  };

  const Checklist = () => (
    <List>
      {items.map((todo, idx) => (
        <HStack
          key={idx}
          spacing={"1rem"}
          sx={{
            flex: 1,
            flexDir: "col",
            alignItems: "center",
            pb: "0.3rem",
          }}
        >
          <Checkbox isChecked={todo.isChecked}></Checkbox>
          <ListItem
            key={idx}
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Button variant="outline" width="6rem">
              Attach
            </Button>
            <Text pl={"1rem"}>{todo.description}</Text>
          </ListItem>
        </HStack>
      ))}
      <AddItemListButton />
    </List>
  );

  const AddItemListButton = () => (
    <ListItem>
      <HStack
        spacing={"1rem"}
        sx={{
          flex: 1,
          flexDir: "col",
          alignItems: "center",
          pb: "0.3rem",
        }}
      >
        <Checkbox isDisabled isChecked={false} />
        <Button leftIcon={<MdAdd />} colorScheme="gray" width="100%">
          Item
        </Button>
        {/* <Input width="50%" placeholder="Description" /> */}
      </HStack>
    </ListItem>
  );

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          height: "85vh",
          p: "0",
        }}
      >
        <Box>
          <Stack
            display="flex"
            flexDirection={{ sm: "row", base: "column" }}
            pb="0.5rem"
            sx={{ justifyContent: "space-between", alignItems: "left" }}
          >
            <Heading>Checklist</Heading>
            <HStack>
              <Button
                leftIcon={<AiTwotoneDelete />}
                colorScheme="red"
                size="sm"
                onClick={onOpen}
              >
                Delete selected
              </Button>
              <TodoModal
                title={"Delete items"}
                description={""}
                actionName={"Delete items"}
                colorScheme="blue"
                actionIcon={<AiTwotoneDelete />}
                callback={handleModal}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Button rightIcon={<FiEdit2 />} colorScheme="blue" size="sm">
                Edit list
              </Button>
            </HStack>
          </Stack>
          <Checklist />
        </Box>
      </Container>
    </>
  );
}
