import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-dreadlocks.jpg";

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/22897564646?text=Je%20souhaite%20prendre%20rendez-vous", "_blank");
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in leading-tight">
            Carlitalocks
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-4 animate-fade-in">
            Institut de coiffure à Lomé
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 animate-fade-in px-4">
            N°1 à Lomé dans les Dreadlocks, un cadre discret avec un traitement très personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in px-4">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Prendre Rendez-vous
            </Button>
            <Button
              onClick={() => {
                const element = document.getElementById("services");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
            >
              Découvrir nos services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
