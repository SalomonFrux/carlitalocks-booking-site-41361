import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Service, SERVICES, CATEGORIES, CATEGORY_WARNINGS, formatDuration } from "@/lib/serviceConfig";
import { Clock, Plus, Sparkles, AlertCircle, Check } from "lucide-react";
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
        rootMargin: "-100px 0px -90% 0px",
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
    <div className="space-y-6">
      {/* Sticky Category Tabs */}
      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm py-4 -mx-6 px-6 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => scrollToCategory(category)}
              className={`rounded-full whitespace-nowrap transition-all px-6 ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category === "À LA UNE" && <Sparkles className="w-4 h-4 mr-2" />}
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div className="space-y-10">
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
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {category === "À LA UNE" && <Sparkles className="w-5 h-5 text-primary" />}
                  {category}
                </h3>

                {/* Category Warning */}
                {categoryWarning && (
                  <Alert className="mt-3 border-warning/50 bg-warning/10">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <AlertDescription className="text-sm text-warning-foreground">
                      {categoryWarning}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Service List */}
              <div className="space-y-3">
                {categoryServices.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);

                  return (
                    <div
                      key={service.id}
                      className={`group p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80 hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold text-foreground">
                            {service.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{formatDuration(service.duration)}</span>
                            <span>•</span>
                            <span className="font-medium text-foreground">{service.price}</span>
                          </div>
                          {service.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {service.description}
                            </p>
                          )}
                        </div>

                        <Button
                          onClick={() => handleAddClick(service)}
                          disabled={isSelected}
                          size="icon"
                          variant={isSelected ? "secondary" : "outline"}
                          className={`shrink-0 rounded-full w-10 h-10 transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground hover:bg-primary"
                              : "hover:bg-foreground hover:text-background"
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Plus className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                    </div>
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
