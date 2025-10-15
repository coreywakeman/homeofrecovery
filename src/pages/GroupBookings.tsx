import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Mail, Clock, Check } from "lucide-react";
import heroRecovery from "@/assets/hero-recovery-center.jpg";

const GroupBookings = () => {
  const occasions = [
    "Team building events",
    "Sports teams recovery sessions",
    "Corporate wellness days",
    "Birthday celebrations",
    "Hens & bucks parties",
    "Friends & family gatherings"
  ];

  const included = [
    "Exclusive facility access",
    "All recovery modalities",
    "Private changing rooms",
    "Refreshments provided",
    "Flexible timing",
    "Customizable packages"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroRecovery})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-walnut/80 to-walnut/60" />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-cream">
          <Users className="w-16 h-16 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Recover Together
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Private group bookings for teams, friends, and special occasions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-6">
              Exclusive Facility Access
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Book exclusive access to our entire facility for your team, friends, or sports group. 
              Whether it's a post-game recovery session, corporate wellness event, or a unique celebration, 
              we'll create the perfect recovery experience for your group.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="wellness-card">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-heading text-2xl font-semibold mb-4">
                  Perfect For
                </h3>
                <ul className="space-y-3">
                  {occasions.map((occasion) => (
                    <li key={occasion} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{occasion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="wellness-card">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-heading text-2xl font-semibold mb-4">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <Card className="wellness-card max-w-3xl mx-auto overflow-hidden border-2 border-primary/20">
            <div className="bg-gradient-accent p-6 sm:p-8 md:p-12 text-center">
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-cream" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-3">
                Let's Plan Your Session
              </h3>
              <p className="text-cream/90 text-base sm:text-lg mb-6 px-2">
                Get in touch to discuss availability, pricing, and customize your group experience
              </p>
              <Button 
                size="lg"
                className="bg-cream text-walnut hover:bg-cream/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto break-all sm:break-normal"
                asChild
              >
                <a href="mailto:info@homeofrecovery.au" className="inline-flex items-center justify-center">
                  <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">info@homeofrecovery.au</span>
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GroupBookings;
