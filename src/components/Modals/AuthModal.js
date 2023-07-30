import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Center,
  Circle,
  Heading,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

import { FaLock } from "react-icons/fa";
import NotificationModal from "./NotificationModal";

export default function AuthModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.value);

  const openNotification = () => {
    setIsNotificationOpen(true);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const tryAgain = () => {
    setIsNotificationOpen(false);
    props.openModal();
  };

  const submitForm = (event) => {
    event.preventDefault();
    let isUserExist = false;
    let userUsername = "";
    let userPassword = "";
    users.map((user) => {
      if (user.username.toLowerCase() === username.toLowerCase()) {
        isUserExist = true;
        userUsername = user.username;
        userPassword = user.password;
        console.log(userUsername, userPassword, isUserExist);
      }
    });
    if (isUserExist) {
      if (userPassword === password) {
        window.localStorage.setItem("username", username);
        navigate(0);
      } else {
        openNotification();
      }
    } else {
      openNotification();
    }
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent w={"450px"} maxW={"90%"} zIndex={"100"}>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box rounded={"lg"} bg="white" px={8} pb={8}>
              <Center>
                <Circle size={14} border="1px" borderColor="black">
                  <FaLock />
                </Circle>
              </Center>
              <Heading fontSize={"3xl"} textAlign={"center"} mb={5}>
                Login to your account!
              </Heading>
              <Stack spacing={4}>
                <form onSubmit={submitForm}>
                  <FormControl id="username" isRequired mb={3}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </FormControl>
                  <Stack spacing={10} mt={10}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                      onClick={props.onClose}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        tryAgain={tryAgain}
      />
    </>
  );
}
