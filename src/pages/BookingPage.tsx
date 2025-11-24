import { useState } from 'react';
import Calendar from '../components/Calendar';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('Service non spécifié');

  // Example time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSendToWhatsApp = () => {
    const message = `Réservation:\nService: ${selectedService}\nDate: ${selectedDate?.toLocaleDateString()}\nHeure: ${selectedTime}`;
    window.open(`https://wa.me/<YOUR_WHATSAPP_NUMBER>?text=${encodeURIComponent(message)}`);
  };

  return (
    <div>
      {/* ...existing booking steps... */}
      <Calendar onDateSelect={handleDateSelect} />
      {selectedDate && (
        <div className="animated-time-slots">
          <h3>Choisissez votre heure</h3>
          <p>Créneaux disponibles pour le date sélectionné :</p>
          <div className="time-slots-list">
            {timeSlots.map(time => (
              <button
                key={time}
                className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedDate && selectedTime && (
        <button onClick={handleSendToWhatsApp}>
          Envoyer la réservation sur WhatsApp
        </button>
      )}
    </div>
  );
};

export default BookingPage;