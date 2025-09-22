import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MembershipsSection = () => {
  const plans = [
    {
      name: "Drop-In",
      price: "45",
      period: "per session",
      description: "Perfect for trying our recovery services",
      features: [
        "Access to any service",
        "No commitment",
        "4-hour cancellation",
        "Flexible scheduling"
      ],
      popular: false,
      buttonText: "Book Now",
      color: "from-taupe/10 to-coral/10"
    },
    {
      name: "Recovery Pack",
      price: "360",
      period: "10 sessions",
      description: "Best value for regular recovery",
      features: [
        "10 sessions to use anytime",
        "6-month expiry",
        "Priority booking",
        "Free consultation",
        "20% savings vs drop-in",
        "Mix any services"
      ],
      popular: true,
      buttonText: "Choose Plan",
      color: "from-coral/20 to-violet/20"
    },
    {
      name: "Unlimited",
      price: "249",
      period: "per month",
      description: "Complete recovery transformation",
      features: [
        "Unlimited sessions",
        "All service access",
        "Personal recovery plan",
        "Advanced scheduling",
        "Priority support",
        "Guest passes (2/month)",
        "Recovery tracking"
      ],
      popular: false,
      buttonText: "Start Journey",
      color: "from-calm-blue/10 to-ember/10"
    }
  ];

  return (
    <section id="memberships" className="py-20 lg:py-32 bg-gradient-wellness">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Recovery Plan
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible membership options designed to fit your recovery goals and schedule. 
            Start your wellness journey with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`wellness-card relative animate-slide-up ${
                plan.popular ? 'ring-2 ring-coral scale-105' : ''
              }`}
              style={{animationDelay: `${index * 0.15}s`}}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-accent text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                
                <CardTitle className="font-heading text-2xl text-foreground">
                  {plan.name}
                </CardTitle>
                
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-coral mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 ${
                    plan.popular ? 'btn-accent' : 'btn-wellness'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Need a custom plan? We offer corporate and family packages.
          </p>
          <Button variant="outline" className="btn-ghost-wellness">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MembershipsSection;