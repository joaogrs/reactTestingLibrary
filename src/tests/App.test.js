import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const homeLink = screen.getByRole('link', { name: /home/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favoriteLink).toBeInTheDocument();
    });

  test('A aplicação é redirecionada para a página inicial, ao clicar no link Home.',
    () => {
      const customHistory = createMemoryHistory();
      render(
        <Router history={ customHistory }>
          <App />
        </Router>,
      );

      const homeLink = screen.getByRole('link', { name: /home/i });
      userEvent.click(homeLink);
      expect(customHistory.location.pathname).toBe('/');
    });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritado',
    () => {
      const customHistory = createMemoryHistory();
      render(
        <Router history={ customHistory }>
          <App />
        </Router>,
      );

      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoriteLink);
      expect(customHistory.location.pathname).toBe('/favorites');
    });
  test('Teste se a aplicação é redirecionada para página Not Found em URL desconhecida.',
    () => {
      const customHistory = createMemoryHistory();
      render(
        <Router history={ customHistory }>
          <App />
        </Router>,
      );
      customHistory.push('/queroIrPraXP');

      const notFound = screen.getByText(/Page requested not found/i);
      expect(notFound).toBeInTheDocument();
    });
});
