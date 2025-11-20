import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type ServiceCategory = {
  title: string;
  hasWarning?: boolean;
  warning?: string;
  services: {
    name: string;
    price: string;
    duration: string;
    description: string;
  }[];
};

const serviceCategories: ServiceCategory[] = [
  {
    title: "À LA UNE",
    services: [
      {
        name: "Consultation sur mesure pour Départ locks avec Extension ou ajout d'extension sur locks existants",
        price: "10 000 F CFA",
        duration: "1 h",
        description: "",
      },
    ],
  },
  {
    title: "INSTALLATION MICROLOCKS MOYENNE EN VANILLE / TWISTS",
    services: [
      {
        name: "Cheveux longs (300 à 350 locks)",
        price: "À partir de 40 000 F CFA",
        duration: "7h à 8h",
        description: "",
      },
      {
        name: "Cheveux Mi-longs (300 à 350 locks)",
        price: "À partir de 35 000 F CFA",
        duration: "5h",
        description: "",
      },
      {
        name: "Cheveux courts (300 à 350 locks)",
        price: "À partir de 20 000 F CFA",
        duration: "4h 30 min à 5 h",
        description: "",
      },
    ],
  },
  {
    title: "INSTALLATION LOCKS TRADITIONNELS AU CROCHET (80 à 150 LOCKS)",
    services: [
      {
        name: "Cheveux longs",
        price: "À partir de 30 000 F CFA",
        duration: "6h",
        description: "",
      },
      {
        name: "Cheveux mi-long",
        price: "À partir de 25 000 F CFA",
        duration: "5h",
        description: "",
      },
      {
        name: "Cheveux courts",
        price: "À partir de 20 000 F CFA",
        duration: "4h",
        description: "",
      },
    ],
  },
  {
    title: "INSTALLATION MINILOCKS OU FINES AU CROCHET INTERLOCKS (150 à 250 LOCKS)",
    services: [
      {
        name: "Cheveux longs",
        price: "À partir de 45 000 F CFA",
        duration: "8h",
        description: "",
      },
      {
        name: "Cheveux Mi-long",
        price: "À partir de 40 000 F CFA",
        duration: "6h",
        description: "",
      },
      {
        name: "Cheveux courts",
        price: "À partir de 35 000 F CFA",
        duration: "5h",
        description: "",
      },
    ],
  },
  {
    title: "INSTALLATION MICROLOCKS MOYENNES AU CROCHÉ INTERLOCKS",
    services: [
      {
        name: "Cheveux longs 30 cm (300 à 400 locks)",
        price: "À partir de 70 000 F CFA",
        duration: "12h",
        description: "",
      },
      {
        name: "Cheveux Mi-longs 20 cm (400 à 500 locks)",
        price: "À partir de 60 000 F CFA",
        duration: "10h",
        description: "",
      },
      {
        name: "Cheveux courts (300 à 400 locks)",
        price: "À partir de 50 000 F CFA",
        duration: "8h",
        description: "",
      },
    ],
  },
  {
    title: "INSTALLATION SISTERLOCKS AU CROCHET INTERLOCKS (400 à 600 locks)",
    services: [
      {
        name: "Cheveux longs 30 cm",
        price: "À partir de 100 000 F CFA",
        duration: "1 à 2 jours",
        description: "",
      },
      {
        name: "Cheveux Mi-longs 20 cm",
        price: "À partir de 100 000 F CFA",
        duration: "36 h",
        description: "",
      },
      {
        name: "Cheveux courts 10 cm",
        price: "À partir de 80 000 F CFA",
        duration: "Une journée",
        description: "",
      },
    ],
  },
  {
    title: "INSTALLATION LOCKS/MICROLOCKS AVEC EXTENSIONS",
    services: [
      {
        name: "Devis personnalisé",
        price: "",
        duration: "",
        description: "",
      },
    ],
  },
  {
    title: "RESSERRAGE LOCKS AU CROCHET INTERLOCKS",
    hasWarning: true,
    warning:
      "Clause Importante (Repousse) : Si la repousse de vos locks dépasse deux à trois mois, le prix initialement indiqué pourrait augmenter en raison du travail supplémentaire nécessaire (à l'appréciation de la professionnelle).",
    services: [
      {
        name: "Resserrage locks traditionnel moins de 150 locks",
        price: "À partir de 8 000 F CFA",
        duration: "2h30",
        description: "",
      },
      {
        name: "Resserrage minilocks entre 150 et 200 locks",
        price: "À partir de 8 000 F CFA",
        duration: "3h",
        description: "",
      },
      {
        name: "Resserrage microlocks 201 à 300 Locks",
        price: "À partir de 8 000 F CFA",
        duration: "2h30",
        description: "",
      },
      {
        name: "Resserrage microlocks entre 301 à 400 locks",
        price: "À partir de 10 000 F CFA",
        duration: "3h30",
        description: "",
      },
      {
        name: "Resserrage microlocks 401 à 500 locks",
        price: "À partir de 15 000 F CFA",
        duration: "3h30",
        description: "",
      },
      {
        name: "Resserrage sisterlocks 501 à 600 Locks",
        price: "À partir de 20 000 F CFA",
        duration: "4h",
        description: "",
      },
    ],
  },
  {
    title: "DEFAIRE SES LOCKS/MICROLOCKS/SISTERLOCKS",
    services: [
      {
        name: "Sur devis",
        price: "",
        duration: "",
        description: "",
      },
    ],
  },
  {
    title: "TWIST",
    services: [
      {
        name: "Retwist (100 à 200 locks)",
        price: "À partir de 10 000 F CFA",
        duration: "2h",
        description: "Concerne les personnes porteuses de dreadlocks. Tournage de locks avec ou sans gel.",
      },
      {
        name: "Retwist moins de 100 Locks",
        price: "À partir de 8 000 F CFA",
        duration: "1h30",
        description: "Concerne les personnes porteuses de dreadlocks. Tournage de locks avec ou sans gel.",
      },
    ],
  },
  {
    title: "SOINS LOCKS",
    services: [
      {
        name: "Shampoing simple (Adulte)",
        price: "À partir de 2 500 F CFA",
        duration: "15min",
        description: "Shampoing soins hydratant + massage crânien.",
      },
      {
        name: "Shampoing simple (Enfant)",
        price: "À partir de 2 000 F CFA",
        duration: "15min",
        description: "Shampoing soins hydratant + massage crânien.",
      },
      {
        name: "Shampoing hydratant + soins",
        price: "À partir de 7 000 F CFA",
        duration: "45 min",
        description: "",
      },
      {
        name: "DÉTOX LOCKS/MICROLOCKS",
        price: "À partir de 7 000 F CFA",
        duration: "1h",
        description: "",
      },
    ],
  },
  {
    title: "COIFFAGE",
    services: [
      {
        name: "Coiffure protectrice",
        price: "À partir de 1 000 F CFA",
        duration: "15min",
        description: "",
      },
      {
        name: "Chignon simple sur Microlocks/Locks",
        price: "À partir de 2 000 F CFA",
        duration: "30min",
        description: "",
      },
      {
        name: "Chignon élaboré",
        price: "À partir de 3 000 F CFA",
        duration: "45min",
        description: "",
      },
    ],
  },
  {
    title: "BOUCLAGE DES LOCKS",
    services: [
      {
        name: "Locks courtes (20cm)",
        price: "À partir de 5 000 F CFA",
        duration: "1h",
        description: "",
      },
      {
        name: "Locks Mi-longs (40 cm)",
        price: "À partir de 7 000 F CFA",
        duration: "1h30",
        description: "",
      },
      {
        name: "Locks longs (60 cm)",
        price: "À partir de 10 000 F CFA",
        duration: "2h",
        description: "",
      },
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Découvrir nos services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des prestations professionnelles pour sublimer vos locks
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-20">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              {/* Category Title */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                  {category.title === "À LA UNE" && <Sparkles className="w-6 h-6 text-primary" />}
                  {category.title}
                </h3>
                
                {/* Warning Badge */}
                {category.hasWarning && category.warning && (
                  <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                    <p className="text-sm text-warning-foreground">{category.warning}</p>
                  </div>
                )}
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <Card 
                    key={serviceIndex} 
                    className="group hover:shadow-gold hover:scale-105 transition-all duration-300 rounded-[20px] border-border/50 overflow-hidden bg-card"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.name}
                      </CardTitle>
                      {service.description && (
                        <CardDescription className="text-sm text-muted-foreground mt-2">
                          {service.description}
                        </CardDescription>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* Duration */}
                      {service.duration && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{service.duration}</span>
                        </div>
                      )}

                      {/* Price */}
                      {service.price ? (
                        <div className="text-2xl font-bold text-primary">
                          {service.price}
                        </div>
                      ) : (
                        <div className="text-lg font-semibold text-muted-foreground italic">
                          Sur devis
                        </div>
                      )}
                    </CardContent>

                    <CardFooter>
                      <Link to="/reservation" className="w-full">
                        <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
                          Réserver
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-accent rounded-[24px] p-12 animate-fade-in">
          <h3 className="text-3xl font-bold text-accent-foreground mb-4">
            Prête à réserver votre prestation ?
          </h3>
          <p className="text-accent-foreground/80 mb-6 max-w-xl mx-auto">
            Choisissez votre service préféré et réservez votre créneau en quelques clics
          </p>
          <Link to="/reservation">
            <Button size="lg" variant="secondary" className="rounded-xl">
              Prendre rendez-vous
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
