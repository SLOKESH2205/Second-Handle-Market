import { useState, useRef, useEffect } from 'react';
import { Search, Menu, User, MessageCircle, ShoppingCart, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { UserMenu } from './User/UserMenu';

interface HeaderProps {
  user?: any;
  cartItemCount?: number;
  onAuthClick: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onCartClick: () => void;
  onAddProductClick: () => void;
  onSearch: (query: string) => void;
  searchResults: any[];
  allProducts: any[];
}

export function Header({ 
  user, 
  cartItemCount = 0, 
  onAuthClick, 
  onLogout, 
  onNavigate, 
  onCartClick,
  onAddProductClick,
  onSearch,
  searchResults,
  allProducts
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: any) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    onSearch(product.title);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-xl text-primary font-semibold">Remarket</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
              <Input
                type="search"
                placeholder="Search for items, categories, or brands..."
                className="pl-10 pr-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
              />
              {searchQuery && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={clearSearch}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-md shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
                  {suggestions.length > 0 ? (
                    <div>
                      <div className="px-3 py-2 text-xs text-muted-foreground border-b">
                        Search suggestions
                      </div>
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-3 border-b last:border-b-0"
                          onClick={() => handleSuggestionClick(product)}
                        >
                          <div className="w-10 h-10 bg-muted rounded flex-shrink-0 overflow-hidden">
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.title}</p>
                            <p className="text-xs text-muted-foreground">
                              ${product.price} • {product.location}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.length > 2 ? (
                    <div className="px-3 py-8 text-center">
                      <Search className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Sorry, couldn't find "{searchQuery}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Try different keywords or browse our categories
                      </p>
                    </div>
                  ) : (
                    <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                      Type at least 3 characters to search
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Browse
            </Button>
            
            {user?.role === 'seller' && (
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
                onClick={onAddProductClick}
              >
                <Plus className="w-4 h-4 mr-2" />
                Sell
              </Button>
            )}
            
            {user && (
              <>
                <Button variant="ghost" size="icon" onClick={() => onNavigate('favorites')}>
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </>
            )}
            
            {user ? (
              <UserMenu user={user} onLogout={onLogout} onNavigate={onNavigate} />
            ) : (
              <Button variant="outline" onClick={onAuthClick}>
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}