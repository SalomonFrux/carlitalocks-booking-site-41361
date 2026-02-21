import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Service, formatDuration } from "@/lib/serviceConfig";
import { 
  getAvailableSlotsAsync, 
  createReservationAsync, 
  sendWhatsAppNotification,
  calculateTotalDuration,
  isDateFullyBooked,
  hasLongServiceBooking,
  getAvailableStaffCountForDate,
  prefetchReservationsForMonth,
  subscribeToReservations,
  TimeSlot,
  SLOT_CAPACITY
} from "@/lib/reservationEngine";
import { Calendar as CalendarIcon, Clock, User, Phone, Upload, Flame, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);

  const totalDuration = calculateTotalDuration(selectedServices);
  const requiresPhoto = selectedServices.some((s) => s.requiresPhoto);

  // Prefetch reservations for current month on mount + realtime
  const refreshData = useCallback(async () => {
    const now = new Date();
    await prefetchReservationsForMonth(now.getFullYear(), now.getMonth());
    // Also prefetch next month
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    await prefetchReservationsForMonth(next.getFullYear(), next.getMonth());
    setCalendarKey(k => k + 1); // force calendar re-render
  }, []);

  useEffect(() => {
    refreshData();
    const unsub = subscribeToReservations(refreshData);
    return unsub;
  }, [refreshData]);

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime("");
    
    if (date && selectedServices.length > 0) {
      const slots = await getAvailableSlotsAsync(selectedServices[0], date);
      setAvailableSlots(slots);
      
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 2) {
        const slot1000 = slots.find(s => s.time === '10:00');
        const slot1500 = slots.find(s => s.time === '15:00');
        if (slot1000?.isFull && slot1500?.available) {
          setSelectedTime('15:00');
          toast.success(`Date sélectionnée: ${date.toLocaleDateString("fr-FR")} - Créneau 15:00 auto-sélectionné`);
        } else {
          toast.success(`Date sélectionnée: ${date.toLocaleDateString("fr-FR")}`);
        }
      } else {
        const slot830 = slots.find(s => s.time === '08:30');
        const slot1500 = slots.find(s => s.time === '15:00');
        if (slot830?.isFull && slot1500?.available) {
          setSelectedTime('15:00');
          toast.success(`Date sélectionnée: ${date.toLocaleDateString("fr-FR")} - Créneau 15:00 auto-sélectionné`);
        } else {
          toast.success(`Date sélectionnée: ${date.toLocaleDateString("fr-FR")}`);
        }
      }
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    toast.success(`Heure sélectionnée: ${time}`);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setOpenInfoDialog(true);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      toast.success("Photo téléchargée");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !clientName || !whatsappNumber) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    setIsSubmitting(true);

    try {
      let allSuccess = true;
      for (const service of selectedServices) {
        const success = await createReservationAsync(
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
        if (!success) allSuccess = false;
      }

      if (allSuccess) {
        // Send WhatsApp for first service
        sendWhatsAppNotification(selectedServices[0], selectedDate, selectedTime, {
          name: clientName,
          phone: whatsappNumber,
          notes,
          photo: photo ? URL.createObjectURL(photo) : undefined,
        });
        setIsConfirmed(true);
        toast.success("Réservation créée avec succès!");
      } else {
        toast.error("Erreur lors de la création de la réservation");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderClientForm = () => (
    <Card className="rounded-[24px]">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {requiresPhoto && (
            <div className="space-y-2">
              <Label htmlFor="photo" className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                Photo de vos cheveux (optionnel)
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="rounded-xl h-12"
              />
              <p className="text-xs text-muted-foreground">
                Une photo claire de vos cheveux aide nos coiffeuses à mieux préparer votre prestation
              </p>
            </div>
          )}

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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? "Réservation en cours..." : "Confirmer la réservation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left column: Calendar + Time slots */}
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
              <CalendarIcon className="w-8 h-8 text-primary" />
              Choisissez votre date
            </h2>
            <p className="text-muted-foreground">Sélectionnez un jour disponible</p>
          </div>

          <Card className="rounded-[24px] p-6">
            <Calendar
              key={calendarKey}
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date.getDay() === 0 || date.getDay() === 1 || getAvailableStaffCountForDate(date) === 0 || isDateFullyBooked(date);
              }}
              className={cn("mx-auto pointer-events-auto")}
              modifiers={{
                available: (date) => getAvailableStaffCountForDate(date) > 0 && date.getDay() !== 1,
                sunday: (date) => date.getDay() === 0,
                monday: (date) => date.getDay() === 1,
              }}
              modifiersClassNames={{
                available: "bg-primary/10 font-semibold",
                sunday: "text-red-500",
                monday: "text-red-500 line-through",
              }}
            />

            <div className="mt-6 space-y-2 text-center text-sm">
              <TooltipProvider>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary/10" />
                  <span className="text-muted-foreground">Jours disponibles</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted" />
                  <span className="text-muted-foreground">Complet</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-4 h-4 rounded bg-red-500/20" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pour les cas d'urgences</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-muted-foreground">Dimanches (urgences)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-500 text-xs">—</span>
                  </div>
                  <span className="text-muted-foreground">Lundis (fermé)</span>
                </div>
              </TooltipProvider>
            </div>
          </Card>

          {/* Time Selection */}
          {selectedDate && availableSlots.length > 0 && !hasLongServiceBooking(selectedDate) && (
            <section className="animate-fade-in">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6 text-primary" /> Choisissez votre heure
                </h3>
                <p className="text-muted-foreground">Créneaux disponibles pour le {selectedDate.toLocaleDateString("fr-FR")}</p>
              </div>

              <div className="max-w-3xl mx-auto grid grid-cols-2 gap-6">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    disabled={!slot.available || slot.isFull}
                    onClick={() => handleTimeSelect(slot.time)}
                    className={cn(
                      "h-24 rounded-[16px] relative overflow-hidden transition-all",
                      slot.isFull && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xl font-bold">{slot.time}</span>
                      {slot.isFull ? (
                        <span className="text-xs text-destructive font-medium">
                          Créneau complet
                        </span>
                      ) : slot.highDemand && slot.available ? (
                        <span className="flex items-center gap-1 text-xs text-warning">
                          <Flame className="w-3 h-3" /> Très demandé
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {SLOT_CAPACITY.maxPerSlot - slot.reservationCount} place{SLOT_CAPACITY.maxPerSlot - slot.reservationCount > 1 ? 's' : ''} restante{SLOT_CAPACITY.maxPerSlot - slot.reservationCount > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>

              {selectedTime && (
                <div className="mt-4 md:hidden flex justify-center">
                  <Dialog open={openInfoDialog} onOpenChange={(open) => setOpenInfoDialog(open)}>
                    <DialogTrigger asChild>
                      <Button className="w-full max-w-xs">Entrer vos informations</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vos informations</DialogTitle>
                        <DialogDescription>Complétez vos coordonnées pour finaliser la réservation</DialogDescription>
                      </DialogHeader>
                      {renderClientForm()}
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </section>
          )}

          {selectedDate && hasLongServiceBooking(selectedDate) && (
            <Card className="rounded-[24px] bg-destructive/10 border-destructive/20 animate-fade-in">
              <CardContent className="p-6 text-center">
                <p className="text-destructive font-medium">
                  Cette date est complètement réservée pour une prestation longue durée.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Veuillez sélectionner une autre date disponible.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Client info (visible on md and up) */}
        <div className="hidden md:block">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <User className="w-6 h-6 text-primary" /> Vos informations
            </h2>
            <p className="text-muted-foreground">Complétez vos coordonnées</p>
          </div>

          {selectedDate && selectedTime ? (
            renderClientForm()
          ) : (
            <Card className="rounded-[24px] p-6">
              <CardContent className="text-center">
                <p className="text-muted-foreground">Sélectionnez d'abord une date et une heure pour voir et remplir le formulaire.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulingInterface;
