import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { DollarSign, Package, Eye, Star, TrendingUp, MessageSquare, Calendar } from 'lucide-react';

interface SellerDashboardProps {
  user: any;
  onClose: () => void;
}

export function SellerDashboard({ user, onClose }: SellerDashboardProps) {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts
  const salesData = [
    { name: 'Mon', sales: 400, views: 240 },
    { name: 'Tue', sales: 300, views: 198 },
    { name: 'Wed', sales: 600, views: 435 },
    { name: 'Thu', sales: 800, views: 352 },
    { name: 'Fri', sales: 700, views: 467 },
    { name: 'Sat', sales: 900, views: 623 },
    { name: 'Sun', sales: 450, views: 298 }
  ];

  // Monthly sales data for the new chart
  const monthlySalesData = [
    { month: 'Jan', sales: 12500, revenue: 45000, items: 18 },
    { month: 'Feb', sales: 15200, revenue: 52000, items: 22 },
    { month: 'Mar', sales: 18700, revenue: 68000, items: 28 },
    { month: 'Apr', sales: 22400, revenue: 75000, items: 31 },
    { month: 'May', sales: 19800, revenue: 69500, items: 26 },
    { month: 'Jun', sales: 25600, revenue: 84000, items: 35 },
    { month: 'Jul', sales: 28900, revenue: 92000, items: 38 },
    { month: 'Aug', sales: 24300, revenue: 78000, items: 32 },
    { month: 'Sep', sales: 31200, revenue: 105000, items: 42 },
    { month: 'Oct', sales: 35800, revenue: 118000, items: 45 },
    { month: 'Nov', sales: 42100, revenue: 135000, items: 52 },
    { month: 'Dec', sales: 38700, revenue: 128000, items: 48 }
  ];

  const recentListings = [
    {
      id: '1',
      title: 'Vintage Leather Chair',
      price: 450,
      views: 127,
      likes: 23,
      status: 'active',
      createdAt: '2 days ago'
    },
    {
      id: '2', 
      title: 'MacBook Pro 2019',
      price: 1200,
      views: 89,
      likes: 15,
      status: 'sold',
      createdAt: '5 days ago'
    },
    {
      id: '3',
      title: 'Gaming Console Bundle',
      price: 180,
      views: 234,
      likes: 41,
      status: 'active',
      createdAt: '1 week ago'
    }
  ];

  const stats = {
    totalEarnings: 3420,
    activeListings: 12,
    totalViews: 1567,
    trustRating: user.trustRating || 4.2,
    salesThisMonth: 8,
    responseRate: 95
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Seller Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            Back to Marketplace
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalEarnings}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeListings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.salesThisMonth} sold this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trust Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.trustRating}/5</div>
              <p className="text-xs text-muted-foreground">
                {stats.responseRate}% response rate
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Your sales and views over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" />
                      <Bar dataKey="views" fill="hsl(var(--muted))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Listings</CardTitle>
                <CardDescription>Your latest product listings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {listing.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-primary font-medium">
                          ${listing.price}
                        </span>
                        <Badge variant={listing.status === 'sold' ? 'default' : 'secondary'}>
                          {listing.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{listing.views} views</span>
                        <span>{listing.likes} likes</span>
                        <span>{listing.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Insights */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Tips to improve your selling success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-sm mb-2">Photo Quality</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Items with high-quality photos get 3x more views
                </p>
                <Badge variant="outline" className="text-xs">Good</Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-sm mb-2">Response Time</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Quick responses lead to more sales
                </p>
                <Badge variant="default" className="text-xs">Excellent</Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-sm mb-2">Pricing</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Your prices are competitive for your category
                </p>
                <Badge variant="secondary" className="text-xs">Competitive</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Sales Chart */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Your sales and revenue over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" fill="hsl(var(--primary))" />
                  <Area type="monotone" dataKey="revenue" fill="hsl(var(--muted))" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}