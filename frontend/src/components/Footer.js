import React from 'react';
import {
  Box,
  Container,
  Text,
  Icon,
} from '@chakra-ui/react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <Box 
      as="footer" 
      bottom="0" 
      w="full" 
      py={2}
      bg="white"
      borderTop="1px"
      borderColor="gray.100"
    >
      <Container 
        maxW="5xl" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
      >
        <Text 
          fontSize="sm" 
          color="gray.500"
          display="flex"
          alignItems="center"
          gap={1}
        >
          © Made with{' '}
          <Icon 
            as={Heart} 
            size={14}
            color="gray.400"
            fill="currentColor"
            transition="all 0.2s"
            _hover={{ color: 'pink.400' }}
          />
          {' '}by{' '}
          <Text
            as="span"
            color="gray.700"
            fontWeight="medium"
            _hover={{ color: 'gray.900' }}
            transition="all 0.2s"
            cursor="pointer"
          >
            auriorajaa
          </Text>
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;