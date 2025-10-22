import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Scissors, Sparkles, Bath, RotateCcw, Wind, Heart, Palette } from "lucide-react";

const serviceCategories = [
  {
    title: "À la une",
    icon: Star,
    services: [
      { name: "Resserage microlocks 201 à 300 LOCKS", price: "120 €", duration: "2 h", description: "Entre 200 et 300 locks. Prestation au crochet latching. Au delà de 2 cm ou 6 à 8 semaines de repousses un supplément vous sera facturé (60 à 100€)." },
      { name: "Resserage microlocks 301 à 400 LOCKS", price: "140 €", duration: "3 h 30", description: "Resserage au crochet latching. Au delà de deux cm de repousses (6 à 8 semaines) prévoir un supplément à partir de 60€." },
      { name: "Resserage microlocks 401 à 500 LOCKS", price: "160 €", duration: "3 h 30", description: "Prestation au crochet latching. Un entretien rigoureux de 6 semaines est obligatoire, au delà un supplément sera facturé à partir de 60€." },
      { name: "Detox locks /microlocks", price: "70 €", duration: "1 h", description: "Soin spécialement formulé afin d'éliminer vos produits accumulés dans vos Locks. À faire une fois par an, comprend un masque hydratant, massage crânien et shampooing plus séchage." },
      { name: "Shampoing simple", price: "25 €", duration: "15 min", description: "Shampoing hydratant + massage crânien." },
    ]
  },
  {
    title: "Installation Microlocks au crochet",
    icon: Scissors,
    services: [
      { name: "Installation Microlocks moyennes cheveux longs 30cm (300 à 350 locks)", price: "à partir de 1 000 €", duration: "11 h", description: "Installation au crochet latching. Comprend : shampooing, traçage, crochet sur toute la longueur. Prévoir la journée." },
      { name: "Installation Microlocks moyennes cheveux mi-longs 20cm (300 à 350 locks)", price: "à partir de 800 €", duration: "8 h", description: "Comprend : shampooing, soin, traçage, installation au crochet sur toute la longueur. Prestation longue qui permet une meilleure formation des Locks." },
      { name: "Diagnostic capillaire avant installation", price: "25 €", duration: "20 min", description: "Définir un type de départ en fonction de vos cheveux, choix, méthode, nombre de locks. Prix déductible si installation faite au studio." },
    ]
  },
  {
    title: "Installation Microlocks en vanille/twist",
    icon: Sparkles,
    services: [
      { name: "Installation Microlocks en vanille cheveux longs (300 à 350 locks)", price: "à partir de 700 €", duration: "7 h", description: "Comprend : shampooing, soin avant la pause, coupe des pointes si besoin, traçage, vanilles + crochet latching sur les racines. Installation réalisée à deux." },
      { name: "Installation Microlocks en vanille cheveux mi-longs (300 à 350 locks)", price: "à partir de 600 €", duration: "5 h", description: "Comprend : shampooing, soin avant la pause, coupe des pointes si besoin, traçage, vanilles + crochet latching sur les racines." },
      { name: "Installation Microlocks en vanille cheveux courts (300 à 350 locks)", price: "à partir de 500 €", duration: "4 h 30", description: "Comprend : shampooing, soin avant la pause, coupe des pointes si besoin, traçage, vanilles + crochet latching sur les racines." },
      { name: "Diagnostic capillaire avant installation", price: "25 €", duration: "30 min", description: "Définir un type de départ en fonction de vos cheveux, choix, méthode, nombre de locks. Prix déductible si installation faite au studio." },
    ]
  },
  {
    title: "Installation Locks Fines (150 à 200 locks)",
    icon: Scissors,
    services: [
      { name: "Départ locks fine cheveux longs", price: "500 €", duration: "6 h", description: "Moins de 200 locks, installation au crochet latching." },
      { name: "Départ locks fine cheveux mi-longs", price: "400 €", duration: "4 h", description: "Entre 150 et 200 locks, crochet latching." },
      { name: "Départ locks fine cheveux courts", price: "300 €", duration: "3 h", description: "Départ interlocks crochet cheveux courts." },
    ]
  },
  {
    title: "Soins locks",
    icon: Bath,
    services: [
      { name: "Shampoing simple", price: "25 €", duration: "15 min", description: "Shampoing hydratant + massage crânien." },
      { name: "Shampooing hydratant + Soins", price: "40 €", duration: "30 min", description: "Shampooing clarifiant suivi d'un shampooing hydratant ainsi qu'un soin sous serviette chaude de 15min." },
      { name: "Detox locks /microlocks", price: "70 €", duration: "1 h", description: "Soin spécialement formulé afin d'éliminer vos produits accumulés. À faire une fois par an, comprend masque hydratant, massage crânien et shampooing plus séchage." },
      { name: "Formule detox + hairspa", price: "180 €", duration: "1 h 40", description: "Detox locks, hairspa soin cuir chevelu, masque argile, massage crânien (bras, torse, cou)." },
      { name: "Hair spa", price: "120 €", duration: "1 h 20", description: "Spa détente comprend : massage cobido, massage visage, gommage cuir chevelu, soins, massage crânien." },
    ]
  },
  {
    title: "Resserages",
    icon: RotateCcw,
    services: [
      { name: "Resserage microlocks 501 à 600 LOCKS", price: "200 €", duration: "3 h 30", description: "Prestation au crochet latching. Un entretien rigoureux de 6 semaines est obligatoire, au delà un supplément sera facturé (50€ la demi-heure en plus)." },
      { name: "Resserage microlocks 401 à 500 LOCKS", price: "160 €", duration: "3 h 30", description: "Prestation au crochet latching. Un entretien rigoureux de 6 semaines est obligatoire, au delà un supplément sera facturé à partir de 60€." },
      { name: "Resserage microlocks 301 à 400 LOCKS", price: "140 €", duration: "3 h 30", description: "Resserage au crochet latching. Au delà de deux cm de repousses (6 à 8 semaines) prévoir un supplément à partir de 60€." },
      { name: "Resserage microlocks 201 à 300 LOCKS", price: "120 €", duration: "2 h", description: "Entre 200 et 300 locks. Au delà de 2 cm ou 6 à 8 semaines de repousses un supplément vous sera facturé (60 à 100€ en fonction des repousses)." },
      { name: "Resserrage LOCKS FINES entre 150 et 200 locks", price: "110 €", duration: "1 h 15", description: "Prestation au crochet latching. Au delà de 2 mois de repousses prévoir 50€ de supplément." },
      { name: "Reprise LOCKS FINES moins de 150 locks / interlocks", price: "90 €", duration: "1 h", description: "Reprise des racines en interlocks. Au delà de 2 à 3 mois de repousses un supplément à partir de 30€ est à prévoir." },
    ]
  },
  {
    title: "Twist",
    icon: Wind,
    services: [
      { name: "Retwist de 100 à 200 Locks", price: "150 €", duration: "1 h 30", description: "Comprend shampooing, tournage de Locks, coiffure protectrice (2 à 4 Barel Twist ou nattes)." },
      { name: "Retwist moins de 100 Locks", price: "120 €", duration: "1 h", description: "Comprend shampooing, tournage de Locks, coiffure protectrice (2 à 4 Barel Twist ou nattes)." },
    ]
  },
  {
    title: "Coiffage",
    icon: Heart,
    services: [
      { name: "Coiffure protectrice", price: "20 €", duration: "20 min", description: "Coiffure simple et élégante fortement conseillée avant maturation complète. 2 à 4 nattes collées." },
      { name: "Chignon simple sur Microlocks", price: "35 €", duration: "30 min", description: "Pour une coiffure élégante et raffinée. Attention : le resserrage n'est pas compris dans la prestation." },
      { name: "Chignon élaboré sur Microlocks", price: "60 €", duration: "45 min", description: "Pour vos évènements. Attention : cette prestation ne comprend pas le resserrage." },
    ]
  },
  {
    title: "Mise en plis / Boucler ses locks",
    icon: Palette,
    services: [
      { name: "Mise en plis sur locks courtes (20 cm)", price: "70 €", duration: "40 min", description: "Bigoudis / Flexy rod / Fil chenille. Compter environ 1h de séchage en plus. Cette prestation ne comprend pas le shampooing." },
      { name: "Mise en plis sur locks mi-longues (30 cm)", price: "90 €", duration: "55 min", description: "Flexi rod / Fil chenille / Bigoudis. Compter environ 1h de séchage en plus. Cette prestation ne comprend pas le shampooing." },
      { name: "Mise en plis sur locks longues (40 cm)", price: "120 €", duration: "1 h 10", description: "Bigoudis flexi rod. Compter environ 1h de séchage en plus. Cette prestation ne comprend pas le shampooing." },
    ]
  },
  {
    title: "I. Installation de locks",
    icon: Scissors,
    services: [
      { name: "Locks Consultation", price: "10 000 F CFA", duration: "1 h", description: "Consultation pour définir le type d'installation adapté à vos cheveux et vos besoins." },
      { name: "Départ en Twist (Vanilles)", price: "à partir de 20 000 F CFA", duration: "5 h", description: "Installation de locks par la méthode des vanilles." },
      { name: "Départ au Crochet Instantané", price: "à partir de 20 000 F CFA", duration: "5 h", description: "Installation de locks au crochet pour une formation instantanée." },
      { name: "Départ Sisterlocks", price: "à partir de 50 000 F CFA", duration: "1 à 2 jours", description: "Installation de Sisterlocks, technique précise et délicate." },
      { name: "Départ Microlocks", price: "à partir de 50 000 F CFA", duration: "1 à 2 jours", description: "Installation de Microlocks pour un résultat fin et élégant." },
    ]
  },
  {
    title: "II. Services Complémentaires - Resserage de locks",
    icon: RotateCcw,
    services: [
      { name: "Resserage 1-100 Locks", price: "7 000 F CFA", duration: "2 h 30", description: "Resserage pour 1 à 100 locks." },
      { name: "Resserage 101-250 Locks", price: "10 000 F CFA", duration: "3 h", description: "Resserage pour 101 à 250 locks." },
      { name: "Resserage 251-325 Locks", price: "13 000 F CFA", duration: "3 h 30", description: "Resserage pour 251 à 325 locks." },
      { name: "Resserage 326-400 Locks", price: "13 000 F CFA", duration: "4 h", description: "Resserage pour 326 à 400 locks." },
      { name: "Resserage 401-500 Locks", price: "20 000 F CFA", duration: "4 h 30", description: "Resserage pour 401 à 500 locks." },
      { name: "Resserage 501-600 Locks", price: "25 000 F CFA", duration: "5 h", description: "Resserage pour 501 à 600 locks." },
      { name: "Resserage 600+ Locks", price: "22 000 F CFA", duration: "5 h 30", description: "Resserage pour plus de 600 locks." },
    ]
  },
  {
    title: "III. Autres prestations",
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
