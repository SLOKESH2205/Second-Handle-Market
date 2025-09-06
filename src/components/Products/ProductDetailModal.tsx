import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Heart, MapPin, ShoppingCart, MessageCircle, Share2, Flag, Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MessageModal } from '../MessageModal';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  location: string;
  condition: string;
  distance?: string;
  description?: string;
  sellerId?: string;
  sellerName?: string;
  sellerRating?: number;
  createdAt?: string;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
  user?: any;
}

export function ProductDetailModal({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart,
  user 
}: ProductDetailModalProps) {
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);

  if (!product) return null;

  const images = [product.imageUrl]; // In real app, product would have multiple images
  const sellerInitials = product.sellerName ? product.sellerName.split(' ').map(n => n[0]).join('') : 'LS';

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const handleMessageSeller = () => {
    if (!user) {
      // Handle auth requirement
      return;
    }
    
    // Prevent sellers from messaging (sellers shouldn't message other sellers about products)
    if (user.role === 'seller') {
      return;
    }
    
    setShowMessageModal(true);
  };

  const productDescription = product.description || `This is a ${product.condition.toLowerCase()} condition ${product.title.toLowerCase()}. Located in ${product.location}. Perfect for anyone looking for quality second-hand items at great prices.`;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <ImageWithFallback
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className={`absolute top-3 right-3 h-10 w-10 ${liked ? 'text-red-500' : 'text-white'} bg-black/20 hover:bg-black/40`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                </Button>
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 left-3 bg-white/90 text-foreground"
                >
                  {product.condition}
                </Badge>
              </div>
              
              {/* Additional images would go here */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <DialogHeader>
                  <DialogTitle className="text-2xl leading-tight">
                    {product.title}
                  </DialogTitle>
                  <DialogDescription>
                    View detailed information about this item, including photos, description, and seller details.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {product.location}
                    {product.distance && ` • ${product.distance}`}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-primary">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <Badge variant="secondary" className="text-green-600">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Listed {product.createdAt || '3 days ago'}
                </p>
              </div>

              {/* Seller Info */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={product.sellerName || 'Local Seller'} />
                    <AvatarFallback>{sellerInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{product.sellerName || 'Local Seller'}</h4>
                      <Badge variant="outline" className="text-xs">Verified</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">
                        {product.sellerRating || 4.3} rating
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {/* Only show message button for buyers (not sellers) */}
                  {user?.role !== 'seller' && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={handleMessageSeller}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className={user?.role === 'seller' ? 'flex-1' : ''}>
                    <Share2 className="w-4 h-4" />
                    {user?.role === 'seller' ? 'Share' : ''}
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {productDescription}
                </p>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-3">
                {user?.role === 'seller' ? (
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-blue-700 mb-2">
                      📋 You're viewing this as a seller
                    </p>
                    <p className="text-xs text-blue-600">
                      Sellers can browse items but cannot purchase or message other sellers directly.
                    </p>
                  </div>
                ) : user ? (
                  <Button onClick={handleAddToCart} className="w-full" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart - ₹{product.price.toLocaleString('en-IN')}
                  </Button>
                ) : (
                  <Button onClick={onClose} className="w-full" size="lg">
                    Sign in to Purchase
                  </Button>
                )}
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share this item
                  </Button>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                💡 <strong>Safety tip:</strong> Meet in a public place and inspect items before purchasing.
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        product={product}
        user={user}
      />
    </>
  );
}