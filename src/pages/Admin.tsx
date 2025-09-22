import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";

import { CalendarDays, Users, PieChart, DollarSign, Settings, Bell, LogOut } from "lucide-react";
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

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];

export default function Admin() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tab, setTab] = useState("overview");
  const [overview, setOverview] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [clients, setClients] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Admin component mounted");
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load all data
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: false });
      
      const { data: servicesData } = await supabase
        .from('services')
        .select('*');
        
      const { data: locationsData } = await supabase
        .from('locations')
        .select('*');

      // Get unique clients from bookings
      const uniqueClients = bookingsData?.reduce((acc, booking) => {
        if (!acc.find(client => client.user_id === booking.user_id)) {
          acc.push({
            user_id: booking.user_id,
            totalBookings: bookingsData.filter(b => b.user_id === booking.user_id).length,
            totalSpent: bookingsData
              .filter(b => b.user_id === booking.user_id && b.payment_status === 'completed')
              .reduce((sum, b) => sum + Number(b.total_amount), 0),
            lastBooking: Math.max(...bookingsData
              .filter(b => b.user_id === booking.user_id)
              .map(b => new Date(b.booking_date).getTime()))
          });
        }
        return acc;
      }, []) || [];

      setBookings(bookingsData || []);
      setServices(servicesData || []);
      setLocations(locationsData || []);
      setClients(uniqueClients);
      
      // Calculate overview stats
      const todayBookings = bookingsData?.filter(b => 
        new Date(b.booking_date).toDateString() === new Date().toDateString()
      ).length || 0;
      
      const totalRevenue = bookingsData?.reduce((sum, b) => 
        b.payment_status === 'completed' ? sum + Number(b.total_amount) : sum, 0
      ) || 0;

      // Generate revenue data for the chart
      const last30Days = Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const revenueByDay = last30Days.map(date => {
        const dayRevenue = bookingsData?.filter(b => 
          b.booking_date.split('T')[0] === date && b.payment_status === 'completed'
        ).reduce((sum, b) => sum + Number(b.total_amount), 0) || 0;
        
        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: dayRevenue
        };
      });

      setRevenueData(revenueByDay);

      setOverview({
        todayBookings,
        totalBookings: bookingsData?.length || 0,
        totalRevenue,
        activeServices: servicesData?.filter(s => s.active).length || 0,
        totalClients: uniqueClients.length,
        avgBookingValue: bookingsData?.length ? (totalRevenue / bookingsData.filter(b => b.payment_status === 'completed').length).toFixed(2) : 0
      });
      
    } catch (error) {
      toast({
        title: "Error loading dashboard",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    console.log("Admin loading state");
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  console.log("Admin rendering main content");
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Wellness & Recovery — Admin</h1>
            <p className="text-sm text-muted-foreground">Manage bookings, services, and system health.</p>
          </div>
          <div className="flex items-center gap-3">
            <Input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search bookings, services..." 
              className="w-64"
            />
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3">
            <nav className="space-y-2">
              <NavItem 
                label="Overview" 
                icon={<PieChart size={16} />} 
                active={tab === "overview"} 
                onClick={() => setTab("overview")} 
              />
              <NavItem 
                label="Bookings" 
                icon={<CalendarDays size={16} />} 
                active={tab === "bookings"} 
                onClick={() => setTab("bookings")} 
              />
              <NavItem 
                label="Services" 
                icon={<Settings size={16} />} 
                active={tab === "services"} 
                onClick={() => setTab("services")} 
              />
              <NavItem 
                label="Clients" 
                icon={<Users size={16} />} 
                active={tab === "clients"} 
                onClick={() => setTab("clients")} 
              />
            </nav>
          </aside>

          <main className="col-span-9">
            {tab === "overview" && (
              <section className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <StatCard title="Today's Bookings" value={overview?.todayBookings || 0} />
                  <StatCard title="Total Bookings" value={overview?.totalBookings || 0} />
                  <StatCard title="Total Revenue" value={`$${overview?.totalRevenue || 0}`} />
                  <StatCard title="Active Services" value={overview?.activeServices || 0} />
                  <StatCard title="Total Clients" value={overview?.totalClients || 0} />
                  <StatCard title="Avg Booking" value={`$${overview?.avgBookingValue || 0}`} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Over Time (30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
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
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.slice(0, 5).map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {booking.status}
                                </span>
                              </TableCell>
                              <TableCell>${booking.total_amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Service Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RPieChart>
                          <Pie 
                            dataKey="count" 
                            data={services.map((service, index) => ({
                              name: service.name,
                              count: bookings.filter(b => b.service_id === service.id).length,
                              fill: COLORS[index % COLORS.length]
                            }))}
                            outerRadius={80} 
                            label
                          />
                          <Tooltip />
                        </RPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {tab === "bookings" && (
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings
                          .filter(booking => 
                            !search || 
                            booking.notes?.toLowerCase().includes(search.toLowerCase()) ||
                            booking.status.toLowerCase().includes(search.toLowerCase())
                          )
                          .map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {services.find(s => s.id === booking.service_id)?.name || 'Unknown Service'}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                                booking.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.payment_status}
                              </span>
                            </TableCell>
                            <TableCell>${booking.total_amount}</TableCell>
                            <TableCell>{booking.notes || 'No notes'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </section>
            )}

            {tab === "services" && (
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Services Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Duration (min)</TableHead>
                          <TableHead>Max Capacity</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell>{service.category}</TableCell>
                            <TableCell>${service.price}</TableCell>
                            <TableCell>{service.duration}</TableCell>
                            <TableCell>{service.max_capacity}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                service.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {service.active ? 'Active' : 'Inactive'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </section>
            )}

            {tab === "clients" && (
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Client Analytics ({clients.length} Total Clients)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client ID</TableHead>
                          <TableHead>Total Bookings</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead>Last Booking</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clients
                          .sort((a, b) => b.totalSpent - a.totalSpent) // Sort by highest spenders
                          .slice(0, 20) // Show top 20 clients
                          .map((client, index) => {
                            const daysSinceLastBooking = Math.floor((Date.now() - client.lastBooking) / (1000 * 60 * 60 * 24));
                            const isActive = daysSinceLastBooking <= 30;
                            
                            return (
                              <TableRow key={client.user_id}>
                                <TableCell className="font-mono text-xs">
                                  ...{client.user_id.slice(-8)}
                                </TableCell>
                                <TableCell className="font-medium">{client.totalBookings}</TableCell>
                                <TableCell className="font-medium">${client.totalSpent.toFixed(2)}</TableCell>
                                <TableCell>{new Date(client.lastBooking).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">Active Clients (30 days)</div>
                          <div className="text-2xl font-bold">
                            {clients.filter(c => (Date.now() - c.lastBooking) / (1000 * 60 * 60 * 24) <= 30).length}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">Avg Bookings per Client</div>
                          <div className="text-2xl font-bold">
                            {clients.length ? (clients.reduce((sum, c) => sum + c.totalBookings, 0) / clients.length).toFixed(1) : 0}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">Top Client Spend</div>
                          <div className="text-2xl font-bold">
                            ${clients.length ? Math.max(...clients.map(c => c.totalSpent)).toFixed(2) : 0}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {tab === "locations" && (
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Locations Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {locations.map((location) => (
                          <TableRow key={location.id}>
                            <TableCell className="font-medium">{location.name}</TableCell>
                            <TableCell>{location.address}</TableCell>
                            <TableCell>{location.phone || 'No phone'}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                location.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {location.active ? 'Active' : 'Inactive'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ label, icon, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full text-left p-3 rounded transition-colors ${
        active 
          ? "bg-primary text-primary-foreground shadow" 
          : "hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        <div className="text-sm font-medium">{label}</div>
      </div>
    </button>
  );
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div className="text-lg">📊</div>
        </div>
      </CardContent>
    </Card>
  );
}