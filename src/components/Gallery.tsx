import { useState } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

const galleryImages = [
  { src: gallery1, alt: "Dreadlocks auburn bouclés" },
  { src: gallery2, alt: "Dreadlocks noirs tressés" },
  { src: gallery3, alt: "Dreadlocks bicolores avec effet ombré" },
  { src: gallery4, alt: "Style dreadlocks homme avec fade" },
  { src: gallery5, alt: "Dreadlocks blonds en queue de cheval" },
  { src: gallery6, alt: "Dreadlocks naturels noirs" },
  { src: gallery7, alt: "Dreadlocks colorés rouge et noir" },
  { src: gallery8, alt: "Coiffure dreadlocks auburn courts" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="galerie" className="py-20 bg-background">
      <div className="container mx-auto px-4">
      <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Notre Galerie
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez quelques-unes de nos plus belles réalisations
          </p>
        </div>

        <div className="relative overflow-hidden w-full space-y-4">
          {/* Première ligne - défilement de gauche à droite */}
          <div className="flex gap-4 animate-scroll-left-to-right">
            {[...galleryImages.slice(0, 4), ...galleryImages.slice(0, 4)].map((image, index) => (
              <div
                key={`top-${index}`}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-gold transition-all duration-300 cursor-pointer flex-shrink-0"
                onClick={() => setSelectedImage(index % 4)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-[350px] h-[280px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Deuxième ligne - défilement de droite à gauche */}
          <div className="flex gap-4 animate-scroll-right-to-left">
            {[...galleryImages.slice(4, 8), ...galleryImages.slice(4, 8)].map((image, index) => (
              <div
                key={`bottom-${index}`}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-gold transition-all duration-300 cursor-pointer flex-shrink-0"
                onClick={() => setSelectedImage((index % 4) + 4)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-[350px] h-[280px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-secondary/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-[90vh] relative">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
