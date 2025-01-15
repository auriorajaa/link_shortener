import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue,
  Alert,
  AlertIcon,
  Flex,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  Tag,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  Trash2,
  ExternalLink,
  Copy,
  Link2,
  Search,
  Filter,
  ChevronDown,
  Share2,
  Info
} from 'lucide-react';

const MotionBox = motion(Box);

const MyLinks = () => {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedLink, setSelectedLink] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const getLinks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/link/get-links/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await response.json();
      setLinks(data);
      setFilteredLinks(data);
    } catch (error) {
      toast({
        title: 'Error fetching links',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo.access_token) {
      getLinks();
    } else {
      navigate('/login/');
    }
  }, []);

  useEffect(() => {
    const filtered = links.filter(link =>
      link.source_link.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.hash.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sorted = [...filtered];
    switch (sortBy) {
      case 'newest':
        sorted = sorted.reverse();
        break;
      case 'oldest':
        break;
      case 'longest-url':
        sorted = sorted.sort((a, b) => b.source_link.length - a.source_link.length);
        break;
      case 'shortest-url':
        sorted = sorted.sort((a, b) => a.source_link.length - b.source_link.length);
        break;
    }

    setFilteredLinks(sorted);
  }, [searchQuery, sortBy, links]);

  const handleDelete = async (hash) => {
    try {
      const response = await fetch(`/api/link/delete-link/${hash}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.access_token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete link');
      }

      toast({
        title: 'Link deleted successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      getLinks();
    } catch (error) {
      toast({
        title: 'Error deleting link',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Link copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const shareLink = async (link) => {
    try {
      await navigator.share({
        title: 'Shared via MyLink',
        text: 'Check out this shortened link!',
        url: `https://mylink.com/link/${link.hash}/`
      });
    } catch (err) {
      copyToClipboard(`https://mylink.com/link/${link.hash}/`);
    }
  };

  const getLinkDetails = async (hash) => {
    try {
      const response = await fetch(`/api/link/get-link/${hash}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.access_token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch link details');
      }

      const data = await response.json();
      setSelectedLink(data);
      onOpen();
    } catch (error) {
      toast({
        title: 'Error fetching link details',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="5xl" px={{ base: 4, md: 8 }} py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'stretch', md: 'center' }}
            spacing={4}
          >
            <VStack align="stretch" spacing={1}>
              <HStack spacing={2}>
                <Link2 size={24} className="text-gray-700" />
                <Heading size="lg" fontWeight="semibold">
                  My Links
                </Heading>
              </HStack>
              <Text color="gray.500" fontSize="sm">
                Manage and track your shortened links
              </Text>
            </VStack>
            <Button
              as={RouterLink}
              to="/"
              size="md"
              bg="black"
              color="white"
              _hover={{ bg: 'gray.800' }}
              leftIcon={<Link2 size={16} />}
            >
              Create New Link
            </Button>

          </Stack>

          {/* Search and Filter Section */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={6}
            align={{ base: 'stretch', md: 'center' }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search size={16} color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="md"
              />
            </InputGroup>

            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDown size={16} />}
                variant="outline"
                w={{ base: 'full', md: 'auto' }}
              >
                <HStack spacing={2}>
                  <Filter size={16} />
                  <Text me={4} pt={4}>Sort by: {sortBy.replace('-', ' ')}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setSortBy('newest')}>Newest</MenuItem>
                <MenuItem onClick={() => setSortBy('oldest')}>Oldest</MenuItem>
                <MenuItem onClick={() => setSortBy('longest-url')}>Longest URL</MenuItem>
                <MenuItem onClick={() => setSortBy('shortest-url')}>Shortest URL</MenuItem>
              </MenuList>
            </Menu>
          </Stack>

          {/* Links Table/List */}
          <Box
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow={{ base: 'hidden', md: 'auto' }}
            boxShadow="sm"
          >
            {isLoading ? (
              <VStack p={4} spacing={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} height="50px" width="100%" />
                ))}
              </VStack>
            ) : filteredLinks.length === 0 ? (
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                {searchQuery ? 'No links found matching your search.' : 'No links found. Create your first shortened link!'}
              </Alert>
            ) : isMobile ? (
              // Mobile view - Card layout
              <VStack spacing={0} align="stretch" divider={<Box borderBottom="1px" borderColor={borderColor} />}>
                {filteredLinks.map((link) => (
                  <Box key={link.hash} p={4}>
                    <VStack align="stretch" spacing={3}>
                      <Box>
                        <Text fontSize="sm" color="gray.500" mb={1}>Original Link</Text>
                        <Text fontSize="sm" isTruncated>
                          {link.source_link}
                          <IconButton
                            as="a"
                            href={link.source_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open link"
                            icon={<ExternalLink size={14} />}
                            size="xs"
                            ml={2}
                            variant="ghost"
                          />
                        </Text>
                      </Box>

                      <Box>
                        <Text fontSize="sm" color="gray.500" mb={1}>Shortened Link</Text>
                        <HStack>
                          <Badge colorScheme="blue" fontSize="sm">
                            mylink.com/link/{link.hash}
                          </Badge>
                          <IconButton
                            icon={<Copy size={14} />}
                            size="xs"
                            variant="ghost"
                            onClick={() => copyToClipboard(`https://mylink.com/link/${link.hash}/`)}
                          />
                        </HStack>
                      </Box>

                      <HStack spacing={2} justify="flex-end">
                        <IconButton
                          icon={<Share2 size={14} />}
                          variant="ghost"
                          size="sm"
                          onClick={() => shareLink(link)}
                        />
                        <IconButton
                          icon={<Info size={14} />}
                          variant="ghost"
                          size="sm"
                          onClick={() => getLinkDetails(link.hash)}
                        />
                        <IconButton
                          icon={<Trash2 size={14} />}
                          colorScheme="red"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this link?')) {
                              handleDelete(link.hash);
                            }
                          }}
                        />
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            ) : (
              // Desktop view - Table layout
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th textAlign="left">Original Link</Th>
                    <Th textAlign="left">Shortened Link</Th>
                    <Th textAlign="center" width="150px">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredLinks.map((link) => (
                    <Tr key={link.hash}>
                      <Td maxW="400px" textAlign="left">
                        <HStack spacing={2}>
                          <Text pt={3} isTruncated>{link.source_link}</Text>
                          <Tooltip label="Open original link">
                            <IconButton
                              as="a"
                              href={link.source_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Open link"
                              icon={<ExternalLink size={14} />}
                              size="xs"
                              variant="ghost"
                            />
                          </Tooltip>
                        </HStack>
                      </Td>
                      <Td textAlign="left">
                        <HStack spacing={2}>
                          <Badge colorScheme="blue" fontSize="sm">
                            mylink.com/link/{link.hash}
                          </Badge>
                          <Tooltip label="Copy shortened link">
                            <IconButton
                              icon={<Copy size={14} />}
                              size="xs"
                              variant="ghost"
                              onClick={() => copyToClipboard(`https://mylink.com/link/${link.hash}/`)}
                            />
                          </Tooltip>
                        </HStack>
                      </Td>
                      <Td textAlign="center">
                        <HStack spacing={2} justifyContent="center">
                          <Tooltip label="Share link">
                            <IconButton
                              icon={<Share2 size={14} />}
                              variant="ghost"
                              size="sm"
                              onClick={() => shareLink(link)}
                            />
                          </Tooltip>
                          <Tooltip label="Link details">
                            <IconButton
                              icon={<Info size={14} />}
                              variant="ghost"
                              size="sm"
                              onClick={() => getLinkDetails(link.hash)}
                            />
                          </Tooltip>
                          <Tooltip label="Delete link">
                            <IconButton
                              icon={<Trash2 size={14} />}
                              colorScheme="red"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this link?')) {
                                  handleDelete(link.hash);
                                }
                              }}
                            />
                          </Tooltip>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

            )}
          </Box>
        </VStack>
      </MotionBox>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Link Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedLink && (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={1}>Original URL</Text>
                  <Text>{selectedLink.source_link}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={1}>Shortened URL</Text>
                  <HStack>
                    <Text>https://mylink.com/link/{selectedLink.hash}/</Text>
                    <IconButton
                      icon={<Copy size={14} />}
                      size="xs"
                      variant="ghost"
                      onClick={() => copyToClipboard(`https://mylink.com/link/${selectedLink.hash}/`)}
                    />
                  </HStack>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={1}>Hash</Text>
                  <Tag colorScheme="blue">{selectedLink.hash}</Tag>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MyLinks;