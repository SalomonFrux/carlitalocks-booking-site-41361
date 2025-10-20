import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Wind, RefreshCw, Moon } from "lucide-react";

const tips = [
  {
    icon: Wind,
    title: "Nettoyage",
    description: "Lavez vos locks régulièrement avec des produits naturels et doux. Cela permet d'éliminer les impuretés sans agresser votre cuir chevelu.",
    details: "Un bon nettoyage est la base de locks saines. Utilisez des shampoings sans sulfate ni silicone, de préférence à base d'huiles essentielles. Lavez vos locks 1 à 2 fois par semaine selon votre type de cheveux. Massez doucement le cuir chevelu et rincez abondamment à l'eau tiède pour éviter les résidus."
  },
  {
    icon: Droplet,
    title: "Hydratation",
    description: "Nourrissez vos locks avec des huiles végétales (jojoba, ricin, coco…) pour préserver leur souplesse, leur brillance et éviter la casse.",
    details: "L'hydratation est essentielle pour maintenir la santé de vos locks. Appliquez régulièrement des huiles végétales naturelles sur vos locks et votre cuir chevelu. L'huile de jojoba régule le sébum, l'huile de ricin favorise la croissance, et l'huile de coco nourrit en profondeur. Massez délicatement pour une meilleure pénétration."
  },
  {
    icon: RefreshCw,
    title: "Resserrage",
    description: "Un resserrage tous les 2 à 3 mois est recommandé pour garder des racines nettes et une structure harmonieuse.",
    details: "Le resserrage régulier maintient vos locks bien formées et esthétiquement parfaites. Chez Carlitalocks, nos experts utilisent des techniques professionnelles pour resserrer vos racines sans traumatiser le cheveu. C'est aussi l'occasion de faire un bilan santé de vos locks et de recevoir des conseils personnalisés de votre locticienne."
  },
  {
    icon: Moon,
    title: "Protection",
    description: "La nuit, dormez avec un bonnet ou une taie d'oreiller en satin pour protéger vos locks des frottements et conserver leur hydratation.",
    details: "La protection nocturne est souvent négligée mais cruciale. Le satin réduit les frottements qui peuvent affaiblir vos locks et absorber leur hydratation naturelle. Investissez dans un bonnet en satin ou une taie d'oreiller en soie. Ces matières douces préservent l'hydratation, réduisent les frisottis et prolongent la durée de vie de votre coiffure."
  }
];

const TipsForHealthyLocks = () => {
  return (
    <section id="conseils" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conseils pour des Locks Sains
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Suivez nos recommandations pour sublimer vos locks au quotidien. Chez Carlitalocks, nous croyons que des locks bien entretenues sont le reflet d'un amour profond pour soi. Voici nos essentiels pour des cheveux en pleine santé :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card 
                key={index}
                className="shadow-lg hover:shadow-gold transition-all duration-300 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tip.details}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-accent p-8 rounded-lg">
            <p className="text-foreground text-lg font-medium">
              💡 Besoin de conseils personnalisés ? Notre équipe d'experts est à votre disposition pour vous accompagner dans l'entretien de vos locks. Prenez rendez-vous dès maintenant !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipsForHealthyLocks;
