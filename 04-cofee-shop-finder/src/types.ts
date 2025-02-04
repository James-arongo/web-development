export interface CoffeeShop {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
}

export interface SearchState {
  location: string;
  isLoading: boolean;
  results: CoffeeShop[];
}