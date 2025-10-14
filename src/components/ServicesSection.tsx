import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap, Waves, Check } from "lucide-react";

const services = [
  {
    name: "Infrared Sauna",
    icon: Flame,
    description: "Our full-spectrum infrared sauna uses advanced infrared heaters to emit near, mid, and far-infrared wavelengths. These wavelengths penetrate the skin and underlying tissues directly, gently raising core body temperature without overheating the air around you. This process stimulates circulation, increases metabolic activity, and promotes natural detoxification through sweating. The deep tissue penetration can help relax muscles, reduce tension, and support recovery, while the chromotherapy lighting enhances the session by influencing mood and promoting a sense of wellbeing. By combining heat, light, and targeted infrared energy, the sauna provides a scientifically supported environment for both physical and mental restoration.",
    duration: "40 minutes",
    price: "$39",
    capacity: "1 person (can add a guest for $15)",
    benefits: [
      "Improved circulation, supporting cardiovascular health",
      "Muscle recovery",
      "Detoxification",
      "Stress reduction",
      "Pain relief",
      "Improved skin health",
      "Support for immune system function"
    ]
  },
  {
    name: "Compression Therapy",
    icon: Zap,
    description: "Compression therapy uses advanced pneumatic compression devices to deliver controlled, rhythmic pressure to the limbs. This pressure enhances blood flow and lymphatic drainage, helping to reduce swelling, improve circulation, and accelerate the removal of metabolic waste from muscles. By promoting optimal blood flow, compression therapy can support faster recovery after exercise, reduce muscle fatigue, and aid in overall performance. The session provides a comfortable, guided experience that complements other recovery methods, helping the body restore itself efficiently.",
    duration: "30 minutes / 1 hour",
    price: "$33 / $48",
    capacity: "1 person",
    benefits: [
      "Enhances circulation and blood flow",
      "Reduces swelling and fluid retention",
      "Speeds up muscle recovery",
      "Reduces soreness",
      "Helps decrease fatigue",
      "Supports overall performance"
    ]
  },
  {
    name: "Contrast Therapy",
    icon: Waves,
    description: "Contrast therapy combines sessions in our warm bath and ice bath to alternate between heat and cold. The warm bath promotes blood vessel dilation, relaxation, and muscle loosening, while the ice bath triggers vessel constriction and reduces inflammation. This alternating cycle enhances circulation, accelerates recovery, decreases muscle soreness, and supports overall physical resilience, all while providing an invigorating and restorative experience for the body and mind.",
    duration: "30 minutes",
    price: "$20",
    capacity: "Shared space",
    benefits: [
      "Boosts circulation through alternating heat and cold",
      "Reduces inflammation and eases muscle soreness",
      "Speeds up recovery",
      "Enhances overall physical resilience",
      "Provides a refreshing, restorative experience"
    ]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-sm px-4 py-1">
            Premium Services
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Recovery Modalities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry-leading recovery services backed by science
          </p>
        </div>

        <div className="grid gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="wellness-card overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 bg-gradient-accent p-8 flex flex-col justify-between">
                    <div>
                      <Icon className="h-12 w-12 text-cream mb-4" />
                      <CardTitle className="font-serif text-3xl mb-4 text-cream">
                        {service.name}
                      </CardTitle>
                      <div className="space-y-2 text-cream/90">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-cream/20 text-cream border-0">
                            {service.duration}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold font-serif text-cream">
                          {service.price}
                        </div>
                        <div className="text-sm text-cream/80">
                          {service.capacity}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-cream text-walnut hover:bg-cream/90">
                      Book Now
                    </Button>
                  </div>
                  
                  <div className="md:col-span-2 p-8">
                    <CardDescription className="text-base text-foreground mb-6 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-4 text-foreground">Benefits:</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
