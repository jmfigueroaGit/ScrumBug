import React from 'react';
//List by dom
import { Link } from 'react-router-dom';
//external files
import AuthOption from '../auth/AuthOption';
export default function Header() {
  return (
    <header id='header'>
      <Link to='/'>
        <h1 className='title'>Mern todo</h1>
      </Link>
      <AuthOption />
    </header>
  );
}
