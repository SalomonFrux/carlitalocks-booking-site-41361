import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Service, formatDuration } from "@/lib/serviceConfig";
import { Clock, Trash2, ShoppingCart } from "lucide-react";
import { calculateTotalDuration } from "@/lib/reservationEngine";

type BookingSidebarProps = {
  selectedServices: Service[];
  onRemoveService: (serviceId: string) => void;
  onContinue: () => void;
};

const BookingSidebar = ({ selectedServices, onRemoveService, onContinue }: BookingSidebarProps) => {
  const totalDuration = selectedServices.length > 0 ? calculateTotalDuration(selectedServices) : null;
  
  return (
    <Card className="sticky top-24 rounded-[24px] border-2 border-primary/20 shadow-gold">
      <CardHeader className="bg-gradient-accent rounded-t-[24px]">
        <CardTitle className="flex items-center gap-2 text-accent-foreground">
          <ShoppingCart className="w-5 h-5" />
          Votre réservation
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {selectedServices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Aucun service sélectionné
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Ajoutez des services pour continuer
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedServices.map((service) => (
              <div
                key={service.id}
                className="p-4 bg-muted/50 rounded-xl space-y-2 animate-fade-in"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-semibold text-sm text-foreground flex-1">
                    {service.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveService(service.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary" />
                  <span>{formatDuration(service.duration)}</span>
                </div>
                
                <p className="text-sm font-bold text-primary">
                  {service.price}
                </p>
              </div>
            ))}
            
            <Separator className="my-4" />
            
            {/* Total Duration */}
            {totalDuration && (
              <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl">
                <span className="font-semibold text-foreground">Durée totale:</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-bold text-primary">
                    {totalDuration.hours}h{totalDuration.minutes > 0 ? totalDuration.minutes : ''}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      {selectedServices.length > 0 && (
        <CardFooter className="p-6 pt-0">
          <Button
            onClick={onContinue}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Continuer vers le planning
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookingSidebar;
