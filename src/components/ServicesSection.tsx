import { Clock, Users, Thermometer, Zap, Waves, Activity, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ServicesSection = () => {
  const services = [
    {
      name: "Cryotherapy",
      description: "Advanced cold therapy system utilizing nitrogen-cooled chambers to trigger the body's natural healing response",
      duration: "3-5 min",
      capacity: "1 person",
      price: "$65",
      originalPrice: "$85",
      icon: <Thermometer className="w-8 h-8 text-calm-blue" />,
      color: "from-calm-blue/20 to-violet/20",
      benefits: ["Reduces inflammation by up to 80%", "Accelerates muscle recovery", "Boosts collagen production", "Enhances mental clarity"],
      category: "Recovery",
      featured: true
    },
    {
      name: "NormaTec Compression",
      description: "Professional-grade pneumatic compression therapy using patented pulse technology for optimal recovery",
      duration: "30 min",
      capacity: "2 units",
      price: "$55", 
      originalPrice: "$70",
      icon: <Activity className="w-8 h-8 text-coral" />,
      color: "from-coral/20 to-ember/20",
      benefits: ["Improves circulation by 40%", "Reduces muscle fatigue", "Accelerates lactic acid removal", "Prevents injury"],
      category: "Performance",
      featured: false
    },
    {
      name: "Theragun Percussion",
      description: "Precision percussion therapy targeting deep muscle tissue with customizable intensity levels",
      duration: "25 min",
      capacity: "1 person",
      price: "$45",
      originalPrice: "$60",
      icon: <Zap className="w-8 h-8 text-ember" />,
      color: "from-ember/20 to-violet/20",
      benefits: ["Releases muscle tension", "Increases range of motion", "Reduces DOMS by 30%", "Improves blood flow"],
      category: "Therapy",
      featured: false
    },
    {
      name: "Infrared + Red Light Sauna",
      description: "Dual-spectrum therapy combining infrared heat with red light photobiomodulation for cellular regeneration",
      duration: "30 min",
      capacity: "2 people",
      price: "$75",
      originalPrice: "$95",
      icon: <Waves className="w-8 h-8 text-violet" />,
      color: "from-violet/20 to-calm-blue/20",
      benefits: ["Stimulates cellular repair", "Improves skin elasticity", "Enhances mitochondrial function", "Promotes deeper sleep"],
      category: "Wellness",
      featured: false
    },
    {
      name: "Elite Recovery Protocol",
      description: "Comprehensive 90-minute experience combining our most advanced recovery technologies",
      duration: "90 min",
      capacity: "1 person",
      price: "$185",
      originalPrice: "$250",
      icon: <Star className="w-8 h-8 text-primary" />,
      color: "from-primary/20 to-secondary/20",
      benefits: ["Complete body optimization", "Maximum recovery benefits", "Personalized therapy plan", "Priority booking access"],
      category: "Premium",
      featured: true
    }
  ];

  const stats = [
    { number: "15,000+", label: "Sessions Completed", description: "Trusted by athletes and wellness enthusiasts" },
    { number: "98%", label: "Client Satisfaction", description: "Consistently rated 5-star experience" },
    { number: "48hrs", label: "Average Recovery Time", description: "Significantly reduced compared to traditional methods" },
    { number: "24/7", label: "Expert Support", description: "Professional guidance whenever you need it" }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-to-b from-background via-background/50 to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <Badge variant="outline" className="mb-6 text-sm font-medium px-4 py-2">
            RECOVERY TECHNOLOGY
          </Badge>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Advanced Recovery
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Technology at Your Service
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience cutting-edge wellness equipment designed to accelerate your recovery, 
            reduce inflammation, and optimize your body's natural healing processes through 
            scientifically-proven methodologies.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.name} 
              className={`wellness-card group relative overflow-hidden animate-slide-up hover:shadow-lg transition-all duration-300 ${
                service.featured ? 'ring-2 ring-primary/30 shadow-lg' : ''
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {service.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4 p-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 shadow-md`}>
                  <div className="scale-75">
                    {service.icon}
                  </div>
                </div>
                
                <div>
                  <Badge variant="secondary" className="mb-2 text-xs px-2 py-0.5">
                    {service.category}
                  </Badge>
                  <CardTitle className="font-heading text-lg text-foreground mb-2 leading-tight">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm leading-snug line-clamp-2">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 p-4">
                {/* Pricing & Info */}
                <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.duration}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="w-3 h-3 mr-1" />
                      {service.capacity}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      {service.price}
                    </div>
                    {service.originalPrice && (
                      <div className="text-xs text-muted-foreground line-through">
                        {service.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Benefits - Condensed */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2 text-sm flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                    Benefits
                  </h4>
                  <ul className="space-y-1">
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                    {service.benefits.length > 3 && (
                      <li className="text-xs text-muted-foreground/70 italic">
                        +{service.benefits.length - 3} more benefits
                      </li>
                    )}
                  </ul>
                </div>
                
                <Button className="w-full btn-wellness py-2 text-sm group">
                  Book Now
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 lg:p-16">
          <h3 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Recovery?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of athletes, fitness enthusiasts, and wellness seekers who trust our 
            advanced recovery technology to optimize their performance and wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-wellness text-lg px-8 py-6">
              View All Availability
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="btn-ghost-wellness text-lg px-8 py-6">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;