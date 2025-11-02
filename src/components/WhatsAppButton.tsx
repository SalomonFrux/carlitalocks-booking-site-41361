import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/22897564646?text=Je%20souhaite%20prendre%20rendez-vous", "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className="fixed bottom-6 right-6 z-40 rounded-full w-16 h-16 shadow-gold bg-primary hover:bg-primary/90 animate-fade-in"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </Button>
  );
};

export default WhatsAppButton;
