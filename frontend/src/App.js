import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode'

import UserContext from './context/UserContext';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import MyLinks from './pages/MyLinks';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RedirectPage from './pages/RedirectPage';
import LogoutPage from './pages/LogoutPage';

function App() {
  const [userInfo, setUserInfo] = useState({
    access_token: null,
    username: null,
  });

  const verifyToken = async () => {
    const access_key = localStorage.getItem('access_key');

    if (access_key) {
      try {
        const response = await fetch('/api/user/token/verify/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: access_key }),
        });

        if (response.ok) {
          setUserInfo({
            access_token: access_key,
            username: jwtDecode(access_key).username,
          });
        } else {
          setUserInfo({ access_token: null, username: null });
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setUserInfo({ access_token: null, username: null });
      }
    }
  };

  const updateUserInfo = (value) => {
    setUserInfo(value);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <UserContext.Provider value={{ userInfo, updateUserInfo }}>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Header />

            <Box flex="1" py={4}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mylinks/" element={<MyLinks />} />
                <Route path="/login/" element={<LoginPage />} />
                <Route path="/logout/" element={<LogoutPage />} />
                <Route path="/register/" element={<RegisterPage />} />
                <Route path="/link/:hash" element={<RedirectPage />} />
              </Routes>
            </Box>

            <Footer />
          </Box>
        </UserContext.Provider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
