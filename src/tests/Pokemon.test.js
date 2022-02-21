import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const customHistory = createMemoryHistory();
      render(
        <Router history={ customHistory }>
          <App />
        </Router>,
      );
      customHistory.push('pokemons/151');
      const mew = screen.getByText(/Mew/i);
      expect(mew).toBeInTheDocument();
      const psychic = screen.getByText(/psychic/i);
      expect(psychic).toBeInTheDocument();
      const weigth = screen.getByText(/Average weight: 4.0 kg/i);
      expect(weigth).toBeInTheDocument();
    });
});
