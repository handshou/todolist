// Chakra imports
import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
// Assets
import React, { useCallback, useContext } from "react";
import { AuthContext, DatabaseContext } from "../context/MyProviders";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

function Dropzone(props) {
  const { content, itemId, ...rest } = props;
  const { storage, database } = useContext(DatabaseContext);
  const { auth } = useContext(AuthContext);
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles);

      const storageRef = ref(
        storage,
        `${auth.uid}/${itemId}/${acceptedFiles[0].name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, acceptedFiles[0]);

      // // 'file' comes from the Blob or File API
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload for " + itemId + " is " + progress + "% done");
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
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            const docRef = await doc(
              database,
              `checklists/${auth.uid}/items/${itemId}`
            );
            updateDoc(docRef, {
              url: downloadURL,
              fileName: acceptedFiles[0].name,
              fileSize: acceptedFiles[0].size,
            });
          });
        }
      );
    },
    [auth.uid, storage, database, itemId]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  return (
    <Flex
      align="center"
      justify="center"
      bg={bg}
      border="1px dashed"
      borderColor={borderColor}
      borderRadius="16px"
      w="100%"
      h="max-content"
      minH="100%"
      cursor="pointer"
      {...getRootProps({ className: "dropzone" })}
      {...rest}
    >
      <Input variant="main" {...getInputProps()} />
      <Button variant="no-effects">{content}</Button>
    </Flex>
  );
}

export default Dropzone;
