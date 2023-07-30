import React from "react";
import { FcHighPriority } from "react-icons/fc";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Circle,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";

function NotificationModal(props) {
  return (
    <>
      <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Center py={5}>
            <Circle size={14}>
              <FcHighPriority size={50} />
            </Circle>
          </Center>
          <Heading fontSize={"3xl"} textAlign={"center"} mb={5}>
            Failed!
          </Heading>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>Kombinasi username dan password salah!</ModalBody>
          <ModalFooter>
            <Button onClick={props.tryAgain}>Try Again</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotificationModal;