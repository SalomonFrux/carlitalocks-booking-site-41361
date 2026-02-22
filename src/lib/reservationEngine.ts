// Reservation Engine with Supabase persistence

import { Service, ServiceDuration } from './serviceConfig';
import { supabase } from '@/integrations/supabase/client';

// Staff Configuration
export const STAFF_CONFIG = {
  totalStaff: 6,
  workingHours: { start: '08:00', end: '20:00' },
  maxSimultaneousClients: 6,
  staffMembers: Array(6).fill(null).map((_, i) => ({
    id: `staff_${i + 1}`,
    name: `Coiffeuse ${i + 1}`,
    available: true,
  })),
};

export type StaffMember = {
  id: string;
  name: string;
  available: boolean;
};

export type TimeSlot = {
  time: string;
  available: boolean;
  availableStaff: number;
  highDemand: boolean;
  reservationCount: number;
  isFull: boolean;
};

// Slot capacity configuration
export const SLOT_CAPACITY = {
  maxPerSlot: 4,
  maxPerDate: 8,
  fixedSlots: ['08:30', '15:00'] as const,
  tuesdaySlot: '10:00' as const,
  tuesdaySlots: ['10:00', '15:00'] as const,
};

// Get available slots based on day of week
export const getSlotsForDay = (date: Date): string[] => {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 2) return [...SLOT_CAPACITY.tuesdaySlots];
  if (dayOfWeek >= 3 && dayOfWeek <= 6) return [...SLOT_CAPACITY.fixedSlots];
  return [];
};

export const getMaxCapacityForDate = (_date: Date): number => {
  return SLOT_CAPACITY.maxPerDate;
};

export type Booking = {
  id: string;
  service: Service;
  date: Date;
  time: string;
  endDate: Date;
  endTime: string;
  duration: ServiceDuration;
  customer: CustomerInfo;
  assignedStaff: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  photo?: string;
  notes?: string;
};

// DB row type
type ReservationRow = {
  id: string;
  service_name: string;
  service_category: string;
  duration_hours: number;
  duration_minutes: number;
  reservation_date: string;
  time_slot: string;
  client_name: string;
  client_phone: string;
  client_notes: string | null;
  client_photo_url: string | null;
  is_long_service: boolean;
  created_at: string;
};

// Helper: format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Helper function to parse time string to minutes
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const calculateServiceEndTime = (startTime: string, duration: ServiceDuration): string => {
  const startMinutes = timeToMinutes(startTime);
  const durationMinutes = duration.hours * 60 + duration.minutes;
  return minutesToTime(startMinutes + durationMinutes);
};

// ========== ASYNC Supabase functions ==========

// Fetch reservations for a specific date from Supabase
export const fetchReservationsForDate = async (date: Date): Promise<ReservationRow[]> => {
  const dateStr = formatDate(date);
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('reservation_date', dateStr);
  
  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
  return (data || []) as ReservationRow[];
};

// Get slot reservation count from DB
export const getSlotReservationCountAsync = async (date: Date, slotTime: string): Promise<number> => {
  const rows = await fetchReservationsForDate(date);
  return rows.filter(r => r.time_slot === slotTime).length;
};

// Get total reservation count for a date
export const getDateReservationCountAsync = async (date: Date): Promise<number> => {
  const rows = await fetchReservationsForDate(date);
  return rows.length;
};

// Check if a slot is full
export const isSlotFullAsync = async (date: Date, slotTime: string): Promise<boolean> => {
  const count = await getSlotReservationCountAsync(date, slotTime);
  return count >= SLOT_CAPACITY.maxPerSlot;
};

// Check if date has a long service booking
export const hasLongServiceBookingAsync = async (date: Date): Promise<boolean> => {
  const rows = await fetchReservationsForDate(date);
  return rows.some(r => r.is_long_service);
};

// Check if date is fully booked
export const isDateFullyBookedAsync = async (date: Date): Promise<boolean> => {
  const rows = await fetchReservationsForDate(date);
  
  // Priority: long service blocks the day
  if (rows.some(r => r.is_long_service)) return true;
  
  const totalReservations = rows.length;
  if (totalReservations >= SLOT_CAPACITY.maxPerDate) return true;
  
  const slotsForDay = getSlotsForDay(date);
  const allSlotsFull = slotsForDay.every(slot => {
    const count = rows.filter(r => r.time_slot === slot).length;
    return count >= SLOT_CAPACITY.maxPerSlot;
  });
  
  return allSlotsFull;
};

// Get available slots for a service on a date
export const getAvailableSlotsAsync = async (service: Service, date: Date): Promise<TimeSlot[]> => {
  const slotsForDay = getSlotsForDay(date);
  const rows = await fetchReservationsForDate(date);
  
  return slotsForDay.map(timeString => {
    const reservationCount = rows.filter(r => r.time_slot === timeString).length;
    const isFull = reservationCount >= SLOT_CAPACITY.maxPerSlot;
    
    return {
      time: timeString,
      available: !isFull,
      availableStaff: SLOT_CAPACITY.maxPerSlot - reservationCount,
      highDemand: reservationCount >= 3 && !isFull,
      reservationCount,
      isFull,
    };
  });
};

