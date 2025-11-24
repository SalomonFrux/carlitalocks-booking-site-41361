import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Megaphone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesCards = () => {
  const titleRef = useScrollReveal();
  const cardsRef = useScrollReveal();
  const [openService, setOpenService] = useState<string | null>(null);

  const services = [
    {
      icon: Target,
      title: "Accompagnement Projet",
      description: [
        "la structuration de leurs idées,",
        "la planification et l'organisation,",
        "la définition d'objectifs concrets,",
        "le passage de l'intention à l'action.",
      ],
      intro: "Nous accompagnons les entrepreneurs, créateurs et porteurs de vision dans :",
      footer: "Nous offrons un cadre clair et pratique pour aider chaque projet à devenir réalisable.",
    },
    {
      icon: Megaphone,
      title: "Marketing & Communication",
      description: [
        "branding et identité visuelle,",
        "création de contenu,",
        "storytelling,",
        "stratégie digitale et communication.",
      ],
      intro: "YOS PLANNER propose également des services en :",
      footer: "Notre objectif est d'aider chaque projet à rayonner de manière professionnelle, authentique et alignée avec sa vision.",
    },
  ];

  const toggleService = (title: string) => {
    setOpenService(openService === title ? null : title);
  };

  return (
    <section className="bg-secondary/5 py-20">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="mb-12 text-center">
          <h2 className="mb-4 font-playfair text-4xl font-bold text-foreground md:text-5xl">
            Découvrir nos services
          </h2>
          <p className="mx-auto max-w-3xl font-inter text-lg text-muted-foreground">
            Nous proposons un accompagnement personnalisé pour vous guider dans la construction, 
            le suivi ou la mise en œuvre de vos projets.
          </p>
        </div>

        <div ref={cardsRef} className="max-w-4xl mx-auto space-y-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-border bg-card shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleService(service.title)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-center">
                  <div className="mr-6 rounded-full bg-accent/20 p-3">
                    <service.icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
                    openService === service.title ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>

              {openService === service.title && (
                <div className="p-6 pt-0">
                  <div className="border-t border-border pt-6 space-y-4">
                    <p className="font-inter text-base text-muted-foreground leading-relaxed">
                      {service.intro}
                    </p>
                    <ul className="space-y-2 font-inter text-base text-muted-foreground">
                      {service.description.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-3 mt-1 h-2 w-2 rounded-full bg-accent"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-inter text-base text-muted-foreground leading-relaxed italic pt-2">
                      {service.footer}
                    </p>
                    <div className="flex justify-end pt-4">
                      <Link to="/contact">
                        <Button className="hover-magnetic bg-accent text-accent-foreground font-inter hover:bg-accent/90">
                          Réserver
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
