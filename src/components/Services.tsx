import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const serviceCategories = [
  {
    title: "Installation de Locks (Départs & Microlocks)",
    services: [
      {
        name: "Locks Consultation",
        price: "10 000 F CFA",
        duration: "1 h",
        description: "Consultation pour déterminer l'installation adaptée.",
      },
      {
        name: "Départ en Twist",
        price: "à partir de 20 000 F CFA",
        duration: "5 h",
        description: "Installation de locks par vanilles.",
      },
      {
        name: "Départ au Crochet Instantané",
        price: "à partir de 20 000 F CFA",
        duration: "5 h",
        description: "Formation instantanée des locks.",
      },
      {
        name: "Départ Sisterlocks",
        price: "à partir de 50 000 F CFA",
        duration: "1 à 2 jours",
        description: "Technique délicate et précise.",
      },
      {
        name: "Locks fines cheveux longs (150–200 locks)",
        price: "500 €",
        duration: "6 h",
        description: "Crochet latching, cheveux longs.",
      },
      {
        name: "Locks fines cheveux mi-long",
        price: "400 €",
        duration: "4 h",
        description: "Installation pour cheveux mi-longs.",
      },
      {
        name: "Locks fines cheveux courts",
        price: "300 €",
        duration: "3 h",
        description: "Installation pour cheveux courts.",
      },
      {
        name: "Installation Microlocks crochet longs",
        price: "à partir de 1 000 €",
        duration: "11 h",
        description: "Microlocks au crochet pour cheveux longs.",
      },
      {
        name: "Installation Microlocks crochet mi-long",
        price: "à partir de 800 €",
        duration: "8 h",
        description: "Microlocks au crochet pour cheveux mi-longs.",
      },
      {
        name: "Microlocks vanilles longs",
        price: "à partir de 700 €",
        duration: "7 h",
        description: "Microlocks en vanilles pour cheveux longs.",
      },
      {
        name: "Microlocks vanilles mi-long",
        price: "à partir de 600 €",
        duration: "5 h",
        description: "Microlocks en vanilles pour cheveux mi-longs.",
      },
      {
        name: "Microlocks vanilles courts",
        price: "à partir de 500 €",
        duration: "4 h 30",
        description: "Microlocks en vanilles pour cheveux courts.",
      },
      {
        name: "Diagnostic capillaire",
        price: "25 €",
        duration: "20/30 min",
        description: "Déduit si installation faite.",
      },
    ],
  },
  {
    title: "Entretien / Resserrage",
    services: [
      {
        name: "Resserrage Microlocks complet longs",
        price: "à partir de 300 €",
        duration: "8 h",
        description: "Resserrage complet pour microlocks longs.",
      },
      {
        name: "Resserrage Microlocks complet mi-long",
        price: "à partir de 250 €",
        duration: "6 h",
        description: "Resserrage complet pour microlocks mi-longs.",
      },
      {
        name: "Resserrage Microlocks complet courts",
        price: "à partir de 200 €",
        duration: "4 h",
        description: "Resserrage complet pour microlocks courts.",
      },
      {
        name: "Resserrage Locks fines complet longs",
        price: "200 €",
        duration: "4 h",
        description: "Resserrage complet pour locks fines longs.",
      },
      {
        name: "Resserrage Locks fines complet mi-long",
        price: "150 €",
        duration: "3 h",
        description: "Resserrage complet pour locks fines mi-longs.",
      },
      {
        name: "Resserrage Locks fines complet courts",
        price: "100 €",
        duration: "2 h",
        description: "Resserrage complet pour locks fines courts.",
      },
      {
        name: "Retwist complet longs",
        price: "80 €",
        duration: "3 h",
        description: "Retwist complet pour locks longs.",
      },
      {
        name: "Retwist complet mi-long",
        price: "60 €",
        duration: "2 h",
        description: "Retwist complet pour locks mi-longs.",
      },
      {
        name: "Retwist complet courts",
        price: "40 €",
        duration: "1 h 30",
        description: "Retwist complet pour locks courts.",
      },
    ],
  },
  {
    title: "Soins & Traitements",
    services: [
      {
        name: "Shampooing simple",
        price: "20 €",
        duration: "30 min",
        description: "Nettoyage en profondeur des locks.",
      },
      {
        name: "Shampooing + soin",
        price: "35 €",
        duration: "45 min",
        description: "Shampooing suivi d'un soin nourrissant.",
      },
      {
        name: "Detox capillaire",
        price: "50 €",
        duration: "1 h",
        description: "Traitement détoxifiant pour cuir chevelu et locks.",
      },
      {
        name: "Hair Spa locks",
        price: "70 €",
        duration: "1 h 30",
        description: "Soin complet relaxant pour locks et cuir chevelu.",
      },
      {
        name: "Traitement anti-casse",
        price: "45 €",
        duration: "45 min",
        description: "Renforcement des locks fragilisés.",
      },
    ],
  },
  {
    title: "Coiffage & Mise en forme",
    services: [
      {
        name: "Coiffure protectrice simple",
        price: "30 €",
        duration: "1 h",
        description: "Coiffure protectrice basique.",
      },
      {
        name: "Chignon simple",
        price: "25 €",
        duration: "30 min",
        description: "Chignon élégant et rapide.",
      },
      {
        name: "Chignon élaboré",
        price: "50 €",
        duration: "1 h",
        description: "Chignon sophistiqué pour événements.",
      },
      {
        name: "Mise en plis locks",
        price: "40 €",
        duration: "1 h",
        description: "Mise en forme et stylage des locks.",
      },
      {
        name: "Coiffure événementielle",
        price: "80 €",
        duration: "2 h",
        description: "Coiffure personnalisée pour occasions spéciales.",
      },
    ],
  },
  {
    title: "Autres prestations",
    services: [
      {
        name: "Réparation locks (par lock)",
        price: "5 €",
        duration: "variable",
        description: "Réparation de locks abîmés ou cassés.",
      },
      {
        name: "Extensions locks",
        price: "à partir de 100 €",
        duration: "3 h",
        description: "Ajout d'extensions pour allonger vos locks.",
      },
      {
        name: "Coloration locks",
        price: "à partir de 80 €",
        duration: "2 h",
        description: "Coloration adaptée aux locks.",
      },
      {
        name: "Retrait de locks",
        price: "à partir de 100 €",
        duration: "variable",
        description: "Retrait professionnel et soigné des locks.",
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
                          <span className="font-semibold text-foreground">
                            {service.price}
                          </span>
                          <span>•</span>
                          <span>{service.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
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
