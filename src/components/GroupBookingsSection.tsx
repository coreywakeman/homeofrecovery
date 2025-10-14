import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail } from "lucide-react";

const GroupBookingsSection = () => {
  return (
    <section id="group-bookings" className="py-20 bg-gradient-wellness">
      <div className="container px-4 mx-auto">
        <Card className="wellness-card max-w-4xl mx-auto overflow-hidden border-2 border-primary/20">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-gradient-accent p-12 flex items-center justify-center">
              <Users className="h-32 w-32 text-cream" />
            </div>
            <div className="p-8 md:p-12">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-serif text-3xl md:text-4xl mb-4">
                  Recover Together
                </CardTitle>
                <CardDescription className="text-lg text-foreground">
                  Private Group Bookings Available
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Book exclusive access to our entire facility for your team, friends, or sports group. 
                  To arrange your session, email us at{" "}
                  <a 
                    href="mailto:info@homeofrecovery.au" 
                    className="text-primary font-semibold hover:underline"
                  >
                    info@homeofrecovery.au
                  </a>
                </p>
                <Button 
                  className="w-full text-lg py-6 rounded-xl" 
                  size="lg"
                  asChild
                >
                  <a href="mailto:info@homeofrecovery.au">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Us for Group Bookings
                  </a>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default GroupBookingsSection;
