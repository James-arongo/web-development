import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CoffeeShopCard } from './components/CoffeeShopCard';
import { calculateScore } from './utils/rankingAlgorithm';
import { geocodeLocation, fetchCoffeeShops, convertToShop } from './utils/openStreetMapService';
import type { SearchState } from './types';

function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    location: '',
    isLoading: false,
    results: []
  });

  const handleSearch = async () => {
    if (!searchState.location.trim()) return;
    
    setSearchState(prev => ({ ...prev, isLoading: true, error: undefined }));
    
    try {
      // First, geocode the location to get coordinates
      const { lat, lon } = await geocodeLocation(searchState.location);
      
      // Then fetch coffee shops near those coordinates
      const rawShops = await fetchCoffeeShops(lat, lon);
      
      // Convert the raw data to our format and sort by score
      const shops = rawShops
        .map(convertToShop)
        .sort((a, b) => {
          const scoreA = calculateScore(a.rating, a.reviewCount);
          const scoreB = calculateScore(b.rating, b.reviewCount);
          return scoreB - scoreA;
        });

      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        results: shops
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
        results: []
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="text-blue-600" size={40} />
            <h1 className="text-4xl font-bold ml-3">CoffeeSpot Finder</h1>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Find real coffee shops anywhere in the world
          </p>
          <SearchBar
            location={searchState.location}
            onLocationChange={(location) => setSearchState(prev => ({ ...prev, location }))}
            onSearch={handleSearch}
            isLoading={searchState.isLoading}
          />
          
          {searchState.error && (
            <div className="mt-4 text-red-600">
              {searchState.error}
            </div>
          )}
        </div>

        {searchState.results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {searchState.results.map((shop) => (
              <CoffeeShopCard
                key={shop.id}
                name={shop.name}
                rating={shop.rating}
                reviewCount={shop.reviewCount}
                address={shop.address}
                image={shop.image}
              />
            ))}
          </div>
        )}

        {searchState.location && !searchState.isLoading && searchState.results.length === 0 && !searchState.error && (
          <div className="text-center text-gray-600 mt-8">
            No coffee shops found in this area. Try another location.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;