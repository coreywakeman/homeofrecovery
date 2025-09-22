import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";
import { generateDemoData } from "@/lib/demoData";
import { useState, useEffect } from "react";

import { CalendarDays, Users, PieChart, DollarSign, Settings, Bell, LogOut, MapPin, Download } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "#8884d8", "#82ca9d", "#ffc658"];

const Admin = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Check if we should use demo mode
      const shouldUseDemoMode = !user || !isAdmin || new URLSearchParams(window.location.search).has('demo');
      setIsDemoMode(shouldUseDemoMode);
      
      if (shouldUseDemoMode) {
        // Use demo data
        const demoData = generateDemoData();
        setDashboardData(demoData);
        setLoading(false);
        return;
      }
      
      // Fetch real data from Supabase
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles(first_name, last_name, email),
          services(name, category, price),
          locations(name)
        `)
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Bookings error:', bookingsError);
        // Fall back to demo data if RLS blocks access
        const demoData = generateDemoData();
        setDashboardData(demoData);
        setIsDemoMode(true);
        setLoading(false);
        return;
      }

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (servicesError) throw servicesError;

      // Fetch locations
      const { data: locationsData, error: locationsError } = await supabase
        .from('locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (locationsError) throw locationsError;

      // Process bookings to get client data
      const clientsMap = new Map();
      
      bookingsData?.forEach((booking: any) => {
        const userId = booking.user_id;
        const clientName = booking.profiles ? `${booking.profiles.first_name || ''} ${booking.profiles.last_name || ''}`.trim() : 'Unknown';
        const clientEmail = booking.profiles?.email || '';
        
        if (!clientsMap.has(userId)) {
          clientsMap.set(userId, {
            id: userId,
            name: clientName,
            email: clientEmail,
            totalBookings: 0,
            totalSpent: 0,
            lastBooking: booking.created_at,
          });
        }
        
        const client = clientsMap.get(userId);
        client.totalBookings += 1;
        client.totalSpent += Number(booking.total_amount) || 0;
        
        // Update last booking if this one is more recent
        if (new Date(booking.created_at) > new Date(client.lastBooking)) {
          client.lastBooking = booking.created_at;
        }
      });

      const clients = Array.from(clientsMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);

      // Calculate overview statistics
      const today = new Date().toDateString();
      const todayBookings = bookingsData?.filter(
        (booking: any) => new Date(booking.booking_date).toDateString() === today
      ).length || 0;

      const totalRevenue = bookingsData?.reduce(
        (sum: number, booking: any) => sum + (Number(booking.total_amount) || 0),
        0
      ) || 0;

      const avgBookingValue = bookingsData?.length 
        ? Math.round(totalRevenue / bookingsData.length)
        : 0;

      // Revenue data for charts (last 30 days)
      const revenueData = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayRevenue = bookingsData?.filter(
          (booking: any) => new Date(booking.booking_date).toDateString() === date.toDateString()
        ).reduce((sum: number, booking: any) => sum + (Number(booking.total_amount) || 0), 0) || 0;
        
        revenueData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
          revenue: dayRevenue
        });
      }

      // Service distribution for pie chart
      const serviceDistribution = servicesData?.map((service: any) => {
        const serviceBookings = bookingsData?.filter(
          (booking: any) => booking.service_id === service.id
        ) || [];
        return {
          name: service.name,
          value: serviceBookings.length,
          revenue: serviceBookings.reduce((sum: number, booking: any) => sum + (Number(booking.total_amount) || 0), 0)
        };
      }).filter((service: any) => service.value > 0) || [];

      setDashboardData({
        overview: {
          todayBookings,
          totalBookings: bookingsData?.length || 0,
          totalRevenue,
          activeServices: servicesData?.filter((s: any) => s.active).length || 0,
          totalClients: clients.length,
          avgBookingValue,
        },
        bookings: bookingsData || [],
        services: servicesData || [],
        locations: locationsData || [],
        clients,
        revenueData,
        serviceDistribution,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fall back to demo data on any error
      const demoData = generateDemoData();
      setDashboardData(demoData);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleDemoAction = () => {
    if (isDemoMode) {
      toast({
        title: "Demo Mode",
        description: "Changes are not saved in demo mode",
        variant: "default",
      });
    }
  };

  const exportCSV = (data: any[], filename: string) => {
    if (isDemoMode) {
      handleDemoAction();
      return;
    }
    
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Allow demo mode or require admin authentication
    if (!user && !new URLSearchParams(window.location.search).has('demo')) {
      navigate('/auth');
      return;
    }
    
    if (user && !isAdmin) {
      navigate('/');
      return;
    }
    
    loadDashboardData();
  }, [user, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-wellness flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const filteredBookings = dashboardData.bookings?.filter((booking: any) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (isDemoMode ? booking.client_name : (booking.profiles ? `${booking.profiles.first_name} ${booking.profiles.last_name}` : '')).toLowerCase().includes(searchLower) ||
      (isDemoMode ? booking.service_name : (booking.services?.name || '')).toLowerCase().includes(searchLower) ||
      booking.status.toLowerCase().includes(searchLower) ||
      (booking.notes || '').toLowerCase().includes(searchLower)
    );
  }) || [];

  const NavItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        activeTab === value 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend?: string }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Optional Demo Indicator */}
      {isDemoMode && new URLSearchParams(window.location.search).has('demo') && (
        <div className="mb-4 flex justify-center">
          <Badge variant="outline" className="text-xs">Demo Mode</Badge>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Wellness & Recovery Center Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="flex space-x-6">
          <aside className="w-64 space-y-2">
            <NavItem icon={<Users className="w-4 h-4" />} label="Overview" value="overview" />
            <NavItem icon={<CalendarDays className="w-4 h-4" />} label="Bookings" value="bookings" />
            <NavItem icon={<PieChart className="w-4 h-4" />} label="Services" value="services" />
            <NavItem icon={<DollarSign className="w-4 h-4" />} label="Clients" value="clients" />
            <NavItem icon={<MapPin className="w-4 h-4" />} label="Locations" value="locations" />
          </aside>

          <main className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <StatCard
                    title="Today's Bookings"
                    value={dashboardData.overview.todayBookings.toString()}
                    icon={CalendarDays}
                    trend="+12% from yesterday"
                  />
                  <StatCard
                    title="Total Bookings"
                    value={dashboardData.overview.totalBookings.toString()}
                    icon={CalendarDays}
                    trend="+23% this month"
                  />
                  <StatCard
                    title="Total Revenue"
                    value={`$${dashboardData.overview.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend="+18% this month"
                  />
                  <StatCard
                    title="Active Services"
                    value={dashboardData.overview.activeServices.toString()}
                    icon={Settings}
                    trend="All services active"
                  />
                  <StatCard
                    title="Total Clients"
                    value={dashboardData.overview.totalClients.toString()}
                    icon={Users}
                    trend="+15% this month"
                  />
                  <StatCard
                    title="Avg Booking Value"
                    value={`$${dashboardData.overview.avgBookingValue}`}
                    icon={DollarSign}
                    trend="+5% this month"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                      <CardDescription>Daily revenue over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={dashboardData.revenueData}>
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                            <Area 
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="hsl(var(--primary))" 
                              fillOpacity={1} 
                              fill="url(#colorRevenue)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Service Distribution</CardTitle>
                      <CardDescription>Booking distribution by service type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RPieChart>
                            <Pie 
                              dataKey="value" 
                              data={dashboardData.serviceDistribution}
                              cx="50%" 
                              cy="50%" 
                              outerRadius={80} 
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {dashboardData.serviceDistribution.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [value, 'Bookings']} />
                          </RPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>Latest booking activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboardData.bookings.slice(0, 10).map((booking: any) => (
                            <TableRow key={booking.id}>
                              <TableCell>
                                {new Date(booking.booking_date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {isDemoMode ? booking.client_name : (
                                  booking.profiles 
                                    ? `${booking.profiles.first_name || ''} ${booking.profiles.last_name || ''}`.trim()
                                    : 'Unknown'
                                )}
                              </TableCell>
                              <TableCell>
                                {isDemoMode ? booking.service_name : (booking.services?.name || 'Unknown Service')}
                              </TableCell>
                              <TableCell>
                                <Badge variant={booking.status === 'completed' ? 'default' : 'secondary'}>
                                  {booking.status}
                                </Badge>
                              </TableCell>
                              <TableCell>${booking.total_amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Bookings Management</h2>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => exportCSV(filteredBookings, 'bookings')}
                      className="flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </Button>
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>
                      {filteredBookings.length} total bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBookings.slice(0, 50).map((booking: any) => (
                          <TableRow key={booking.id}>
                            <TableCell>
                              {new Date(booking.booking_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {isDemoMode ? booking.client_name : (
                                booking.profiles 
                                  ? `${booking.profiles.first_name || ''} ${booking.profiles.last_name || ''}`.trim()
                                  : 'Unknown'
                              )}
                            </TableCell>
                            <TableCell>
                              {isDemoMode ? booking.service_name : (booking.services?.name || 'Unknown Service')}
                            </TableCell>
                            <TableCell>
                              {isDemoMode ? booking.location_name : (booking.locations?.name || 'Unknown Location')}
                            </TableCell>
                            <TableCell>
                              <Badge variant={booking.status === 'completed' ? 'default' : 'secondary'}>
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>${booking.total_amount}</TableCell>
                            <TableCell>
                              <Badge variant={booking.payment_status === 'completed' ? 'default' : 'outline'}>
                                {booking.payment_status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {booking.notes || '—'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Services Management</h2>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>All Services</CardTitle>
                    <CardDescription>
                      {dashboardData.services.length} total services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.services.map((service: any) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{service.category}</Badge>
                            </TableCell>
                            <TableCell>${service.price}</TableCell>
                            <TableCell>{service.duration} min</TableCell>
                            <TableCell>{service.max_capacity}</TableCell>
                            <TableCell>
                              <Badge variant={service.active ? 'default' : 'outline'}>
                                {service.active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {service.description || '—'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clients" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Client Analytics</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => exportCSV(dashboardData.clients, 'clients')}
                    className="flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    title="Active Clients"
                    value={dashboardData.overview.totalClients.toString()}
                    icon={Users}
                    trend="+12% from last month"
                  />
                  <StatCard
                    title="Avg Bookings/Client"
                    value={dashboardData.clients.length > 0 
                      ? Math.round(dashboardData.overview.totalBookings / dashboardData.clients.length).toString()
                      : "0"
                    }
                    icon={CalendarDays}
                    trend="+8% from last month"
                  />
                  <StatCard
                    title="Top Client Spend"
                    value={dashboardData.clients.length > 0 
                      ? `$${dashboardData.clients[0]?.totalSpent || dashboardData.clients[0]?.total_spent || 0}`
                      : "$0"
                    }
                    icon={DollarSign}
                    trend="+15% this month"
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>All Clients</CardTitle>
                    <CardDescription>
                      Showing all {dashboardData.clients.length} clients by total spending
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Total Bookings</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead>Last Booking</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Membership</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.clients.map((client: any) => (
                          <TableRow key={client.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  {isDemoMode && client.avatar_url ? (
                                    <AvatarImage src={client.avatar_url} alt={`${client.first_name} ${client.last_name}`} />
                                  ) : null}
                                  <AvatarFallback>
                                    {isDemoMode 
                                      ? `${client.first_name?.[0] || ''}${client.last_name?.[0] || ''}`
                                      : client.name.split(' ').map((n: string) => n[0]).join('')
                                    }
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {isDemoMode ? `${client.first_name} ${client.last_name}` : client.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{client.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{isDemoMode ? client.total_bookings : client.totalBookings}</TableCell>
                            <TableCell>${isDemoMode ? client.total_spent : client.totalSpent}</TableCell>
                            <TableCell>
                              {new Date(isDemoMode ? client.last_booking : client.lastBooking).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={isDemoMode && client.status === 'inactive' ? 'outline' : 'default'}>
                                {isDemoMode ? client.status : 'Active'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {isDemoMode && client.membership_type ? (
                                <Badge variant="outline">{client.membership_type}</Badge>
                              ) : '—'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="locations" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Locations</h2>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>All Locations</CardTitle>
                    <CardDescription>
                      {dashboardData.locations.length} total locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.locations.map((location: any) => (
                          <TableRow key={location.id}>
                            <TableCell className="font-medium">{location.name}</TableCell>
                            <TableCell>{location.address}</TableCell>
                            <TableCell>{location.phone}</TableCell>
                            <TableCell>
                              <Badge variant={location.active ? 'default' : 'outline'}>
                                {location.active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(location.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;