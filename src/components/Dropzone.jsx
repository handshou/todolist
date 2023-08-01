// Chakra imports
import {
  Button,
  Flex,
  Input,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const { content, url, itemId, itemRef, ...rest } = props;
  const [file, setFile] = useState(url);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles);

      const newFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setFile(newFile);

      itemRef.current.itemId = itemId;
      itemRef.current.fileName = acceptedFiles[0].name;
      itemRef.current.file = acceptedFiles[0];
      itemRef.current.fileSize = acceptedFiles[0].size;
    },
    [itemRef, itemId]
  );

  useEffect(() => {
    return () => (file) => URL.revokeObjectURL(file.preview);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  return (
    <>
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
      {file && (
        <VStack sx={{ maxH: "30vh", pt: "0.3rem" }}>
          <img
            alt="file"
            src={file.preview}
            style={{
              display: "flex",
              width: "auto",
              maxHeight: "30vh",
            }}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </VStack>
      )}
    </>
  );
}

export default Dropzone;
