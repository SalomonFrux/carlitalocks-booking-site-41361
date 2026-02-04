// Reservation Engine with Staff Management and Booking Logic

import { Service, ServiceDuration } from './serviceConfig';

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

// In-memory bookings store (in production, this would be in a database)
const bookings: Booking[] = [];

// Helper function to parse time string to minutes
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes to time string
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Calculate service end time
export const calculateServiceEndTime = (startTime: string, duration: ServiceDuration): string => {
  const startMinutes = timeToMinutes(startTime);
  const durationMinutes = duration.hours * 60 + duration.minutes;
  const endMinutes = startMinutes + durationMinutes;
  return minutesToTime(endMinutes);
};

// Add minutes to a date/time (date carries the day, timeString is HH:MM)
const addMinutesToDate = (date: Date, timeString: string, minutesToAdd: number): Date => {
  const [hours, mins] = timeString.split(":").map(Number);
  const d = new Date(date);
  d.setHours(hours, mins, 0, 0);
  d.setMinutes(d.getMinutes() + minutesToAdd);
  return d;
};

// Check if a staff member is booked at a specific time
const isStaffBooked = (staffId: string, date: Date, startTime: string, duration: ServiceDuration): boolean => {
  // Build Date objects for check interval
  const checkStart = addMinutesToDate(date, startTime, 0);
  const checkEnd = addMinutesToDate(date, startTime, duration.hours * 60 + duration.minutes);

  return bookings.some((booking) => {
    if (booking.assignedStaff !== staffId || booking.status === 'cancelled') {
      return false;
    }

    // Booking interval (supports multi-day)
    const bookingStart = addMinutesToDate(new Date(booking.date), booking.time, 0);
    const bookingEnd = new Date(booking.endDate);

    // Overlap if intervals intersect
    return bookingStart < checkEnd && checkStart < bookingEnd;
  });
};

// Get available staff for a specific time slot
export const getAvailableStaffForSlot = (date: Date, startTime: string, duration: ServiceDuration): StaffMember[] => {
  return STAFF_CONFIG.staffMembers.filter((staff) => {
    return !isStaffBooked(staff.id, date, startTime, duration);
  });
};

// Get reservation count for a specific slot
export const getSlotReservationCount = (date: Date, slotTime: string): number => {
  const dateBookings = getBookingsForDate(date);
  return dateBookings.filter((booking) => booking.time === slotTime).length;
};

// Get total reservation count for a date
export const getDateReservationCount = (date: Date): number => {
  return getBookingsForDate(date).length;
};

// Check if a specific slot is full (4 reservations max)
export const isSlotFull = (date: Date, slotTime: string): boolean => {
  return getSlotReservationCount(date, slotTime) >= SLOT_CAPACITY.maxPerSlot;
};

// Generate time slots for a specific service and date
// Only two fixed time slots: 8h30 and 15h00, max 4 reservations per slot
export const getAvailableSlots = (service: Service, date: Date): TimeSlot[] => {
  return SLOT_CAPACITY.fixedSlots.map((timeString) => {
    const availableStaff = getAvailableStaffForSlot(date, timeString, service.duration);
    const reservationCount = getSlotReservationCount(date, timeString);
    const isFull = reservationCount >= SLOT_CAPACITY.maxPerSlot;
    
    return {
      time: timeString,
      available: availableStaff.length > 0 && !isFull,
      availableStaff: availableStaff.length,
      highDemand: reservationCount >= 3 && !isFull, // 3/4 reservations = high demand
      reservationCount,
      isFull,
    };
  });
};

// Assign first available staff member
const assignStaff = (date: Date, startTime: string, duration: ServiceDuration): StaffMember | null => {
  const availableStaff = getAvailableStaffForSlot(date, startTime, duration);
  return availableStaff.length > 0 ? availableStaff[0] : null;
};

// Create a new reservation
export const createReservation = (
  service: Service,
  date: Date,
  time: string,
  customer: CustomerInfo
): Booking | null => {
  const staff = assignStaff(date, time, service.duration);
  
  if (!staff) {
    return null; // No staff available
  }
  
  const endTime = calculateServiceEndTime(time, service.duration);
  // Compute endDate (exact Date object) by adding duration minutes to start datetime
  const durationMinutes = service.duration.hours * 60 + service.duration.minutes;
  const endDateObj = addMinutesToDate(date, time, durationMinutes);

  const booking: Booking = {
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    service,
    date,
    time,
    endDate: endDateObj,
    endTime,
    duration: service.duration,
    customer,
    assignedStaff: staff.id,
    status: 'confirmed',
    createdAt: new Date(),
  };
  
  bookings.push(booking);
  return booking;
};

