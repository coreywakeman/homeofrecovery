// Demo data generator for admin dashboard
import { addDays, subDays, format } from 'date-fns';

export interface DemoClient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  total_bookings: number;
  total_spent: number;
  last_booking: string;
  status: 'active' | 'inactive';
  membership_type?: string;
  notes?: string;
}

export interface DemoBooking {
  id: string;
  user_id: string;
  service_id: string;
  location_id: string;
  booking_date: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  payment_status: 'pending' | 'completed' | 'failed';
  total_amount: number;
  notes?: string;
  created_at: string;
  client_name: string;
  service_name: string;
  location_name: string;
  category?: string;
}

export interface DemoService {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  max_capacity: number;
  active: boolean;
  created_at: string;
}

export interface DemoLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  active: boolean;
  created_at: string;
}

const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Elijah', 'Charlotte', 'Oliver', 'Amelia', 'James',
  'Sophia', 'Benjamin', 'Isabella', 'Lucas', 'Mia', 'Henry', 'Evelyn', 'Alexander', 'Harper', 'Michael',
  'Luna', 'Daniel', 'Camila', 'Matthew', 'Gianna', 'Jackson', 'Elizabeth', 'Sebastian', 'Eleanor', 'Jack',
  'Ella', 'Aiden', 'Abigail', 'Owen', 'Sofia'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright'
];

const serviceData = [
  { name: 'Cryotherapy Session', category: 'Recovery', price: 65, duration: 30, description: 'Full-body cryotherapy for muscle recovery and inflammation reduction' },
  { name: 'Infrared Sauna', category: 'Wellness', price: 45, duration: 45, description: 'Relaxing infrared sauna session for detoxification and stress relief' },
  { name: 'Compression Therapy', category: 'Recovery', price: 55, duration: 30, description: 'NormaTec compression therapy for improved circulation' },
  { name: 'Red Light Therapy', category: 'Wellness', price: 40, duration: 20, description: 'Photobiomodulation therapy for skin health and cellular regeneration' },
  { name: 'Hyperbaric Oxygen', category: 'Recovery', price: 85, duration: 60, description: 'Hyperbaric oxygen therapy for enhanced healing and recovery' },
  { name: 'Contrast Therapy', category: 'Recovery', price: 75, duration: 45, description: 'Alternating hot and cold therapy for optimal recovery' },
  { name: 'Massage Therapy', category: 'Wellness', price: 95, duration: 60, description: 'Professional therapeutic massage for muscle tension relief' },
  { name: 'IV Vitamin Drip', category: 'Wellness', price: 125, duration: 45, description: 'Customized IV vitamin therapy for optimal nutrition' },
  { name: 'Float Tank', category: 'Wellness', price: 70, duration: 60, description: 'Sensory deprivation float tank for deep relaxation' }
];

const locationData = [
  { name: 'Downtown Recovery Center', address: '123 Main St, Downtown', phone: '(555) 123-4567' },
  { name: 'Wellness Spa North', address: '456 Oak Ave, Northside', phone: '(555) 234-5678' },
  { name: 'Recovery Hub West', address: '789 Pine Blvd, Westfield', phone: '(555) 345-6789' }
];

// Seeded random number generator for consistent demo data
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  choice<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }
}

const rng = new SeededRandom(12345);

export function generateDemoClients(): DemoClient[] {
  const clients: DemoClient[] = [];
  
  for (let i = 0; i < 35; i++) {
    const firstName = rng.choice(firstNames);
    const lastName = rng.choice(lastNames);
    const totalBookings = rng.nextInt(1, 25);
    const avgBookingValue = rng.nextInt(45, 125);
    const totalSpent = totalBookings * avgBookingValue + rng.nextInt(-200, 200);
    
    clients.push({
      id: `client-${i + 1}`,
      first_name: firstName,
      last_name: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      created_at: subDays(new Date(), rng.nextInt(30, 365)).toISOString(),
      total_bookings: totalBookings,
      total_spent: totalSpent,
      last_booking: subDays(new Date(), rng.nextInt(0, 30)).toISOString(),
      status: rng.next() > 0.1 ? 'active' : 'inactive',
      membership_type: rng.choice(['Premium', 'Basic', 'VIP', 'Trial']),
      notes: rng.next() > 0.7 ? rng.choice(['Prefers morning appointments', 'Injury recovery focus', 'Wellness enthusiast', 'Athlete training']) : undefined
    });
  }
  
  return clients.sort((a, b) => b.total_spent - a.total_spent);
}

