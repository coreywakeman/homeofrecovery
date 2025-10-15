import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Flame, Clock, Users, Check } from "lucide-react";
import heroSauna from "@/assets/hero-wellness.jpg";
import { useToast } from "@/hooks/use-toast";

const InfraredSauna = () => {
  const { toast } = useToast();

  const handleBookSession = () => {
    toast({
      title: "Booking Available Soon!",
      description: "Contact us at info@homeofrecovery.au to book your session.",
    });
  };
  const benefits = [
    "Improved circulation",
    "Muscle recovery",
    "Detoxification",
    "Stress reduction",
    "Pain relief",
    "Skin health",
    "Immune support"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={heroSauna}
          alt="Infrared sauna wellness therapy room"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-walnut/80 to-walnut/60" />
        
        <div className="container relative z-10 px-4 text-center text-cream">
          <Flame className="w-16 h-16 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Infrared Sauna
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Full-spectrum infrared therapy for deep healing and relaxation
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
                <p className="text-muted-foreground">40 minutes</p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-xl font-semibold mb-2">Capacity</h3>
                <p className="text-muted-foreground">1 person (+$15 per guest)</p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card text-center">
              <CardContent className="p-8">
                <Flame className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-xl font-semibold mb-2">Price</h3>
                <p className="text-3xl font-bold text-primary">$39</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold mb-6 text-center">
              The Experience
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
              Our full-spectrum infrared sauna uses near, mid, and far wavelengths to penetrate deep into your body, promoting circulation, detoxification, and profound relaxation. Enhanced with chromotherapy lighting, each session supports both physical recovery and mental wellbeing.
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
              <Button size="lg" className="btn-wellness text-lg px-12 py-6" onClick={handleBookSession}>
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

export default InfraredSauna;
