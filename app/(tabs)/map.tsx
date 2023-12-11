import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, Button, StyleSheet, View, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, LongPressEvent } from 'react-native-maps';

import { Text } from '../../components/Themed';
import { fetchPokemonDetails } from '../../services/api';
import { Coordinate, Marker as MarkerI, Markers } from '../../types/map';
import { PokemonDetailsResponse } from '../../types/pokemons';

export default function MapScreen() {
  const [markers, setMarkers] = useState<Markers>([]);
  const [currentPokemon, setCurrentPokemon] =
    useState<PokemonDetailsResponse | null>(null);

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

  const [currentCoordinate, setCurrentCoordinate] = useState<Coordinate | null>(
    null,
  );
  const [currentPokemonName, setCurrentPokemonName] = useState<string>('');

  const initialRegion = {
    latitude: 50.0483103,
    longitude: 19.9646454,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleLongPress = (e: LongPressEvent) => {
    setAddModalVisible(true);
    setCurrentCoordinate(e.nativeEvent.coordinate);
  };

  const handleMarkerLongPress = (marker: MarkerI) => {
    fetchPokemonDetails(marker.pokemon)
      .then((results) => setCurrentPokemon(results))
      .catch(console.error);
    setViewModalVisible(true);
  };

  return (
    <MapView
      initialRegion={initialRegion}
      onLongPress={(e) => handleLongPress(e)}
      style={styles.map}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          onPress={() => {
            handleMarkerLongPress(marker);
          }}
        />
      ))}
      <Callout>
        <View style={styles.modalSectionContainer}>
          <Modal animationType="slide" transparent visible={addModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContentContainer}>
                <Text style={styles.title}>You spotted new pokemon!</Text>
                <SafeAreaView style={styles.inputContainer}>
                  <TextInput
                    placeholder="Write Pokemon name/id"
                    style={styles.input}
                    value={currentPokemonName}
                    onChangeText={(value) => setCurrentPokemonName(value)}
                  />
                </SafeAreaView>
                <Button
                  title="Save"
                  onPress={() => {
                    if (currentCoordinate)
                      setMarkers([
                        ...markers,
                        {
                          coordinate: currentCoordinate,
                          pokemon: currentPokemonName,
                        },
                      ]);
                    setCurrentPokemonName('');
                    setAddModalVisible(false);
                  }}
                />
                <Button
                  title="Close"
                  onPress={() => {
                    setCurrentPokemonName('');
                    setAddModalVisible(false);
                  }}
                />
              </View>
            </View>
          </Modal>

          <Modal animationType="slide" transparent visible={viewModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContentContainer}>
                <Text style={styles.title}>Pokemon spotted!</Text>
                <Image
                  style={styles.pokemonImage}
                  source={{
                    uri: currentPokemon?.sprites?.other?.home?.front_default,
                  }}
                />
                <Text style={styles.title}>{currentPokemon?.name}</Text>
                <Button
                  title="Close"
                  onPress={() => {
                    setViewModalVisible(false);
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      </Callout>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  modalSectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  inputContainer: {
    minWidth: '50%',
  },
  input: {
    height: 40,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
