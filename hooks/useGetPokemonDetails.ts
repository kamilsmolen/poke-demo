import { useEffect, useState } from 'react';

import { fetchPokemonDetails } from '../services/api';
import { getFavouritePokemonDetails } from '../services/asyncStorage';
import { PokemonDetails, UseGetPokemonDetailsParams } from '../types/pokemons';
import { mapPokemonDetails } from '../utils/mappers';

export const useGetPokemonDetails = ({
  id,
  isFavourite,
}: UseGetPokemonDetailsParams) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    [],
  );

  useEffect(() => {
    if (isFavourite) {
      getFavouritePokemonDetails()
        .then((details) => setPokemonDetails(details))
        .catch(console.error);
    } else if (id) {
      fetchPokemonDetails(id)
        .then((pokemonDetailsResponse) => {
          setPokemonDetails(mapPokemonDetails(pokemonDetailsResponse));
        })
        .catch(console.error);
    }
  }, [id]);

  return { pokemonDetails };
};
