import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemberOfferBanner from "@/components/MemberOfferBanner";
import { Check, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Memberships = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to intro offer section if hash is present
    if (window.location.hash === '#intro-offer') {
      setTimeout(() => {
        const element = document.getElementById('intro-offer');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handlePurchaseClick = () => {
    toast({
      title: "Coming Soon!",
      description: "Membership purchase will be available soon. Contact us at info@homeofrecovery.au for details.",
    });
  };

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
      <MemberOfferBanner />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-wellness">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Memberships & Offers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Invest in your wellbeing with flexible membership options designed for your lifestyle
          </p>
        </div>
      </section>

      {/* Unlimited Membership */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto max-w-5xl">
          <Card className="wellness-card shadow-wellness overflow-hidden border-primary/20">
            <div className="bg-gradient-accent text-cream p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <h2 className="font-serif text-4xl font-bold">Unlimited Recovery</h2>
              <p className="text-cream/90 mt-2 text-lg">Transform your health with unlimited access</p>
            </div>
            
            <CardContent className="p-8 md:p-12 bg-background">
              <div className="text-center mb-10">
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-6xl font-bold text-primary">$39</span>
                  <span className="text-2xl text-muted-foreground font-medium">/week</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Recovery only works when it becomes part of your routine
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">Unlimited Access</h4>
                    <p className="text-sm text-muted-foreground">All services, unlimited sessions every week</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">Pause Anytime</h4>
                    <p className="text-sm text-muted-foreground">Life happens, we understand — pause when needed</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">Priority Booking</h4>
                    <p className="text-sm text-muted-foreground">Reserve your preferred times ahead of others</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">Guest Privileges</h4>
                    <p className="text-sm text-muted-foreground">Bring a friend at exclusive member rates</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg py-6 bg-primary hover:bg-primary/90" onClick={handlePurchaseClick}>
                Become a Member
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Intro Offer */}
      <section id="intro-offer" className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto max-w-4xl">
          <Card className="wellness-card shadow-wellness border-primary/20">
            <CardHeader className="text-center pb-8 pt-8">
              <Badge className="w-fit mx-auto mb-4 bg-primary hover:bg-primary text-primary-foreground px-4 py-1.5 text-sm">
                New Members Only
              </Badge>
              <CardTitle className="font-serif text-4xl md:text-5xl mb-4 text-foreground">
                Intro Offer — $99
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Experience everything our facility offers for 2 full weeks
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8 pb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base">Unlimited access to all premium recovery services for 2 weeks</span>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base">Experience infrared sauna, compression therapy, and contrast therapy</span>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base">No lock-in contracts or ongoing commitment required</span>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg py-6 bg-primary hover:bg-primary/90" onClick={handlePurchaseClick}>
                Claim Your Intro Offer
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Session Packs */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Session Packs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prefer flexibility? Choose from our session packs and use them at your own pace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packs.map((pack) => (
              <Card 
                key={pack.name} 
                className={`wellness-card shadow-wellness transition-all duration-300 hover:shadow-xl ${
                  pack.popular ? 'border-2 border-primary' : 'border-primary/20'
                }`}
              >
                <CardHeader className="pb-6">
                  {pack.popular && (
                    <Badge className="w-fit mb-4 bg-primary hover:bg-primary text-primary-foreground px-4 py-1.5">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="font-serif text-2xl md:text-3xl mb-3 text-foreground">{pack.name}</CardTitle>
                  <CardDescription className="text-base">{pack.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{pack.price}</div>
                    <div className="text-sm text-muted-foreground font-medium">{pack.perSession}</div>
                  </div>

                  <ul className="space-y-3">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={pack.popular ? "default" : "outline"}
                    onClick={handlePurchaseClick}
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
