import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Upload, X } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

const categories = [
  'Eco Furniture', 'Green Tech', 'Organic Books', 'Sustainable Fashion', 'Eco Mobility', 'Green Living', 
  'Electronics', 'Photography', 'Sports', 'Home & Garden', 'Toys', 'Music', 'Art', 'Other'
];

const conditions = [
  'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'
];

export function AddProductModal({ isOpen, onClose, onAddProduct }: AddProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const getRelevantImageQuery = (title: string, category: string) => {
    // Create a search query based on title and category for sustainable items
    const titleWords = title.toLowerCase().split(' ').slice(0, 2); // Take first 2 words
    const cleanCategory = category.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
    
    // Add sustainable/eco keywords for better matching
    const sustainableKeywords = ['sustainable', 'eco', 'organic', 'green', 'bamboo', 'solar', 'electric'];
    const query = `${titleWords.join(' ')} ${cleanCategory}`;
    
    return query.trim();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    
    try {
      // Generate relevant image URL if no images uploaded
      let imageUrl = '';
      if (images.length > 0) {
        imageUrl = images[0]; // Use first uploaded image
      } else if (title && category) {
        const query = getRelevantImageQuery(title, category);
        // For demo purposes, we'll use a placeholder that would be replaced by actual Unsplash API
        imageUrl = `https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop&q=80`;
      }
      
      // Simulate API call
      setTimeout(() => {
        const product = {
          id: Math.random().toString(36).substr(2, 9),
          title: title,
          description: formData.get('description'),
          price: parseFloat(formData.get('price') as string),
          originalPrice: formData.get('originalPrice') ? parseFloat(formData.get('originalPrice') as string) : undefined,
          category: category,
          condition: formData.get('condition'),
          location: formData.get('location'),
          imageUrl: imageUrl,
          images: images.length > 0 ? images : [imageUrl],
          sellerId: 'current-user',
          createdAt: new Date().toISOString(),
          isAvailable: true
        };
        
        onAddProduct(product);
        setIsLoading(false);
        onClose();
        
        // Reset form
        setImages([]);
      }, 1000);
    } catch (error) {
      console.error('Error creating product:', error);
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Simulate image upload - in real app, upload to cloud storage
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>List a New Item</DialogTitle>
          <DialogDescription>
            Add details about your item to attract buyers. Make sure to include clear photos and an accurate description.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-3">
            <Label>Photos</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Click to upload photos or drag and drop
                </p>
              </label>
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title"
              name="title"
              placeholder="What are you selling?"
              required 
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              name="description"
              placeholder="Describe your item's condition, features, and any defects..."
              className="min-h-[100px]"
              required 
            />
          </div>

          {/* Category and Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select name="condition" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem key={condition} value={condition.toLowerCase().replace(' ', '_')}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Selling Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input 
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className="pl-8"
                  placeholder="0.00"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (Optional)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input 
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  className="pl-8"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location"
              name="location"
              placeholder="Enter your location (e.g., Downtown, Brooklyn)"
              required 
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Publishing...' : 'Publish Listing'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}