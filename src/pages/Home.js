import { Box, Button, SimpleGrid, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

import { useSelector } from "react-redux";
import ProductModal from "../components/Modals/ProductModal";
import { Link } from "react-router-dom";

function Home() {
  const products = useSelector((state) => state.product.value);
  const [searchName, setSearchName] = useState("");

  //Add Product Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openProductModal = () => {
    setIsModalOpen(true);
  };
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box bg={"#FDBE75"} minH={"100vh"}>
      <Box w={["90%", "75%", "75%"]} align={"center"} mx={"auto"}>
        <Box pt={10}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Cari Kebutuhanmu
          </Text>
        </Box>
        <Box align={"center"} p={10}>
          <Input
            type="text"
            placeholder="Cari Produk"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            size="lg"
            borderColor={"black"}
            maxW="700px"
            _hover={{
              borderColor: "#6D6D6D",
            }}
          />
          {localStorage.getItem("username") === "admin" && (
            <Link to={"?mode=add"}>
              <Button colorScheme="blue" onClick={openProductModal} ml={5}>
                ADD PRODUCT
              </Button>
            </Link>
          )}
        </Box>
        <SimpleGrid columns={3}>
          {products
            .filter((item) =>
              item.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                image={product.image}
                buyPrice={product.buyPrice}
                sellPrice={product.sellPrice}
                stock={product.stock}
              />
            ))}
        </SimpleGrid>
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeProductModal}
          title={"Tambah Produk"}
        />
      </Box>
    </Box>
  );
}

export default Home;
