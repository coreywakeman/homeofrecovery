import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PrimaryMembershipSection from "@/components/PrimaryMembershipSection";
import ServicesSection from "@/components/ServicesSection";
import GroupBookingsSection from "@/components/GroupBookingsSection";
import MembershipsSection from "@/components/MembershipsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PrimaryMembershipSection />
        <ServicesSection />
        <GroupBookingsSection />
        <MembershipsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
