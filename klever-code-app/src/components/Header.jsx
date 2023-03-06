import React from 'react';
import logo from '../assets/logo.svg';
import '../css/Header.css';

function header() {
  return (
    <header className='home-header-container'>
      <img src={ logo } alt='Logo Klever icon' />
    </header>
  )
}

export default header