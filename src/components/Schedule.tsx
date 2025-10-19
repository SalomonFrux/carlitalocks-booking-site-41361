import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

const scheduleData = [
  { day: "Lundi", status: "Fermé", hours: null },
  { day: "Mardi", status: "Ouvert", hours: "10h00 - 20h00" },
  { day: "Mercredi", status: "Ouvert", hours: "08h00 - 20h00" },
  { day: "Jeudi", status: "Ouvert", hours: "08h00 - 20h00" },
  { day: "Vendredi", status: "Ouvert", hours: "08h00 - 20h00" },
  { day: "Samedi", status: "Ouvert", hours: "08h00 - 20h00" },
  { day: "Dimanche", status: "Fermé", hours: null },
];

const Schedule = () => {
  return (
    <section id="horaires" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos Horaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consultez nos horaires d'ouverture et planifiez votre visite
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-gold">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Horaires d'ouverture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduleData.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-4 rounded-lg transition-all animate-slide-in ${
                    item.status === "Fermé"
                      ? "bg-muted/50 opacity-60"
                      : "bg-primary/5 hover:bg-primary/10"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <Clock className={`w-5 h-5 ${item.status === "Fermé" ? "text-muted-foreground" : "text-primary"}`} />
                    <span className="font-semibold text-lg">{item.day}</span>
                  </div>
                  <div className="text-right">
                    {item.status === "Fermé" ? (
                      <span className="text-muted-foreground font-medium">Fermé</span>
                    ) : (
                      <span className="text-foreground font-medium">{item.hours}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-8 text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/40">
            <p className="text-primary font-semibold text-lg">
              💡 <span className="font-bold">Astuce :</span> Nous vous recommandons de prendre rendez-vous à l'avance pour garantir votre créneau préféré
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
