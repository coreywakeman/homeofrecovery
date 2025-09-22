import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import MembershipsSection from "@/components/MembershipsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <MembershipsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
