// Collection of coffee shop names and images for different regions
const COFFEE_SHOP_TEMPLATES = {
  names: [
    'Coffee Lab', 'Bean Scene', 'Daily Grind', 'Coffee Culture',
    'The Roasted Bean', 'Café Noir', 'Coffee House', 'Espresso Bar',
    'The Coffee Club', 'Brew & Co', 'Coffee Republic', 'The Perfect Cup',
    'Coffee Heaven', 'Morning Brew', 'Coffee Corner'
  ],
  images: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  ]
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomRating(): number {
  // Generate a rating between 3.5 and 5.0
  return Number((Math.random() * 1.5 + 3.5).toFixed(1));
}

function generateRandomReviewCount(): number {
  // Generate between 50 and 2000 reviews
  return getRandomInt(50, 2000);
}

export function generateMockShopsForLocation(location: string): Array<{
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
}> {
  // Generate 3-8 shops for the given location
  const numberOfShops = getRandomInt(3, 8);
  const shops = [];

  for (let i = 0; i < numberOfShops; i++) {
    const shopName = COFFEE_SHOP_TEMPLATES.names[getRandomInt(0, COFFEE_SHOP_TEMPLATES.names.length - 1)];
    const imageUrl = COFFEE_SHOP_TEMPLATES.images[getRandomInt(0, COFFEE_SHOP_TEMPLATES.images.length - 1)];
    
    shops.push({
      id: `${location.replace(/\s+/g, '-').toLowerCase()}-${i}`,
      name: shopName,
      rating: generateRandomRating(),
      reviewCount: generateRandomReviewCount(),
      address: `${getRandomInt(1, 999)} ${location}`,
      image: imageUrl
    });
  }

  return shops;
}