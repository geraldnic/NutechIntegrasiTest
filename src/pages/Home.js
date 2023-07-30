import React, { useState, useEffect } from "react";
import { Box, Button, SimpleGrid, Input, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import ProductModal from "../components/Modals/ProductModal";

const ITEMS_PER_PAGE = 3; //Jumlah produk tiap page

function Home() {
  const products = useSelector((state) => state.product.value);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let loggedUser = localStorage.getItem("username");

  //Add Product Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openProductModal = () => {
    setIsModalOpen(true);
  };
  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  // Menghitung total halaman
  useEffect(() => {
    const filteredProducts = products.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    setTotalPages(total);
  }, [products, searchName]);

  // Ganti Halaman
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box bg={"#FDBE75"} minH={"100vh"}>
      <Box w={["90%", "75%", "75%"]} align={"center"} mx={"auto"}>
        <Box pt={10}>
          {loggedUser && (
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              Halo, <Text as={"span"} color={"green"}>{loggedUser}</Text>
            </Text>
          )}
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
          {loggedUser === "admin" && (
            <Link to={"?mode=add"}>
              <Button colorScheme="blue" onClick={openProductModal} ml={5}>
                ADD PRODUCT
              </Button>
            </Link>
          )}
        </Box>
        <SimpleGrid columns={[1, 2, 3]}>
          {products
            .filter((item) =>
              item.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
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
        <Box mt={5} align="center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                colorScheme={page === currentPage ? "blue" : "gray"}
                mx={1}
              >
                {page}
              </Button>
            )
          )}
        </Box>
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
