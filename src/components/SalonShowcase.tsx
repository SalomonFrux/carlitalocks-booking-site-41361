import salonImage from "@/assets/salon-interior.jpg";

const SalonShowcase = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={salonImage}
              alt="Intérieur du salon Carlitalocks à Lomé"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-xl md:text-2xl font-semibold">
                Bienvenue dans notre institut
              </h2>
              <p className="text-white/90 text-sm md:text-base mt-1">
                Un espace chaleureux dédié à l'art des dreadlocks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalonShowcase;
