import React from 'react';
import Header from '../components/Header';
import StarTitle from '../components/StarTitle';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/Home.css';
import '../css/WalletContainer.css';

function Home({ history }) {
  const { getStorage } = useLocalStorage(history);

  return (
    <section className='home-container'>
     <Header/>
        <main className='home-main-container'>
          <div className='home-container-star-btn'>
            <StarTitle/>
            <button
              type='button'
              onClick={ () => { history.push('/addToken') } }
              className='home-main-container-btn'
            >
              Add Token
            </button>
          </div>
          {
            getStorage(history)
          }
        </main>
    </section>
  )
}

export default Home;