export function generateDemoServices(): DemoService[] {
  return serviceData.map((service, index) => ({
    id: `service-${index + 1}`,
    name: service.name,
    category: service.category,
    price: service.price,
    duration: service.duration,
    description: service.description,
    max_capacity: rng.nextInt(1, 4),
    active: true,
    created_at: subDays(new Date(), rng.nextInt(30, 180)).toISOString()
  }));
}

export function generateDemoLocations(): DemoLocation[] {
  return locationData.map((location, index) => ({
    id: `location-${index + 1}`,
    name: location.name,
    address: location.address,
    phone: location.phone,
    active: true,
    created_at: subDays(new Date(), rng.nextInt(180, 365)).toISOString()
  }));
}

export function generateDemoBookings(clients: DemoClient[], services: DemoService[], locations: DemoLocation[]): DemoBooking[] {
  const bookings: DemoBooking[] = [];
  let bookingId = 1;
  
  // Generate bookings for the past 60 days
  for (let day = 0; day < 60; day++) {
    const bookingsPerDay = rng.nextInt(2, 8);
    const currentDate = subDays(new Date(), day);
    
    for (let i = 0; i < bookingsPerDay; i++) {
      const client = rng.choice(clients);
      const service = rng.choice(services);
      const location = rng.choice(locations);
      
      let status: DemoBooking['status'];
      let paymentStatus: DemoBooking['payment_status'];
      
      if (day > 0) {
        // Past bookings
        const statusRoll = rng.next();
        if (statusRoll < 0.75) {
          status = 'completed';
          paymentStatus = 'completed';
        } else if (statusRoll < 0.85) {
          status = 'cancelled';
          paymentStatus = 'pending';
        } else {
          status = 'no-show';
          paymentStatus = 'pending';
        }
      } else {
        // Today's bookings
        status = 'confirmed';
        paymentStatus = 'pending';
      }
      
      bookings.push({
        id: `booking-${bookingId++}`,
        user_id: client.id,
        service_id: service.id,
        location_id: location.id,
        booking_date: currentDate.toISOString(),
        status,
        payment_status: paymentStatus,
        total_amount: service.price + rng.nextInt(-10, 20),
        notes: rng.next() > 0.8 ? rng.choice(['First visit', 'Regular client', 'Referred by friend', 'Special requirements']) : undefined,
        created_at: subDays(currentDate, rng.nextInt(0, 7)).toISOString(),
        client_name: `${client.first_name} ${client.last_name}`,
        service_name: service.name,
        location_name: location.name
      });
    }
  }
  
  return bookings.sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime());
}

export function generateDemoData() {
  const clients = generateDemoClients();
  const services = generateDemoServices();
  const locations = generateDemoLocations();
  const bookings = generateDemoBookings(clients, services, locations);
  
  // Calculate overview stats
  const today = new Date().toDateString();
  const todayBookings = bookings.filter(b => new Date(b.booking_date).toDateString() === today);
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalRevenue = completedBookings.reduce((sum, b) => sum + b.total_amount, 0);
  const activeClients = clients.filter(c => c.status === 'active').length;
  const avgBookingValue = totalRevenue / completedBookings.length;
  
  // Revenue data for charts (last 30 days)
  const revenueData = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayBookings = bookings.filter(b => 
      new Date(b.booking_date).toDateString() === date.toDateString() && 
      b.status === 'completed'
    );
    const dayRevenue = dayBookings.reduce((sum, b) => sum + b.total_amount, 0);
    
    revenueData.push({
      date: format(date, 'MMM dd'),
      revenue: dayRevenue
    });
  }
  
  // Service distribution for pie chart
  const serviceDistribution = services.map(service => {
    const serviceBookings = bookings.filter(b => b.service_id === service.id && b.status === 'completed');
    return {
      name: service.name,
      value: serviceBookings.length,
      revenue: serviceBookings.reduce((sum, b) => sum + b.total_amount, 0)
    };
  }).filter(s => s.value > 0);
  
  return {
    clients,
    services,
    locations,
    bookings,
    overview: {
      todayBookings: todayBookings.length,
      totalBookings: bookings.length,
      totalRevenue,
      activeServices: services.filter(s => s.active).length,
      totalClients: activeClients,
      avgBookingValue: Math.round(avgBookingValue)
    },
    revenueData,
    serviceDistribution
  };
}

