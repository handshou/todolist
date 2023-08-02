import { useContext, useRef, useState } from "react";
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
  Badge,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import {
  doc,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  DatabaseContext,
  AuthContext,
  StoreContext,
} from "../context/MyProviders";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AiFillFileImage } from "react-icons/ai";
import { AiFillFileZip } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { LiaDownloadSolid } from "react-icons/lia";
import { MdAdd } from "react-icons/md";

import TodoModal from "../components/TodoModal";
import FileModal from "../components/FileModal";
import EditInputField from "../components/EditInputField";

const FileIcon = ({ type }) => {
  switch (type) {
    case "application/pdf":
      return <AiFillFilePdf />;
    case "application/zip":
      return <AiFillFileZip />;
    case "image/jpeg":
    case "image/png":
    case "image/bmp":
      return <AiFillFileImage />;
    default:
      return <GrFormView />;
  }
};

export default function Todolist() {
  const itemIdRef = useRef({});
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [isUploadLoading, setUploadLoading] = useState(false);
  const {
    isOpen: isFileOpen,
    onOpen: onFileOpen,
    onClose: onFileClose,
    getDisclosureProps,
  } = useDisclosure({ id: 123 });

  const { database, storage } = useContext(DatabaseContext);
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
        fileType: null,
        description: "",
        createdAt: new Date(),
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

  const handleDeleteModal = async () => {
    itemIdRef.current.isLoading = true;
    const docRef = await doc(
      database,
      `checklists/${auth.uid}/items/${itemIdRef.current.itemId}`
    );
    onDeleteClose();

    const deleteObjectRef = await ref(
      storage,
      `${auth.uid}/${itemIdRef.current.itemId}/${itemIdRef.current.fileName}`
    );
    if (itemIdRef.current.url) deleteObject(deleteObjectRef);

    setTimeout(() => {
      itemIdRef.current.isLoading = false;
      deleteDoc(docRef);
    }, 1000);
  };

  const handleUpload = () => {
    if (!itemIdRef.current.fileName) {
      toast({
        title: "No file found",
        description: "Browse or drag a file",
        position: "bottom",
        status: "info",
        duration: 4000,
      });
      return;
    }
    setUploadLoading(true);
    const storageRef = ref(
      storage,
      `${auth.uid}/${itemIdRef.current.itemId}/${itemIdRef.current.fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, itemIdRef.current.file);

    // // 'file' comes from the Blob or File API
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(
          "Upload for " +
            itemIdRef.current.itemId +
            " is " +
            progress +
            "% done"
        );
        switch (snapshot.state) {
          default:
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setUploadLoading(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          const docRef = await doc(
            database,
            `checklists/${auth.uid}/items/${itemIdRef.current.itemId}`
          );
          updateDoc(docRef, {
            url: downloadURL,
            fileName: itemIdRef.current.fileName,
            fileSize: itemIdRef.current.fileSize,
            fileType: itemIdRef.current.fileType,
          });
          setUploadLoading(false);
          onFileClose();
          console.log(
            document
              .getElementById(itemIdRef.current.itemId)
              .getBoundingClientRect().top
          );
        });
      }
    );
  };

  const handleEditSubmit = async ({ initialValue, value }) => {
    if (initialValue === value) return;

    const docRef = await doc(
      database,
      `checklists/${auth.uid}/items/${itemIdRef.current.itemId}`
    );
    updateDoc(docRef, {
      description: itemIdRef.current.description,
    });
  };

  const handleCheckbox = () => {
    const delay = itemIdRef.current.isChecked ? 200 : 0;
    setTimeout(async () => {
      const docRef = await doc(
        database,
        `checklists/${auth.uid}/items/${itemIdRef.current.itemId}`
      );
      updateDoc(docRef, {
        isChecked: itemIdRef.current.isChecked,
      });
    }, delay);
  };

  const handleDownload = async () => {
    const url = itemIdRef.current.url;
    const response = await fetch(url);
    const blob = await response.blob();

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    // a.target = "_blank";
    a.download = itemIdRef.current.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
            }}
          >
            <Checkbox
              size="lg"
              // initial={true}
              onChange={() => {
                itemIdRef.current.itemId = todo.id;
                itemIdRef.current.isChecked = !todo.isChecked;
                handleCheckbox();
              }}
              isChecked={todo.isChecked ? todo.isChecked : undefined}
            ></Checkbox>
            <ListItem
              id={todo.id}
              key={todo.id}
              sx={{
                borderRadius: "0.5rem",
                bg:
                  itemIdRef.current.itemId ===
                  todo.id /*} && (isFileOpen || isOpen)*/
                    ? "blue.100"
                    : "",
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "left",
                pl: "0.3rem",
                pt: "0.3rem",
                pb: "0.3rem",
                borderBottom: "1px",
                borderColor: "blue.50",
              }}
            >
              {!todo.url ? (
                <Button
                  // sx={{ p: 0 }}
                  onClick={() => {
                    itemIdRef.current = {};
                    itemIdRef.current.itemId = todo.id;
                    itemIdRef.current.url = todo.url;
                    console.log(todo.url);
                    itemIdRef.current.fileName = todo.fileName;
                    itemIdRef.current.fileSize = todo.fileSize;
                    itemIdRef.current.description = todo.description;
                    onFileOpen();
                  }}
                  variant="solid"
                  fontSize={"xl"}
                  colorScheme="gray"
                >
                  {/* <Text w="3rem">Attach</Text> */}
                  <AiOutlineFileAdd />
                </Button>
              ) : (
                <Button
                  // sx={{ p: 0 }}
                  onClick={() => {
                    itemIdRef.current = {};
                    itemIdRef.current.itemId = todo.id;
                    itemIdRef.current.url = todo.url;
                    console.log(todo.url);
                    itemIdRef.current.fileName = todo.fileName;
                    itemIdRef.current.fileSize = todo.fileSize;
                    itemIdRef.current.description = todo.description;
                    onFileOpen();
                  }}
                  variant="ghost"
                  fontSize={"xl"}
                  colorScheme="blue"
                >
                  {/* <Text w="3rem">View</Text> */}
                  <FileIcon type={todo.fileType} />
                </Button>
              )}
              {/* <Box width="50vw"> */}
              <EditInputField
                itemIdRef={itemIdRef}
                itemId={todo.id}
                ml="0.3rem"
                w="100%"
                onClick={() => (itemIdRef.current.itemId = todo.id)}
                initialValue={todo.description}
                initialIsEditing={todo.description.length === 0}
                handleSubmit={handleEditSubmit}
              />
              {/* </Box> */}
              <Button
                onClick={() => {
                  itemIdRef.current.itemId = todo.id;
                  itemIdRef.current.fileName = todo.fileName;
                  itemIdRef.current.url = todo.url;
                  itemIdRef.current.fileSize = todo.fileSize;
                  itemIdRef.current.description = todo.description;
                  onDeleteOpen();
                }}
                isLoading={
                  itemIdRef.current.isLoading &&
                  itemIdRef.current.itemId === todo.id
                }
                variant="ghost"
                colorScheme="red"
                mr="0.3rem"
                fontSize="xl"
              >
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
          my: "1rem",
        }}
      >
        {/* <Checkbox isDisabled isChecked={false} /> */}
        <Button
          onClick={handleAddItem}
          leftIcon={<MdAdd />}
          colorScheme="gray"
          width="100%"
        >
          Add item
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
                title={"Delete item"}
                description={
                  <Stack>
                    <Text
                      noOfLines={3}
                      fontWeight={600}
                      textAlign={"center"}
                      maxWidth="100%"
                      mb={"0.3rem"}
                    >
                      {itemIdRef.current.description}
                    </Text>
                    {itemIdRef.current.url && (
                      <HStack pb="0.3rem" justifyContent="center">
                        <Badge
                          sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: "100%",
                          }}
                        >
                          {itemIdRef.current.fileName}
                        </Badge>
                        <Badge>{itemIdRef.current.fileSize / 1000} kB</Badge>
                      </HStack>
                    )}
                  </Stack>
                }
                actionName={"Delete item"}
                colorScheme="red"
                actionIcon={<AiTwotoneDelete />}
                callback={handleDeleteModal}
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
              />
              <Box>
                <FileModal
                  {...getDisclosureProps}
                  itemId={itemIdRef.current.itemId}
                  itemRef={itemIdRef}
                  url={itemIdRef.current.url}
                  fileSize={itemIdRef.current.fileSize}
                  fileName={itemIdRef.current.fileName}
                  isLoading={isUploadLoading}
                  title={itemIdRef.current.url ? "View file" : "Attach file"}
                  description={
                    <>
                      <Text
                        noOfLines={3}
                        fontWeight={600}
                        textAlign={"center"}
                        maxWidth="100%"
                        mb={"0.3rem"}
                      >
                        {itemIdRef.current.description}
                      </Text>
                      {itemIdRef.current.url && (
                        <HStack pb="0.3rem" justifyContent="center">
                          <Badge
                            sx={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              maxWidth: "100%",
                            }}
                          >
                            {itemIdRef.current.fileName}
                          </Badge>
                          <Badge>{itemIdRef.current.fileSize / 1000} kB</Badge>
                        </HStack>
                      )}
                    </>
                  }
                  actionName={itemIdRef.current.url ? "Download" : "Upload"}
                  colorScheme="blue"
                  // actionIcon={<AiTwotoneDelete />}
                  callback={
                    itemIdRef.current.url ? handleDownload : handleUpload
                  }
                  actionIcon={itemIdRef.current.url && <LiaDownloadSolid />}
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
