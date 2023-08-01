import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import Dropzone from "../components/Dropzone";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function FileModal(props) {
  const {
    itemId,
    url,
    fileName,
    fileSize,
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
    { uri: url }, // Remote file
  ];

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
          <ModalBody sx={{ h: "200px" }}>
            {description}
            {url && (
              <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
              />
            )}
            {!url && (
              <Dropzone
                itemId={itemId}
                content={
                  <Text color="blue.600">Browse or drop your file here</Text>
                }
              />
            )}
          </ModalBody>
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
