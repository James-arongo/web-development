import React from 'react';
import { Star } from 'lucide-react';

interface CoffeeShopCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
}

export function CoffeeShopCard({ name, rating, reviewCount, address, image }: CoffeeShopCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-500">
            <Star className="fill-current" size={20} />
            <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 ml-2">({reviewCount} reviews)</span>
        </div>
        <p className="text-gray-600">{address}</p>
      </div>
    </div>
  );
}