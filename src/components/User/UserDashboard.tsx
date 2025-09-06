import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { ProductCard } from '../ProductCard';
import { User, Heart, Package, Settings, LogOut, Camera, Star, MapPin, Calendar, Shield, Mail, Phone, MessageSquare, HelpCircle, ShoppingBag, Truck, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void;
  wishlistItems: any[];
  onRemoveFromWishlist: (productId: string) => void;
  onViewProductDetails: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export function UserDashboard({ 
  isOpen, 
  onClose, 
  user, 
  onLogout,
  wishlistItems,
  onRemoveFromWishlist,
  onViewProductDetails,
  onAddToCart
}: UserDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});

  if (!user) return null;

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const userInitials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'U';
  const memberSince = user.createdAt || 'January 2024';
  const trustScore = user.trustScore || 4.7;
  const totalTransactions = user.totalTransactions || 12;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Account</DialogTitle>
          <DialogDescription>
            Manage your profile, view your wishlist, and track your activity.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist ({wishlistItems.length})
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Package className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl">{user.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{trustScore} Trust Score</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTransactions}</div>
                  <p className="text-xs text-muted-foreground">Successful deals</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Items Sold</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.role === 'seller' ? 8 : 3}</div>
                  <p className="text-xs text-muted-foreground">Products sold</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Items Purchased</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTransactions - (user.role === 'seller' ? 8 : 3)}</div>
                  <p className="text-xs text-muted-foreground">Products bought</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg">Personal Information</h4>
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedUser.name : user.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedUser.email : user.email}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={isEditing ? editedUser.phone : user.phone || ''}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                    disabled={!isEditing}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={isEditing ? editedUser.location : user.location || ''}
                    onChange={(e) => setEditedUser({...editedUser, location: e.target.value})}
                    disabled={!isEditing}
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Start browsing and save items you love by clicking the heart icon
                </p>
                <Button onClick={onClose}>Browse Items</Button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl">My Wishlist ({wishlistItems.length} items)</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      wishlistItems.forEach(item => onRemoveFromWishlist(item.id));
                      toast.success('Wishlist cleared');
                    }}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistItems.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard
                        {...product}
                        isLiked={true}
                        onAddToCart={() => onAddToCart(product)}
                        onViewDetails={() => onViewProductDetails(product)}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 left-2 z-10"
                        onClick={() => onRemoveFromWishlist(product.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl">Your Orders</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">All Orders</Button>
                  <Button variant="outline" size="sm">Pending</Button>
                  <Button variant="outline" size="sm">Delivered</Button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Order 1 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Order #RM-001234</p>
                          <p className="text-sm text-muted-foreground">Placed on January 15, 2025</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Delivered
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1599819511939-d2f7206fe892?w=100&h=100&fit=crop" 
                          alt="MacBook Pro" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">MacBook Pro 2019 - 16 inch</p>
                        <p className="text-sm text-muted-foreground">Seller: Tech Mike</p>
                        <p className="text-sm">₹{(1800).toLocaleString('en-IN')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Delivered on</p>
                        <p className="text-sm font-medium">January 18, 2025</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Rate & Review</Button>
                      <Button variant="outline" size="sm">Contact Seller</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Order 2 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Order #RM-001235</p>
                          <p className="text-sm text-muted-foreground">Placed on January 20, 2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700">
                        In Transit
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1634133118577-d70216e68eae?w=100&h=100&fit=crop" 
                          alt="Vintage Jacket" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Vintage Designer Jacket - Size M</p>
                        <p className="text-sm text-muted-foreground">Seller: Vintage Vera</p>
                        <p className="text-sm">$120.00</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Expected delivery</p>
                        <p className="text-sm font-medium">January 25, 2025</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Track Package</Button>
                      <Button variant="outline" size="sm">Contact Seller</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Order 3 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Order #RM-001236</p>
                          <p className="text-sm text-muted-foreground">Placed on January 22, 2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-orange-100 text-orange-700">
                        Processing
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1689280730533-4fdacc46e6c4?w=100&h=100&fit=crop" 
                          alt="Vintage Armchair" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Vintage Leather Armchair</p>
                        <p className="text-sm text-muted-foreground">Seller: Sarah M.</p>
                        <p className="text-sm">₹{(12500).toLocaleString('en-IN')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Processing</p>
                        <p className="text-sm font-medium">Seller preparing</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Cancel Order</Button>
                      <Button variant="outline" size="sm">Contact Seller</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center py-4">
                <Button variant="outline">View All Orders</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Successfully purchased MacBook Pro</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Added Vintage Armchair to wishlist</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                  <Badge variant="outline">Wishlist</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Profile verification completed</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                  <Badge variant="secondary">Verified</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Updated profile information</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                  <Badge variant="outline">Profile</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Left review for Tech Mike</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                  <Badge variant="outline">Review</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-4">Contact Us</h3>
                <p className="text-muted-foreground mb-6">
                  We're here to help! Reach out to us through any of these channels.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Live Chat Support
                    </CardTitle>
                    <CardDescription>
                      Chat with our support team in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Start Live Chat</Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Available 24/7
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email Support
                    </CardTitle>
                    <CardDescription>
                      Send us an email and we'll respond within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      support@remarket.com
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Response within 24 hours
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Phone Support
                    </CardTitle>
                    <CardDescription>
                      Call us for immediate assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      1-800-REMARKET
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Mon-Fri, 9AM-6PM EST
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      Help Center
                    </CardTitle>
                    <CardDescription>
                      Browse our comprehensive help articles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Visit Help Center
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Self-service support
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Have a specific question or concern? Send us a detailed message.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Your Name</Label>
                      <Input id="contact-name" placeholder="Enter your name" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input id="contact-subject" placeholder="What can we help you with?" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <textarea 
                      id="contact-message"
                      className="w-full p-3 border border-border rounded-md min-h-[120px] resize-none"
                      placeholder="Please describe your question or issue in detail..."
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2">How do I return an item?</h4>
                    <p className="text-sm text-muted-foreground">
                      You can return items within 7 days of delivery. Contact the seller first, or reach out to our support team for assistance.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2">How is my payment protected?</h4>
                    <p className="text-sm text-muted-foreground">
                      All payments are secured through our escrow system. Your payment is only released to the seller after you confirm receipt of the item.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2">What if an item doesn't match the description?</h4>
                    <p className="text-sm text-muted-foreground">
                      If an item significantly differs from its description, you can request a return or refund. Our support team will mediate the process.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates about your activity</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get text updates for orders and messages</p>
                    </div>
                    <Button variant="outline" size="sm">Setup</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground">Control your profile visibility</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Location Settings</h4>
                      <p className="text-sm text-muted-foreground">Manage location-based features</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Payment Methods</h4>
                      <p className="text-sm text-muted-foreground">Manage your saved payment options</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Address Book</h4>
                      <p className="text-sm text-muted-foreground">Manage shipping and billing addresses</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Language</h4>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                    <Badge variant="outline">English (US)</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Currency</h4>
                      <p className="text-sm text-muted-foreground">Set your preferred currency</p>
                    </div>
                    <Badge variant="outline">INR (₹)</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Theme</h4>
                      <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                    </div>
                    <Button variant="outline" size="sm">Light</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Search Radius</h4>
                      <p className="text-sm text-muted-foreground">Set maximum distance for local searches</p>
                    </div>
                    <Badge variant="outline">25 miles</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg">Account Management</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out of This Device
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out of All Devices
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    Download My Data
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Deactivate Account
                  </Button>

                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                  >
                    Delete Account Permanently
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}