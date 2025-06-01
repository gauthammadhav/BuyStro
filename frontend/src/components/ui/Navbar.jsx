import React from 'react';
import { 
  Box, Container, Flex, HStack, Button, useColorMode, IconButton, Input, InputGroup, InputLeftElement, Spacer, Badge, Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon, SearchIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { useProductStore } from '../../store/product'; // 

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const setSearchQuery = useProductStore((state) => state.setSearchQuery); // ✅ step 2

  return (
    <Box bg={colorMode === 'light' ? 'whiteAlpha.900' : 'gray.900'} boxShadow="sm" py={2} mb={6}>
      <Container maxW="1140px" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* Logo */}
          <Link to="/">
            <Text
              fontSize={{ base: "2xl", sm: "3xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              bgGradient="linear(to-r, purple.400, pink.400)"
              bgClip="text"
              transition="all 0.2s"
              _hover={{ filter: "brightness(1.2)" }}
            >
              BuyStro🛒
            </Text>
          </Link>

          {/* Search Bar */}
          <InputGroup maxW="350px" mx={4} flex="1">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input 
              type="text" 
              placeholder="Search products..." 
              rounded="full" 
              bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </InputGroup>

          <Spacer />

          {/* Actions */}
          <HStack spacing={2}>
            <Link to="/create">
              <Button leftIcon={<PlusSquareIcon />} colorScheme="purple" variant="solid">
                Add Product
              </Button>
            </Link>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <IoMoon /> : <LuSun size="20" />}
              onClick={toggleColorMode}
              variant="ghost"
              fontSize="xl"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;