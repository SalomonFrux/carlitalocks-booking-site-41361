import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Carlitalocks Logo" className="h-12 md:h-14" />
            <span className="hidden md:inline text-sm text-muted-foreground">
              Institut de coiffure
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("accueil")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("galerie")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Galerie
            </button>
            <button
              onClick={() => scrollToSection("horaires")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Horaires
            </button>
            <button
              onClick={() => scrollToSection("conseils")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Conseils
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Phone className="w-4 h-4 mr-2" />
              Rendez-vous
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 animate-fade-in">
            <button
              onClick={() => scrollToSection("accueil")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("galerie")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Galerie
            </button>
            <button
              onClick={() => scrollToSection("horaires")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Horaires
            </button>
            <button
              onClick={() => scrollToSection("conseils")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Conseils
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Rendez-vous
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
