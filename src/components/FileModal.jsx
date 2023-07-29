import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Text
} from "@chakra-ui/react";
import Dropzone from "../components/Dropzone";

export default function FileModal({
  isOpen,
  onClose,
  title = "Modal Title",
  description = "Description",
  callback,
  actionName = "Secondary Action",
  actionIcon,
  colorScheme,
}) {
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
            <Dropzone content={<Text color="blue.600">Browse or drop your file here</Text>} />
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
