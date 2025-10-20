import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Oni Michel Djagnikpo",
    rating: 5,
    text: "Je suis venu chez Carlitalocks pour la réalisation de locks et je suis très satisfait du résultat. Pour de belles tresses [locks], c'est l'adresse qu'il faut ! J'ai trouvé l'équipe très professionnelle et attentive au style que j'avais demandé. Un service de qualité."
  },
  {
    name: "Annick Flavia GABA",
    rating: 5,
    text: "J'ai été entièrement satisfaite de la prestation chez Carlitalocks ! Le service est impeccable et le résultat est à la hauteur de mes attentes. On comprend pourquoi Carlitalocks est le numéro 1 des dreadlocks à Lomé. Je reviendrai sans hésiter."
  },
  {
    name: "Pascaline Binazon",
    rating: 5,
    text: "Carlitalocks est l'adresse complète pour tout ce qui concerne les locks ! J'ai été totalement satisfaite par leurs Services d'Entretien utilisant des soins naturels (Shampoings et après-shampoings). Leur expertise ne s'arrête pas là : que ce soit pour mes Dreadlocks, des Extensions de cheveux ou une Coiffure pour mariage spéciale, tout est parfait. Un professionnalisme et une gamme de services imbattables !"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Témoignages Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les avis de nos clients satisfaits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="shadow-lg hover:shadow-gold transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-foreground text-center">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
