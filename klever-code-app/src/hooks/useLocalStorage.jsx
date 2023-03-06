import edit from '../assets/edit.svg';
import empty from '../assets/empty-wallet.png';

function useLocalStorage(history) { 

  // Recuperar o item, seta no localStorage e redireciona
  const recoverAndpush = (item) => {
    const storage = JSON.parse(localStorage.getItem('wishWallet'));
    const editToken = storage.find((t) => t.name === item.name);

    localStorage.setItem('itemToEdit', JSON.stringify(editToken))
    history.push('/editToken')
  }

  // Validar e retornar os items do localStorage para a wallet no Home
  const getStorage = () => {
    if(localStorage.getItem('wishWallet')) {
      const storage = JSON.parse(localStorage.getItem('wishWallet'));

      return(
        <div className='home-wallet-container'>
          <div className='home-wallet-titles'>
            <h6>Tokens</h6>
            <h6>Balance</h6>
          </div>
          <div>
            {
              storage.map((item, index) => (
                <div key={`${ item.name }-${ index }`} className='home-wallet-items'>
                  <div className='home-wallet-btn-title'>
                    <button
                      type='button' 
                      className='home-wallet-items-btn'
                      onClick={() => recoverAndpush(item) }
                    >
                      <img src={ edit } alt={`${ item.name } icon`} />
                    </button>
                    <h4 className='home-wallet-item-name'>{ item.name }</h4>
                  </div>
                  <p className='home-wallet-item-value'>{ item.value }</p>
                </div>
              ))
            }
          </div>
        </div>
      )
    } else {
      return(
        <div className='home-wallet-empty'>
          <img src={ empty } alt="Empty Wallet icon" />
          <h4>cri cri...</h4>
          <p>Não há nada aqui.</p>
        </div>
      )
    }
  }

  return ({ getStorage })
}

export default useLocalStorage;