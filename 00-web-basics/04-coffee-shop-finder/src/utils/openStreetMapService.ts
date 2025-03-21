const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

export async function geocodeLocation(location: string): Promise<{ lat: number; lon: number }> {
  const params = new URLSearchParams({
    q: location,
    format: 'json',
    limit: '1'
  });

  const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`);
  if (!response.ok) {
    throw new Error('Failed to geocode location');
  }

  const results = await response.json();
  if (!results.length) {
    throw new Error('Location not found');
  }

  return {
    lat: parseFloat(results[0].lat),
    lon: parseFloat(results[0].lon)
  };
}

export async function fetchCoffeeShops(lat: number, lon: number): Promise<any[]> {
  // Create a bounding box around the location (roughly 2km radius)
  const radius = 0.02; // approximately 2km in degrees
  const bbox = {
    south: lat - radius,
    north: lat + radius,
    west: lon - radius,
    east: lon + radius
  };

  // Overpass QL query to find coffee shops
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="cafe"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
      way["amenity"="cafe"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
      relation["amenity"="cafe"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
    );
    out body;
    >;
    out skel qt;
  `;

  const response = await fetch(OVERPASS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `data=${encodeURIComponent(query)}`
  });

  if (!response.ok) {
    throw new Error('Failed to fetch coffee shops');
  }

  const data = await response.json();
  return data.elements.filter((element: any) => element.tags && element.tags.amenity === 'cafe');
}

// Convert OpenStreetMap data to our CoffeeShop format
export function convertToShop(element: any): CoffeeShop {
  const getRandomImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return {
    id: element.id.toString(),
    name: element.tags.name || 'Unnamed Coffee Shop',
    rating: 4 + Math.random(), // OpenStreetMap doesn't have ratings, so we generate a random one
    reviewCount: Math.floor(Math.random() * 1000) + 50, // Random review count
    address: element.tags['addr:street'] 
      ? `${element.tags['addr:housenumber'] || ''} ${element.tags['addr:street']}`
      : 'Address not available',
    image: getRandomImage(),
    lat: element.lat,
    lon: element.lon
  };
}