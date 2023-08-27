import logo from '../../images/logo.svg';
import React from 'react';
import './Logo.css'

function Logo() {
  return (
        <a href="/">
          <img className='header__logo' src={logo} alt='Movies Explorer'/>
        </a>
  );
}

export default Logo;