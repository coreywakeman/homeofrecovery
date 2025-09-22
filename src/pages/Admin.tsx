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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load overview stats
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*');
      
      const { data: servicesData } = await supabase
        .from('services')
        .select('*');
        
      const { data: locationsData } = await supabase
        .from('locations')
        .select('*');

      setBookings(bookingsData || []);
      setServices(servicesData || []);
      setLocations(locationsData || []);
      
      // Calculate overview stats
      const todayBookings = bookingsData?.filter(b => 
        new Date(b.booking_date).toDateString() === new Date().toDateString()
      ).length || 0;
      
      const totalRevenue = bookingsData?.reduce((sum, b) => 
        b.payment_status === 'completed' ? sum + Number(b.total_amount) : sum, 0
      ) || 0;

      setOverview({
        todayBookings,
        totalBookings: bookingsData?.length || 0,
        totalRevenue,
        activeServices: servicesData?.filter(s => s.active).length || 0,
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                label="Locations" 
                icon={<Users size={16} />} 
                active={tab === "locations"} 
                onClick={() => setTab("locations")} 
              />
            </nav>
          </aside>

          <main className="col-span-9">
            {tab === "overview" && (
              <section className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard title="Today's Bookings" value={overview?.todayBookings || 0} />
                  <StatCard title="Total Bookings" value={overview?.totalBookings || 0} />
                  <StatCard title="Total Revenue" value={`$${overview?.totalRevenue || 0}`} />
                  <StatCard title="Active Services" value={overview?.activeServices || 0} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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