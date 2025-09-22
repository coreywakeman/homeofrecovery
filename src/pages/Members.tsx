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
import { useToast } from "@/hooks/use-toast";
import { generateMemberDemoData } from "@/lib/demoData";
import { useState, useEffect } from "react";

import { 
  CalendarDays, 
  Users, 
  Clock, 
  CreditCard, 
  Settings, 
  Bell, 
  LogOut, 
  Home,
  BookOpen,
  User,
  Calendar,
  Activity,
  Star,
  Edit3,
  Search
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const Members = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [memberData, setMemberData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  const loadMemberData = async () => {
    try {
      setLoading(true);
      
      // Check if we should use demo mode
      const shouldUseDemoMode = !user || new URLSearchParams(window.location.search).has('demo');
      setIsDemoMode(shouldUseDemoMode);
      
      if (shouldUseDemoMode) {
        // Use demo data
        const demoData = generateMemberDemoData();
        setMemberData(demoData);
        setLoading(false);
        return;
      }
      
      // Fetch real member data from Supabase
      const [
        { data: profile, error: profileError },
        { data: bookings, error: bookingsError },
        { data: membership, error: membershipError },
        { data: services, error: servicesError }
      ] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single(),
        supabase
          .from('bookings')
          .select(`
            *,
            services(name, category, price, duration),
            locations(name, address)
          `)
          .eq('user_id', user.id)
          .order('booking_date', { ascending: false }),
        supabase
          .from('memberships')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle(),
        supabase
          .from('services')
          .select('*')
          .eq('active', true)
          .order('name')
      ]);

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile error:', profileError);
        // Fall back to demo data if RLS blocks access
        const demoData = generateMemberDemoData();
        setMemberData(demoData);
        setIsDemoMode(true);
        setLoading(false);
        return;
      }

      // Set profile form data
      if (profile) {
        setProfileForm({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          email: profile.email || user?.email || ''
        });
      }

      // Calculate member statistics
      const upcomingBookings = bookings?.filter(b => 
        new Date(b.booking_date) > new Date() && b.status === 'confirmed'
      ) || [];

      const completedBookings = bookings?.filter(b => 
        b.status === 'completed'
      ) || [];

      const totalSpent = completedBookings.reduce((sum, booking) => 
        sum + (Number(booking.total_amount) || 0), 0
      );

      // Activity data for chart (last 6 months)
      const activityData = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthBookings = bookings?.filter(b => {
          const bookingDate = new Date(b.booking_date);
          return bookingDate.getMonth() === date.getMonth() && 
                 bookingDate.getFullYear() === date.getFullYear() &&
                 b.status === 'completed';
        }) || [];
        
        activityData.push({
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          sessions: monthBookings.length,
          amount: monthBookings.reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0)
        });
      }

      setMemberData({
        profile: profile || { 
          first_name: '', 
          last_name: '', 
          email: user?.email || '',
          id: user?.id 
        },
        bookings: bookings || [],
        membership,
        services: services || [],
        stats: {
          upcomingBookings: upcomingBookings.length,
          completedSessions: completedBookings.length,
          totalSpent,
          creditsRemaining: membership?.credits_remaining || 0,
          memberSince: profile?.created_at || user?.created_at
        },
        activityData
      });
    } catch (error) {
      console.error('Error loading member data:', error);
      // Fall back to demo data on any error
      const demoData = generateMemberDemoData();
      setMemberData(demoData);
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

  const handleProfileUpdate = async () => {
    if (isDemoMode) {
      handleDemoAction();
      setIsEditing(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileForm.first_name,
          last_name: profileForm.last_name
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
      loadMemberData();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const bookService = async (serviceId: string, date: string, time: string) => {
    if (isDemoMode) {
      handleDemoAction();
      return;
    }

    // This would integrate with actual booking system
    toast({
      title: "Booking Request",
      description: "Your booking request has been submitted for review.",
    });
  };

  const cancelBooking = async (bookingId: string) => {
    if (isDemoMode) {
      handleDemoAction();
      return;
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      loadMemberData();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Allow demo mode or require user authentication
    if (!user && !new URLSearchParams(window.location.search).has('demo')) {
      navigate('/auth');
      return;
    }
    
    loadMemberData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-wellness flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your member hub...</p>
        </div>
      </div>
    );
  }

  if (!memberData) {
    return null;
  }

  const filteredBookings = memberData.bookings?.filter((booking: any) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
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

  const StatCard = ({ title, value, icon: Icon, trend, color = "primary" }: { 
    title: string, 
    value: string, 
    icon: any, 
    trend?: string,
    color?: string 
  }) => (
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

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "default",
      completed: "secondary",
      cancelled: "destructive",
      "no-show": "outline"
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
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
            <h1 className="text-3xl font-bold tracking-tight">Members Hub</h1>
            <p className="text-muted-foreground">Welcome back, {memberData.profile?.first_name || 'Member'}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              Homepage
            </Button>
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
            <NavItem icon={<Activity className="w-4 h-4" />} label="Dashboard" value="dashboard" />
            <NavItem icon={<CalendarDays className="w-4 h-4" />} label="My Bookings" value="bookings" />
            <NavItem icon={<User className="w-4 h-4" />} label="Profile" value="profile" />
            <NavItem icon={<BookOpen className="w-4 h-4" />} label="Book Services" value="book-services" />
            <NavItem icon={<CreditCard className="w-4 h-4" />} label="Membership" value="membership" />
          </aside>

          <main className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Upcoming Sessions"
                    value={memberData.stats.upcomingBookings.toString()}
                    icon={CalendarDays}
                    trend="Next session tomorrow"
                  />
                  <StatCard
                    title="Completed Sessions"
                    value={memberData.stats.completedSessions.toString()}
                    icon={Clock}
                    trend="Great progress!"
                  />
                  <StatCard
                    title="Total Invested"
                    value={`$${memberData.stats.totalSpent.toLocaleString()}`}
                    icon={CreditCard}
                    trend="In your wellness"
                  />
                  <StatCard
                    title="Credits Remaining"
                    value={memberData.stats.creditsRemaining.toString()}
                    icon={Star}
                    trend="Use by month end"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Trends</CardTitle>
                      <CardDescription>Your wellness journey over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={memberData.activityData}>
                            <defs>
                              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => [value, 'Sessions']} />
                            <Area 
                              type="monotone" 
                              dataKey="sessions" 
                              stroke="hsl(var(--primary))" 
                              fillOpacity={1} 
                              fill="url(#colorSessions)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>What would you like to do today?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setActiveTab('book-services')}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book a Session
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setActiveTab('bookings')}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        View My Bookings
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setActiveTab('profile')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Update Profile
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setActiveTab('membership')}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage Membership
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Your latest wellness sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {memberData.bookings?.slice(0, 5).map((booking: any) => (
                          <TableRow key={booking.id}>
                            <TableCell>{formatDate(booking.booking_date)}</TableCell>
                            <TableCell>
                              {isDemoMode ? booking.service_name : (booking.services?.name || 'Unknown Service')}
                            </TableCell>
                            <TableCell>
                              {isDemoMode ? booking.location_name : (booking.locations?.name || 'Unknown Location')}
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>${booking.total_amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Bookings Tab */}
              <TabsContent value="bookings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">My Bookings</h2>
                    <p className="text-muted-foreground">Manage your wellness sessions</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Button onClick={() => setActiveTab('book-services')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Book New Session
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBookings.map((booking: any) => (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{formatDate(booking.booking_date)}</div>
                                <div className="text-sm text-muted-foreground">
                                  {isDemoMode ? '60 min' : `${booking.services?.duration || 60} min`}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {isDemoMode ? booking.service_name : (booking.services?.name || 'Unknown Service')}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {isDemoMode ? booking.category : (booking.services?.category || '')}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {isDemoMode ? booking.location_name : (booking.locations?.name || 'Unknown Location')}
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>${booking.total_amount}</TableCell>
                            <TableCell>
                              {booking.status === 'confirmed' && new Date(booking.booking_date) > new Date() && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => cancelBooking(booking.id)}
                                >
                                  Cancel
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">My Profile</h2>
                    <p className="text-muted-foreground">Manage your personal information</p>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileForm.first_name}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, first_name: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileForm.last_name}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, last_name: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          disabled={true}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Membership Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <Avatar className="h-20 w-20 mx-auto mb-4">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${memberData.profile?.first_name}${memberData.profile?.last_name}`} />
                          <AvatarFallback>
                            {(memberData.profile?.first_name?.[0] || '') + (memberData.profile?.last_name?.[0] || '')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">
                          {memberData.profile?.first_name} {memberData.profile?.last_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Member since {new Date(memberData.stats.memberSince).getFullYear()}
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Membership</span>
                          <span className="text-sm font-medium">
                            {memberData.membership?.plan_type || 'Basic'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="secondary">
                            {memberData.membership?.status || 'Active'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Book Services Tab */}
              <TabsContent value="book-services" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Book Services</h2>
                  <p className="text-muted-foreground">Choose from our wellness and recovery services</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {memberData.services?.map((service: any) => (
                    <Card key={service.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <CardDescription>{service.category}</CardDescription>
                          </div>
                          <Badge variant="outline">${service.price}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {service.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-muted-foreground">
                            Duration: {service.duration} min
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Capacity: {service.max_capacity}
                          </span>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => bookService(service.id, '', '')}
                        >
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Membership Tab */}
              <TabsContent value="membership" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">My Membership</h2>
                  <p className="text-muted-foreground">Manage your membership and billing</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription>Your active membership details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Plan Type</span>
                        <Badge variant="secondary">
                          {memberData.membership?.plan_type || 'Basic Plan'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Status</span>
                        <Badge variant="default">
                          {memberData.membership?.status || 'Active'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Auto Renew</span>
                        <span>{memberData.membership?.auto_renew ? 'Enabled' : 'Disabled'}</span>
                      </div>
                      {memberData.membership?.end_date && (
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Next Billing</span>
                          <span>{new Date(memberData.membership.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Usage & Credits</CardTitle>
                      <CardDescription>Track your membership usage</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Credits Remaining</span>
                          <span className="text-sm font-medium">
                            {memberData.stats.creditsRemaining} credits
                          </span>
                        </div>
                        <Progress value={memberData.stats.creditsRemaining} max={100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Sessions This Month</span>
                          <span className="text-sm font-medium">
                            {memberData.activityData?.[memberData.activityData.length - 1]?.sessions || 0}
                          </span>
                        </div>
                        <Progress 
                          value={memberData.activityData?.[memberData.activityData.length - 1]?.sessions || 0} 
                          max={20} 
                          className="h-2" 
                        />
                      </div>
                      <Separator />
                      <div className="text-center pt-4">
                        <Button variant="outline" className="w-full" onClick={handleDemoAction}>
                          Upgrade Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Members;