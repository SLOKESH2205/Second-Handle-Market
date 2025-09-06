import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  condition: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (items: CartItem[]) => void;
}

export function CartModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartModalProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST (Indian tax)
  const total = subtotal + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onCheckout(cartItems);
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>
              Your cart is currently empty. Browse our marketplace to find great deals!
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-8">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mb-6">
              Add some items to your cart to get started
            </p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Cart ({cartItems.length} items)</DialogTitle>
          <DialogDescription>
            Review your selected items and proceed to checkout when ready.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{item.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Sold by {item.sellerName}
                </p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {item.condition}
                </Badge>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (18%)</span>
            <span>₹{tax.toLocaleString('en-IN')}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Continue Shopping
          </Button>
          <Button 
            onClick={handleCheckout} 
            disabled={isCheckingOut}
            className="flex-1"
          >
            {isCheckingOut ? 'Processing...' : `Checkout ₹${total.toLocaleString('en-IN')}`}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          🔒 Secure checkout with buyer protection
        </div>
      </DialogContent>
    </Dialog>
  );
}