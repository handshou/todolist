import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";

export default function TodoModal({
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
          <ModalBody>{description}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
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
