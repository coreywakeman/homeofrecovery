import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClassesSection from "@/components/ClassesSection";
import CoachesSection from "@/components/CoachesSection";
import MembershipsSection from "@/components/MembershipsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ClassesSection />
        <CoachesSection />
        <MembershipsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
