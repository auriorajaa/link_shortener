import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  Text,
  IconButton,
  useDisclosure,
  Collapse,
  VStack,
  Link,
  Divider,
} from '@chakra-ui/react';
import { Menu, X, Link2 } from 'lucide-react';
import UserContext from '../context/UserContext';

const Header = () => {
  const { userInfo } = useContext(UserContext);
  const { isOpen, onToggle } = useDisclosure();

  const NavLink = ({ to, children }) => (
    <Link
      as={RouterLink}
      to={to}
      fontSize="sm"
      fontWeight="medium"
      color="gray.700"
      _hover={{ color: 'gray.900', textDecoration: 'none' }}
      px={3}
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ to, children }) => (
    <Link
      as={RouterLink}
      to={to}
      fontSize="sm"
      fontWeight="medium"
      color="gray.700"
      _hover={{ color: 'gray.900', textDecoration: 'none' }}
      w="full"
      textAlign="center"
      py={3}
    >
      {children}
    </Link>
  );

  return (
    <Box borderBottom="1px" borderColor="gray.100" bg="white">
      <Container maxW="5xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          {/* Logo and Brand */}
          <HStack spacing={2}>
            <Link2 size={20} className="text-gray-700" />
            <Text
              as={RouterLink}
              to="/"
              fontSize="lg"
              fontWeight="semibold"
              letterSpacing="tight"
              color="gray.900"
              _hover={{ textDecoration: 'none' }}
            >
              Shortener
            </Text>
          </HStack>

          {/* Desktop Navigation */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mylinks/">My Links</NavLink>
          </HStack>

          {/* Desktop Auth Buttons */}
          <HStack spacing={4} alignItems={"center"} display={{ base: 'none', md: 'flex' }}>
            {userInfo.username ? (
              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.800" pt={4}>
                  Hi, {userInfo.username}! 👋
                </Text>
                <Button
                  as={RouterLink}
                  to="/logout/"
                  size="sm"
                  variant="ghost"
                  color="red.500"
                  fontWeight="bold"
                  _hover={{ bg: 'gray.50' }}
                >
                  Logout
                </Button>
              </HStack>
            ) : (
              <HStack spacing={2}>
                <Button
                  as={RouterLink}
                  to="/login/"
                  size="sm"
                  variant="ghost"
                  color="gray.600"
                  fontWeight="medium"
                  _hover={{ bg: 'gray.50' }}
                >
                  Sign in
                </Button>
                <Button
                  as={RouterLink}
                  to="/register/"
                  size="sm"
                  bg="gray.900"
                  color="white"
                  _hover={{ bg: 'gray.800' }}
                  fontWeight="medium"
                >
                  Sign up
                </Button>
              </HStack>
            )}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <X size={20} /> : <Menu size={20} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <VStack py={4} spacing={0}>
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/mylinks/">My Links</MobileNavLink>
            {userInfo.username ? (
              <>
                <Divider />
                <Text fontSize="sm" color="gray.600" py={3}>
                  Hi, {userInfo.username}!
                </Text>
                <MobileNavLink to="/logout/">Logout</MobileNavLink>
              </>
            ) : (
              <>
                <Divider />
                <MobileNavLink to="/login/">Sign in</MobileNavLink>
                <MobileNavLink to="/register/">Sign up</MobileNavLink>
              </>
            )}
          </VStack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Header;