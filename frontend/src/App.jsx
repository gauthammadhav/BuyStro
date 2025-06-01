import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Correct import
import CreatePage from './pages/CreatePage';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
