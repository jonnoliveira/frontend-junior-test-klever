import { useState, useEffect } from 'react'

function useInputs() {
  const [ formValues, setFormValues ] = useState({ name: '', value: '' });
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ nameIsValid, setNameIsValid ] = useState(true);
  const [ itemToEdit, setItemToEdit ] = useState('')

  //  Capturar informações do usuário
  const handleChange = ({ target }) => {
    const { name, value } = target;
    const lower = value.toLowerCase();

    setFormValues({ ...formValues, [name] : lower  });
  };

  // Validar botão save
  const btnSaveValidation = () => {
    const { name, value } = formValues;

    if (name.length !== 0 && value.length !== 0){
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  //Editar item
  const itemEdited = (history) => {
    const items = JSON.parse(localStorage.getItem('wishWallet'));
    const newItems = items.filter((item) => item.name !== itemToEdit.name)

    // Verifica se o array está vazio
    if(newItems.length === 0) {
      newItems.push(formValues);
      localStorage.setItem('wishWallet', JSON.stringify(newItems))
      history.push('/');
    }
    
    // Verifica se o novo nome também ja existe
    newItems.forEach((item) => {
      if(item.name === formValues.name) {
        return setNameIsValid(false);
      } else {
        newItems.push(formValues);
        localStorage.setItem('wishWallet', JSON.stringify(newItems))
        history.push('/');
      }
    })
  }

  // Validar e Salvar no localStorage
  const toStorage = (history) => {
    const { name } = formValues;

    if(localStorage.getItem('wishWallet')) {
      const storage = JSON.parse(localStorage.getItem('wishWallet'));
      const validationName = storage.some((item) => item.name === name);
        if (validationName === true && history.location.pathname === '/addToken') {
          setIsDisabled(true);
          return setNameIsValid(false);
        } else {
          const newStorage = [...storage, formValues ]
          localStorage.setItem('wishWallet', JSON.stringify(newStorage));
          history.push('/');
        } 
    } else {
      localStorage.setItem('wishWallet', JSON.stringify([formValues]));
      history.push('/');
    }
  }

  useEffect(() => {
    btnSaveValidation();
  },[ formValues ])

  return ({ handleChange, toStorage, isDisabled, nameIsValid, setItemToEdit, itemToEdit, itemEdited });
}

export default useInputs;