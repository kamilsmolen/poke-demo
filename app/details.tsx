import { useLocalSearchParams } from 'expo-router';

import PokemonDetails from '../components/PokemonDetails';
import { View } from '../components/Themed';
import { PokemonDetailsParams } from '../types/pokemons';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<PokemonDetailsParams>();

  return (
    <View>
      <PokemonDetails id={id} />
    </View>
  );
}
