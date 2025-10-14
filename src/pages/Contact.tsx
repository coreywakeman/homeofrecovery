import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-wellness">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="wellness-card">
              <CardContent className="p-8">
                <h2 className="font-serif text-3xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="John Smith" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number (Optional)
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="0400 000 000" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..." 
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  
                  <Button size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="wellness-card">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Mail className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-xl font-semibold mb-2">Email Us</h3>
                      <a 
                        href="mailto:info@homeofrecovery.au" 
                        className="text-primary hover:underline"
                      >
                        info@homeofrecovery.au
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="wellness-card">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-xl font-semibold mb-2">Location</h3>
                      <p className="text-muted-foreground">
                        Dubbo, NSW<br />
                        Australia
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="wellness-card">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-xl font-semibold mb-2">Opening Hours</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="font-medium">6am - 8pm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span className="font-medium">7am - 6pm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span className="font-medium">8am - 4pm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="wellness-card bg-gradient-accent border-none">
                <CardContent className="p-8 text-cream">
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    Ready to Start Your Recovery Journey?
                  </h3>
                  <p className="mb-6 text-cream/90">
                    Book your first session today and experience the difference
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full bg-cream text-walnut hover:bg-cream/90"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
