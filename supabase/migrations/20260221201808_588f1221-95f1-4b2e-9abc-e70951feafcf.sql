
-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_category TEXT NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  reservation_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_notes TEXT,
  client_photo_url TEXT,
  is_long_service BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Public read policy (anyone can check availability)
CREATE POLICY "Anyone can view reservations for availability"
  ON public.reservations FOR SELECT
  USING (true);

-- Public insert policy (no auth required for booking)
CREATE POLICY "Anyone can create a reservation"
  ON public.reservations FOR INSERT
  WITH CHECK (true);

-- Enable realtime for live availability updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;
