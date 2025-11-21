import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Service, SERVICES, CATEGORIES, CATEGORY_WARNINGS, formatDuration } from "@/lib/serviceConfig";
import { Clock, Plus, Sparkles, AlertCircle } from "lucide-react";
import AddServiceModal from "./AddServiceModal";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ServiceListProps = {
  onAddService: (service: Service) => void;
  selectedServiceIds: string[];
};

const ServiceList = ({ onAddService, selectedServiceIds }: ServiceListProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll spy effect
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const category = entry.target.getAttribute("data-category");
            if (category) {
              setActiveCategory(category);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollToCategory = (category: string) => {
    const element = categoryRefs.current[category];
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleAddClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleAddService = (service: Service) => {
    onAddService(service);
  };

  return (
    <div className="space-y-8">
      {/* Sticky Category Tabs */}
      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm py-4 -mx-6 px-6 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => scrollToCategory(category)}
              className={`rounded-full whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "hover:bg-muted"
              }`}
            >
              {category === "À LA UNE" && <Sparkles className="w-4 h-4 mr-2" />}
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div className="space-y-12">
        {CATEGORIES.map((category) => {
          const categoryServices = SERVICES.filter((s) => s.category === category);
          if (categoryServices.length === 0) return null;

          const categoryWarning = CATEGORY_WARNINGS[category];

          return (
            <div
              key={category}
              ref={(el) => (categoryRefs.current[category] = el)}
              data-category={category}
              className="animate-fade-in"
            >
              {/* Category Header */}
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                  {category === "À LA UNE" && <Sparkles className="w-6 h-6 text-primary" />}
                  {category}
                </h3>

                {/* Category Warning */}
                {categoryWarning && (
                  <Alert className="mt-4 border-warning/50 bg-warning/10">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <AlertDescription className="text-sm text-warning-foreground">
                      {categoryWarning}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryServices.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);

                  return (
                    <Card
                      key={service.id}
                      className={`group hover:shadow-gold hover:scale-[1.02] transition-all duration-300 rounded-[20px] border-border/50 overflow-hidden ${
                        isSelected ? "ring-2 ring-primary shadow-gold" : ""
                      }`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                            {service.name}
                          </CardTitle>
                          {isSelected && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              Ajouté
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Description */}
                        {service.description && (
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        )}

                        {/* Duration */}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">
                            {formatDuration(service.duration)}
                          </span>
                        </div>

                        {/* Price & Add Button */}
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-primary">
                            {service.price}
                          </div>
                          <Button
                            onClick={() => handleAddClick(service)}
                            disabled={isSelected}
                            className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Service Modal */}
      <AddServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddService}
      />
    </div>
  );
};

export default ServiceList;
