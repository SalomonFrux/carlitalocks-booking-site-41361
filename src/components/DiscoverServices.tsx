import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import service3 from "@/assets/service-3.jpg";

const services = [
  {
    title: "Installation de Locks",
    description: "Création de dreadlocks naturelles avec techniques professionnelles adaptées à votre type de cheveux.",
    image: service1,
    link: "#services",
  },
  {
    title: "Entretien & Resserrage",
    description: "Maintien impeccable de vos locks avec soins personnalisés pour une beauté durable.",
    image: service2,
    link: "#services",
  },
  {
    title: "Réparations & Conseils",
    description: "Expertise en réparation de locks et conseils personnalisés pour des locks en parfaite santé.",
    image: service3,
    link: "#services",
  },
];

const DiscoverServices = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          Découvrir nos services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image de fond */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Contenu */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/90 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Button
                  onClick={scrollToServices}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverServices;
