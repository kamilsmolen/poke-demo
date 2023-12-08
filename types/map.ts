export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Marker {
  coordinate: Coordinate;
  pokemon: string;
}

export type Markers = Marker[];
