import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Link2, UserPlus } from 'lucide-react';

const MotionBox = motion(Box);

const RegisterPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const doRegister = async () => {
    if (form.password !== form.password2) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        toast({
          title: 'Registration successful!',
          description: 'Please sign in with your credentials',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login/');
      } else {
        const data = await response.json();
        toast({
          title: 'Registration failed',
          description: data.message || 'Please check your input',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    doRegister();
  };

  return (
    <Container maxW="container.sm" p={8} display="flex" alignItems="center" justifyContent="center">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        w="full"
        maxW="400px"
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
              <UserPlus size={28} strokeWidth={2.5} className="text-gray-700" />
            </MotionBox>
            <Heading size="md" fontWeight="semibold" letterSpacing="tight">
              Create your account
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Start managing your shortened links
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
                  placeholder="Choose a username"
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
                    placeholder="Create a password"
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

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password2"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      icon={showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
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
                loadingText="Creating account..."
                transition="all 0.2s"
              >
                Create account
              </Button>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                Already have an account?{' '}
                <ChakraLink
                  color="gray.900"
                  fontWeight="medium"
                  _hover={{ textDecoration: 'none' }}
                  onClick={() => navigate('/login/')}
                  cursor="pointer"
                >
                  Sign in
                </ChakraLink>
              </Text>
            </VStack>
          </form>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default RegisterPage;