export interface Pokemon {
  name: string;
  url: string;
}

export type Pokemons = Pokemon[];

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonDetailsResponse {
  name?: string;
  weight?: number;
  height?: number;
  base_experience?: number;
  types?: PokemonType[];
  sprites?: {
    other?: {
      home?: {
        front_default?: string;
      };
    };
  };
}

interface PokemonDetail {
  label: string;
  values: (string | number)[];
}

export type PokemonDetails = PokemonDetail[];

export type PokemonDetailsParams = {
  id: string;
};

export interface PokemonDetailsProps {
  id: string;
}

export interface UseGetPokemonDetailsParams {
  id: string;
  isFavourite: boolean;
}

export interface PokemonsListItemProps {
  pokemonId: string;
  item: Pokemon;
}
