import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, DollarSign, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import saunaImage from "@/assets/service-infrared-sauna.jpg";
import compressionImage from "@/assets/service-compression-therapy.jpg";
import contrastImage from "@/assets/service-contrast-therapy.jpg";

const Services = () => {
  const services = [
    {
      id: "infrared-sauna",
      name: "Infrared Sauna Therapy",
      image: saunaImage,
      duration: "40 minutes",
      price: "$39",
      guestPrice: "+$15",
      description: "Detoxify, improve circulation, and accelerate muscle recovery through deep-penetrating infrared heat.",
      benefits: [
        "Promotes relaxation and stress relief",
        "Boosts metabolism and aids weight management",
        "Improves skin tone and elasticity",
        "Enhances circulation and heart health"
      ],
      link: "/services/infrared-sauna"
    },
    {
      id: "compression-therapy",
      name: "Compression Therapy",
      image: compressionImage,
      durations: [
        { time: "30 minutes", price: "$33" },
        { time: "60 minutes", price: "$48" }
      ],
      description: "Air compression boots target legs and lower body to increase blood flow, reduce swelling, and improve recovery time.",
      benefits: [
        "Reduces muscle soreness and fatigue",
        "Enhances recovery after workouts",
        "Supports lymphatic drainage",
        "Ideal for athletes or those standing long hours"
      ],
      link: "/services/compression-therapy"
    },
    {
      id: "contrast-therapy",
      name: "Contrast Therapy (Hot & Cold)",
      image: contrastImage,
      duration: "30 minutes",
      price: "$20",
      description: "Alternate between hot and cold plunges to rejuvenate your body and reduce inflammation naturally.",
      benefits: [
        "Boosts circulation and immune response",
        "Reduces muscle tension and soreness",
        "Enhances mental alertness",
        "Shared-space recovery experience"
      ],
      link: "/services/contrast-therapy"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-wellness">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Core Recovery Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience industry-leading recovery therapies designed to enhance your physical and mental wellbeing
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service) => {
              return (
                <Card key={service.id} className="wellness-card hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl mb-2">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Pricing Information */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      {service.durations ? (
                        // Multiple duration options
                        service.durations.map((option, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{option.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-primary" />
                              <span className="text-lg font-bold text-primary">{option.price}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Single duration option
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-primary" />
                              <span className="text-lg font-bold text-primary">{service.price}</span>
                            </div>
                          </div>
                          {service.guestPrice && (
                            <div className="text-sm text-muted-foreground">
                              Add a guest: <span className="font-semibold text-foreground">{service.guestPrice}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                        Key Benefits
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learn More Button */}
                    <Button 
                      className="w-full group" 
                      variant="outline"
                      asChild
                    >
                      <Link to={service.link}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="wellness-card bg-gradient-accent border-none max-w-2xl mx-auto">
              <CardContent className="p-8 text-cream">
                <h3 className="font-serif text-3xl font-bold mb-4">
                  Ready to Start Your Recovery Journey?
                </h3>
                <p className="mb-6 text-cream/90">
                  Book your session today and experience the difference our premium recovery services can make
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-cream text-walnut hover:bg-cream/90"
                    asChild
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-cream text-cream hover:bg-cream/10"
                    asChild
                  >
                    <Link to="/memberships">View Memberships</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
