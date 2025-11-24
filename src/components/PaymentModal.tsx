import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
  productName?: string;
  price?: number;
};

const PaymentModal = ({ isOpen, onClose, amount, productName, price }: PaymentModalProps) => {
  const displayAmount = amount || price || 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paiement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {productName && (
            <p className="font-medium">{productName}</p>
          )}
          <p className="text-muted-foreground">
            Montant total: {displayAmount}€
          </p>
          <Button onClick={onClose} className="w-full">
            Confirmer le paiement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
