import { PokemonDetailsResponse } from '../types/pokemons';

export const mapPokemonDetails = (details: PokemonDetailsResponse) => [
  {
    label: 'Name',
    values: [details.name ?? ''],
  },
  {
    label: 'Weight',
    values: [details.weight ?? ''],
  },
  {
    label: 'Height',
    values: [details.height ?? ''],
  },
  {
    label: 'Base Experience',
    values: [details.base_experience ?? ''],
  },
  {
    label: 'Types',
    values: details.types?.map((type) => type.type.name) ?? [''],
  },
];
