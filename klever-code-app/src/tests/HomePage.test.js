import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Test the "Home" page', () => {
  it('check if the component rendered', () => {
    renderWithRouter(<App />)

    const logo = screen.getByRole('img', { name: /logo klever icon/i });
    const headingWallet = screen.getByRole('heading', { name: /wish wallet/i, level: 2 });
    const shottingStarImage = screen.getByRole('img', { name: /shooting star icon/i });
    const btnAdd = screen.getByRole('button', {  name: /add token/i });
    const walletImage = screen.getByRole('img', {  name: /empty wallet icon/i });
    const headingCri = screen.getByRole('heading', {  name: /cri cri\.\.\./i, level: 4 });
    const paragraph = screen.getByText(/não há nada aqui\./i);

    expect(logo && headingWallet && shottingStarImage && btnAdd && walletImage &&
      headingCri && paragraph).toBeDefined();
  })
})