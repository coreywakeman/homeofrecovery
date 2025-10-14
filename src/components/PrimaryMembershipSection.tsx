import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const PrimaryMembershipSection = () => {
  return (
    <section id="memberships" className="py-20 bg-gradient-wellness">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Start Your Recovery Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the membership that fits your lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Unlimited Membership - Featured */}
          <Card className="wellness-card border-2 border-primary relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Star className="h-6 w-6 fill-primary text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="font-serif text-3xl mb-2">Unlimited Recovery</CardTitle>
              <CardDescription className="text-lg">
                <span className="text-4xl font-bold text-primary font-serif">$39</span>
                <span className="text-muted-foreground">/week</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Recovery only works when it becomes part of your routine. By coming regularly, you'll reduce fatigue, feel sharper, perform better, and support your long-term health. With a membership, you're not just visiting, you're committing to giving your body and mind the care they deserve, week after week.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Access to all services</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Pause anytime</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg py-6 rounded-xl" size="lg">
                Become a Member
              </Button>
            </CardFooter>
          </Card>

          {/* Intro Offer */}
          <Card className="wellness-card border border-border">
            <CardHeader>
              <CardTitle className="font-serif text-3xl mb-2">Intro Offer</CardTitle>
              <CardDescription className="text-lg">
                <span className="text-4xl font-bold text-foreground font-serif">$99</span>
                <span className="text-muted-foreground"> for 2 weeks</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Try everything our facility offers for 2 full weeks
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited access to all services for 2 weeks</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Infrared Sauna sessions</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Compression Therapy</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Contrast Therapy</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg py-6 rounded-xl" size="lg" variant="outline">
                Claim Your Intro Offer
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Link to Packs */}
        <div className="text-center">
          <Button variant="link" className="text-lg text-primary" asChild>
            <a href="#packs">Check out our packs →</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PrimaryMembershipSection;
