import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Découvrir nos services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des prestations professionnelles pour sublimer vos locks
          </p>
        </div>

        {/* Service Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {serviceCategories.map((category, categoryIndex) => (
            <AccordionItem
              value={`item-${categoryIndex}`}
              key={categoryIndex}
              className="border border-border/50 rounded-[20px] overflow-hidden bg-card animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-3">
                  {category.title === "À LA UNE" && <Sparkles className="w-6 h-6 text-primary" />}
                  {category.title}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                {/* Warning Badge */}
                {category.hasWarning && category.warning && (
                  <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                    <p className="text-sm text-warning-foreground">{category.warning}</p>
                  </div>
                )}

                {/* Services List */}
                <div className="space-y-6">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="p-4 rounded-lg border border-border/30 bg-background/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{service.name}</h4>
                          {service.description && (
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          )}
                        </div>
                        <div className="text-right pl-4">
                          {service.price ? (
                            <div className="text-xl font-bold text-primary whitespace-nowrap">
                              {service.price}
                            </div>
                          ) : (
                            <div className="text-md font-semibold text-muted-foreground italic">
                              Sur devis
                            </div>
                          )}
                        </div>
                      </div>

                      {service.duration && (
                        <div className="flex items-center gap-2 text-muted-foreground mt-3 pt-3 border-t border-border/30">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{service.duration}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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
