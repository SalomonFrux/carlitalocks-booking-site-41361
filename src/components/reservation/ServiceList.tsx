import { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Service, SERVICES, CATEGORIES, CATEGORY_WARNINGS, formatDuration } from "@/lib/serviceConfig";
import { Clock, Plus, Sparkles, AlertCircle, Check, Search, X } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return SERVICES;
    
    const query = searchQuery.toLowerCase();
    return SERVICES.filter((service) => {
      const matchesName = service.name.toLowerCase().includes(query);
      const matchesCategory = service.category.toLowerCase().includes(query);
      const matchesDescription = service.description?.toLowerCase().includes(query);
      return matchesName || matchesCategory || matchesDescription;
    });
  }, [searchQuery]);

  // Get filtered categories (only categories with matching services)
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    
    const categoriesWithResults = new Set(
      filteredServices.map((service) => service.category)
    );
    return CATEGORIES.filter((category) => categoriesWithResults.has(category));
  }, [filteredServices, searchQuery]);

  // Scroll spy effect
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => 
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          const category = mostVisible.target.getAttribute("data-category");
          if (category) {
            setActiveCategory(category);
          }
        }
      },
      {
        rootMargin: "-120px 0px -40% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
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
      const headerOffset = 140; // Account for navbar + sticky tabs
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({ 
        top: offsetPosition, 
        behavior: "smooth" 
      });
      
      // Immediately set active category to prevent flicker
      setActiveCategory(category);
    }
  };

  const handleAddClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleAddService = (service: Service) => {
    onAddService(service);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative animate-fade-in">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher un service ou une catégorie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base rounded-full border-2 focus:border-primary"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Search Results Count */}
      {searchQuery && (
        <div className="text-sm text-muted-foreground animate-fade-in">
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} trouvé{filteredServices.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Sticky Category Tabs */}
      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm py-4 -mx-6 px-6 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filteredCategories.map((category) => (
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
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Aucun service trouvé pour "{searchQuery}"
            </p>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="mt-4"
            >
              Effacer la recherche
            </Button>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const categoryServices = filteredServices.filter((s) => s.category === category);
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
        })
        )}
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
