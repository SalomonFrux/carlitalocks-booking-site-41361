import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ShoppingBag } from "lucide-react";
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
          <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-4 font-playfair text-2xl text-foreground">
            Votre panier est vide
          </h2>
          <Button onClick={() => navigate("/")} className="hover-magnetic">
            Découvrir nos produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div ref={contentRef}>
          <h1 className="mb-8 font-playfair text-4xl font-bold text-foreground md:text-5xl">
            Votre Panier
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden shadow-sm">
                    <div className="flex items-center gap-4 p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-28 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between self-stretch">
                        <div>
                          <h3 className="font-playfair text-xl font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="font-playfair text-2xl font-bold text-primary mt-1">
                            {item.price.toFixed(2)} CHF
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <span className="w-10 text-center font-inter text-lg">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
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
              <Card className="sticky top-24 p-6 shadow-md">
                <h2 className="mb-6 font-playfair text-3xl font-bold text-foreground">
                  Votre réservation
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between font-inter text-lg text-muted-foreground">
                    <span>{totalItems} article{totalItems > 1 ? 's' : ''}</span>
                    <span>{totalPrice.toFixed(2)} CHF</span>
                  </div>
                  <div className="flex justify-between font-inter text-lg text-muted-foreground">
                    <span>Frais de service</span>
                    <span>0.00 CHF</span>
                  </div>
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-playfair text-2xl font-bold text-foreground">
                        Total à payer
                      </span>
                      <span className="font-playfair text-3xl font-extrabold text-primary">
                        {totalPrice.toFixed(2)} CHF
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsPaymentModalOpen(true)}
                    size="lg"
                    className="hover-magnetic w-full bg-primary font-inter text-xl py-7 mt-6 hover:bg-primary/90"
                  >
                    Procéder au paiement
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="w-full font-inter text-md py-6"
                  >
                    Continuer mes achats
                  </Button>
                  <p className="text-center font-inter text-sm text-muted-foreground pt-4">
                    🔒 Paiement 100% sécurisé via Stripe & PayPal
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
