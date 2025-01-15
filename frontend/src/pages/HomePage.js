import React, { useContext, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  Card,
  CardBody,
  Link,
  HStack,
  IconButton,
  Flex,
  useClipboard,
  InputGroup,
  InputRightElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Tooltip,
  Skeleton,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';
import { Link2, Copy, CheckCheck, ExternalLink, History, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import UserContext from '../context/UserContext';

const MotionBox = motion(Box);

const HomePage = () => {
  const [myLink, setMyLink] = useState([]);
  const [sourceLink, setSourceLink] = useState('');
  const [recentLinks, setRecentLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const { userInfo } = useContext(UserContext);
  const toast = useToast();
  const { onCopy, hasCopied } = useClipboard(`https://mylink.com/link/${myLink?.hash}/`);

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  const containerPadding = useBreakpointValue({ base: 4, md: 8 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Fetch recent links if user is logged in
  useEffect(() => {
    const fetchRecentLinks = async () => {
      if (userInfo.access_token) {
        setIsLoadingRecent(true);
        try {
          const response = await fetch('/api/link/get-links/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.access_token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            // Only show last 5 links
            setRecentLinks(data.slice(0, 5));
          }
        } catch (error) {
          console.error('Error fetching recent links:', error);
        } finally {
          setIsLoadingRecent(false);
        }
      }
    };

    fetchRecentLinks();
  }, [userInfo.access_token, myLink]);

  const createLink = async () => {
    if (!sourceLink) {
      toast({
        title: 'Please enter a URL',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(sourceLink);
    } catch (error) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL including http:// or https://',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };

    if (userInfo.access_token) {
      headers['Authorization'] = `Bearer ${userInfo.access_token}`;
    }

    try {
      const response = await fetch('/api/link/shortener/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          'source_link': sourceLink
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMyLink(data);
        setSourceLink(''); // Clear input after successful creation
        toast({
          title: 'Link shortened successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error shortening link',
          description: 'Please try again',
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

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleLinkFieldChange = (value) => {
    setSourceLink(value);
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    createLink();
  };

  return (
    <Box bg="white">
      {/* Hero Section */}
      <Container maxW="5xl" pt={8} pb={16}>
        <VStack spacing={8} textAlign="center">


          <VStack spacing={4}>
            <Heading
              size="2xl"
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="shorter"
            >
              Make your links
              <Text as="span" color="gray.400"> shorter</Text>
            </Heading>
            <Text fontSize="lg" color="gray.500" maxW="2xl">
              Transform your long URLs into clean, manageable links. Perfect for sharing on social media, emails, or anywhere else.
            </Text>
          </VStack>

          {/* URL Shortener Form */}
          <Box w="full" maxW="2xl" mt={8}>
            <form onSubmit={handleCreateSubmit}>
              <VStack spacing={4}>
                <InputGroup size="lg">
                  <Input
                    onChange={(e) => handleLinkFieldChange(e.target.value)}
                    placeholder="Paste your long URL here"
                    size="lg"
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{ borderColor: 'gray.300' }}
                    _focus={{
                      bg: 'white',
                      borderColor: 'gray.300',
                      boxShadow: 'none'
                    }}
                  />
                  <InputRightElement width="6.5rem" pr={1}>
                    <Button
                      size="sm"
                      type="submit"
                      bg="gray.900"
                      color="white"
                      _hover={{ bg: 'gray.800' }}
                      isLoading={isLoading}
                      rightIcon={<Link2 size={16} />}
                    >
                      Shorten
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
            </form>
          </Box>

          {/* Shortened Link Result */}
          {myLink.hash && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              w="full"
              maxW="2xl"
            >
              <Card variant="outline" bg="gray.50">
                <CardBody>
                  <Flex justify="space-between" align="center">
                    <HStack spacing={2}>
                      <Link2 size={16} className="text-gray-500" />
                      <Link
                        as={RouterLink}
                        to={`/link/${myLink.hash}`}
                        target="_blank"
                        color="gray.700"
                        fontWeight="medium"
                        _hover={{ color: 'gray.900' }}
                      >
                        https://mylink.com/link/{myLink.hash}/
                      </Link>
                    </HStack>
                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={onCopy}
                        leftIcon={hasCopied ? <CheckCheck size={16} /> : <Copy size={16} />}
                      >
                        {hasCopied ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        as={RouterLink}
                        to={`/link/${myLink.hash}`}
                        target="_blank"
                        size="sm"
                        variant="ghost"
                        leftIcon={<ExternalLink size={16} />}
                      >
                        Open
                      </Button>
                    </HStack>
                  </Flex>
                </CardBody>
              </Card>
            </MotionBox>
          )}
        </VStack>

        {userInfo.access_token && (
          <MotionBox
            maxW="2xl"
            mx={"auto"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            mt={12}
            pt={8}
          >
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <HStack spacing={2}>
                  <History size={20} className="text-gray-700" />
                  <Heading size="md">Recent Links</Heading>
                </HStack>
                {recentLinks.length > 0 && (
                  <Button
                    as={RouterLink}
                    to="/mylinks"
                    size="sm"
                    variant="ghost"
                    rightIcon={<ChevronRight size={16} />}
                  >
                    View All
                  </Button>
                )}
              </HStack>

              <Card variant="outline">
                <CardBody p={0}>
                  {isLoadingRecent ? (
                    <VStack spacing={4} p={4}>
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height="40px" width="100%" />
                      ))}
                    </VStack>
                  ) : recentLinks.length === 0 ? (
                    <Box p={4} textAlign="center" color="gray.500">
                      No links created yet. Create your first shortened link above!
                    </Box>
                  ) : (
                    <Box overflowX="auto">
                      <Table variant="simple" size={{ base: 'sm', md: 'md' }}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th textAlign="left">Original Link</Th>
                            <Th textAlign="left">Shortened Link</Th>
                            <Th textAlign="center" width="150px">Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {recentLinks.slice().reverse().map((link) => (
                            <Tr key={link.hash}>
                              <Td maxW={{ base: "150px", md: "300px" }} textAlign="left">
                                <Text isTruncated pt={3.5}>
                                  <Tooltip label={link.source_link}>
                                    <Link
                                      href={link.source_link}
                                      target="_blank"
                                      color="gray.600"
                                    >
                                      {link.source_link}
                                    </Link>
                                  </Tooltip>
                                </Text>
                              </Td>
                              <Td>
                                <Badge colorScheme="blue" fontSize={{ base: 'xs', md: 'sm' }}>
                                  mylink.com/link/{link.hash}
                                </Badge>
                              </Td>
                              <Td>
                                <HStack spacing={2} justify="center">
                                  <IconButton
                                    icon={<Copy size={14} />}
                                    size="sm"
                                    variant="ghost"
                                    aria-label="Copy link"
                                    onClick={() => copyToClipboard(`https://mylink.com/link/${link.hash}/`)}
                                  />
                                  <IconButton
                                    as="a"
                                    href={`/link/${link.hash}`}
                                    target="_blank"
                                    icon={<ExternalLink size={14} />}
                                    size="sm"
                                    variant="ghost"
                                    aria-label="Open link"
                                  />
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  )}
                </CardBody>
              </Card>
            </VStack>
          </MotionBox>
        )}
      </Container>

      {/* Features Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="5xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="lg" fontWeight="semibold">
                Why choose our URL shortener?
              </Heading>
              <Text color="gray.600" maxW="2xl">
                Simple, fast, and reliable link shortening service with features that make sharing easier.
              </Text>
            </VStack>

            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={8}
              justify="center"
              align="stretch"
            >
              {features.map((feature, index) => (
                <Card key={index} flex={1} variant="outline" bg="white">
                  <CardBody>
                    <VStack spacing={4} align="start">
                      <Box p={2} bg="gray.50" borderRadius="md">
                        {feature.icon}
                      </Box>
                      <Heading size="sm">{feature.title}</Heading>
                      <Text color="gray.600" fontSize="sm">
                        {feature.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Flex>
          </VStack>
        </Container>
      </Box>
      <br></br>
    </Box>
  );
};

// Features data
const features = [
  {
    icon: <Link2 size={24} className="text-gray-700" />,
    title: 'Simple & Fast',
    description: 'Create shortened URLs in seconds with our easy-to-use interface.'
  },
  {
    icon: <ExternalLink size={24} className="text-gray-700" />,
    title: 'Track & Manage',
    description: 'Keep track of your shortened links and manage them easily.'
  },
  {
    icon: <Copy size={24} className="text-gray-700" />,
    title: 'Share Anywhere',
    description: 'Perfect for social media, emails, messages, or any other platform.'
  }
];

export default HomePage;