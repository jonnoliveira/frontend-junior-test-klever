import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Test the "editToken" page', () => {
  const URL_EDIT_TOKENS = '/editToken';
  const URL_ADD_TOKENS = '/addToken';
  const URL_HOME = '/';

  it('check that the component renders and works correctly', () => {
    const { history } = renderWithRouter(<App />);

    const addTokenBtn = screen.getByRole('button', {  name: /add token/i });
  
    fireEvent.click(addTokenBtn);
  
    const inputName = screen.getByLabelText('Token');
    const inputValue = screen.getByLabelText('Balance');
    const saveBtn = screen.getByRole('button', {  name: /save/i });

    expect(inputName).toBeDefined();
    expect(inputName).toHaveAttribute('type', 'text');
    expect(inputValue).toBeDefined();
    expect(inputValue).toHaveAttribute('type', 'number');
    expect(saveBtn).toBeDisabled();

    fireEvent.change(inputName, { target: { value: 'bit' } });
    fireEvent.change(inputValue, { target: { value: 50 } });

    expect(inputName).toHaveValue('bit');
    expect(inputValue).toHaveValue(50);
    expect(saveBtn).toBeEnabled();

    fireEvent.click(saveBtn);
      
    const headingBIT = screen.getByRole('heading', {  name: /bit/i, level: 4 }); 
    const valueBIT = screen.getByText('50');
    const editBtnBIT = screen.getByRole('img', {  name: /bit icon/i})

    expect(headingBIT && valueBIT).toBeDefined();

    fireEvent.click(editBtnBIT);

    const editToken = screen.getByRole('heading', {  name: /edit token/i, level: 3 });

    expect(editToken).toBeDefined();

    const { pathname } = history.location;
    expect(pathname).toBe(URL_EDIT_TOKENS);

    const inputName2 = screen.getByLabelText('Token');
    const inputValue2 = screen.getByLabelText('Balance');
    const saveBtn2 = screen.getByRole('button', {  name: /save/i });

    expect(saveBtn2).toBeDisabled();
    expect(inputName2).toHaveValue('bit');
    expect(inputValue2).toHaveValue(50);

    fireEvent.change(inputName2, { target: { value: 'etherium' } });
    fireEvent.change(inputValue2, { target: { value: 3780 } });

    expect(saveBtn2).toBeEnabled();

    fireEvent.click(saveBtn2);

    const headingETHER = screen.getByRole('heading', {  name: /etherium/i, level: 4 }); 
    const valueETHER = screen.getByText('3780');
    const editBtnETHER = screen.getByRole('img', {  name: /etherium icon/i})

    expect(headingETHER && valueETHER && editBtnETHER).toBeDefined();

    fireEvent.click(editBtnETHER);

    const { pathname: pathname2 } = history.location;

    expect(pathname2).toBe(URL_EDIT_TOKENS);
    
    const inputName3 = screen.getByLabelText('Token');
    const inputValue3 = screen.getByLabelText('Balance');
    const removeBtn = screen.getByRole('button', {  name: /remove/i });

    expect(inputName3).toHaveValue('etherium')
    expect(inputValue3).toHaveValue(3780);

    global.confirm = jest.fn().mockImplementation(() => true)

    fireEvent.click(removeBtn);

    expect(global.confirm).toBeCalled(); 

    const walletImage = screen.getByRole('img', {  name: /empty wallet icon/i });

    expect(walletImage).toBeDefined();

  });

  it('checks if an item with that name already exists', () => {
    const { history } = renderWithRouter(<App />);

    const addTokenBtn = screen.getByRole('button', {  name: /add token/i });
  
    fireEvent.click(addTokenBtn);
  
    const inputName = screen.getByLabelText('Token');
    const inputValue = screen.getByLabelText('Balance');
    const saveBtn = screen.getByRole('button', {  name: /save/i });

    fireEvent.change(inputName, { target: { value: 'roma' } });
    fireEvent.change(inputValue, { target: { value: 28 } });

    expect(inputName).toHaveValue('roma');
    expect(inputValue).toHaveValue(28);
    expect(saveBtn).toBeEnabled();

    fireEvent.click(saveBtn);
      
    const headingROMA = screen.getByRole('heading', {  name: /roma/i, level: 4 }); 
    const valueROMA = screen.getByText('28');

    expect(headingROMA && valueROMA).toBeDefined();

    const addTokenBtn2 = screen.getByRole('button', {  name: /add token/i });
  
    fireEvent.click(addTokenBtn2);

    const { pathname } = history.location;
    expect(pathname).toBe(URL_ADD_TOKENS);

    const inputName2 = screen.getByLabelText('Token');
    const inputValue2 = screen.getByLabelText('Balance');
    const saveBtn2 = screen.getByRole('button', {  name: /save/i });

    expect(saveBtn2).toBeDisabled();

    fireEvent.change(inputName2, { target: { value: 'slc' } });
    fireEvent.change(inputValue2, { target: { value: 2000 } });

    expect(saveBtn2).toBeEnabled();

    fireEvent.click(saveBtn2);

    const headingSLC = screen.getByRole('heading', {  name: /slc/i, level: 4 }); 
    const valueSLC = screen.getByText('2000');
    const editBtnSLC = screen.getByRole('img', {  name: /slc icon/i})

    expect(headingSLC && valueSLC && editBtnSLC).toBeDefined();

    fireEvent.click(editBtnSLC);

    const { pathname: pathname2 } = history.location;

    expect(pathname2).toBe(URL_EDIT_TOKENS);
    
    const inputName3 = screen.getByLabelText('Token');
    const inputValue3 = screen.getByLabelText('Balance');
    
    expect(inputName3).toHaveValue('slc');
    
    fireEvent.change(inputName3, { target: { value: 'roma' } });
    fireEvent.change(inputValue3, { target: { value: 2 } });
    
    const inputName4 = screen.getByLabelText('Token');
    
    expect(inputName4).toHaveValue('roma');
    
    const saveBtn3 = screen.getByRole('button', {  name: /save/i });
    
    expect(saveBtn3).toBeEnabled();

    fireEvent.click(saveBtn3);
    
    const alert = screen.getByText(/favor inserir um nome de token diferente\./i);
    
    expect(alert).toBeDefined();

    const inputName5 = screen.getByLabelText('Token');
    const inputValue5 = screen.getByLabelText('Balance');
    const saveBtn5 = screen.getByRole('button', {  name: /save/i });

    fireEvent.change(inputName5, { target: { value: 'hul' } });
    fireEvent.change(inputValue5, { target: { value: 50 } });

    expect(inputName5).toHaveValue('hul');

    fireEvent.click(saveBtn5);

    const { pathname: pathname3 } = history.location;

    expect(pathname3).toBe(URL_HOME);

    const headingHUL = screen.getByRole('heading', {  name: /hul/i, level: 4 });

    expect(headingHUL).toBeDefined();
  });

  it('check back button', () => {
    const { history } = renderWithRouter(<App />);
    
    const addTokenBtn = screen.getByRole('button', {  name: /add token/i });
  
    fireEvent.click(addTokenBtn);
  
    const inputName = screen.getByLabelText('Token');
    const inputValue = screen.getByLabelText('Balance');
    const saveBtn = screen.getByRole('button', {  name: /save/i });

    expect(inputName).toBeDefined();
    expect(inputName).toHaveAttribute('type', 'text');
    expect(inputValue).toBeDefined();
    expect(inputValue).toHaveAttribute('type', 'number');
    expect(saveBtn).toBeDisabled();

    fireEvent.change(inputName, { target: { value: 'bit' } });
    fireEvent.change(inputValue, { target: { value: 570 } });

    expect(inputName).toHaveValue('bit');
    expect(inputValue).toHaveValue(570);
    expect(saveBtn).toBeEnabled();

    fireEvent.click(saveBtn);
      
    const headingBIT = screen.getByRole('heading', {  name: /bit/i, level: 4 }); 
    const valueBIT = screen.getByText('570');
    const editBtnBIT = screen.getByRole('img', {  name: /bit icon/i})

    expect(headingBIT && valueBIT).toBeDefined();

    fireEvent.click(editBtnBIT);

    const backBtn = screen.getByRole('button', {  name: /voltar/i });

    fireEvent.click(backBtn);

    const { pathname } = history.location;

    expect(pathname).toBe(URL_HOME);
  })
});