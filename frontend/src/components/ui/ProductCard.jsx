import React, { useState } from "react";
import {
  Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalFooter, ModalOverlay,
  ModalCloseButton, ModalContent, ModalHeader, Text, useColorModeValue, useDisclosure, useToast, VStack
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Product updated successfully" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
  };

  return (
    <Box
      shadow='2xl'
      rounded='2xl'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-8px) scale(1.03)", shadow: "dark-lg" }}
      bg={bg}
      borderWidth={1}
      borderColor={useColorModeValue("gray.100", "gray.700")}
      minH="420px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Image src={product.image} alt={product.name} h={56} w='full' objectFit='cover' />
      <Box p={5} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
        <Heading as='h3' size='md' mb={2} noOfLines={1}>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='2xl' color={textColor} mb={4}>
          {product.price}/-
        </Text>
        <HStack spacing={2} mb={4}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' aria-label="Edit" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme='red'
            aria-label="Delete"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;