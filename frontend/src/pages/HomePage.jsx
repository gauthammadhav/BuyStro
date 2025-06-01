import React, { useEffect } from 'react'
import { 
  Container, SimpleGrid, Text, VStack, Box, Button, useColorModeValue 
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ui/ProductCard';

const HomePage = () => {
  const { fetchProducts, filteredProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      py={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW='container.xl' p={0}>
        <VStack spacing={10}>
          <Box
            w="full"
            bg={useColorModeValue("rgba(255,255,255,0.92)", "rgba(26,32,44,0.92)")}
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
            backdropFilter="blur(8px)"
            borderRadius="2xl"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            px={{ base: 6, md: 10 }}
            py={{ base: 8, md: 12 }}
            mb={4}
            transition="all 0.3s"
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              bgGradient="linear(to-r, purple.400, pink.400)"
              bgClip="text"
              textAlign="center"
              letterSpacing="tight"
            >
              Inventory
            </Text>
          </Box>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={8}
            w="full"
          >
            {Array.isArray(filteredProducts()) && filteredProducts().length > 0 ? (
              filteredProducts().map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <Box
                gridColumn="1/-1"
                textAlign="center"
                py={16}
                bg={useColorModeValue("whiteAlpha.800", "gray.800")}
                borderRadius="xl"
                boxShadow="md"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                transition="all 0.3s"
              >
                <Text fontSize="xl" fontWeight="bold" color="gray.500" mb={4}>
                  No products found...
                </Text>
                <Link to="/create">
                  <Button
                    colorScheme="purple"
                    size="lg"
                    rounded="xl"
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
                    Create a product
                  </Button>
                </Link>
              </Box>
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;