import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Divider,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Link2 } from 'lucide-react';

const MotionBox = motion(Box);

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_key', data.access);

        toast({
          title: 'Welcome back!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/');
        window.location.reload();
      } else {
        toast({
          title: 'Login failed',
          description: 'Please check your credentials',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin();
  };

  return (
    <Container maxW="container.sm" pt={10} display="flex" alignItems="center" justifyContent="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          w="full"
          maxW={{ base: "100%", lg: "400px" }}
          mx="auto"
          p={8}
          borderRadius="lg"
          bg="white"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={2}>
              <MotionBox
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                display="flex"
                justifyContent="center"
              >
                <Link2 size={28} strokeWidth={2.5} className="text-gray-700" />
              </MotionBox>
              <Heading size="md" fontWeight="semibold" letterSpacing="tight">
                Welcome back
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Sign in to manage your shortened links
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Username
                  </FormLabel>
                  <Input
                    name="username"
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    size="md"
                    fontSize="sm"
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ borderColor: 'gray.300' }}
                    _focus={{
                      bg: 'white',
                      borderColor: 'gray.300',
                      boxShadow: 'none'
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      size="md"
                      fontSize="sm"
                      bg="gray.50"
                      border="1px"
                      borderColor="gray.200"
                      _placeholder={{ color: 'gray.400' }}
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        bg: 'white',
                        borderColor: 'gray.300',
                        boxShadow: 'none'
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        color="gray.400"
                        _hover={{ color: 'gray.600' }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  size="md"
                  fontSize="sm"
                  fontWeight="medium"
                  bg="gray.900"
                  color="white"
                  _hover={{ bg: 'gray.800' }}
                  _active={{ bg: 'gray.700' }}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  transition="all 0.2s"
                >
                  Sign in
                </Button>
              </VStack>
            </form>

            <VStack spacing={4} pt={4}>
              <Divider />
              <Text fontSize="sm" color="gray.500">
                Don't have an account?{' '}
                <Link as={RouterLink} to="/register" color="black" fontWeight="medium">
                  Sign up
                </Link>
              </Text>
            </VStack>
          </VStack>
        </MotionBox>
    </Container>
  );
};

export default LoginPage;