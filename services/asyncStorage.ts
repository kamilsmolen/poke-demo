import AsyncStorage from '@react-native-async-storage/async-storage';

import { PokemonDetails } from '../types/pokemons';

const FAVOURITE_POKEMON_DETAILS = 'FAVOURITE_POKEMON_DETAILS';
const FAVOURITE_POKEMON_ID = 'FAVOURITE_POKEMON_ID';

export const setFavouritePokemonDetails = async (value: PokemonDetails) => {
  try {
    await AsyncStorage.setItem(
      FAVOURITE_POKEMON_DETAILS,
      JSON.stringify(value),
    );
  } catch (e) {
    console.log(e);
  }
};

export const setFavouritePokemonId = async (value: string) => {
  try {
    await AsyncStorage.setItem(FAVOURITE_POKEMON_ID, value);
  } catch (e) {
    console.log(e);
  }
};

export const getFavouritePokemonDetails = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVOURITE_POKEMON_DETAILS);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const getFavouritePokemonId = async () => {
  try {
    return await AsyncStorage.getItem(FAVOURITE_POKEMON_ID);
  } catch (e) {
    console.log(e);
  }
};

export const removeFavouritePokemon = async () => {
  try {
    await AsyncStorage.removeItem(FAVOURITE_POKEMON_ID);
    await AsyncStorage.removeItem(FAVOURITE_POKEMON_DETAILS);
  } catch (e) {
    console.log(e);
  }
};
