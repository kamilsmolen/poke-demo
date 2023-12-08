import { useRouter } from 'expo-router';
import { Banner } from 'react-native-paper';

import PokemonDetails from '../../components/PokemonDetails';
import { View } from '../../components/Themed';
import { useGetFavouritePokemon } from '../../hooks/useGetFavouritePokemon';

export default function FavouriteScreen() {
  const router = useRouter();

  const { favouritePokemonId } = useGetFavouritePokemon();

  if (!favouritePokemonId) {
    return (
      <Banner
        visible
        actions={[
          {
            label: 'Find your Pokemon!',
            onPress: () => router.push({ pathname: '/pokemons' }),
          },
        ]}
      >
        You don't have favourite Pokemon :(
      </Banner>
    );
  }

  return (
    <View>
      <PokemonDetails id={favouritePokemonId} />
    </View>
  );
}
