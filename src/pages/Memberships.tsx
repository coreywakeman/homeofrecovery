import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Zap } from "lucide-react";

const Memberships = () => {
  const packs = [
    {
      name: "5 Session Pack",
      price: "$175",
      perSession: "$35 per session",
      description: "Perfect for getting started",
      features: [
        "5 recovery sessions",
        "Valid for 3 months",
        "All services included",
        "Flexible scheduling"
      ]
    },
    {
      name: "10 Session Pack",
      price: "$320",
      perSession: "$32 per session",
      description: "Most popular choice",
      features: [
        "10 recovery sessions",
        "Valid for 6 months",
        "All services included",
        "Priority booking",
        "Best value"
      ],
      popular: true
    },
    {
      name: "20 Session Pack",
      price: "$600",
      perSession: "$30 per session",
      description: "Maximum savings",
      features: [
        "20 recovery sessions",
        "Valid for 12 months",
        "All services included",
        "Priority booking",
        "Maximum savings"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-wellness">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Memberships & Offers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your recovery journey
          </p>
        </div>
      </section>

      {/* Unlimited Membership */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto max-w-5xl">
          <Card className="wellness-card border-2 border-primary overflow-hidden">
            <div className="bg-gradient-accent text-cream p-6 text-center">
              <Zap className="w-12 h-12 mx-auto mb-3" />
              <h2 className="font-serif text-3xl font-bold">Unlimited Recovery</h2>
              <p className="text-cream/90 mt-2">Our most popular membership</p>
            </div>
            
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-primary mb-4">$39<span className="text-2xl text-muted-foreground">/week</span></div>
                <p className="text-xl text-muted-foreground">
                  Recovery only works when it becomes part of your routine
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Unlimited Access</h4>
                    <p className="text-sm text-muted-foreground">All services, unlimited sessions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Pause Anytime</h4>
                    <p className="text-sm text-muted-foreground">Life happens, we understand</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Priority Booking</h4>
                    <p className="text-sm text-muted-foreground">Reserve your preferred times</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Guest Privileges</h4>
                    <p className="text-sm text-muted-foreground">Bring a friend at member rates</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg py-6">
                Become a Member
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Intro Offer */}
      <section className="py-20 bg-gradient-wellness">
        <div className="container px-4 mx-auto max-w-4xl">
          <Card className="wellness-card">
            <CardHeader className="text-center pb-6">
              <Badge className="w-fit mx-auto mb-4 bg-primary text-primary-foreground">
                New Members Only
              </Badge>
              <CardTitle className="font-serif text-4xl mb-3">
                Intro Offer — $99
              </CardTitle>
              <CardDescription className="text-lg">
                Try everything our facility offers for 2 full weeks
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Unlimited access to all services for 2 weeks</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Experience infrared sauna, compression, and contrast therapy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>No lock-in contracts or ongoing commitment</span>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg py-6">
                Claim Your Intro Offer
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Session Packs */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Session Packs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prefer flexibility? Choose from our session packs and use them at your own pace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packs.map((pack) => (
              <Card key={pack.name} className={`wellness-card ${pack.popular ? 'border-2 border-primary' : ''}`}>
                <CardHeader>
                  {pack.popular && (
                    <Badge className="w-fit mb-3 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="font-serif text-2xl mb-2">{pack.name}</CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-1">{pack.price}</div>
                    <div className="text-sm text-muted-foreground">{pack.perSession}</div>
                  </div>

                  <ul className="space-y-3">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={pack.popular ? "w-full" : "w-full"} 
                    variant={pack.popular ? "default" : "outline"}
                  >
                    Purchase Pack
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Memberships;
