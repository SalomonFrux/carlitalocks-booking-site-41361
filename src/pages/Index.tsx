import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import DiscoverServices from "@/components/DiscoverServices";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import TipsForHealthyLocks from "@/components/TipsForHealthyLocks";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <DiscoverServices />
      <Services />
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
