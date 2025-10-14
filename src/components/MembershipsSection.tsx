import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MembershipsSection = () => {
  const plans = [
    {
      name: "5 Session Pack",
      price: "160",
      period: "5 sessions",
      description: "Great starter pack for new members",
      features: [
        "5 sessions to any service",
        "Valid for 2 months",
        "Mix and match services",
        "Save $15 vs drop-in rate",
      ],
      popular: false,
    },
    {
      name: "10 Session Pack",
      price: "300",
      period: "10 sessions",
      description: "Best value for regular visitors",
      features: [
        "10 sessions to any service",
        "Valid for 3 months",
        "Mix and match services",
        "Save $50 vs drop-in rate",
        "Priority booking",
      ],
      popular: true,
    },
    {
      name: "20 Session Pack",
      price: "560",
      period: "20 sessions",
      description: "Maximum savings for committed recovery",
      features: [
        "20 sessions to any service",
        "Valid for 6 months",
        "Mix and match services",
        "Save $140 vs drop-in rate",
        "Priority booking",
        "Free wellness consultation",
      ],
      popular: false,
    },
  ];

  return (
    <section id="packs" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-sm px-4 py-1">
            Session Packs
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Our Packs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Save more with our flexible session packs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`wellness-card relative animate-slide-up ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
              style={{animationDelay: `${index * 0.15}s`}}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-accent text-cream px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">                
                <CardTitle className="font-serif text-2xl text-foreground">
                  {plan.name}
                </CardTitle>
                
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground font-serif">${plan.price}</span>
                  <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 ${
                    plan.popular ? 'btn-accent' : 'btn-wellness'
                  }`}
                >
                  Purchase Pack
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Not sure which pack is right for you?
          </p>
          <Button size="lg" variant="outline" className="rounded-xl" asChild>
            <a href="#memberships">View Memberships</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MembershipsSection;
