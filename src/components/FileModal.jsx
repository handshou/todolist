import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import Dropzone from "../components/Dropzone";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export const MyNoRenderer = ({ document, fileName }) => {
  const fileText = fileName || document?.fileType || "";

  if (fileText) {
    return (
      <Text w="100%" p="2rem" textAlign="center">
        Render: file is not supported
      </Text>
    );
  }

  return <div>No Renderer Error!</div>;
};

export default function FileModal(props) {
  const {
    itemId,
    itemRef,
    isLoading = false,
    url,
    isOpen,
    onClose,
    title = "Modal Title",
    description = "Description",
    callback,
    actionName = "Secondary Action",
    actionIcon,
    colorScheme,
  } = props;
  // console.log(props);

  const docs = [
    {
      uri: url,
    },
  ];

  // const [uploaded, setUploaded] = useState(String(url).length === 0);

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <Box minH="20vh">
            <ModalBody>
              {description}
              {url && (
                <VStack maxH="50vh">
                  <DocViewer
                    documents={docs}
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
                </VStack>
              )}
              {!url && (
                <Dropzone
                  sx={{ h: "20vh" }}
                  isLoading={isLoading}
                  url={url}
                  itemId={itemId}
                  itemRef={itemRef}
                  content={
                    <Text color="blue.600">Browse or drop your file here</Text>
                  }
                />
              )}
            </ModalBody>
          </Box>
          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="solid"
              isLoading={isLoading}
              colorScheme={colorScheme}
              onClick={() => callback()}
              leftIcon={actionIcon}
            >
              {actionName}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
