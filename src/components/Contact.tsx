import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/22897564646?text=Je%20souhaite%20prendre%20rendez-vous", "_blank");
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Contactez-nous
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Prenez rendez-vous dès maintenant pour transformer votre style
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Card className="shadow-gold animate-slide-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Réservation WhatsApp</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Cliquez pour prendre rendez-vous directement via WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Prendre Rendez-vous
              </Button>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Réponse rapide garantie pendant nos horaires d'ouverture
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Notre Adresse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Institut Carlitalocks</p>
                  <p className="text-muted-foreground">Djidjole 6ème arrondissement, dans le von de l'église Zion-to</p>
                  <p className="text-muted-foreground">Lomé, Togo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Téléphone</p>
                  <p className="text-muted-foreground">+228 97 56 46 46</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 md:mt-12 text-center max-w-2xl mx-auto">
          <div className="bg-gradient-accent p-6 md:p-8 rounded-lg text-foreground">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Pourquoi nous choisir ?</h3>
            <p className="text-sm md:text-base leading-relaxed">
              Avec plus de <span className="font-bold">10 ans d'expérience</span>, 
              Carlitalocks est l'institut de référence pour les dreadlocks à Lomé. 
              Notre équipe passionnée utilise des techniques professionnelles pour 
              créer et entretenir des dreadlocks qui reflètent votre personnalité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
