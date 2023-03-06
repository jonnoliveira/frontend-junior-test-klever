import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { act } from 'react-dom/test-utils';

describe('Test the "Not Found" page', () => {
  const URL_ERROR = '/addTokenn';
  const URL_HOME = '/';


  it('check if the component rendered', async() => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(URL_ERROR);
    })

    const errorImg = await screen.findByRole('img', {  name: /error icon/i });
    const headingError = screen.getByRole('heading', {  name: /hm\.\.\./i});
    const textError = screen.getByText(  /parece que erramos o caminho, não é mesmo\? tente novamente!/i);
    const btnHome = screen.getByRole('button', {  name: /inicio/i});

    expect(errorImg && headingError && textError && btnHome).toBeDefined();

    fireEvent.click(btnHome);

    const { pathname } = history.location;
    expect(pathname).toBe(URL_HOME);
  });
});