import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle2, 
  Upload, 
  Sparkles, 
  Calendar as CalendarIcon,
  Users,
  Flame
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

type Service = {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  description?: string;
};

const services: Service[] = [
  // À LA UNE
  {
    id: "consultation",
    name: "Consultation sur mesure",
    category: "À LA UNE",
    price: "10 000 F CFA",
    duration: "1h",
  },
  // INSTALLATIONS
  {
    id: "microlocks-longs",
    name: "Microlocks Vanille - Cheveux longs",
    category: "Installation Microlocks",
    price: "À partir de 40 000 F CFA",
    duration: "7h à 8h",
  },
  {
    id: "microlocks-milongs",
    name: "Microlocks Vanille - Cheveux mi-longs",
    category: "Installation Microlocks",
    price: "À partir de 35 000 F CFA",
    duration: "5h",
  },
  {
    id: "microlocks-courts",
    name: "Microlocks Vanille - Cheveux courts",
    category: "Installation Microlocks",
    price: "À partir de 20 000 F CFA",
    duration: "4h30 à 5h",
  },
  {
    id: "trad-longs",
    name: "Locks Traditionnels - Cheveux longs",
    category: "Installation Traditionnelle",
    price: "À partir de 30 000 F CFA",
    duration: "6h",
  },
  {
    id: "trad-milongs",
    name: "Locks Traditionnels - Cheveux mi-longs",
    category: "Installation Traditionnelle",
    price: "À partir de 25 000 F CFA",
    duration: "5h",
  },
  {
    id: "trad-courts",
    name: "Locks Traditionnels - Cheveux courts",
    category: "Installation Traditionnelle",
    price: "À partir de 20 000 F CFA",
    duration: "4h",
  },
  {
    id: "minilocks-longs",
    name: "Minilocks Interlocks - Cheveux longs",
    category: "Installation Minilocks",
    price: "À partir de 45 000 F CFA",
    duration: "8h",
  },
  {
    id: "minilocks-milongs",
    name: "Minilocks Interlocks - Cheveux mi-longs",
    category: "Installation Minilocks",
    price: "À partir de 40 000 F CFA",
    duration: "6h",
  },
  {
    id: "minilocks-courts",
    name: "Minilocks Interlocks - Cheveux courts",
    category: "Installation Minilocks",
    price: "À partir de 35 000 F CFA",
    duration: "5h",
  },
  {
    id: "sisterlocks-longs",
    name: "Sisterlocks - Cheveux longs",
    category: "Installation Sisterlocks",
    price: "À partir de 100 000 F CFA",
    duration: "1 à 2 jours",
  },
  {
    id: "sisterlocks-milongs",
    name: "Sisterlocks - Cheveux mi-longs",
    category: "Installation Sisterlocks",
    price: "À partir de 100 000 F CFA",
    duration: "36h",
  },
  {
    id: "sisterlocks-courts",
    name: "Sisterlocks - Cheveux courts",
    category: "Installation Sisterlocks",
    price: "À partir de 80 000 F CFA",
    duration: "Une journée",
  },
  // RESSERRAGE
  {
    id: "resserrage-trad",
    name: "Resserrage traditionnel (moins de 150)",
    category: "Resserrage",
    price: "À partir de 8 000 F CFA",
    duration: "2h30",
  },
  {
    id: "resserrage-mini",
    name: "Resserrage minilocks (150-200)",
    category: "Resserrage",
    price: "À partir de 8 000 F CFA",
    duration: "3h",
  },
  {
    id: "resserrage-micro-300",
    name: "Resserrage microlocks (201-300)",
    category: "Resserrage",
    price: "À partir de 8 000 F CFA",
    duration: "2h30",
  },
  {
    id: "resserrage-micro-400",
    name: "Resserrage microlocks (301-400)",
    category: "Resserrage",
    price: "À partir de 10 000 F CFA",
    duration: "3h30",
  },
  {
    id: "resserrage-micro-500",
    name: "Resserrage microlocks (401-500)",
    category: "Resserrage",
    price: "À partir de 15 000 F CFA",
    duration: "3h30",
  },
  {
    id: "resserrage-sister",
    name: "Resserrage sisterlocks (501-600)",
    category: "Resserrage",
    price: "À partir de 20 000 F CFA",
    duration: "4h",
  },
  // TWIST & SOINS
  {
    id: "retwist-200",
    name: "Retwist (100-200 locks)",
    category: "Twist & Soins",
    price: "À partir de 10 000 F CFA",
    duration: "2h",
  },
  {
    id: "retwist-100",
    name: "Retwist (moins de 100)",
    category: "Twist & Soins",
    price: "À partir de 8 000 F CFA",
    duration: "1h30",
  },
  {
    id: "shampoing-adulte",
    name: "Shampoing simple (Adulte)",
    category: "Twist & Soins",
    price: "À partir de 2 500 F CFA",
    duration: "15min",
  },
  {
    id: "shampoing-enfant",
    name: "Shampoing simple (Enfant)",
    category: "Twist & Soins",
    price: "À partir de 2 000 F CFA",
    duration: "15min",
  },
  {
    id: "shampoing-soins",
    name: "Shampoing hydratant + soins",
    category: "Twist & Soins",
    price: "À partir de 7 000 F CFA",
    duration: "45min",
  },
  {
    id: "detox",
    name: "Détox locks/microlocks",
    category: "Twist & Soins",
    price: "À partir de 7 000 F CFA",
    duration: "1h",
  },
  // COIFFAGE
  {
    id: "coiffure-protectrice",
    name: "Coiffure protectrice",
    category: "Coiffage",
    price: "À partir de 1 000 F CFA",
    duration: "15min",
  },
  {
    id: "chignon-simple",
    name: "Chignon simple",
    category: "Coiffage",
    price: "À partir de 2 000 F CFA",
    duration: "30min",
  },
  {
    id: "chignon-elabore",
    name: "Chignon élaboré",
    category: "Coiffage",
    price: "À partir de 3 000 F CFA",
    duration: "45min",
  },
  {
    id: "bouclage-court",
    name: "Bouclage locks courtes",
    category: "Coiffage",
    price: "À partir de 5 000 F CFA",
    duration: "1h",
  },
  {
    id: "bouclage-milongs",
    name: "Bouclage locks mi-longs",
    category: "Coiffage",
    price: "À partir de 7 000 F CFA",
    duration: "1h30",
  },
  {
    id: "bouclage-longs",
    name: "Bouclage locks longs",
    category: "Coiffage",
    price: "À partir de 10 000 F CFA",
    duration: "2h",
  },
];

