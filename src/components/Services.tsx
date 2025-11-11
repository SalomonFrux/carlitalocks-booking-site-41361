import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
        name: "Sur devis",
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
      "Clause Importante (Repousse) : Si la repousse de vos locks dépasse deux à trois mois, le prix initialement indiqué pourrait augmenter en raison du travail supplémentaire nécessaire (à l'appréciation du technicien).",
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
        duration: "45 min",
        description: "",
      },
      {
        name: "Locks mi-long (30cm)",
        price: "À partir de 7 000 F CFA",
        duration: "55min",
        description: "",
      },
      {
        name: "Locks longues (40cm)",
        price: "À partir de 8 000 F CFA",
        duration: "1h",
        description: "",
      },
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          Découvrir nos services
        </h2>

        <div className="max-w-6xl mx-auto space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
                {category.title}
              </h3>

              {category.hasWarning && category.warning && (
                <div className="bg-warning/20 border-2 border-warning text-warning-foreground p-4 rounded-lg mb-6">
                  <p className="text-sm font-bold leading-relaxed">
                    ⚠️ {category.warning}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {category.services.map((service, serviceIndex) => (
                  <div key={serviceIndex}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start py-4">
                      {/* Service info */}
                      <div className="lg:col-span-8 space-y-2">
                        <h4 className="text-lg font-medium text-foreground">
                          {service.name}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {service.price && (
                            <>
                              <span className="font-semibold text-foreground">
                                {service.price}
                              </span>
                              {service.duration && <span>•</span>}
                            </>
                          )}
                          {service.duration && <span>{service.duration}</span>}
                        </div>
                        {service.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>

                      {/* Booking button */}
                      <div className="lg:col-span-4 flex lg:justify-end">
                        <Button
                          variant="default"
                          className="w-full lg:w-auto"
                          onClick={() => {
                            // Placeholder pour le moment
                            console.log("Réserver:", service.name);
                          }}
                        >
                          Réserver
                        </Button>
                      </div>
                    </div>

                    {/* Separator between services, but not after the last one */}
                    {serviceIndex < category.services.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
