import { useEffect, useRef } from "react";
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

const InfiniteScrollRow = ({ images, direction }: { images: typeof galleryImages; direction: "left" | "right" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = direction === "left" ? 0 : scrollContainer.scrollWidth / 2;

    const scroll = () => {
      if (!scrollContainer) return;

      if (direction === "left") {
        scrollPosition += 0.5;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
      } else {
        scrollPosition -= 0.5;
        if (scrollPosition <= 0) {
          scrollPosition = scrollContainer.scrollWidth / 2;
        }
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [direction]);

  const duplicatedImages = [...images, ...images];

  return (
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-hidden pb-2"
      style={{ scrollBehavior: "auto" }}
    >
      {duplicatedImages.map((image, index) => (
        <div
          key={index}
          className="relative flex-shrink-0 w-[320px] h-[400px] rounded-[20px] overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          style={{
            animation: "float 6s ease-in-out infinite",
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ transform: "perspective(1000px) rotateX(2deg)" }}
          />
        </div>
      ))}
    </div>
  );
};

const Gallery = () => {
  const row1Images = galleryImages.slice(0, 4);
  const row2Images = galleryImages.slice(4, 8);

  return (
    <section id="galerie" className="py-24 bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <div className="text-center space-y-4 animate-fade-in opacity-0" style={{ animation: "fade-in 1s ease-out forwards" }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Notre Galerie
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
            Découvrez l'excellence de notre savoir-faire
          </p>
        </div>
      </div>

      <div className="space-y-8 relative">
        <InfiniteScrollRow images={row1Images} direction="left" />
        <InfiniteScrollRow images={row2Images} direction="right" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
