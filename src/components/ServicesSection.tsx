import { Clock, Users, Thermometer, Zap, Waves, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      name: "Ice Bath Therapy",
      description: "Cold exposure therapy to reduce inflammation and boost recovery",
      duration: "15 min",
      capacity: "2 people", 
      price: "$35",
      icon: <Thermometer className="w-8 h-8 text-calm-blue" />,
      color: "from-calm-blue/20 to-violet/20",
      benefits: ["Reduces inflammation", "Boosts metabolism", "Improves circulation"]
    },
    {
      name: "Compression Therapy",
      description: "Pneumatic compression for enhanced circulation and muscle recovery",
      duration: "30 min",
      capacity: "1 person",
      price: "$45", 
      icon: <Activity className="w-8 h-8 text-coral" />,
      color: "from-coral/20 to-ember/20",
      benefits: ["Improves blood flow", "Reduces muscle soreness", "Faster recovery"]
    },
    {
      name: "Percussion Massage",
      description: "Professional massage gun therapy for targeted muscle relief",
      duration: "20 min",
      capacity: "1 person",
      price: "$40",
      icon: <Zap className="w-8 h-8 text-ember" />,
      color: "from-ember/20 to-violet/20",
      benefits: ["Relieves muscle tension", "Improves flexibility", "Pain management"]
    },
    {
      name: "Red Light Sauna",
      description: "Infrared and red light therapy for skin health and recovery",
      duration: "25 min",
      capacity: "1 person",
      price: "$50",
      icon: <Waves className="w-8 h-8 text-violet" />,
      color: "from-violet/20 to-calm-blue/20",
      benefits: ["Skin rejuvenation", "Muscle recovery", "Improved sleep"]
    },
    {
      name: "Recovery Stack",
      description: "Complete recovery experience combining multiple therapies",
      duration: "60 min",
      capacity: "1 person",
      price: "$120",
      icon: <Activity className="w-8 h-8 text-taupe" />,
      color: "from-taupe/20 to-coral/20",
      benefits: ["Full body recovery", "Maximum benefits", "Premium experience"]
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-wellness">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Recovery Technology at Your Service
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience cutting-edge wellness equipment designed to accelerate your recovery, 
            reduce inflammation, and optimize your body's natural healing processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.name} 
              className="wellness-card group animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <CardTitle className="font-heading text-xl text-foreground">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {service.capacity}
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {service.price}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Benefits:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-coral rounded-full mr-2 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full btn-wellness">
                  Book Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-ghost-wellness">
            View Availability
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;