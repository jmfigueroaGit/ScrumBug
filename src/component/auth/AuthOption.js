import React, { useContext } from 'react';
//html href
import { useHistory } from 'react-router-dom';
//extension files
import UserContext from '../../context/UserContext';
export default function AuthOption() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <nav className='auth-options'>
      {userData.user ? (
        <button onClick={logout}> Log Out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
}