// Member-specific demo data generator
export function generateMemberDemoData() {
  const services = generateDemoServices();
  const locations = generateDemoLocations();
  
  // Generate member profile
  const profile = {
    id: 'member-demo-1',
    first_name: 'Alex',
    last_name: 'Johnson',
    email: 'alex.johnson@email.com',
    created_at: subDays(new Date(), 180).toISOString()
  };
  
  // Generate member bookings (last 6 months)
  const memberBookings: DemoBooking[] = [];
  let bookingId = 1;
  
  for (let month = 0; month < 6; month++) {
    const bookingsThisMonth = rng.nextInt(3, 8);
    
    for (let i = 0; i < bookingsThisMonth; i++) {
      const date = subDays(new Date(), month * 30 + rng.nextInt(0, 29));
      const service = rng.choice(services);
      const location = rng.choice(locations);
      
      let status: DemoBooking['status'];
      if (date < new Date()) {
        status = rng.next() > 0.1 ? 'completed' : 'cancelled';
      } else {
        status = 'confirmed';
      }
      
      memberBookings.push({
        id: `member-booking-${bookingId++}`,
        user_id: profile.id,
        service_id: service.id,
        location_id: location.id,
        booking_date: date.toISOString(),
        status,
        payment_status: status === 'completed' ? 'completed' : 'pending',
        total_amount: service.price + rng.nextInt(-10, 15),
        notes: rng.next() > 0.8 ? rng.choice(['Regular session', 'First time trying this', 'Recovery focused', 'Relaxation session']) : undefined,
        created_at: subDays(date, rng.nextInt(1, 7)).toISOString(),
        client_name: `${profile.first_name} ${profile.last_name}`,
        service_name: service.name,
        location_name: location.name,
        category: service.category
      });
    }
  }
  
  // Sort bookings by date (newest first)
  memberBookings.sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime());
  
  // Generate membership
  const membership = {
    id: 'membership-demo-1',
    user_id: profile.id,
    plan_type: 'Premium',
    status: 'active',
    credits_remaining: 45,
    auto_renew: true,
    start_date: subDays(new Date(), 90).toISOString(),
    end_date: addDays(new Date(), 30).toISOString(),
    created_at: subDays(new Date(), 90).toISOString()
  };
  
  // Calculate stats
  const upcomingBookings = memberBookings.filter(b => 
    new Date(b.booking_date) > new Date() && b.status === 'confirmed'
  );
  
  const completedBookings = memberBookings.filter(b => b.status === 'completed');
  const totalSpent = completedBookings.reduce((sum, b) => sum + b.total_amount, 0);
  
  // Activity data for chart (last 6 months)
  const activityData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthBookings = memberBookings.filter(b => {
      const bookingDate = new Date(b.booking_date);
      return bookingDate.getMonth() === date.getMonth() && 
             bookingDate.getFullYear() === date.getFullYear() &&
             b.status === 'completed';
    });
    
    activityData.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      sessions: monthBookings.length,
      amount: monthBookings.reduce((sum, b) => sum + b.total_amount, 0)
    });
  }
  
  return {
    profile,
    bookings: memberBookings,
    membership,
    services,
    locations,
    stats: {
      upcomingBookings: upcomingBookings.length,
      completedSessions: completedBookings.length,
      totalSpent,
      creditsRemaining: membership.credits_remaining,
      memberSince: profile.created_at
    },
    activityData
  };
}