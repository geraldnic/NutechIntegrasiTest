import { Flex, Box, Image, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  decreaseStock,
  increaseStock,
  removeProduct,
} from "../features/products";
import { decreaseBalance } from "../features/users";
import { useState } from "react";
import DeleteModal from "./Modals/DeleteModal";
import ProductModal from "./Modals/ProductModal";
import { Link } from "react-router-dom";
import AuthModal from "./Modals/AuthModal";
import { useSelector } from "react-redux";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function ProductCard(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.value);
  let balance = 0;

  users.map((user) => {
    if (user.username === localStorage.getItem("username")) {
      balance = user.balance;
    }
  });

  //Delete Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const openDelete = () => {
    setIsDeleteOpen(true);
  };
  const closeDelete = () => {
    setIsDeleteOpen(false);
  };
  const handleDelete = () => {
    dispatch(removeProduct(props.name));
    closeDelete();
  };

  //Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const openEdit = () => {
    setIsEditOpen(true);
  };
  const closeEdit = () => {
    setIsEditOpen(false);
  };

  //Auth Modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openAuthModal = () => {
    setIsAuthOpen(true);
  };
  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  //Admin beli produk
  const adminBuy = () => {
    dispatch(increaseStock(props.name));
    dispatch(decreaseBalance(props.buyPrice));
  };

  //Customer beli produk
  const customerBuy = () => {
    if (!localStorage.getItem("username")) {
      openAuthModal();
    } else {
      if (props.stock < 1) {
        alert("Maaf, produk telah habis terjual!");
      } else {
        if (balance < props.sellPrice) {
          alert("Saldo tidak cukup!");
        } else {
          dispatch(decreaseStock(props.name));
          dispatch(decreaseBalance(props.sellPrice));
        }
      }
    }
  };
  return (
    <Flex p={10} w="full" alignItems="center" justifyContent="center">
      <Box
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        bg={"#00203FFF"}
        color={"#ADEFD1FF"}
        borderColor={"black"}
      >
        <Image
          src={props.image}
          alt={`Picture of ${props.name}`}
          roundedTop="lg"
          bg={"white"}
          w={"500px"}
          h={"250px"}
        />
        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {props.name}
            </Box>
          </Flex>
          <Text align={"left"} fontSize={"md"}>
            Stock: {props.stock}
          </Text>
          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl">
              {localStorage.getItem("username") === "admin" ? (
                <>
                  <Text fontWeight={"bold"} fontSize="lg">
                    Harga Beli : Rp {props.buyPrice}
                  </Text>
                  <Text fontWeight={"bold"} fontSize="lg">
                    Harga Jual : Rp {props.sellPrice}
                  </Text>
                </>
              ) : (
                <Text fontWeight={"bold"} fontSize="lg">
                  Rp {props.sellPrice}
                </Text>
              )}
            </Box>
          </Flex>
        </Box>
        <Box align={"left"}>
          {localStorage.getItem("username") === "admin" ? (
            <Box mb={5}>
              <Button colorScheme="green" ml={5} mr={2} onClick={adminBuy}>
                Beli (restock)
              </Button>
              <Link to={"?mode=edit"}>
                <Button colorScheme="blue" mx={2} onClick={openEdit}>
                  <AiFillEdit />
                </Button>
              </Link>
              <Button colorScheme="red" mx={2} onClick={openDelete}>
                <AiFillDelete />
              </Button>
            </Box>
          ) : (
            <Button colorScheme="green" mx={5} mb={5} onClick={customerBuy}>
              Beli Produk
            </Button>
          )}
        </Box>
      </Box>
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        handleDelete={handleDelete}
      />
      <ProductModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        title={"Edit Produk"}
        name={props.name}
        buyPrice={props.buyPrice}
        sellPrice={props.sellPrice}
        stock={props.stock}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
        openModal={openAuthModal}
      />
    </Flex>
  );
}

export default ProductCard;
