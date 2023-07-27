import { useContext, useEffect } from "react";
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
import {
  query,
  doc,
  addDoc,
  updateDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  DatabaseContext,
  AuthContext,
  StoreContext,
} from "../context/MyProviders";
import { FiEdit2 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

import TodoModal from "../components/TodoModal";

export default function Todolist() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { database } = useContext(DatabaseContext);
  const { auth } = useContext(AuthContext);
  const { store } = useContext(StoreContext);
  const { setStore } = useContext(StoreContext);

  useEffect(() => {
    if (auth) {
      const userChecklistDoc = doc(database, `checklists/${auth.uid}`);
      const itemsCollectionRef = collection(userChecklistDoc, "items");
      // Query Collection
      const ChecklistItemsQuery = query(itemsCollectionRef);
      const unsubscribeChecklistItemsQuery = onSnapshot(
        ChecklistItemsQuery,
        (querySnapshot) => {
          setStore(querySnapshot.docs.map((e) => e.data()));
        }
      );
      return () => {
        unsubscribeChecklistItemsQuery();
      };
    }
  }, [auth, database, setStore]);

  const handleAddItem = async () => {
    try {
      const userChecklistDoc = await doc(database, `checklists/${auth.uid}`);
      const itemsCollectionRef = await collection(userChecklistDoc, "items");
      addDoc(itemsCollectionRef, {
        id: null,
        isChecked: true,
        link: "",
        description: "Download installer",
      }).then((docRef) => {
        updateDoc(docRef, {
          id: docRef.id,
        });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleModal = () => {
    console.log("handle modal");
  };

  const Checklist = () => (
    <List>
      {store.map((todo) => (
        <HStack
          key={todo.id}
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
            key={todo.id}
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
    <ListItem key={0}>
      <HStack
        key={0}
        spacing={"1rem"}
        sx={{
          flex: 1,
          flexDir: "col",
          alignItems: "center",
          pb: "0.3rem",
        }}
      >
        <Checkbox isDisabled isChecked={false} />
        <Button
          onClick={handleAddItem}
          leftIcon={<MdAdd />}
          colorScheme="gray"
          width="100%"
        >
          Item
        </Button>
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
