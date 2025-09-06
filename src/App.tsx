import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryCard } from './components/CategoryCard';
import { ProductCard } from './components/ProductCard';
import { AuthModal } from './components/Auth/AuthModal';
import { AddProductModal } from './components/Products/AddProductModal';
import { ProductDetailModal } from './components/Products/ProductDetailModal';
import { SellerDashboard } from './components/Seller/SellerDashboard';
import { CartModal } from './components/Cart/CartModal';
import { UserDashboard } from './components/User/UserDashboard';
import { SupportModal } from './components/Support/SupportModal';
import { CheckoutPage } from './components/Checkout/CheckoutPage';
import { PolicyModal } from './components/PolicyModal';
import { Toaster } from './components/Toaster';
import { Button } from './components/ui/button';
import { toast } from 'sonner@2.0.3';
import { Filter, Grid, List, Search, ShoppingBag, Plus, ArrowRight } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showSellerDashboard, setShowSellerDashboard] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyType, setPolicyType] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllItems, setShowAllItems] = useState(false);

  // Initialize products with featured items
  useEffect(() => {
    setProducts(featuredProducts);
    setFilteredProducts(featuredProducts);
  }, []);

  // Update filtered products when search changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleAuth = (userData: any) => {
    setUser(userData);
    toast.success(`👋 Welcome ${userData.role === 'seller' ? 'seller' : 'back'}, ${userData.name}!`, {
      description: `You're now signed in as a ${userData.role}. Start browsing and shopping!`,
    });
  };

  const handleLogout = () => {
    const userName = user?.name || 'User';
    setUser(null);
    setCartItems([]);
    setWishlistItems([]);
    toast.success(`👋 Goodbye ${userName}!`, {
      description: 'You have been successfully logged out. Come back soon!',
    });
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'dashboard':
        if (user?.role === 'seller') {
          setShowSellerDashboard(true);
        } else {
          setShowUserDashboard(true);
        }
        break;
      case 'favorites':
        if (!user) {
          setShowAuthModal(true);
          return;
        }
        setShowUserDashboard(true);
        break;
      case 'purchases':
        toast.info('Purchase history feature coming soon!');
        break;
      case 'listings':
        toast.info('My listings feature coming soon!');
        break;
      case 'settings':
        toast.info('Settings feature coming soon!');
        break;
      default:
        break;
    }
  };

  const handleAddProduct = (product: any) => {
    let imageUrl = product.imageUrl;
    if (!imageUrl || imageUrl.includes('placeholder')) {
      const category = product.category?.toLowerCase() || '';
      const title = product.title?.toLowerCase() || '';
      if (category.includes('furniture') || title.includes('table') || title.includes('chair') || title.includes('bamboo')) {
        imageUrl = "https://images.unsplash.com/photo-1570866056002-03b2dbf7737a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmdXJuaXR1cmUlMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTcxNDQ5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
      } else if (category.includes('tech') || title.includes('solar') || title.includes('battery') || title.includes('charger')) {
        imageUrl = "https://images.unsplash.com/photo-1589276215887-9f690f8e1b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHN1c3RhaW5hYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc1NzE0NDk3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
      } else if (category.includes('fashion') || title.includes('cotton') || title.includes('kurta') || title.includes('clothing')) {
        imageUrl = "https://images.unsplash.com/photo-1554967651-3997ad1c43b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU3MTQ0OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
      } else if (category.includes('mobility') || title.includes('electric') || title.includes('bicycle') || title.includes('bike')) {
        imageUrl = "https://images.unsplash.com/photo-1581940495169-868ac7b49a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJpY3ljbGUlMjBiaWtlJTIwc3VzdGFpbmFibGV8ZW58MXx8fHwxNzU3MTQ0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
      } else if (category.includes('living') || title.includes('bottle') || title.includes('water') || title.includes('steel')) {
        imageUrl = "https://images.unsplash.com/photo-1605274280925-9dd1baacb97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXVzYWJsZSUyMHdhdGVyJTIwYm90dGxlJTIwZWNvJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTQ0OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
      } else {
        imageUrl = "https://images.unsplash.com/photo-1542739674-b449a8938b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb21wb3N0aW5nJTIwYmluJTIwb3JnYW5pYyUyMHdhc3RlfGVufDF8fHx8MTc1NzE0NDk4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
      }
    }

    const productWithImage = {
      ...product,
      imageUrl: imageUrl,
      id: product.id || `product-${Date.now()}`,
      createdAt: 'Just now',
      isNewListing: true, // Mark as new listing for visual indicator
      sellerName: user?.name || 'Anonymous Seller',
      sellerId: user?.id || `seller-${Date.now()}`,
      sellerRating: user?.trustRating || 4.5
    };
    
    setProducts(prev => [productWithImage, ...prev]);
    
    // Show different messages for seller vs other users
    toast.success(`🎯 Product "${product.title}" listed successfully!`, {
      description: 'Your item is now live and visible to all buyers on the marketplace.',
    });
    
    // For demo: simulate other users seeing the new listing
    setTimeout(() => {
      if (user?.role === 'seller') {
        toast.info(`📢 New listing alert!`, {
          description: `"${product.title}" is now available for ₹${product.price.toLocaleString('en-IN')} in ${product.location || 'your area'}`,
        });
      }
    }, 2000);
    
    // Remove "new listing" indicator after 30 seconds
    setTimeout(() => {
      setProducts(prev => 
        prev.map(p => 
          p.id === productWithImage.id 
            ? { ...p, isNewListing: false }
            : p
        )
      );
    }, 30000);
  };

  const handleAddToCart = (product: any) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prev => 
        prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, {
        ...product,
        quantity: 1,
        sellerId: 'seller-' + Math.random().toString(36).substr(2, 5),
        sellerName: 'Local Seller'
      }]);
    }
    toast.success(`🛒 Added "${product.title}" to your cart!`, {
      description: `Price: ₹${product.price.toLocaleString('en-IN')} • Click the cart icon to checkout`,
    });
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    const removedItem = cartItems.find(item => item.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success(`🗑️ Removed "${removedItem?.title}" from cart`, {
      description: 'Item has been removed from your shopping cart.',
    });
  };

  const handleCheckout = (items: any[]) => {
    setShowCartModal(false);
    setShowCheckoutPage(true);
  };

  const handleOrderComplete = (orderData: any) => {
    setCartItems([]);
    setShowCheckoutPage(false);
    toast.success(`🎉 Order confirmed! Order ID: ${orderData.orderId}`, {
      description: `Total: ₹${orderData.total.toLocaleString('en-IN')} • Expected delivery: ${new Date(orderData.estimatedDelivery).toLocaleDateString()}`,
    });
  };

  const handleViewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleToggleWishlist = (product: any) => {
    const isLiked = wishlistItems.some(item => item.id === product.id);
    if (isLiked) {
      setWishlistItems(prev => prev.filter(item => item.id !== product.id));
      toast.success(`💔 Removed "${product.title}" from your wishlist`, {
        description: 'You can always add it back later if you change your mind.',
      });
    } else {
      setWishlistItems(prev => [...prev, product]);
      toast.success(`❤️ Added "${product.title}" to your wishlist!`, {
        description: 'View all your saved items in your dashboard.',
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const removedItem = wishlistItems.find(item => item.id === productId);
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast.success(`💔 Removed "${removedItem?.title}" from wishlist`, {
      description: 'Item has been removed from your wishlist.',
    });
  };

  const handleOpenPolicy = (type: string) => {
    setPolicyType(type);
    setShowPolicyModal(true);
  };

  if (showSellerDashboard) {
    return <SellerDashboard user={user} onClose={() => setShowSellerDashboard(false)} />;
  }
  const categories = [
    {
      title: "Eco Furniture",
      imageUrl: "https://images.unsplash.com/photo-1570866056002-03b2dbf7737a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmdXJuaXR1cmUlMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTcxNDQ5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      itemCount: 1247
    },
    {
      title: "Green Tech",
      imageUrl: "https://images.unsplash.com/photo-1589276215887-9f690f8e1b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHN1c3RhaW5hYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc1NzE0NDk3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      itemCount: 892
    },
    {
      title: "Organic Books",
      imageUrl: "https://images.unsplash.com/photo-1737205788369-77514fcab7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmQlMjBoYW5kJTIwYm9vb3N8ZW58MXx8fHwxNzU3MTMxNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      itemCount: 634
    },
    {
      title: "Sustainable Fashion",
      imageUrl: "https://images.unsplash.com/photo-1554967651-3997ad1c43b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU3MTQ0OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      itemCount: 1156
    },
    {
      title: "Eco Mobility",
      imageUrl: "https://images.unsplash.com/photo-1581940495169-868ac7b49a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJpY3ljbGUlMjBiaWtlJTIwc3VzdGFpbmFibGV8ZW58MXx8fHwxNzU3MTQ0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      itemCount: 423
    },
    {
      title: "Green Living",
      imageUrl: "https://images.unsplash.com/photo-1605274280925-9dd1baacb97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMHdhdGVyJTIwYm90dGxlJTIwZWNvJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTQ0OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      itemCount: 378
    }
  ];

  const featuredProducts = [
    {
      id: "1",
      title: "Bamboo Study Table - Eco-Friendly & Durable",
      price: 12500,
      originalPrice: 18000,
      imageUrl: "https://images.unsplash.com/photo-1570866056002-03b2dbf7737a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmdXJuaXR1cmUlMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTcxNDQ5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Pune",
      condition: "Like New",
      distance: "3.2 km",
      isLiked: true,
      description: "Beautiful handcrafted bamboo study table made from sustainable bamboo wood. This eco-friendly piece features a smooth finish and minimal carbon footprint. Perfect for home office or study room. Dimensions: 120cm x 60cm x 75cm. FSC certified bamboo from responsibly managed forests.",
      sellerName: "Priya S.",
      sellerRating: 4.8,
      createdAt: "2 days ago"
    },
    {
      id: "2",
      title: "Solar Power Bank - 20000mAh Eco Charger",
      price: 2800,
      originalPrice: 4500,
      imageUrl: "https://images.unsplash.com/photo-1589276215887-9f690f8e1b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHN1c3RhaW5hYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc1NzE0NDk3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Bangalore",
      condition: "Good",
      distance: "5.1 km",
      description: "High-capacity solar power bank with 20000mAh battery. Features dual USB ports and built-in solar panels. Perfect for outdoor activities and reducing electricity consumption. Waterproof design with LED flashlight. Charges via solar or USB-C. Used for 6 months, excellent working condition.",
      sellerName: "Arjun K.",
      sellerRating: 4.5,
      createdAt: "5 days ago"
    },
    {
      id: "3",
      title: "Organic Cotton Kurta Set - Handwoven",
      price: 1800,
      originalPrice: 3200,
      imageUrl: "https://images.unsplash.com/photo-1554967651-3997ad1c43b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU3MTQ0OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Jaipur",
      condition: "Very Good",
      distance: "2.8 km",
      description: "Beautiful handwoven organic cotton kurta set in natural dye. Made by local artisans using traditional techniques. 100% organic cotton, GOTS certified. Size M, perfect for festivals and casual wear. Includes matching pajama. From smoke-free home.",
      sellerName: "Meera R.",
      sellerRating: 4.9,
      createdAt: "1 week ago"
    },
    {
      id: "4",
      title: "Electric Bicycle - Zero Emission Transport",
      price: 35000,
      originalPrice: 55000,
      imageUrl: "https://images.unsplash.com/photo-1581940495169-868ac7b49a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJpY3ljbGUlMjBiaWtlJTIwc3VzdGFpbmFibGV8ZW58MXx8fHwxNzU3MTQ0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Mumbai",
      condition: "Excellent",
      distance: "4.2 km",
      isLiked: true,
      description: "High-quality electric bicycle with 50km range per charge. Lithium-ion battery, 3 speed modes, LED display. Perfect for eco-friendly commuting. Zero emissions, low maintenance. Includes charger and warranty papers. Used for 8 months, well-maintained.",
      sellerName: "Rohit M.",
      sellerRating: 4.7,
      createdAt: "3 days ago"
    },
    {
      id: "5",
      title: "Stainless Steel Water Bottles Set - BPA Free",
      price: 850,
      originalPrice: 1400,
      imageUrl: "https://images.unsplash.com/photo-1605274280925-9dd1baacb97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMHdhdGVyJTIwYm90dGxlJTIwZWNvJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTQ0OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Delhi",
      condition: "Good",
      distance: "6.7 km",
      description: "Set of 3 premium stainless steel water bottles. BPA-free, leak-proof, and insulated. Reduces plastic waste and keeps drinks at perfect temperature. Different sizes: 500ml, 750ml, 1L. Perfect for family use. Easy to clean and maintain.",
      sellerName: "Anjali T.",
      sellerRating: 4.6,
      createdAt: "1 week ago"
    },
    {
      id: "6",
      title: "Compost Bin - Kitchen Waste to Fertilizer",
      price: 1200,
      originalPrice: 2000,
      imageUrl: "https://images.unsplash.com/photo-1542739674-b449a8938b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb3N0aW5nJTIwYmluJTIwb3JnYW5pYyUyMHdhc3RlfGVufDF8fHx8MTc1NzE0NDk4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Chennai",
      condition: "Like New",
      distance: "3.2 km",
      description: "Compact kitchen compost bin for organic waste recycling. Transforms kitchen scraps into nutrient-rich fertilizer. Odor-free design with carbon filter. Made from recycled plastic. Perfect for apartment living. Includes starter guide and compost accelerator.",
      sellerName: "Suresh V.",
      sellerRating: 4.8,
      createdAt: "4 days ago"
    },
    {
      id: "7",
      title: "LED Bulb Set - 90% Energy Efficient",
      price: 650,
      originalPrice: 1200,
      imageUrl: "https://images.unsplash.com/photo-1638307119060-d918b2d5e9ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodCUyMGJ1bGJzJTIwZW5lcmd5JTIwZWZmaWNpZW50fGVufDF8fHx8MTc1NzE0NDk4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Hyderabad",
      condition: "Very Good",
      distance: "4.9 km",
      description: "Pack of 8 energy-efficient LED bulbs. 90% less energy consumption than traditional bulbs. 10-year lifespan, warm white light. Reduces electricity bills significantly. All bulbs tested and working perfectly. Various wattages included: 9W, 12W, 15W.",
      sellerName: "Kavita L.",
      sellerRating: 4.4,
      createdAt: "6 days ago"
    },
    {
      id: "8",
      title: "Hemp Backpack - Plastic-Free Travel",
      price: 2200,
      originalPrice: 3800,
      imageUrl: "https://images.unsplash.com/photo-1592289924034-c423dd2f1c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMHdhdGVyJTIwYm90dGxlJTIwZWNvJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTQ0OTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Kochi",
      condition: "Good",
      distance: "5.7 km",
      description: "Durable hemp fabric backpack made from natural fibers. 100% biodegradable and plastic-free. Water-resistant coating from natural wax. Multiple compartments for laptop and travel essentials. Fair-trade certified. Perfect for eco-conscious travelers.",
      sellerName: "Maya P.",
      sellerRating: 4.5,
      createdAt: "1 week ago"
    },
    {
      id: "9",
      title: "Wooden Dining Chairs Set - Reclaimed Teak",
      price: 8900,
      originalPrice: 15000,
      imageUrl: "https://images.unsplash.com/photo-1570866056002-03b2dbf7737a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmdXJuaXR1cmUlMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTcxNDQ5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Goa",
      condition: "Very Good",
      distance: "7.3 km",
      description: "Set of 4 dining chairs made from reclaimed teak wood. Restored and refinished with eco-friendly varnish. Classic design that complements any dining room. Each chair is unique with natural wood grain patterns. Solid construction, comfortable seating.",
      sellerName: "Carlos D.",
      sellerRating: 4.6,
      createdAt: "3 days ago"
    },
    {
      id: "10",
      title: "Solar Garden Lights - String LED Set",
      price: 1500,
      originalPrice: 2800,
      imageUrl: "https://images.unsplash.com/photo-1589276215887-9f690f8e1b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHN1c3RhaW5hYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc1NzE0NDk3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Mysore",
      condition: "Good",
      distance: "4.8 km",
      description: "Beautiful solar-powered LED string lights for garden decoration. 50 LED bulbs, 10-meter length, warm white glow. Auto on/off with built-in light sensor. Weather-resistant IP65 rating. Perfect for patios, gardens, and outdoor events. Zero electricity cost.",
      sellerName: "Lakshmi N.",
      sellerRating: 4.7,
      createdAt: "1 week ago"
    },
    {
      id: "11",
      title: "Organic Cotton Bedsheet Set - Natural Dye",
      price: 2300,
      originalPrice: 4200,
      imageUrl: "https://images.unsplash.com/photo-1554967651-3997ad1c43b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU3MTQ0OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Coimbatore",
      condition: "Excellent",
      distance: "6.1 km",
      description: "Luxurious organic cotton bedsheet set with natural plant-based dyes. Queen size, includes 2 pillowcases. GOTS certified organic cotton, hypoallergenic and breathable. Hand-block printed traditional patterns. Minimal usage, like new condition.",
      sellerName: "Vani K.",
      sellerRating: 4.9,
      createdAt: "5 days ago"
    },
    {
      id: "12",
      title: "Electric Scooter - Eco-Friendly Commute",
      price: 42000,
      originalPrice: 65000,
      imageUrl: "https://images.unsplash.com/photo-1581940495169-868ac7b49a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJpY3ljbGUlMjBiaWtlJTIwc3VzdGFpbmFibGV8ZW58MXx8fHwxNzU3MTQ0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Indore",
      condition: "Like New",
      distance: "3.7 km",
      description: "High-performance electric scooter with 80km range. Removable battery, fast charging in 4 hours. Top speed 60 kmph, digital display, LED headlights. Perfect for daily commuting. Includes helmet and charging cable. Minimal usage, excellent condition.",
      sellerName: "Raj P.",
      sellerRating: 4.8,
      createdAt: "2 days ago"
    },
    // New unique antique products
    {
      id: "13",
      title: "Vintage Wooden Clock - 1950s Mantle Clock",
      price: 8500,
      originalPrice: 15000,
      imageUrl: "https://images.unsplash.com/photo-1724230758634-8f88fa320c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMHdvb2RlbiUyMGNsb2NrfGVufDF8fHx8MTc1NzE0ODcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Lucknow",
      condition: "Excellent",
      distance: "2.1 km",
      description: "Beautiful 1950s vintage wooden mantle clock in perfect working condition. Features intricate carved details and brass fittings. Westminster chime mechanism recently serviced. Made from solid mahogany wood with original finish. A true collector's piece with authentic charm.",
      sellerName: "Rakesh J.",
      sellerRating: 4.9,
      createdAt: "3 days ago"
    },
    {
      id: "14",
      title: "Antique Brass Telescope - 19th Century Replica",
      price: 15500,
      originalPrice: 28000,
      imageUrl: "https://images.unsplash.com/photo-1639731458504-2a37ec687965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYnJhc3MlMjB0ZWxlc2NvcGUlMjB2aW50YWdlfGVufDF8fHx8MTc1NzE0ODcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Shimla",
      condition: "Very Good",
      distance: "5.4 km",
      description: "Stunning antique brass telescope with wooden tripod stand. Authentic 19th-century design with fully functional optics. Perfect for astronomy enthusiasts or as decorative piece. Comes with original leather case and cleaning kit. Brass has beautiful patina developed over time.",
      sellerName: "Colonel A. Singh",
      sellerRating: 4.8,
      createdAt: "1 week ago"
    },
    {
      id: "15",
      title: "Vintage Typewriter - Royal Quiet De Luxe 1960s",
      price: 12000,
      originalPrice: 22000,
      imageUrl: "https://images.unsplash.com/photo-1622132403916-d4786bf0e7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwZXdyaXRlciUyMGFudGlxdWV8ZW58MXx8fHwxNzU3MTQ4NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Kolkata",
      condition: "Good",
      distance: "3.8 km",
      description: "Classic Royal Quiet De Luxe typewriter from the 1960s in working condition. All keys function perfectly, ribbon recently replaced. Features portable design with original carrying case. Perfect for writers, collectors, or vintage office decor. Some minor cosmetic wear adds character.",
      sellerName: "Arun B.",
      sellerRating: 4.6,
      createdAt: "5 days ago"
    },
    {
      id: "16",
      title: "Antique Ceramic Vase - Hand-Painted Pottery",
      price: 4500,
      originalPrice: 8500,
      imageUrl: "https://images.unsplash.com/photo-1748141950763-2d9128219fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwY2VyYW1pYyUyMHZhc2UlMjBwb3R0ZXJ5fGVufDF8fHx8MTc1NzE0ODcyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Jaipur",
      condition: "Like New",
      distance: "4.2 km",
      description: "Exquisite hand-painted ceramic vase featuring traditional Indian motifs. Made by local artisans using age-old techniques. Features intricate floral patterns in blue and gold. Perfect centerpiece for home decor. No chips or cracks, excellent condition.",
      sellerName: "Sita D.",
      sellerRating: 4.7,
      createdAt: "6 days ago"
    },
    {
      id: "17",
      title: "Vintage Gramophone - Working 1940s Phonograph",
      price: 25000,
      originalPrice: 45000,
      imageUrl: "https://images.unsplash.com/photo-1635719918981-489600a42ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZ3JhbW9waG9uZSUyMHBob25vZ3JhcGglMjBhbnRpcXVlfGVufDF8fHx8MTc1NzE0ODcyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Mumbai",
      condition: "Excellent",
      distance: "6.9 km",
      isLiked: true,
      description: "Rare working gramophone from the 1940s in exceptional condition. Plays 78 RPM records perfectly. Features ornate brass horn and wooden base with original finish. Includes collection of vintage records. Recently serviced and calibrated. A musical treasure with incredible sound quality.",
      sellerName: "Ravi M.",
      sellerRating: 4.9,
      createdAt: "2 days ago"
    },
    {
      id: "18",
      title: "Antique Silver Jewelry Box - Victorian Era",
      price: 18500,
      originalPrice: 32000,
      imageUrl: "https://images.unsplash.com/photo-1543547298-0927e8c18ee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwc2lsdmVyJTIwamV3ZWxyeSUyMGJveHxlbnwxfHx8fDE3NTcxNDg3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Chennai",
      condition: "Very Good",
      distance: "7.1 km",
      description: "Elegant Victorian-era silver jewelry box with intricate engravings. Features multiple compartments with red velvet lining. Hallmarked sterling silver with beautiful patina. Small key included. Perfect for storing precious jewelry or as a decorative collectible. Minor age-related tarnishing.",
      sellerName: "Mrs. Lakshmi V.",
      sellerRating: 4.8,
      createdAt: "4 days ago"
    },
    {
      id: "19",
      title: "Vintage Leather Satchel - 1960s Doctor's Bag",
      price: 7500,
      originalPrice: 14000,
      imageUrl: "https://images.unsplash.com/photo-1657603686692-8ac7e0074a14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGVhdGhlciUyMHNhdGNoZWwlMjBiYWd8ZW58MXx8fHwxNzU3MTQ4NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Bangalore",
      condition: "Good",
      distance: "8.3 km",
      description: "Authentic 1960s leather doctor's satchel in rich brown leather. Features brass clasps and fittings, multiple internal pockets. Leather has developed beautiful patina with age. Perfect for professionals or vintage fashion enthusiasts. Some wear consistent with age adds character.",
      sellerName: "Dr. Krishnan",
      sellerRating: 4.5,
      createdAt: "1 week ago"
    },
    {
      id: "20",
      title: "Antique Copper Tea Set - Mughal Style",
      price: 9500,
      originalPrice: 16000,
      imageUrl: "https://images.unsplash.com/photo-1654451224811-5840dba2ff8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwY29wcGVyJTIwdGVhJTIwc2V0fGVufDF8fHx8MTc1NzE0ODczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Delhi",
      condition: "Excellent",
      distance: "5.7 km",
      description: "Magnificent Mughal-style copper tea set with intricate engravings. Includes teapot, sugar bowl, milk jug, and 6 cups with saucers. Hand-crafted with traditional techniques. Features beautiful geometric patterns and floral motifs. Recently polished and in excellent working condition.",
      sellerName: "Ustad Rahman",
      sellerRating: 4.9,
      createdAt: "3 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user}
        cartItemCount={cartItems.length}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onCartClick={() => setShowCartModal(true)}
        onAddProductClick={() => setShowAddProductModal(true)}
        onSearch={handleSearch}
        searchResults={filteredProducts}
        allProducts={products}
      />
      <Hero />
      
      {/* Call to Action Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl mb-4">Ready to Start Shopping?</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Discover amazing sustainable products from trusted local sellers. Join thousands of eco-conscious shoppers today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => {
                    if (!user) {
                      setShowAuthModal(true);
                    } else {
                      const firstProduct = document.querySelector('[data-product-card]');
                      firstProduct?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    if (!user) {
                      setShowAuthModal(true);
                    } else if (user.role === 'seller') {
                      setShowAddProductModal(true);
                    } else {
                      toast.info('Switch to seller account to list items', {
                        description: 'Create a seller account to start listing your products.',
                      });
                    }
                  }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  List an Item
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-6 bg-background rounded-lg shadow-sm">
                  <h4 className="text-2xl font-medium text-primary mb-2">15,000+</h4>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div className="p-6 bg-background rounded-lg shadow-sm">
                  <h4 className="text-2xl font-medium text-primary mb-2">4.8★</h4>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="p-6 bg-background rounded-lg shadow-sm">
                  <h4 className="text-2xl font-medium text-primary mb-2">50,000+</h4>
                  <p className="text-sm text-muted-foreground">Items Sold</p>
                </div>
                <div className="p-6 bg-background rounded-lg shadow-sm">
                  <h4 className="text-2xl font-medium text-primary mb-2">24/7</h4>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Browse by Category</h2>
            <p className="text-muted-foreground text-lg">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                imageUrl={category.imageUrl}
                itemCount={category.itemCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">Featured Items</h2>
              <p className="text-muted-foreground">
                Hand-picked deals and quality items near you
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="flex border rounded-md">
                <Button variant="ghost" size="sm" className="border-0">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="border-0">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 && searchQuery ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Sorry, couldn't find any products matching "{searchQuery}"
              </p>
              <Button onClick={() => setSearchQuery('')} variant="outline">
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(showAllItems ? filteredProducts : filteredProducts.slice(0, 8)).map((product) => {
                const isLiked = wishlistItems.some(item => item.id === product.id);
                return (
                  <ProductCard 
                    key={product.id}
                    {...product}
                    isLiked={isLiked}
                    isNewListing={product.isNewListing}
                    onAddToCart={() => handleAddToCart(product)}
                    onViewDetails={() => handleViewProductDetails(product)}
                    onToggleWishlist={() => handleToggleWishlist(product)}
                  />
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-12">
            {!showAllItems && filteredProducts.length > 8 ? (
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  setShowAllItems(true);
                  toast.success(`🎯 Now showing all ${filteredProducts.length} items!`, {
                    description: 'Browse through our complete collection of sustainable and antique products.',
                  });
                }}
              >
                View All {filteredProducts.length} Items
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : showAllItems ? (
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  setShowAllItems(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Show Less
              </Button>
            ) : null}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg mb-4">Remarket</h3>
              <p className="text-primary-foreground/80">
                Your trusted local marketplace for buying and selling pre-loved items.
              </p>
            </div>
            <div>
              <h4 className="mb-4">For Buyers</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('howToBuy')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    How to Buy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('safetyTips')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Safety Tips
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('paymentOptions')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Payment Options
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('returnPolicy')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Return Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">For Sellers</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('listItem')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    List an Item
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('sellingTips')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Selling Tips
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('pricingGuide')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Pricing Guide
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('sellerProtection')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Seller Protection
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <button 
                    onClick={() => setShowSupportModal(true)}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowSupportModal(true)}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('communityGuidelines')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Community Guidelines
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenPolicy('privacyPolicy')}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2025 Remarket. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />

      {user?.role === 'seller' && (
        <AddProductModal
          isOpen={showAddProductModal}
          onClose={() => setShowAddProductModal(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <ProductDetailModal
        isOpen={showProductDetail}
        onClose={() => setShowProductDetail(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        user={user}
      />

      <UserDashboard
        isOpen={showUserDashboard}
        onClose={() => setShowUserDashboard(false)}
        user={user}
        onLogout={handleLogout}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onViewProductDetails={handleViewProductDetails}
        onAddToCart={handleAddToCart}
      />

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        user={user}
      />

      <CheckoutPage
        isOpen={showCheckoutPage}
        onClose={() => setShowCheckoutPage(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      <PolicyModal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        type={policyType}
      />

      <Toaster />
    </div>
  );
}