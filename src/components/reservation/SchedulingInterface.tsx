import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Service, formatDuration } from "@/lib/serviceConfig";
import { 
  getAvailableSlots, 
  getAvailableStaffCountForDate, 
  createReservation, 
  sendWhatsAppNotification,
  calculateTotalDuration,
  TimeSlot 
} from "@/lib/reservationEngine";
import { Calendar as CalendarIcon, Clock, User, Phone, Upload, Flame, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SchedulingInterfaceProps = {
  selectedServices: Service[];
  onBack: () => void;
};

const SchedulingInterface = ({ selectedServices, onBack }: SchedulingInterfaceProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [clientName, setClientName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const totalDuration = calculateTotalDuration(selectedServices);
  const requiresPhoto = selectedServices.some((s) => s.requiresPhoto);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime("");
    
    if (date && selectedServices.length > 0) {
      // For simplicity, get slots for the first service
      // In production, you'd need to handle multiple services differently
      const slots = getAvailableSlots(selectedServices[0], date);
      setAvailableSlots(slots);
      toast.success(`Date sélectionnée: ${date.toLocaleDateString("fr-FR")}`);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    toast.success(`Heure sélectionnée: ${time}`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      toast.success("Photo téléchargée");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !clientName || !whatsappNumber) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    if (requiresPhoto && !photo) {
      toast.error("Une photo est requise pour ce service");
      return;
    }

    // Create booking for each service
    selectedServices.forEach((service) => {
      const booking = createReservation(
        service,
        selectedDate,
        selectedTime,
        {
          name: clientName,
          phone: whatsappNumber,
          notes,
          photo: photo ? URL.createObjectURL(photo) : undefined,
        }
      );

      if (booking) {
        sendWhatsAppNotification(booking);
      }
    });

    setIsConfirmed(true);
    toast.success("Réservation créée avec succès!");
  };

  const getAvailabilityForDate = (date: Date): number => {
    return getAvailableStaffCountForDate(date);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="rounded-[24px] border-2 border-primary/20 shadow-gold animate-fade-in">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary animate-scale-in" />
            </div>
            <CardTitle className="text-3xl">Réservation confirmée!</CardTitle>
            <CardDescription className="text-base mt-2">
              Vous recevrez une confirmation par WhatsApp dans quelques instants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center pb-8">
            <div className="p-6 bg-muted/50 rounded-xl space-y-2">
              <p className="text-sm text-muted-foreground">Date et heure</p>
              <p className="font-semibold text-lg text-foreground">
                {selectedDate?.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-bold text-xl text-primary">{selectedTime}</p>
            </div>
            
            <Button
              onClick={() => window.location.href = "/"}
              className="w-full rounded-xl"
              size="lg"
            >
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Selected Services Summary */}
      <Card className="rounded-[24px] bg-gradient-accent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-accent-foreground mb-1">
                {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} sélectionné{selectedServices.length > 1 ? "s" : ""}
              </h3>
              <p className="text-sm text-accent-foreground/80">
                Durée totale: {totalDuration.hours}h{totalDuration.minutes > 0 ? totalDuration.minutes : ""}
              </p>
            </div>
            <Button variant="secondary" onClick={onBack} className="rounded-xl">
              Modifier
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <section className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <CalendarIcon className="w-8 h-8 text-primary" />
            Choisissez votre date
          </h2>
          <p className="text-muted-foreground">Sélectionnez un jour disponible</p>
        </div>

        <Card className="max-w-2xl mx-auto rounded-[24px] p-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today || getAvailabilityForDate(date) === 0;
            }}
            className={cn("mx-auto pointer-events-auto")}
            modifiers={{
              available: (date) => getAvailabilityForDate(date) > 0,
            }}
            modifiersClassNames={{
              available: "bg-primary/10 font-semibold",
            }}
          />

          <div className="mt-6 space-y-2 text-center text-sm">
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/10" />
              <span className="text-muted-foreground">Jours disponibles</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded bg-muted" />
              <span className="text-muted-foreground">Complet</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Time Selection */}
      {selectedDate && availableSlots.length > 0 && (
        <section className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              Choisissez votre heure
            </h2>
            <p className="text-muted-foreground">
              Créneaux disponibles pour le {selectedDate.toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={selectedTime === slot.time ? "default" : "outline"}
                disabled={!slot.available}
                onClick={() => handleTimeSelect(slot.time)}
                className="h-20 rounded-[16px] relative overflow-hidden"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg font-bold">{slot.time}</span>
                  {slot.highDemand && slot.available && (
                    <span className="flex items-center gap-1 text-xs text-warning">
                      <Flame className="w-3 h-3" />
                      Très demandé
                    </span>
                  )}
                  {slot.available && (
                    <span className="text-xs text-muted-foreground">
                      {slot.availableStaff} coiffeuse{slot.availableStaff > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* Client Information Form */}
      {selectedDate && selectedTime && (
        <section className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
              <User className="w-8 h-8 text-primary" />
              Vos informations
            </h2>
            <p className="text-muted-foreground">Complétez vos coordonnées</p>
          </div>

          <Card className="max-w-2xl mx-auto rounded-[24px]">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Nom complet *
                  </Label>
                  <Input
                    id="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Votre nom complet"
                    required
                    className="rounded-xl h-12"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Numéro WhatsApp *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+228 XX XX XX XX"
                    required
                    className="rounded-xl h-12"
                  />
                </div>

                {/* Photo Upload */}
                {requiresPhoto && (
                  <div className="space-y-2">
                    <Label htmlFor="photo" className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" />
                      Photo de vos cheveux *
                    </Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      required={requiresPhoto}
                      className="rounded-xl h-12"
                    />
                    <p className="text-xs text-muted-foreground">
                      Une photo claire de vos cheveux aide nos coiffeuses à mieux préparer votre prestation
                    </p>
                  </div>
                )}

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Informations supplémentaires..."
                    className="rounded-xl min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Confirmer la réservation
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};

export default SchedulingInterface;
