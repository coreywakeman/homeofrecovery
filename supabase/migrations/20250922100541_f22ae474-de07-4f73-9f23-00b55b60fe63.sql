-- Create services table for wellness equipment/spaces
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- duration in minutes
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL, -- 'recovery', 'therapy', 'wellness'
  max_capacity INTEGER DEFAULT 1,
  equipment_type TEXT, -- 'ice_bath', 'compression_boots', 'massage_gun', 'red_light_sauna'
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create locations table
CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time slots table for booking availability
CREATE TABLE public.time_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  available_spots INTEGER NOT NULL DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL, -- references auth.users
  time_slot_id UUID NOT NULL REFERENCES public.time_slots(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'confirmed', -- 'confirmed', 'cancelled', 'completed', 'no_show'
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  payment_intent_id TEXT, -- Stripe payment intent ID
  total_amount DECIMAL(10,2) NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create memberships table
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL, -- references auth.users
  plan_type TEXT NOT NULL, -- 'unlimited', 'package_10', 'package_5'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'paused'
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  credits_remaining INTEGER DEFAULT 0, -- for package plans
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create policies for services (public read)
CREATE POLICY "Services are viewable by everyone" 
ON public.services FOR SELECT 
USING (active = true);

-- Create policies for locations (public read)
CREATE POLICY "Locations are viewable by everyone" 
ON public.locations FOR SELECT 
USING (active = true);

-- Create policies for time slots (public read)
CREATE POLICY "Time slots are viewable by everyone" 
ON public.time_slots FOR SELECT 
USING (active = true);

-- Create policies for bookings (user can manage their own)
CREATE POLICY "Users can view their own bookings" 
ON public.bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for memberships (user can view their own)
CREATE POLICY "Users can view their own memberships" 
ON public.memberships FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own memberships" 
ON public.memberships FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memberships" 
ON public.memberships FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample services
INSERT INTO public.services (name, description, duration, price, category, equipment_type, max_capacity) VALUES
('Ice Bath Session', 'Cold therapy session for recovery and wellness. Boost circulation and reduce inflammation.', 15, 35.00, 'recovery', 'ice_bath', 2),
('Compression Therapy', 'Full-body pneumatic compression for improved circulation and muscle recovery.', 30, 45.00, 'therapy', 'compression_boots', 1),
('Percussion Massage', 'Professional-grade massage gun therapy session for targeted muscle relief.', 20, 40.00, 'therapy', 'massage_gun', 1),
('Red Light Sauna', 'Infrared and red light therapy in a private sauna for skin health and recovery.', 25, 50.00, 'wellness', 'red_light_sauna', 1),
('Recovery Stack', 'Complete 60-minute recovery experience: Ice bath + Compression + Red light', 60, 120.00, 'recovery', 'combo', 1);

-- Insert sample locations
INSERT INTO public.locations (name, address, phone) VALUES
('Downtown Recovery Center', '123 Wellness Ave, Downtown', '(555) 123-4567'),
('Westside Wellness Hub', '456 Recovery Blvd, Westside', '(555) 234-5678'),
('Northside Recovery Studio', '789 Healing St, Northside', '(555) 345-6789');