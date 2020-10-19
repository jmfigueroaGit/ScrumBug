import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Axios from 'axios';
import Header from './component/layout/Header';
import UserContext from './context/UserContext';
import Body from './component/pages/Body';

import './App.scss';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:5000/users/', {
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Body />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
