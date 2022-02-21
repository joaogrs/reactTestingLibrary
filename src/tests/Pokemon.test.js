import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
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

      const name = screen.getByTestId('pokemon-name');
      expect(name).toBeInTheDocument();
      const type = screen.getByTestId('pokemon-type');
      expect(type).toBeInTheDocument();
      const weigth = screen.getByTestId('pokemon-weight');
      expect(weigth).toBeInTheDocument();

      const img = screen.getByAltText(/Mew Sprite/i);
      const url = 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png';
      expect(img.src).toBe(url);
      expect(img.alt).toBe('Mew sprite');
    });
  test('O card possui um link de detalhes', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const link = screen.getByText(/More details/i);
    expect(link.href).toContain('/pokemons/25');
  });
  test('Ao clicar no link, é redirecionado para a página de detalhes.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const link = screen.getByText(/More details/i);
    userEvent.click(link);
    const details = screen.getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    expect(details).toBeInTheDocument();
  });
  test('A url muda ao clicar no link', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const link = screen.getByText(/More details/i);
    userEvent.click(link);
    expect(customHistory.location.pathname).toBe('/pokemons/25');
  });
  test('Se existe icone de estrela nos pokemons favoritados', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const link = screen.getByText(/More details/i);
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const star = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(star.src).toContain('/star-icon.svg');
  });
});
