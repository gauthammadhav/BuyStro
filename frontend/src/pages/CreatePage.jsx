import { 
  Box, Button, Container, Input, useColorModeValue, VStack, Heading, useToast, 
  FormControl, FormLabel, InputGroup, InputLeftElement, Text 
} from '@chakra-ui/react';
import React from 'react'
import { useProductStore } from '../store/product';
import { Image as ImageIcon } from '@chakra-ui/icons';

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={10}
    >
      <Container maxW="md" p={0}>
        <Box
          bg={useColorModeValue("rgba(255,255,255,0.92)", "rgba(26,32,44,0.92)")}
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
          backdropFilter="blur(8px)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          p={{ base: 8, md: 12 }}
          transition="all 0.3s"
        >
          <VStack spacing={8}>
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              color={useColorModeValue("purple.700", "purple.200")}
              fontWeight="extrabold"
              letterSpacing="wide"
              mb={2}
            >
              Create Product
            </Heading>
            <Text fontSize="lg" color={useColorModeValue("gray.500", "gray.400")} mb={4} textAlign="center">
              Add a new product to your store
            </Text>
            <FormControl>
              <FormLabel color={useColorModeValue("purple.700", "purple.200")}>Product Name</FormLabel>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(f) => setNewProduct({ ...newProduct, name: f.target.value })}
                size="lg"
                rounded="xl"
                focusBorderColor="purple.400"
                bg={useColorModeValue("whiteAlpha.900", "gray.800")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                _hover={{ borderColor: "purple.400" }}
                transition="all 0.2s"
              />
            </FormControl>
            <FormControl>
              <FormLabel color={useColorModeValue("purple.700", "purple.200")}>Price</FormLabel>
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                size="lg"
                rounded="xl"
                focusBorderColor="purple.400"
                bg={useColorModeValue("whiteAlpha.900", "gray.800")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                _hover={{ borderColor: "purple.400" }}
                transition="all 0.2s"
              />
            </FormControl>
            <FormControl>
              <FormLabel color={useColorModeValue("purple.700", "purple.200")}>Image URL</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <ImageIcon color={useColorModeValue("purple.400", "purple.300")} />
                </InputLeftElement>
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  size="lg"
                  rounded="xl"
                  focusBorderColor="purple.400"
                  bg={useColorModeValue("whiteAlpha.900", "gray.800")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                  _hover={{ borderColor: "purple.400" }}
                  transition="all 0.2s"
                />
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="purple"
              size="lg"
              w="full"
              rounded="xl"
              onClick={handleAddProduct}
              boxShadow="lg"
              bgGradient="linear(to-r, purple.400, pink.400)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, purple.500, pink.500)",
                transform: "translateY(-2px) scale(1.03)",
                boxShadow: "xl",
              }}
              transition="all 0.2s"
              fontWeight="bold"
              letterSpacing="wide"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default CreatePage;