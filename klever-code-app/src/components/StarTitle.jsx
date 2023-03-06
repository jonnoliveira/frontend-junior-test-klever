import React from 'react';
import star from '../assets/shooting-star.svg';
import '../css/StarTitle.css';

function StarTitle() {
  return (
    <div className='startTitle-container'>
      <img src={ star } alt='Shooting star icon' />
      <h2>Wish Wallet</h2>
    </div>
  )
}

export default StarTitle