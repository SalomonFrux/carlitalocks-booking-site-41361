import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: number;
}

const PaymentModal = ({ isOpen, onClose, productName, price }: PaymentModalProps) => {
  const handleWhatsAppPayment = () => {
    const message = `Bonjour, je souhaite procéder au paiement pour: ${productName} - ${price.toFixed(2)} CHF`;
    window.open(
      `https://wa.me/22890583350?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Finaliser le paiement
          </DialogTitle>
          <DialogDescription className="text-center">
            Contactez-nous via WhatsApp pour finaliser votre commande
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">{productName}</p>
            <p className="text-3xl font-bold text-primary mt-2">
              {price.toFixed(2)} CHF
            </p>
          </div>
          <Button
            onClick={handleWhatsAppPayment}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Payer via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
