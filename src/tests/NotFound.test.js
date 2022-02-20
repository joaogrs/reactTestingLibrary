import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste o componente Not Found', () => {
  test('A página contém um h2 com o texto Page requested not found', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/queroTrabalharNaXP');
    const notFoundMsg = screen.getByRole('heading',
      { name: /Page requested not found Crying emoji/i, level: 2 });

    expect(notFoundMsg).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem not found.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/queroTrabalharNaXP');

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(img.src).toBe(url);
  });
});
