import React, { useEffect } from 'react';
import useInputs from '../hooks/useInputs';
import '../css/FormToken.css';

function FormToken({ history, edit }) {
  const { handleChange, toStorage, isDisabled, nameIsValid, setItemToEdit, itemToEdit, itemEdited } = useInputs();
  const pathame = history.location.pathname;

  // Recuperar item 
  const recoverItem = () => {
    if(localStorage.getItem('itemToEdit') && history.location.pathname === '/editToken') {
      const item = JSON.parse(localStorage.getItem('itemToEdit'));
      setItemToEdit(item);

      // Seletor DOM
      const inputName = document.getElementById('input-name');
      const inputValue = document.getElementById('input-value');

      // Preenchendo inputs
      inputName.value = item.name;
      inputValue.value = item.value;
    }
  }

  // Limpar localStorage
  const clearStorage = () => {
    if (localStorage.getItem('wishWallet')) {
      const storage = JSON.parse(localStorage.getItem('wishWallet'));
      if(storage.length === 0) {
        localStorage.clear();
      }
    }
  }

  // Remover item selecionado / Alerta
  function removeAlert() {
    const confirmation = window.confirm('Tem certeza que deseja remover esse Token?');
    if(confirmation === true) {
      const storage = JSON.parse(localStorage.getItem('wishWallet'));
      const newStorage = storage.filter((item) => item.name !== itemToEdit.name)
      localStorage.setItem('wishWallet', JSON.stringify(newStorage));
      clearStorage();
    }
    history.push('/');
  }

  useEffect(() => {
    recoverItem();
  }, [])

  return (
    <div className='formToken-main-container'>
      <form className='formToken-form-container'>
        <label className='formToken-label-container'> Token
          <input
            type='text'
            name='name'
            placeholder='KLV, DVK, KFI'
            onChange={ handleChange }
            id='input-name'
          />
        </label>

        {
          !nameIsValid
            && (
              <span className='formToken-form-alert'>Favor inserir um nome de Token diferente.</span>
            )
        }
      
        <label className='formToken-label-container'> Balance
          <input
            type='number'
            name='value'
            placeholder='10,250.50'
            onChange={ handleChange }
            step='0.01'
            id='input-value'
          />
        </label>

        {
          isDisabled && history.location.pathname === '/editToken'
            && (
              <span className='formToken-form-alert'>Favor confirmar os valores do Token e Balance.</span>
            )
        }

        {
          (isDisabled && history.location.pathname === '/addToken' && nameIsValid)
            && (
              <span className='formToken-form-alert'>Favor preencher os campos acima.</span>
            )
        }

        <div className='formToken-btns'>

          {
            edit
              && (
                <button
                  type='button'
                  className='formToken-btn-remove'
                  onClick={ () => removeAlert() }
                >
                Remove
                </button>
              )
          }
          <button
            type='button'
            className='formToken-btn-save'
            onClick={ () => pathame === '/addToken' ? toStorage(history) : itemEdited(history) }
            disabled={ isDisabled }
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormToken;