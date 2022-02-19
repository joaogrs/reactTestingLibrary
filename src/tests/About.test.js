import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('Teste o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const info = screen.getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const aboutPokedex = screen.getByText(/About Pokédex/i);
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const img = screen.getByAltText(/Pokédex/i);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toContain(url);
  });
});
