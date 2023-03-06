import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Test the "addToken" page', () => {
  const URL_ADD_TOKENS = '/addToken';
  const URL_HOME = '/';

  it('check that the component renders and works correctly', async() => {
    const { history } = renderWithRouter(<App />);

    const addTokenBtn = screen.getByRole('button', {  name: /add token/i });
  
    fireEvent.click(addTokenBtn);
  
    const { pathname } = history.location;
    const headingAddToken =  screen.getByRole('heading', {  name: /add token/i, level: 3});
    const backBtn = screen.getByRole('button', {  name: /voltar/i });
    const inputName = screen.getByTestId('input-name');
    const inputValue = screen.getByTestId('input-value');
    const alert = screen.getByText(/favor preencher os campos acima\./i);
    const saveBtn = screen.getByRole('button', {  name: /save/i });

    expect(pathname).toBe(URL_ADD_TOKENS);
    expect(headingAddToken && backBtn && inputName && inputValue
      && alert && saveBtn).toBeDefined();


    fireEvent.change(inputName, { target: { value: 'nether' } });
    fireEvent.change(inputValue, { target: { value: 1550 } });

    expect(inputName).toHaveValue('nether');
    expect(inputValue).toHaveValue(1550);
    expect(saveBtn).toBeEnabled();

    fireEvent.click(saveBtn);
      
    const headingBIT = screen.getByRole('heading', {  name: /nether/i, level: 4 }); 
    const valueBIT = screen.getByText('1550');

    expect(headingBIT && valueBIT).toBeDefined();

    const addTokenBtn2 = screen.getByRole('button', {  name: /add token/i });

    fireEvent.click(addTokenBtn2);

    const inputName2 = screen.getByTestId('input-name');
    const inputValue2 = screen.getByTestId('input-value');
    const saveBtn2 = screen.getByRole('button', {  name: /save/i });
    const { pathname: pathname2 } = history.location;

    expect(pathname2).toBe(URL_ADD_TOKENS)

    fireEvent.change(inputName2, { target: { value: 'nether' } });
    fireEvent.change(inputValue2, { target: { value: 2550 } });
    fireEvent.click(saveBtn2);
    
    const alertRepeated = await screen.findByText(/favor inserir um nome de token diferente\./i);

    expect(alertRepeated).toBeDefined();

    fireEvent.change(inputName2, { target: { value: 'dogs' } });
    fireEvent.change(inputValue2, { target: { value: 2550 } });
    fireEvent.click(saveBtn2);

    const headingBIT2 = screen.getByRole('heading', {  name: /nether/i, level: 4 }); 
    const valueBIT2 = screen.getByText('1550');

    const headingDOG = screen.getByRole('heading', {  name: /dog/i, level: 4 }); 
    const valueDOG = screen.getByText('2550');

    expect(headingBIT2 && valueBIT2 && headingDOG && valueDOG).toBeDefined();
  });

  it('check back button', async() => {
    const { history } = renderWithRouter(<App />);

    const addTokenBtn = screen.getByRole('button', {  name: /add token/i });
  
    fireEvent.click(addTokenBtn);

    const { pathname } = history.location;

    expect(pathname).toBe(URL_ADD_TOKENS);

    const backBtn = screen.getByRole('button', {  name: /voltar/i });

    fireEvent.click(backBtn);

    const { pathname: pathname2 } = history.location;

    expect(pathname2).toBe(URL_HOME);
  })
});