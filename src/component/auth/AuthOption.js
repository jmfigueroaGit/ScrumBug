import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <nav className='auth-options navbar-links'>
      {userData.user ? <button onClick={logout}>Log out</button> : <></>}
    </nav>
  );
}
