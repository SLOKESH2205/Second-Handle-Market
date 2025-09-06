import { LogOut, Settings, ShoppingBag, Heart, Package, BarChart3, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller';
  trustRating: number;
  isVerified: boolean;
}

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function UserMenu({ user, onLogout, onNavigate }: UserMenuProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              {user.isVerified && (
                <Badge variant="secondary" className="text-xs px-1">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">Trust Rating:</span>
              <span className="text-xs font-medium">⭐ {user.trustRating}/5</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>My Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onNavigate('favorites')}>
          <Heart className="mr-2 h-4 w-4" />
          <span>Favorites</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onNavigate('purchases')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>Purchase History</span>
        </DropdownMenuItem>
        
        {user.role === 'seller' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate('listings')}>
              <Package className="mr-2 h-4 w-4" />
              <span>My Listings</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Seller Dashboard</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onNavigate('settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}