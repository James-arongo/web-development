import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CoffeeShopCard } from './components/CoffeeShopCard';
import { calculateScore } from './utils/rankingAlgorithm';
import type { CoffeeShop, SearchState } from './types';

// Simulated data - in a real app, this would come from Google Maps API
const MOCK_COFFEE_SHOPS: CoffeeShop[] = [
  {
    id: '1',
    name: 'Ritual Coffee Roasters',
    rating: 4.7,
    reviewCount: 1200,
    address: '1026 Valencia St, San Francisco, CA 94110',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    name: 'Blue Bottle Coffee',
    rating: 4.8,
    reviewCount: 800,
    address: '66 Mint Plaza, San Francisco, CA 94103',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '3',
    name: 'Sightglass Coffee',
    rating: 4.6,
    reviewCount: 950,
    address: '270 7th St, San Francisco, CA 94103',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
];

function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    location: '',
    isLoading: false,
    results: []
  });

  const handleSearch = async () => {
    setSearchState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sort coffee shops by our ranking algorithm
    const sortedShops = [...MOCK_COFFEE_SHOPS].sort((a, b) => {
      const scoreA = calculateScore(a.rating, a.reviewCount);
      const scoreB = calculateScore(b.rating, b.reviewCount);
      return scoreB - scoreA;
    });

    setSearchState(prev => ({
      ...prev,
      isLoading: false,
      results: sortedShops
    }));
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
            Find the best-rated coffee shops in your area
          </p>
          <SearchBar
            location={searchState.location}
            onLocationChange={(location) => setSearchState(prev => ({ ...prev, location }))}
            onSearch={handleSearch}
            isLoading={searchState.isLoading}
          />
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

        {searchState.location && !searchState.isLoading && searchState.results.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No coffee shops found in this area. Try another location.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;