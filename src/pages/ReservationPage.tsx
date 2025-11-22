import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceList from "@/components/reservation/ServiceList";
import BookingSidebar from "@/components/reservation/BookingSidebar";
import SchedulingInterface from "@/components/reservation/SchedulingInterface";
import { Service } from "@/lib/serviceConfig";
import { toast } from "sonner";

const ReservationPage = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showScheduling, setShowScheduling] = useState(false);

  const handleAddService = (service: Service) => {
    if (!selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
      toast.success(`${service.name} ajouté à votre réservation`);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter((s) => s.id !== serviceId));
    toast.info("Service retiré de votre réservation");
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      toast.error("Veuillez sélectionner au moins un service");
      return;
    }
    setShowScheduling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setShowScheduling(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="py-16 px-6 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Réserver votre prestation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez vos services, sélectionnez votre créneau et recevez une confirmation par WhatsApp.
            </p>
          </div>
        </section>

        {!showScheduling ? (
          // Service Selection View
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Service List */}
              <div className="animate-fade-in">
                <ServiceList
                  onAddService={handleAddService}
                  selectedServiceIds={selectedServices.map((s) => s.id)}
                />
              </div>

              {/* Right Column - Booking Sidebar */}
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <BookingSidebar
                  selectedServices={selectedServices}
                  onRemoveService={handleRemoveService}
                  onContinue={handleContinue}
                />
              </div>
            </div>
          </div>
        ) : (
          // Scheduling View
          <div className="max-w-7xl mx-auto px-6">
            <SchedulingInterface 
              selectedServices={selectedServices}
              onBack={handleBack}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ReservationPage;
