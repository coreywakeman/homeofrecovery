import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  useEffect(() => {
    // Disable scroll on homepage for full-screen experience
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Video with Gradient Overlay */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDuration: "800ms" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Wellness recovery center background video"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-walnut/60 via-walnut/40 to-transparent" />
      </div>

      {/* Minimal Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 pt-2 pb-4 flex items-start justify-between nav-fade-in">
        {/* Brand */}
        <Link to="/" className="logo-fade-in">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/95 hover:text-white/90 transition-colors">
            Home of Recovery
          </h1>
        </Link>

        {/* Nav Buttons */}
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 buttons-fade-in">
          <Button 
            variant="ghost"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-3 sm:px-4 md:px-6 min-h-[44px] touch-manipulation"
            asChild
          >
            <Link to="/memberships">Membership</Link>
          </Button>
          <Button 
            variant="ghost"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-3 sm:px-4 md:px-6 min-h-[44px] touch-manipulation"
            asChild
          >
            <Link to="/memberships#intro-offer">Intro Offer</Link>
          </Button>
        </div>
      </nav>

      {/* Centered Frosted Glass Card */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-3xl w-full card-fade-in">
          <div 
            className="backdrop-blur-[14px] bg-white/[0.08] border border-white/20 rounded-[24px] p-6 md:p-8 lg:p-10 text-center shadow-2xl"
            style={{
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)"
            }}
          >
            <h1 className="font-serif font-bold text-white/95 leading-tight tracking-wide mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Dubbo's destination for all things recovery and wellness
            </h1>
            <p className="font-body text-white/85 leading-relaxed max-w-2xl mx-auto mb-6 text-xs sm:text-sm md:text-base">
              Home of Recovery is Dubbo's first dedicated recovery and wellness facility, designed to support both physical and mental wellbeing through industry-leading recovery services.
            </p>
            
            {/* Call to Action Button */}
            <div className="flex justify-center mt-4">
              <Button 
                variant="ghost"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-xl px-6 py-4 text-base font-semibold min-h-[44px] touch-manipulation"
                asChild
              >
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
