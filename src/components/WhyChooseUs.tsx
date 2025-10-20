import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Heart, Users } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "N°1 à Lomé",
    description: "Reconnus comme la référence en matière de dreadlocks dans la capitale togolaise"
  },
  {
    icon: Users,
    title: "Cadre Discret",
    description: "Un environnement intime et personnalisé pour votre confort absolu"
  },
  {
    icon: Heart,
    title: "Traitement Personnalisé",
    description: "Chaque client bénéficie d'une attention particulière adaptée à ses besoins"
  },
  {
    icon: Star,
    title: "Expertise Professionnelle",
    description: "Plus de 10 ans d'expérience dans l'art des dreadlocks"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Pourquoi choisir Carlitalocks?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce qui fait de Carlitalocks le numéro 1 des dreadlocks à Lomé
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card 
                key={index}
                className="text-center shadow-lg hover:shadow-gold transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6 pb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