const categories = [
  "À LA UNE",
  "Installation Microlocks",
  "Installation Traditionnelle",
  "Installation Minilocks",
  "Installation Sisterlocks",
  "Resserrage",
  "Twist & Soins",
  "Coiffage",
];

// Mock availability data
const mockAvailability = [
  { date: new Date(2025, 10, 25), available: 2 },
  { date: new Date(2025, 10, 26), available: 1 },
  { date: new Date(2025, 10, 27), available: 0 },
  { date: new Date(2025, 10, 28), available: 3 },
  { date: new Date(2025, 10, 29), available: 2 },
];

const timeSlots = [
  { time: "09:00", available: true, highDemand: false },
  { time: "10:00", available: true, highDemand: true },
  { time: "11:00", available: false, highDemand: false },
  { time: "12:00", available: true, highDemand: false },
  { time: "14:00", available: true, highDemand: true },
  { time: "15:00", available: true, highDemand: false },
  { time: "16:00", available: true, highDemand: false },
  { time: "17:00", available: false, highDemand: false },
];

const ReservationPage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    toast.success(`Service sélectionné: ${service.name}`);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
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
    
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !whatsappNumber) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    // Prepare WhatsApp message
    const message = `Bonjour, je souhaite réserver:\n\nService: ${selectedService.name}\nDate: ${selectedDate.toLocaleDateString("fr-FR")}\nHeure: ${selectedTime}\nNom: ${clientName}\nDurée: ${selectedService.duration}\nPrix: ${selectedService.price}`;
    
    const whatsappUrl = `https://wa.me/22897564646?text=${encodeURIComponent(message)}`;
    
    setIsConfirmed(true);
    
    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 2000);
  };

  const getAvailabilityForDate = (date: Date) => {
    const match = mockAvailability.find(
      (a) => a.date.toDateString() === date.toDateString()
    );
    return match?.available ?? 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        {/* SECTION 1 - HERO */}
        <section className="py-16 px-6 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Réserver votre prestation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez votre service, votre date et recevez une confirmation par WhatsApp.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* SECTION 2 - CHOIX DE LA PRESTATION */}
          <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                Choisissez votre prestation
              </h2>
              <p className="text-muted-foreground">Sélectionnez le service qui vous convient</p>
            </div>

            <div className="space-y-12">
              {categories.map((category) => {
                const categoryServices = services.filter((s) => s.category === category);
                if (categoryServices.length === 0) return null;

                return (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryServices.map((service) => (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all duration-300 rounded-[20px] hover:shadow-gold hover:scale-105 ${
                            selectedService?.id === service.id
                              ? "ring-2 ring-primary shadow-gold scale-105"
                              : ""
                          }`}
                          onClick={() => handleServiceSelect(service)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            {service.description && (
                              <CardDescription>{service.description}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary">{service.price}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {selectedService && (
            <>
              <Separator className="my-12" />

              {/* SECTION 3 - CHOIX DE LA DATE */}
              <section className="animate-fade-in">
                <div className="text-center mb-12">
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
                    disabled={(date) => date < new Date() || getAvailabilityForDate(date) === 0}
                    className="mx-auto"
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
            </>
          )}

          {selectedService && selectedDate && (
            <>
              <Separator className="my-12" />

              {/* SECTION 4 - CHOIX DE L'HEURE */}
              <section className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                    <Clock className="w-8 h-8 text-primary" />
                    Choisissez votre heure
                  </h2>
                  <p className="text-muted-foreground">
                    Créneaux disponibles pour le {selectedDate.toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                  {timeSlots.map((slot) => (
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
                      </div>
                    </Button>
                  ))}
                </div>
              </section>
            </>
          )}

          {selectedService && selectedDate && selectedTime && !isConfirmed && (
            <>
              <Separator className="my-12" />

              {/* SECTION 5 - FORMULAIRE CLIENT */}
              <section className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                    <Users className="w-8 h-8 text-primary" />
                    Vos informations
                  </h2>
                  <p className="text-muted-foreground">Complétez votre réservation</p>
                </div>

                <Card className="max-w-2xl mx-auto rounded-[24px] p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">Numéro WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="+229 XX XX XX XX"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        required
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo (optionnelle, recommandée pour les installations)</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="rounded-xl"
                        />
                        {photo && (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <Upload className="w-4 h-4" />
                            {photo.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Récapitulatif */}
                    <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                      <h3 className="font-semibold text-lg">Récapitulatif</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span className="font-medium">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium">{selectedDate.toLocaleDateString("fr-FR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Heure:</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Durée:</span>
                          <span className="font-medium">{selectedService.duration}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-base">
                          <span className="font-semibold">Prix:</span>
                          <span className="font-bold text-primary">{selectedService.price}</span>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-xl">
                      Confirmer la réservation
                    </Button>
                  </form>
                </Card>
              </section>
            </>
          )}

          {/* SECTION 6 - CONFIRMATION */}
          {isConfirmed && (
            <section className="animate-fade-in">
              <Card className="max-w-2xl mx-auto rounded-[24px] p-12 text-center bg-primary/5 border-primary/20">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-scale-in">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">
                    Réservation en attente de confirmation
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Vous recevrez un message WhatsApp dans quelques minutes pour confirmer votre rendez-vous.
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{selectedDate?.toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Heure:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setIsConfirmed(false);
                    setSelectedService(null);
                    setSelectedDate(undefined);
                    setSelectedTime("");
                    setClientName("");
                    setWhatsappNumber("");
                    setPhoto(null);
                  }}
                >
                  Faire une nouvelle réservation
                </Button>
              </Card>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReservationPage;
