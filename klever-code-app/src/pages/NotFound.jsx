import React from 'react';
import error from '../assets/error.png';
import '../css/notfound.css';

function NotFound({ history }) {
  return (
    <section className='notfound-container'>
      <div className='notfound-image-coments'>
        <img src={ error } alt="Error icon" />
        <div className='notfound-coments'>
          <h3>HM...</h3>
          <p>Parece que erramos o caminho, não é mesmo? Tente novamente!</p>
        </div>
        <button
          type='button'
          onClick={() => history.push('/')}
          className='notfound-btn'
        >
          Inicio
        </button>
      </div>
    </section>
  )
}

export default NotFound