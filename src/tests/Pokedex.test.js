import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const h2 = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(h2).toBeInTheDocument();
  });
  test('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const buttonNext = screen.getByText(/Próximo pokémon/i);
      expect(buttonNext).toBeInTheDocument();

      const pokemonsName = pokemons.map((pokemon) => pokemon.name);
      pokemonsName.forEach((pokemon) => {
        const actuallyPoke = screen.getByText(pokemon);
        expect(actuallyPoke).toBeInTheDocument();
        userEvent.click(buttonNext);
      });

      const pikachu = screen.getByText(/Pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });
  test('É mostrado um pokémon por vez', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const img = screen.getAllByRole('img');
    expect(img.length).toBe(1);
  });
  test('Possui botões de filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonTypes = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    pokemonTypes.forEach((type) => {
      expect(screen.getByRole('button', { name: type }))
        .toBeInTheDocument();
    });

    const electricTypeBtn = screen.getByRole('button', { name: /electric/i });
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(electricTypeBtn);
    expect(nextBtn).toBeDisabled();

    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    typeBtn.forEach((btn, i) => expect(btn)
      .toHaveTextContent(pokemonTypes[i]));

    const allBtn = screen.getByText(/all/i);
    expect(allBtn).toBeVisible();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allBtn = screen.getByText(/all/i);
    expect(allBtn).toBeInTheDocument();

    const electric = screen.getByRole('button', { name: /electric/i });
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(electric);
    expect(nextBtn).toBeDisabled();

    userEvent.click(allBtn);
    const pokemonsName = pokemons.map((pokemon) => pokemon.name);
    pokemonsName.forEach((pokemon) => {
      const actuallyPoke = screen.getByText(pokemon);
      expect(actuallyPoke).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
