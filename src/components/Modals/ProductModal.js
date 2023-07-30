import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../features/products";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function ProductModal(props) {
  const [name, setName] = useState(props.name);
  const [image, setImage] = useState(null);
  const [buyPrice, setBuyPrice] = useState(props.buyPrice);
  const [sellPrice, setSellPrice] = useState(props.sellPrice);
  const [stock, setStock] = useState(props.stock);
  const [uploadedImg, setUploadedImg] = useState(null);
  const products = useSelector((state) => state.product.value);
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  let mode = searchParams.get("mode");

  const submitForm = (event) => {
    event.preventDefault();
    if (mode == "edit") {
      dispatch(editProduct({ name, image, buyPrice, sellPrice, stock }));
    } else if (mode == "add") {
      //Memastikan nama produk unique
      let isExist = false;
      products.map((product) => {
        if (product.name.toLowerCase() === name.toLowerCase()) {
          isExist = true;
        }
      });
      if (isExist) {
        alert("Produk Telah Terdaftar!");
      } else {
        const maxSize = 102.4;
        const imgSize = uploadedImg.size / 1024;
        if (imgSize > maxSize) {
          alert("Ukuran maksimal gambar adalah 100kb!");
        } else {
          setImage(URL.createObjectURL(uploadedImg));
          dispatch(addProduct({ name, image, buyPrice, sellPrice, stock }));
        }
      }
    }
    props.onClose();
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <form onSubmit={submitForm}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl
                onChange={(event) => setName(event.target.value)}
                isRequired
              >
                <FormLabel>Nama Produk</FormLabel>
                {mode == "edit" ? (
                  <Input
                    type="text"
                    placeholder="Nama produk"
                    defaultValue={props.name}
                    disabled
                  />
                ) : (
                  <Input
                    type="text"
                    placeholder="Nama produk"
                    defaultValue={props.name}
                  />
                )}
              </FormControl>
              {mode == "add" && (
                <FormControl
                  mt={4}
                  onChange={(event) => setUploadedImg(event.target.files[0])}
                  isRequired
                >
                  <FormLabel>Foto Produk</FormLabel>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    defaultValue={props.image}
                  />
                </FormControl>
              )}
              <FormControl
                mt={4}
                onChange={(event) => setBuyPrice(event.target.value)}
                isRequired
              >
                <FormLabel>Harga Beli</FormLabel>
                <Input
                  type="number"
                  placeholder="Harga beli"
                  defaultValue={props.buyPrice}
                />
              </FormControl>
              <FormControl
                mt={4}
                onChange={(event) => setSellPrice(event.target.value)}
                isRequired
              >
                <FormLabel>Harga Jual</FormLabel>
                <Input
                  type="number"
                  placeholder="Harga jual"
                  defaultValue={props.sellPrice}
                />
              </FormControl>
              <FormControl
                mt={4}
                onChange={(event) => setStock(event.target.value)}
                isRequired
              >
                <FormLabel>Stok</FormLabel>
                <Input
                  type="number"
                  placeholder="Stok"
                  defaultValue={props.stock}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
