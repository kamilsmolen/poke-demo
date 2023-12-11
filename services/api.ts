import axios from 'axios';

export const FETCH_POKEMONS_LIMIT = 20;

export const fetchPokemons = (offset = 0) => {
  return axios
    .get(
      `https://pokeapi.co/api/v2/pokemon?limit=${FETCH_POKEMONS_LIMIT}&offset=${offset}`,
    )
    .then((response) => response.data.results)
    .catch(console.error);
};

export const fetchPokemonDetails = (id: string) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.data)
    .catch(console.error);
};
