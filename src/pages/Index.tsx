import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import TipsForHealthyLocks from "@/components/TipsForHealthyLocks";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // If navigated here with state.scrollTo, scroll to the given section
    const target = (location.state as any)?.scrollTo;
    if (target) {
      // small timeout to ensure elements are mounted
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);

      // Clear the history state so refresh won't re-trigger scrolling
      try {
        window.history.replaceState({}, document.title);
      } catch (e) {
        // ignore
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <TipsForHealthyLocks />
      <Schedule />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
