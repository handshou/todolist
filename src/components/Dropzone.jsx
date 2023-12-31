// Chakra imports
import {
  Button,
  Flex,
  Input,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { MyNoRenderer } from "../components/FileModal";

function Dropzone(props) {
  const { content, url, itemId, itemRef, isLoading, ...rest } = props;
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
      itemRef.current.fileType = acceptedFiles[0].type;
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
      {file && !isLoading && (
        <>
          <HStack pb="0.3rem" pt="0.3rem" justifyContent="center">
            <Badge
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {itemRef.current.fileName}
            </Badge>
            <Badge>{itemRef.current.fileSize / 1000} kB</Badge>
          </HStack>
          <VStack sx={{ maxH: "35vh", pt: "0.3rem" }}>
            <DocViewer
              documents={[{ uri: file.preview }]}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: false,
                },
                noRenderer: {
                  overrideComponent: MyNoRenderer,
                },
              }}
              prefetchMethod="GET"
            />
            {/* {() => URL.revokeObjectURL(file.preview)} */}
            {/* <img
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
          /> */}
          </VStack>
        </>
      )}
    </>
  );
}

export default Dropzone;