// Check if a service is "long" (12h-24h)
export const isLongService = (duration: ServiceDuration): boolean => {
  const totalMinutes = (duration.days || 0) * 24 * 60 + duration.hours * 60 + duration.minutes;
  return totalMinutes >= 12 * 60 && totalMinutes <= 24 * 60;
};

// Create a reservation in Supabase
export const createReservationAsync = async (
  service: Service,
  date: Date,
  time: string,
  customer: CustomerInfo
): Promise<boolean> => {
  const longService = isLongService(service.duration);
  
  const { error } = await supabase
    .from('reservations')
    .insert({
      service_name: service.name,
      service_category: service.category,
      duration_hours: service.duration.hours,
      duration_minutes: service.duration.minutes,
      reservation_date: formatDate(date),
      time_slot: time,
      client_name: customer.name,
      client_phone: customer.phone,
      client_notes: customer.notes || null,
      client_photo_url: customer.photo || null,
      is_long_service: longService,
    });
  
  if (error) {
    console.error('Error creating reservation:', error);
    return false;
  }
  return true;
};

// Get available staff count for a date (simplified: based on remaining capacity)
export const getAvailableStaffCountForDateAsync = async (date: Date): Promise<number> => {
  const isBooked = await isDateFullyBookedAsync(date);
  if (isBooked) return 0;
  return STAFF_CONFIG.totalStaff;
};

// ========== Synchronous wrappers (kept for calendar disabled logic using cached data) ==========

// Cache for calendar rendering - populated by prefetch
let _cachedReservations: Map<string, ReservationRow[]> = new Map();

export const prefetchReservationsForMonth = async (year: number, month: number) => {
  const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  const endDay = new Date(year, month + 1, 0).getDate();
  const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;
  
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .gte('reservation_date', startDate)
    .lte('reservation_date', endDate);
  
  if (error) {
    console.error('Error prefetching:', error);
    return;
  }
  
  // Group by date
  _cachedReservations = new Map();
  (data || []).forEach((row: ReservationRow) => {
    const existing = _cachedReservations.get(row.reservation_date) || [];
    existing.push(row);
    _cachedReservations.set(row.reservation_date, existing);
  });
};

// Sync functions using cache (for calendar rendering)
export const getAvailableStaffCountForDate = (date: Date): number => {
  const dateStr = formatDate(date);
  const rows = _cachedReservations.get(dateStr) || [];
  if (rows.some(r => r.is_long_service)) return 0;
  if (rows.length >= SLOT_CAPACITY.maxPerDate) return 0;
  const slotsForDay = getSlotsForDay(date);
  const allFull = slotsForDay.every(slot => rows.filter(r => r.time_slot === slot).length >= SLOT_CAPACITY.maxPerSlot);
  if (allFull) return 0;
  return STAFF_CONFIG.totalStaff;
};

export const isDateFullyBooked = (date: Date): boolean => {
  return getAvailableStaffCountForDate(date) === 0;
};

export const hasLongServiceBooking = (date: Date): boolean => {
  const dateStr = formatDate(date);
  const rows = _cachedReservations.get(dateStr) || [];
  return rows.some(r => r.is_long_service);
};

// WhatsApp notification
export const generateWhatsAppMessage = (
  service: Service,
  date: Date,
  time: string,
  customer: CustomerInfo
): string => {
  const dateStr = date.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const endTime = calculateServiceEndTime(time, service.duration);
  const durationText = service.duration.days 
    ? `${service.duration.days} jour${service.duration.days > 1 ? 's' : ''}` 
    : `${service.duration.hours}h${service.duration.minutes > 0 ? service.duration.minutes : ''}`;

  return `✨ *Nouvelle réservation Carlita Locks*\n\n👤 *Client :* ${customer.name}\n📱 *WhatsApp :* ${customer.phone}\n\n💇‍♀️ *Service :* ${service.name}\n💰 *Prix :* ${service.price}\n⏱️ *Durée :* ${durationText}\n\n📅 *Date :* ${dateStr}\n🕐 *Heure :* ${time} - ${endTime}\n\n${customer.photo ? '📷 *Photo jointe :* Oui' : ''}\n${customer.notes ? `📝 *Notes :* ${customer.notes}` : ''}\n\nStatut: ✅ Confirmé`;
};

export const sendWhatsAppNotification = (
  service: Service,
  date: Date,
  time: string,
  customer: CustomerInfo
): void => {
  const BUSINESS_PHONE = '22890583350';
  const message = generateWhatsAppMessage(service, date, time, customer);
  const whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

// Calculate total duration for multiple services
export const calculateTotalDuration = (services: Service[]): ServiceDuration => {
  let totalMinutes = 0;
  services.forEach(s => {
    totalMinutes += s.duration.hours * 60 + s.duration.minutes;
  });
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
};

// Subscribe to realtime changes
export const subscribeToReservations = (callback: () => void) => {
  const channel = supabase
    .channel('reservations-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'reservations' },
      () => callback()
    )
    .subscribe();
  
  return () => {
    supabase.removeChannel(channel);
  };
};

export const SLOT_CAPACITY_EXPORT = SLOT_CAPACITY;
