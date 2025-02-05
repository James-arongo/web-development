export interface CoffeeShop {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
  lat: number;
  lon: number;
}

export interface SearchState {
  location: string;
  isLoading: boolean;
  results: CoffeeShop[];
  error?: string;
}

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}