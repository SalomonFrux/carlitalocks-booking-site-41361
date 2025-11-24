import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import PaymentModal from "@/components/PaymentModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const contentRef = useScrollReveal();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background py-20">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-6 h-20 w-20 text-primary" />
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Votre panier est vide
          </h2>
          <p className="mb-8 text-muted-foreground">
            Il semble que vous n'ayez encore rien ajouté.
          </p>
          <Button onClick={() => navigate("/reservation")}>
            Découvrir nos services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div ref={contentRef}>
          <Button
            variant="ghost"
            onClick={() => navigate("/reservation")}
            className="mb-6 text-primary hover:text-primary/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux services
          </Button>

          <h1 className="mb-10 text-4xl font-bold text-foreground md:text-5xl text-center">
            Finaliser ma réservation
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden shadow-lg border-border/50 rounded-2xl bg-card">
                    <div className="flex items-center gap-6 p-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between self-stretch">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-2xl font-bold text-primary mt-2">
                            {parseFloat(item.price.replace(/[^0-9.]/g, '')).toFixed(2)} CHF
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 rounded-full"
                            >
                              -
                            </Button>
                            <span className="w-10 text-center text-lg font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full"
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive rounded-full"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <Card className="sticky top-28 p-8 shadow-xl rounded-2xl border-border/50 bg-card">
                <h2 className="mb-8 text-3xl font-bold text-foreground text-center">
                  Récapitulatif
                </h2>
                <div className="space-y-5">
                  <div className="flex justify-between text-lg text-muted-foreground">
                    <span>{totalItems} article{totalItems > 1 ? 's' : ''}</span>
                    <span>{totalPrice.toFixed(2)} CHF</span>
                  </div>
                  <div className="flex justify-between text-lg text-muted-foreground">
                    <span>Frais de service</span>
                    <span>0.00 CHF</span>
                  </div>
                  <div className="border-t border-border/50 my-6"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-foreground">
                      Total
                    </span>
                    <span className="text-3xl font-extrabold text-primary">
                      {totalPrice.toFixed(2)} CHF
                    </span>
                  </div>
                  <Button
                    onClick={() => setIsPaymentModalOpen(true)}
                    size="lg"
                    className="w-full text-lg py-7 mt-8 rounded-xl bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
                  >
                    Confirmer et payer
                  </Button>
                  <p className="text-center text-sm text-muted-foreground pt-4">
                    🔒 Paiement 100% sécurisé
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        productName={`Commande (${totalItems} article${totalItems > 1 ? "s" : ""})`}
        price={totalPrice}
      />
    </div>
  );
};

export default Checkout;