// Get total available staff for a date
export const getAvailableStaffCountForDate = (date: Date): number => {
  // Check how many staff members have at least one free slot during the day
  const workingStart = timeToMinutes(STAFF_CONFIG.workingHours.start);
  const workingEnd = timeToMinutes(STAFF_CONFIG.workingHours.end);
  
  const availableStaff = STAFF_CONFIG.staffMembers.filter((staff) => {
    // Check if staff has any free time during the day
    for (let time = workingStart; time < workingEnd; time += 30) {
      const timeString = minutesToTime(time);
      if (!isStaffBooked(staff.id, date, timeString, { hours: 0, minutes: 30 })) {
        return true;
      }
    }
    return false;
  });
  
  return availableStaff.length;
};

// Generate WhatsApp message for booking
export const generateWhatsAppMessage = (booking: Booking): string => {
  const dateStr = booking.date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const durationText = booking.duration.days ? `${booking.duration.days} jour${booking.duration.days > 1 ? 's' : ''}` : `${booking.duration.hours}h${booking.duration.minutes > 0 ? booking.duration.minutes : ''}`;
  // If booking ends on a different day, include end date in the message
  const endDateDifferent = booking.endDate && (
    booking.endDate.getFullYear() !== booking.date.getFullYear() ||
    booking.endDate.getMonth() !== booking.date.getMonth() ||
    booking.endDate.getDate() !== booking.date.getDate()
  );

  const endDateStr = booking.endDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateLine = endDateDifferent ? `📅 *Date :* ${dateStr} → ${endDateStr}` : `📅 *Date :* ${dateStr}`;

  const message = `✨ *Nouvelle réservation Carlita Locks*\n\n👤 *Client :* ${booking.customer.name}\n📱 *WhatsApp :* ${booking.customer.phone}\n\n💇‍♀️ *Service :* ${booking.service.name}\n💰 *Prix :* ${booking.service.price}\n⏱️ *Durée :* ${durationText}\n\n${dateLine}\n🕐 *Heure :* ${booking.time} - ${booking.endTime}\n\n👩‍🔧 *Coiffeuse assignée :* ${booking.assignedStaff}\n\n${booking.customer.photo ? '📷 *Photo jointe :* Oui' : ''}\n${booking.customer.notes ? `📝 *Notes :* ${booking.customer.notes}` : ''}\n\n—————————————\nID: ${booking.id}\nStatut: ${booking.status === 'confirmed' ? '✅ Confirmé' : '⏳ En attente'}`;

  return message;
};

// Send WhatsApp notification
export const sendWhatsAppNotification = (booking: Booking): void => {
  const BUSINESS_PHONE = '22897564646'; // Carlita Locks business number
  const message = generateWhatsAppMessage(booking);
  const whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
};

// Cancel a booking
export const cancelBooking = (bookingId: string): boolean => {
  const booking = bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = 'cancelled';
    return true;
  }
  return false;
};

// Get all bookings for a date
export const getBookingsForDate = (date: Date): Booking[] => {
  return bookings.filter((booking) => {
    if (booking.status === 'cancelled') return false;
    const targetStart = new Date(date);
    targetStart.setHours(0, 0, 0, 0);
    const targetEnd = new Date(date);
    targetEnd.setHours(23, 59, 59, 999);

    const bookingStart = addMinutesToDate(new Date(booking.date), booking.time, 0);
    const bookingEnd = new Date(booking.endDate);

    // Return bookings that overlap the target date
    return bookingStart <= targetEnd && bookingEnd >= targetStart;
  });
};

// Check if a date is fully booked
// Both slots must have 4 reservations each (8 total) for the date to be full
export const isDateFullyBooked = (date: Date): boolean => {
  const totalReservations = getDateReservationCount(date);
  
  // Date is full if we have 8 reservations (4 per slot)
  if (totalReservations >= SLOT_CAPACITY.maxPerDate) return true;
  
  // Also check if both slots are individually full
  const slot1Full = isSlotFull(date, SLOT_CAPACITY.fixedSlots[0]);
  const slot2Full = isSlotFull(date, SLOT_CAPACITY.fixedSlots[1]);
  
  return slot1Full && slot2Full;
};

// Calculate total duration for multiple services
export const calculateTotalDuration = (services: Service[]): ServiceDuration => {
  let totalMinutes = 0;
  
  services.forEach((service) => {
    totalMinutes += service.duration.hours * 60 + service.duration.minutes;
  });
  
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
};

// Export API for UI integration
export const ReservationAPI = {
  getAvailableSlots,
  createReservation,
  sendWhatsAppNotification,
  getAvailableStaffCountForDate,
  cancelBooking,
  getBookingsForDate,
  calculateTotalDuration,
  isDateFullyBooked,
  getSlotReservationCount,
  getDateReservationCount,
  isSlotFull,
  SLOT_CAPACITY,
};
