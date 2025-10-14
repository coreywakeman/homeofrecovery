import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Droplet, Clock, Users, Check } from "lucide-react";
import heroWellness from "@/assets/hero-wellness.jpg";

const ContrastTherapy = () => {
  const benefits = [
    "Boosts circulation",
    "Reduces inflammation",
    "Enhances mental resilience",
    "Refreshes mind & body",
    "Improves recovery time",
    "Increases energy levels"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroWellness})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-walnut/80 to-walnut/60" />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-cream">
          <Droplet className="w-16 h-16 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Contrast Therapy
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Alternate warm and ice baths for invigorating recovery
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="wellness-card text-center">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-xl font-semibold mb-2">Duration</h3>
                <p className="text-muted-foreground">30 minutes</p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-xl font-semibold mb-2">Space</h3>
                <p className="text-muted-foreground">Shared facility</p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card text-center">
              <CardContent className="p-8">
                <Droplet className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-xl font-semibold mb-2">Price</h3>
                <p className="text-3xl font-bold text-primary">$20</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold mb-6 text-center">
              The Experience
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
              Contrast therapy involves alternating between warm and ice baths to create a powerful pumping effect in your circulatory system. This ancient practice boosts circulation, decreases inflammation, and speeds up recovery while providing an invigorating and restorative experience for both body and mind.
            </p>

            <h3 className="font-heading text-2xl font-semibold mb-6 text-center">
              Benefits
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="btn-wellness text-lg px-12 py-6">
                Book Your Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContrastTherapy;
