import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useCallback } from 'react';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';

import { View } from '../../components/Themed';
import { useFetchPokemons } from '../../hooks/useFetchPokemons';
import { Pokemon, PokemonsListItemProps } from '../../types/pokemons';

export default function PokemonsScreen() {
  const router = useRouter();

  const { pokemons, loadNext, refreshing, refresh } = useFetchPokemons();

  const handlePress = (id: string) => {
    return router.push({ pathname: '/details', params: { id } });
  };

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const Item = memo(({ pokemonId, item }: PokemonsListItemProps) => (
    <List.Item
      title={item.name}
      left={() => (
        <Image
          style={styles.tinyPokemonImage}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          }}
          placeholder={blurhash}
        />
      )}
      onPress={() => handlePress(pokemonId)}
    />
  ));

  const renderItem: ListRenderItem<Pokemon> = useCallback(({ item }) => {
    const paths = item.url.split('/');
    const pokemonId = paths[paths.length - 2];

    return <Item pokemonId={pokemonId} item={item} />;
  }, []);

  return (
    <View>
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        windowSize={2}
        key="pokemons-list"
        keyExtractor={(item) => item.name}
        onEndReachedThreshold={0.3}
        onEndReached={loadNext}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyPokemonImage: {
    width: 50,
    height: 50,
  },
});
