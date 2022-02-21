import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  const pokemonDetails = pokemons[0];
  const { foundAt } = pokemonDetails;
  test('A página deve conter um texto <name> Details', () => {
    const p = 'This intelligent Pokémon roasts hard berries with'
     + ' electricity to make them tender enough to eat.';
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const detailsLink = screen.getByText(/More details/i);
    userEvent.click(detailsLink);

    const details = screen.getByText(/Pikachu Details/i);
    expect(details).toBeInTheDocument();

    expect(detailsLink).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryHeading).toBeInTheDocument();

    const paragraph = screen.getByText(p);
    expect(paragraph).toBeInTheDocument();
  });
  test('Existe na pagina uma seção com mapas', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/pokemons/25');
    const locationOfPikachu = screen.getByText(/Game Locations of Pikachu/i);
    expect(locationOfPikachu).toBeInTheDocument();

    const locationsMap = screen.getAllByAltText('Pikachu location');
    const numberOfLocations = foundAt.length;
    expect(locationsMap).toHaveLength(numberOfLocations);

    foundAt.forEach(({ location, map }, i) => {
      const pokeName = screen.getByText(location);
      const locationMap = screen.getAllByAltText(/Pikachu location/i);
      expect(pokeName).toBeInTheDocument();
      expect(locationMap[i].src).toContain(map);
      expect(locationMap[i].alt).toContain('Pikachu location');
    });
  });
  test('Se o usuario pode favoritar um pokémon', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/pokemons/25');
    const checkbox = screen.getByRole('checkbox');
    const checkboxText = screen.getByText(/Pokémon favoritado?/i);
    expect(checkbox && checkboxText).toBeInTheDocument();

    userEvent.click(checkbox);
    const star = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();

    const checkboxLabel = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkboxLabel).toBeInTheDocument();
  });
});
