import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-primary">Carlitalocks</h3>
          <p className="text-secondary-foreground/80">
            L'Institut #1 des Dreadlocks à Lomé
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-secondary-foreground/70">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>pour nos clients</span>
          </div>
          <p className="text-xs text-secondary-foreground/60">
            © {new Date().getFullYear()} Carlitalocks. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
