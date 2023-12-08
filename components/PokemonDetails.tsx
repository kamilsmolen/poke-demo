import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';
import { useGetFavouritePokemon } from '../hooks/useGetFavouritePokemon';
import { useGetPokemonDetails } from '../hooks/useGetPokemonDetails';
import { PokemonDetailsProps } from '../types/pokemons';

export default function PokemonDetails({ id }: PokemonDetailsProps) {
  const { favouritePokemonId, setFavouritePokemon, removeFavouritePokemon } =
    useGetFavouritePokemon();

  const isFavourite = favouritePokemonId === id;

  const { pokemonDetails } = useGetPokemonDetails({ id, isFavourite });

  const handlePress = async () => {
    try {
      if (!isFavourite && id && pokemonDetails) {
        setFavouritePokemon(id, pokemonDetails);
      } else {
        removeFavouritePokemon();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pokemonImageContainer}>
        <Image
          style={styles.pokemonImage}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
          }}
        />
      </View>
      <View>
        {pokemonDetails?.map((detail) => (
          <View style={styles.listContainer} key={detail.label}>
            <Text style={styles.label}>{detail.label}:</Text>
            <Text style={styles.value}>{detail.values.join(', ')}</Text>
          </View>
        ))}
      </View>
      <View style={styles.favouriteContainer}>
        <FontAwesome
          name={isFavourite ? 'heart' : 'heart-o'}
          size={25}
          onPress={handlePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 24,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    paddingLeft: 4,
  },
  pokemonImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  favouriteContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
  },
});
