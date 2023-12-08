import { useCallback, useEffect, useState } from 'react';

import { FETCH_POKEMONS_LIMIT, fetchPokemons } from '../services/api';
import { Pokemons } from '../types/pokemons';

export const useFetchPokemons = () => {
  const [offset, setOffset] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemons>([]);

  useEffect(() => {
    fetchPokemons(offset)
      .then((pokemons) => {
        setPokemons(pokemons);
      })
      .catch(console.error);
  }, []);

  const loadNext = () => {
    const newOffset = offset + FETCH_POKEMONS_LIMIT;
    fetchPokemons(newOffset)
      .then((nextPokemons) => {
        setPokemons([...pokemons, ...nextPokemons]);
        setOffset(newOffset);
      })
      .catch(console.error);
  };

  const refresh = useCallback(() => {
    const newOffset = 0;

    setRefreshing(true);

    fetchPokemons(newOffset)
      .then((nextPokemons) => {
        setPokemons(nextPokemons);
        setOffset(newOffset);
      })
      .catch(console.error)
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  return { pokemons, loadNext, refreshing, refresh };
};
