import { ArrowRight, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-recovery-center.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern wellness recovery center with ice baths and recovery equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Advanced Recovery
              <span className="block text-transparent bg-gradient-accent bg-clip-text">
                Technology Center
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Experience cutting-edge wellness equipment including ice baths, compression therapy, 
              red light saunas, and percussion massage for optimal recovery and performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="btn-accent h-14 px-8 text-lg">
                Book Session
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="btn-ghost-wellness h-14 px-8 text-lg">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm lg:text-base text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-sm lg:text-base text-muted-foreground">Recovery Modalities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm lg:text-base text-muted-foreground">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-coral/10 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-calm-blue/10 rounded-full animate-float hidden lg:block" style={{animationDelay: '1s'}}></div>
    </section>
  );
};

export default Hero;