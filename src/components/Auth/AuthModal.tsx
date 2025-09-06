import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onAuth }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('customer');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'login' | 'signup') => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: name || email.split('@')[0],
        phone: phone || '',
        location: location || '',
        role: type === 'signup' ? role : 'customer',
        trustRating: 4.2,
        isVerified: true
      };
      
      onAuth(user);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Remarket</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to start buying and selling.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-phone">Phone Number</Label>
                <Input 
                  id="login-phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="Enter your phone number"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-location">Location</Label>
                <Input 
                  id="login-location" 
                  name="location" 
                  type="text" 
                  placeholder="Enter your city/area"
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  name="name" 
                  type="text" 
                  placeholder="Enter your full name"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  name="password" 
                  type="password" 
                  placeholder="Create a password"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <Input 
                  id="signup-phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="Enter your phone number"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-location">Location</Label>
                <Input 
                  id="signup-location" 
                  name="location" 
                  type="text" 
                  placeholder="Enter your city/area"
                  required 
                />
              </div>
              
              <div className="space-y-3">
                <Label>I want to:</Label>
                <RadioGroup value={role} onValueChange={setRole}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer">Buy items (Customer)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller">Buy & Sell items (Seller)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}