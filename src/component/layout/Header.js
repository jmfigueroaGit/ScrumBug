import React from 'react';
//List by dom
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOption';
//external files

export default function Header() {
  return (
    <header id='header'>
      <div className='navbar'>
        <div className='logo'>
          <a href='index.html'>
            <img src='images/logo.png' width='200px' alt='description' />
          </a>
        </div>
        <a href='index.html' className='menu-btn'>
          <i className='fas fa-bars menu'></i>
        </a>

        <div id='navbar-links'>
          <ul>
            <li>
              <Link to='/'> Home </Link>
            </li>
            <li>
              <a href='features.html'> Features </a>
            </li>
            <li>
              <a href='categories.html'> Categories</a>
            </li>
            <li>
              <a href='about.html'> About </a>
            </li>
            <li>
              <a className='active' href='account.html'>
                Account
              </a>
            </li>
          </ul>
          <AuthOptions />
        </div>
      </div>
    </header>
  );
}
