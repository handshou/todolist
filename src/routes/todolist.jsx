import { useContext, useRef } from "react";
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
  VStack,
  Container,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, addDoc, updateDoc, collection } from "firebase/firestore";

import {
  DatabaseContext,
  AuthContext,
  StoreContext,
} from "../context/MyProviders";
import { AiFillEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

import TodoModal from "../components/TodoModal";
import FileModal from "../components/FileModal";

export default function Todolist() {
  const itemIdRef = useRef({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFileOpen,
    onOpen: onFileOpen,
    onClose: onFileClose,
    getDisclosureProps,
  } = useDisclosure({ id: 123 });

  const { database } = useContext(DatabaseContext);
  const { auth } = useContext(AuthContext);
  const { store } = useContext(StoreContext);

  const handleAddItem = async () => {
    try {
      const userChecklistDoc = await doc(database, `checklists/${auth.uid}`);
      const itemsCollectionRef = await collection(userChecklistDoc, "items");
      addDoc(itemsCollectionRef, {
        id: null,
        isChecked: false,
        url: null,
        fileName: null,
        fileSize: null,
        description: "",
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

  const Checklist = () => {
    return (
      <List>
        {store.length === 0 ? (
          <VStack
            sx={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text size="xs" color="gray.400">
              No items here
            </Text>
          </VStack>
        ) : (
          ""
        )}
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
              <Button
                onClick={() => {
                  itemIdRef.current = {};
                  itemIdRef.current.itemId = todo.id;
                  itemIdRef.current.url = todo.url;
                  itemIdRef.current.fileName = todo.fileName;
                  itemIdRef.current.fileSize = todo.fileSize;
                  onFileOpen();
                }}
                variant="outline"
                fontSize={"xs"}
              >
                <Text>Attach</Text>
              </Button>
              <Text pl={"1rem"} fontWeight={"700"}>
                {todo.description}
              </Text>
              <Spacer />
              <Button
                onClick={onFileOpen}
                mr="0.3rem"
                variant="outline"
                colorScheme="blue"
              >
                <AiFillEdit />
              </Button>
              <Button onClick={onFileOpen} variant="outline" colorScheme="red">
                <AiTwotoneDelete />
              </Button>
            </ListItem>
          </HStack>
        ))}
        <AddItemListButton />
      </List>
    );
  };

  const AddItemListButton = () => (
    <ListItem key={0}>
      <HStack
        key={0}
        spacing={"1rem"}
        sx={{
          flex: 1,
          flexDir: "col",
          alignItems: "center",
          mb: "5rem",
        }}
      >
        {/* <Checkbox isDisabled isChecked={false} /> */}
        <Button
          onClick={handleAddItem}
          leftIcon={<MdAdd />}
          colorScheme="gray"
          width="100%"
        >
          {/* Item */}
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
              <Box>
                <FileModal
                  {...getDisclosureProps}
                  itemId={itemIdRef.current.itemId}
                  url={itemIdRef.current.url}
                  fileSize={itemIdRef.current.fileSize}
                  fileName={itemIdRef.current.fileName}
                  title={"Attach file"}
                  description={""}
                  actionName={"Save"}
                  colorScheme="blue"
                  // actionIcon={<AiTwotoneDelete />}
                  callback={handleModal}
                  isOpen={isFileOpen}
                  onClose={onFileClose}
                />
              </Box>
              {/* <Button
                leftIcon={<AiTwotoneDelete />}
                colorScheme="red"
                size="sm"
                onClick={onOpen}
              >
                Delete selected
              </Button> */}
              {/* <Button rightIcon={<FiEdit2 />} colorScheme="blue" size="sm">
                Edit list
              </Button> */}
            </HStack>
          </Stack>
          <Checklist />
        </Box>
      </Container>
    </>
  );
}
