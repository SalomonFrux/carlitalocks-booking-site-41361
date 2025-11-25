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
};

export type Booking = {
  id: string;
  service: Service;
  date: Date;
  time: string;
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

// Check if a staff member is booked at a specific time
const isStaffBooked = (staffId: string, date: Date, startTime: string, duration: ServiceDuration): boolean => {
  const checkStartMinutes = timeToMinutes(startTime);
  const checkEndMinutes = checkStartMinutes + (duration.hours * 60 + duration.minutes);
  
  return bookings.some((booking) => {
    if (booking.assignedStaff !== staffId || booking.status === 'cancelled') {
      return false;
    }
    
    // Check if dates match
    const bookingDate = new Date(booking.date);
    if (
      bookingDate.getFullYear() !== date.getFullYear() ||
      bookingDate.getMonth() !== date.getMonth() ||
      bookingDate.getDate() !== date.getDate()
    ) {
      return false;
    }
    
    const bookingStartMinutes = timeToMinutes(booking.time);
    const bookingEndMinutes = timeToMinutes(booking.endTime);
    
    // Check for time overlap
    return (
      (checkStartMinutes >= bookingStartMinutes && checkStartMinutes < bookingEndMinutes) ||
      (checkEndMinutes > bookingStartMinutes && checkEndMinutes <= bookingEndMinutes) ||
      (checkStartMinutes <= bookingStartMinutes && checkEndMinutes >= bookingEndMinutes)
    );
  });
};

// Get available staff for a specific time slot
export const getAvailableStaffForSlot = (date: Date, startTime: string, duration: ServiceDuration): StaffMember[] => {
  return STAFF_CONFIG.staffMembers.filter((staff) => {
    return !isStaffBooked(staff.id, date, startTime, duration);
  });
};

// Generate time slots for a specific service and date
export const getAvailableSlots = (service: Service, date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const workingStart = timeToMinutes(STAFF_CONFIG.workingHours.start);
  const workingEnd = timeToMinutes(STAFF_CONFIG.workingHours.end);
  const serviceDurationMinutes = service.duration.hours * 60 + service.duration.minutes;
  
  // For multi-day services, only show morning slots
  if (service.duration.isMultiDay) {
    const morningEnd = timeToMinutes('12:00');
    let currentTime = workingStart;
    
    while (currentTime + serviceDurationMinutes <= morningEnd) {
      const timeString = minutesToTime(currentTime);
      const availableStaff = getAvailableStaffForSlot(date, timeString, service.duration);
      
      slots.push({
        time: timeString,
        available: availableStaff.length > 0,
        availableStaff: availableStaff.length,
        highDemand: availableStaff.length <= 2 && availableStaff.length > 0,
      });
      
      currentTime += 60; // 1-hour intervals
    }
    return slots;
  }
  
  
  // Regular services - generate slots every 30 minutes
  let currentTime = workingStart;
  
  while (currentTime + serviceDurationMinutes <= workingEnd) {
    const timeString = minutesToTime(currentTime);
    const availableStaff = getAvailableStaffForSlot(date, timeString, service.duration);
    
    slots.push({
      time: timeString,
      available: availableStaff.length > 0,
      availableStaff: availableStaff.length,
      highDemand: availableStaff.length <= 2 && availableStaff.length > 0,
    });
    
    currentTime += 30; // 30-minute intervals
  }
  
  return slots;
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
  
  const booking: Booking = {
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    service,
    date,
    time,
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
  
  const message = `✨ *Nouvelle réservation Carlita Locks*

👤 *Client :* ${booking.customer.name}
📱 *WhatsApp :* ${booking.customer.phone}

💇‍♀️ *Service :* ${booking.service.name}
💰 *Prix :* ${booking.service.price}
⏱️ *Durée :* ${booking.duration.hours}h${booking.duration.minutes > 0 ? booking.duration.minutes : ''}

📅 *Date :* ${dateStr}
🕐 *Heure :* ${booking.time} - ${booking.endTime}

👩‍🔧 *Coiffeuse assignée :* ${booking.assignedStaff}

${booking.customer.photo ? '📷 *Photo jointe :* Oui' : ''}
${booking.customer.notes ? `📝 *Notes :* ${booking.customer.notes}` : ''}

—————————————
ID: ${booking.id}
Statut: ${booking.status === 'confirmed' ? '✅ Confirmé' : '⏳ En attente'}`;

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
    const bookingDate = new Date(booking.date);
    return (
      bookingDate.getFullYear() === date.getFullYear() &&
      bookingDate.getMonth() === date.getMonth() &&
      bookingDate.getDate() === date.getDate() &&
      booking.status !== 'cancelled'
    );
  });
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
};
