import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Send, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  user?: any;
}

export function MessageModal({ isOpen, onClose, product, user }: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast.success(`📩 Message sent to ${product?.sellerName || 'seller'}!`, {
        description: 'Your message has been delivered. The seller will respond shortly.',
      });
      
      setMessage('');
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!product) return null;

  const sellerInitials = product.sellerName ? product.sellerName.split(' ').map((n: string) => n[0]).join('') : 'LS';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Message Seller</DialogTitle>
          <DialogDescription>
            Send a message to {product.sellerName || 'the seller'} about "{product.title}"
          </DialogDescription>
        </DialogHeader>
        
        {/* Product Info */}
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-12 h-12 object-cover rounded-md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{product.title}</p>
            <p className="text-xs text-muted-foreground">
              ₹{product.price.toLocaleString('en-IN')} • {product.location}
            </p>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={product.sellerName || 'Seller'} />
            <AvatarFallback>{sellerInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">{product.sellerName || 'Local Seller'}</h4>
              <span className="text-xs text-muted-foreground">
                ⭐ {product.sellerRating || 4.3}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {product.location}
              </div>
              {user?.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder={`Hi! I'm interested in your ${product.title}. Is it still available?`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          {/* Quick Message Templates */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick messages:</Label>
            <div className="flex flex-wrap gap-2">
              {[
                "Is this still available?",
                "Can we negotiate the price?",
                "When can I see this item?",
                "What's the condition like?"
              ].map((template) => (
                <Button
                  key={template}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setMessage(template)}
                >
                  {template}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !message.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>

        {/* Contact Info */}
        {user?.phone && (
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-xs text-blue-600">
              💡 You can also call directly: {user.phone}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}