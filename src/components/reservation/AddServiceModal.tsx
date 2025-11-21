import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Service, formatDuration } from "@/lib/serviceConfig";
import { Clock, Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AddServiceModalProps = {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: Service) => void;
};

const AddServiceModal = ({ service, isOpen, onClose, onAdd }: AddServiceModalProps) => {
  if (!service) return null;
  
  const handleAdd = () => {
    onAdd(service);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service.name}</DialogTitle>
          <DialogDescription>{service.category}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Duration */}
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Durée</p>
              <p className="font-semibold text-foreground">
                {formatDuration(service.duration)}
              </p>
            </div>
          </div>
          
          {/* Price */}
          <div className="p-4 bg-primary/10 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Prix</p>
            <p className="text-2xl font-bold text-primary">{service.price}</p>
          </div>
          
          {/* Description */}
          {service.description && (
            <div className="p-4 bg-muted/30 rounded-xl">
              <p className="text-sm text-foreground">{service.description}</p>
            </div>
          )}
          
          {/* Photo requirement */}
          {service.requiresPhoto && (
            <Alert className="border-warning/50 bg-warning/10">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning-foreground">
                Une photo de vos cheveux sera requise lors de la confirmation
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl"
          >
            Annuler
          </Button>
          <Button
            onClick={handleAdd}
            className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter à la réservation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
