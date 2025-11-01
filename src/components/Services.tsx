import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Scissors, Sparkles, Bath, RotateCcw, Wind, Heart, Palette } from "lucide-react";

const serviceCategories = [
  {
    title: "A LA UNE - Installation de locks",
    icon: Star,
    services: [
      { name: "Locks Consultation", price: "10 000 F CFA", duration: "1 h", description: "Consultation pour définir le type d'installation adapté à vos cheveux et vos besoins." },
      { name: "Départ en Twist (Vanilles)", price: "à partir de 20 000 F CFA", duration: "5 h", description: "Installation de locks par la méthode des vanilles." },
      { name: "Départ au Crochet Instantané", price: "à partir de 20 000 F CFA", duration: "5 h", description: "Installation de locks au crochet pour une formation instantanée." },
      { name: "Départ Sisterlocks", price: "à partir de 50 000 F CFA", duration: "1 à 2 jours", description: "Installation de Sisterlocks, technique précise et délicate." },
    ]
  },
  {
    title: "Installation Locks Fines (150 à 200 locks max)",
    icon: Scissors,
    services: [
      { name: "Départ locks fine sur cheveux long", price: "500 €", duration: "6 h", description: "Départ Locks, cheveux longs. Moins de 200 locks crochet latching." },
      { name: "Départ locks fine cheveux mi long", price: "400 €", duration: "4 h", description: "Départ crochet locks fine entre 150 et 200 locks." },
      { name: "Départ Locks fine interlocks court", price: "300 €", duration: "3 h", description: "Départ interlocks crochet cheveux court." },
    ]
  },
  {
    title: "Installation Microlocks",
    icon: Sparkles,
    services: [
      { name: "Installation Microlocks moyennes au crochet, cheveux long 30cm (300 à 350 locks)", price: "à partir de 1 000 €", duration: "11 h", description: "Installation au crochet latching 300, Max 30 cm de longueur. Prévoir la journée, cette installation comprend : Shampooing – Traçage - Crochet sur toute la longueur. Si vous avez des interrogations et afin de vous aider à préciser votre choix d'installation, l'institut Carlitalocks vous propose de réserver un diagnostic capillaire dont le montant sera déduit de votre prestation si l'installation est faite au studio." },
      { name: "Installation Microlocks moyennes au crochet, cheveux Mi-long 20cm (300 à 350 locks)", price: "à partir de 800 €", duration: "8 h", description: "Installation Microlocks au crochet cheveux mi-long, jusqu'à 20 cm. Cette prestation comprend : shampooing - soin - Traçage - Installation au crochet sur toute la longueur. Prestation longue qui permet une meilleure formation des Locks. Si vous avez des interrogations et afin de vous aider à préciser votre choix d'installation, l'institut Carlitalocks vous propose de réserver un diagnostic capillaire dont le montant sera déduit de votre prestation si l'installation est faite au studio." },
      { name: "Diagnostic capillaire avant installation", price: "25 €", duration: "20 min", description: "Diagnostic capillaire avant installation Microlocks 30 minutes : Définir un type de départ en fonction de vos cheveux, choix, méthode, nombre de locks problématique du cuir chevelu avant la pose. Prix déductible si installation faite à l'institut Carlitalocks. Merci de bien préparer vos questions." },
    ]
  },
  {
    title: "Installation Microlocks moyennes en vanille/twist",
    icon: Wind,
    services: [
      { name: "Installation Microlocks moyennes en vanille, Cheveux long (300 à 350 locks)", price: "à partir de 700 €", duration: "7 h", description: "Installation Microlocks en vanille. La prestation comprend : shampooing - soin avant la pause - coupe des pointes si besoin - traçage - Vanilles + crochet latching sur les racines. Prix à partir de 700€. Installation réalisée à deux, prévoir 7 à 8h. Si vous avez des interrogations et afin de vous aider à préciser votre choix d'installation, l'institut Carlitalocks vous propose de réserver un diagnostic capillaire dont le montant sera déduit de votre prestation si l'installation est faite au studio." },
      { name: "Installation Microlocks moyennes en vanille, Cheveux Mi-long (300 à 350 locks)", price: "à partir de 600 €", duration: "5 h", description: "Installation Carlitalocks en vanille. La prestation comprend : shampooing - soin avant la pause - coupe des pointes si besoin - traçage - Vanilles + crochet latching sur les racines. Si vous avez des interrogations et afin de vous aider à préciser votre choix d'installation, l'institut Carlitalocks vous propose de réserver un diagnostic capillaire dont le montant sera déduit de votre prestation si l'installation est faite au studio." },
      { name: "Installation Microlocks moyennes en vanille, Cheveux court (300 à 350 locks)", price: "à partir de 500 €", duration: "4 h 30", description: "Installation Microlocks en vanille. La prestation comprend : shampooing - soin avant la pause - coupe des pointes si besoin - traçage - Vanilles + crochet latching sur les racines. Si vous avez des interrogations et afin de vous aider à préciser votre choix d'installation, l'institut Carlitalocks vous propose de réserver un diagnostic capillaire dont le montant sera déduit de votre prestation si l'installation est faite au studio." },
      { name: "Diagnostic capillaire avant installation", price: "25 €", duration: "30 min", description: "Diagnostic capillaire avant installation Microlocks 30 minutes : Définir un type de départ en fonction de vos cheveux, choix, méthode, nombre de locks problématique du cuir chevelu avant la pose. Prix déductible si installation faite à l'institut Carlitalocks." },
    ]
  },
  {
    title: "Resserrage - MICROLOCKS",
    icon: RotateCcw,
    services: [
      { name: "Resserage microlocks 201 à 300 LOCKS", price: "120 €", duration: "2 h", description: "MICROLOCKS entre 200 et 300 locks. Cette prestation est faite au crochet latching. Au delà de 2 cm ou 6 à 8 semaines de repousses un supplément vous sera facturé. Entre 60 et 100€ en fonction des repousses." },
      { name: "Resserage microlocks 301 à 400 LOCKS", price: "140 €", duration: "3 h 30", description: "Resserage au crochet latching. ATTENTION : AU DELA DE DEUX CM DE REPOUSSES (6 à 8 semaines) PREVOIR UN SUPPLEMENT A PARTIR DE 60 EUROS." },
      { name: "Resserage microlocks 401 à 500 LOCKS", price: "160 €", duration: "3 h 30", description: "Prestation effectuée au crochet latching. ATTENTION : UN ENTRETIEN RIGOUREUX DE 6 SEMAINES EST OBLIGATOIRE. AU DELA UN SUPPLEMENT SERA FACTURE A PARTIR DE 60€." },
      { name: "Resserage microlocks 501 à 600 LOCKS", price: "200 €", duration: "3 h 30", description: "Prestation effectuée au crochet latching. ATTENTION : UN ENTRETIEN RIGOUREUX DE 6 SEMAINES EST OBLIGATOIRE. AU DELA UN SUPPLEMENT SERA FACTURE 50€ la demi-heure en plus." },
      { name: "Detox locks /microlocks", price: "70 €", duration: "1 h", description: "Le soin Detox est un soin spécialement formulé afin d'éliminer vos produits accumulés dans vos Locks. C'est un soin qu'il faut faire une fois par an, ce soin comprend un masque hydratant, un massage crânien et un shampooing plus séchage." },
      { name: "Shampoing simple", price: "25 €", duration: "15 min", description: "Shampoing hydratant + massage crânien." },
    ]
  },
  {
    title: "Resserrage - LOCKS FINES",
    icon: RotateCcw,
    services: [
      { name: "Resserrage LOCKS FINES entre 150 et 200 locks", price: "110 €", duration: "1 h 15", description: "LOCKS FINES entre 150 et 200 locks. Prestation faite au crochet latching. Au delà de 2 mois de repousses prévoir 50€ de supplément." },
      { name: "Reprise LOCKS FINES moins de 150 locks / interlocks", price: "90 €", duration: "1 h", description: "LOCKS FINES. Reprise des racines en interlocks. Au delà de 2 à 3 mois de repousses un supplément à partir de 30€ est à prévoir." },
    ]
  },
  {
    title: "TWIST",
    icon: Wind,
    services: [
      { name: "Retwist de 100 à 200 Locks", price: "150 €", duration: "1 h 30", description: "Concerne les personnes porteuses de Dread Locks. Tournage de locks avec ou sans gel. Ce soin comprend : shampoing - tournage de Locks - coiffure protectrice (2 à 4 Barel Twist ou nattes)." },
      { name: "Retwist moins de 100 Locks", price: "120 €", duration: "1 h", description: "Concerne les personnes porteuses de Dread Locks. Tournage de locks avec ou sans gel. Ce soin comprend : shampoing - tournage de Locks - coiffure protectrice (2 à 4 Barel Twist ou nattes)." },
    ]
  },
  {
    title: "Soins locks",
    icon: Bath,
    services: [
      { name: "Shampoing simple", price: "25 €", duration: "15 min", description: "Shampoing hydratant + massage crânien." },
      { name: "Shampooing hydratant + Soins", price: "40 €", duration: "30 min", description: "Cette prestation comprend un shampooing clarifiant suivi d'un shampooing hydratant ainsi qu'un soin sous serviette chaude de 15min." },
      { name: "Detox locks /microlocks", price: "70 €", duration: "1 h", description: "Le soin Detox est un soin spécialement formulé afin d'éliminer vos produits accumulés dans vos Locks. C'est un soin qu'il faut faire une fois par an, ce soin comprend un masque hydratant, un massage crânien et un shampooing plus séchage." },
      { name: "Formule detox +hairspa", price: "180 €", duration: "1 h 40", description: "Detox locks, Hairspa soin cuir chevelu, Masque argile, Massage crânien (bras, torse, cou)." },
      { name: "Hair spa", price: "120 €", duration: "1 h 20", description: "Spa détente. Comprend : Massage cobido, Massage visage, Gommage cuir chevelu, Soins, Massage crânien." },
    ]
  },
  {
    title: "Coiffage",
    icon: Heart,
    services: [
      { name: "Coiffure protectrice", price: "20 €", duration: "20 min", description: "Coiffure simple et élégante fortement conseillée avant maturation complète de vos locks. Elle permet de sublimer vos locks tout en limitant le risque de glissements. 2 à 4 nattes collées." },
      { name: "Chignon simple sur Microlocks", price: "35 €", duration: "30 min", description: "Chignon simple sur Microlocks pour une coiffure élégante et raffinée. ATTENTION : le resserrage n'est pas compris dans la prestation." },
      { name: "Chignon élaboré sur Microlocks", price: "60 €", duration: "45 min", description: "Chignon élaboré sur Microlocks pour vos évènements. ATTENTION : cette prestation ne comprend pas le resserrage." },
    ]
  },
  {
    title: "Mise en plis / Boucler ses locks",
    icon: Palette,
    services: [
      { name: "Mise en plis sur locks courtes (20 cm)", price: "70 €", duration: "40 min", description: "Idéale pour un évènement, afin d'avoir un look différent dans vos Locks. Mise en plis bigoudis / Flexy rod / Fil chenille. Il faut compter environ 1h de séchage en plus du temps de prestation. Cette prestation ne comprend pas le shampooing. Cependant la coiffure est à réaliser sur cheveux humides, nous vous conseillons donc de réserver un shampoing pour un rendu optimal." },
      { name: "Mise en plis sur locks mi longues (30 cm)", price: "90 €", duration: "55 min", description: "Mise en plis locks mi longue 30cm. Flexi rod / Fil chenille / Bigoudis. Il faut compter environ 1h de séchage en plus du temps de prestation. Cette prestation ne comprend pas le shampooing. Cependant la coiffure est à réaliser sur cheveux humides, nous vous conseillons donc de réserver un shampoing pour un rendu optimal." },
      { name: "Mise en plis sur locks longues (40 cm)", price: "120 €", duration: "1 h 10", description: "Mise en plis cheveux long. Bigoudis flexi rod. Il faut compter environ 1h de séchage en plus du temps de prestation. Cette prestation ne comprend pas le shampooing. Cependant la coiffure est à réaliser sur cheveux humides, nous vous conseillons donc de réserver un shampoing pour un rendu optimal." },
    ]
  },
  {
    title: "Autres prestations",
    icon: Sparkles,
    services: [
      { name: "Réparation de Locks", price: "à partir de 7 000 F CFA", duration: "3 h", description: "Réparation de locks abîmées ou cassées." },
      { name: "Extension de locks", price: "à partir de 30 000 F CFA", duration: "3 h", description: "Ajout d'extensions pour allonger vos locks." },
      { name: "Coloration / Mèches", price: "à partir de 10 000 F CFA", duration: "1 h", description: "Coloration complète ou mèches pour personnaliser vos locks." },
      { name: "Retrait des locks", price: "à partir de 20 000 F CFA", duration: "5 h", description: "Retrait soigneux des locks pour préserver vos cheveux naturels." },
    ]
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Prestations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Des prestations de qualité pour sublimer et entretenir vos dreadlocks
          </p>
          
          {/* Astuce mise en évidence */}
          <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border-2 border-primary rounded-lg p-6 shadow-lg animate-pulse">
            <p className="text-lg font-bold text-primary flex items-center justify-center gap-2">
              <Star className="w-6 h-6" />
              Astuce : Nous vous recommandons de prendre rendez-vous à l'avance pour garantir votre créneau préféré
              <Star className="w-6 h-6" />
            </p>
          </div>
        </div>

        <div className="space-y-12 max-w-7xl mx-auto">
          {serviceCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="animate-slide-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <Card
                    key={serviceIndex}
                    className="hover:shadow-gold transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg leading-tight mb-2">
                        {service.name}
                      </CardTitle>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-primary text-xl">{service.price}</span>
                        <span className="text-muted-foreground">{service.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
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
