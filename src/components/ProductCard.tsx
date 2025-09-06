import { useState } from 'react';
import { Heart, MapPin, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  location: string;
  condition: string;
  isLiked?: boolean;
  distance?: string;
  isNewListing?: boolean;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  onToggleWishlist?: () => void;
}

export function ProductCard({
  title,
  price,
  originalPrice,
  imageUrl,
  location,
  condition,
  isLiked = false,
  distance,
  isNewListing = false,
  onAddToCart,
  onViewDetails,
  onToggleWishlist
}: ProductCardProps) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist?.();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  const handleViewDetails = () => {
    onViewDetails?.();
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group" data-product-card>
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isLiked
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNewListing && (
            <Badge className="text-xs bg-green-600 text-white animate-pulse">
              🆕 NEW
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
            {condition}
          </Badge>
          {originalPrice && originalPrice > price && (
            <Badge variant="destructive" className="text-xs">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg text-primary">₹{price.toLocaleString('en-IN')}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{location}</span>
          {distance && (
            <>
              <span className="mx-1">•</span>
              <span>{distance}</span>
            </>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleViewDetails}
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}