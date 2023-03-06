import React from 'react';
import Header from '../components/Header';
import FormToken from '../components/FormToken';
import StarTitle from '../components/StarTitle';
import '../css/AddEditToken.css';

function AddToken({ history }) {
  return (
    <section className='addEditToken-container'>
      <Header />
      <main className='addEditToken-container-inputs'>
        <StarTitle />
        <div className='addEditToken-title'>
          <h3>Add Token</h3>
          <button type='button' onClick={ () => history.push('/') }> Voltar </button>
        </div>
        <FormToken history={ history } edit={ false }/>
      </main>
    </section>
  )
}

export default AddToken;