import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/pokemons/10');
    const checkboxPoke = screen.getByRole('checkbox');
    userEvent.click(checkboxPoke);

    customHistory.push('/pokemons/78');
    userEvent.click(checkboxPoke);

    customHistory.push('/favorites');

    const caterpie = screen.getByText(/caterpie/i);
    const rapidash = screen.getByText(/rapidash/i);
    expect(caterpie && rapidash).toBeInTheDocument();
  });
});
