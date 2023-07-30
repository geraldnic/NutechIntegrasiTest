import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthModal from "./Modals/AuthModal";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [status, setStatus] = useState("Sign In");
  const [userBalance, setUserBalance] = useState(0);
  const users = useSelector((state) => state.user.value);
  let user = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setStatus("Logout");
      users.map((item) => {
        if (item.username === user) {
          setUserBalance(item.balance);
        }
      });
    } else {
      setStatus("Sign In");
    }
  }, [users]);

  //Auth Modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openAuthModal = () => {
    setIsAuthOpen(true);
  };
  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setStatus("Sign In");
    navigate(0);
  };
  return (
    <Box>
      <Flex
        bg={"#FFA236"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
        borderBottom={"1px solid black"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to={"/"}>
            <Image
              src="https://nutech-integrasi.com/wp-content/uploads/2019/09/Logo-Nutech-ok.png"
              w={"100px"}
            />
          </Link>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          align={"center"}
        >
          {user ? (
            <>
              <Text fontWeight={"bold"}>Balance: </Text>
              <Text minW={"100px"}>Rp {userBalance}</Text>
              <Button
                as={"a"}
                display={"inline-flex"}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                _hover={{
                  bg: "pink.300",
                }}
                onClick={logout}
              >
                {status}
              </Button>
            </>
          ) : (
            <Button
              as={"a"}
              display={"inline-flex"}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={openAuthModal}
            >
              {status}
            </Button>
          )}
        </Stack>
      </Flex>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
        openModal={openAuthModal}
      />
    </Box>
  );
}
