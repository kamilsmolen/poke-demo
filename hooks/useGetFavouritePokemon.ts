import { useFocusEffect } from 'expo-router';
import { useState } from 'react';

import * as asyncStorage from '../services/asyncStorage';
import { PokemonDetails } from '../types/pokemons';

export const useGetFavouritePokemon = () => {
  const [favouritePokemonId, setFavouritePokemonId] = useState<string | null>();

  useFocusEffect(() => {
    asyncStorage
      .getFavouritePokemonId()
      .then((id) => setFavouritePokemonId(id))
      .catch(console.error);
  });

  const setFavouritePokemon = (id: string, details: PokemonDetails) => {
    asyncStorage.setFavouritePokemonId(id);
    asyncStorage.setFavouritePokemonDetails(details);
    setFavouritePokemonId(id);
  };

  const removeFavouritePokemon = () => {
    asyncStorage.removeFavouritePokemon();
    setFavouritePokemonId(null);
  };

  return { favouritePokemonId, setFavouritePokemon, removeFavouritePokemon };
};
