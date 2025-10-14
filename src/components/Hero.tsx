import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-wellness.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Dubbo's destination for all things recovery and wellness
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-cream/90 max-w-3xl mx-auto leading-relaxed">
            Home of Recovery is Dubbo's first dedicated recovery and wellness facility, designed to support both physical and mental wellbeing through industry-leading recovery services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-cream text-walnut hover:bg-cream/90 text-lg px-8 py-6 rounded-xl font-semibold w-full sm:w-auto"
              asChild
            >
              <a href="#memberships">Become a Member</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-cream text-cream hover:bg-cream/10 text-lg px-8 py-6 rounded-xl font-semibold w-full sm:w-auto"
              asChild
            >
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold mb-2 font-serif">500+</div>
            <div className="text-cream/80">Happy Clients</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold mb-2 font-serif">3</div>
            <div className="text-cream/80">Premium Services</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold mb-2 font-serif">Dubbo</div>
            <div className="text-cream/80">Locations</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
