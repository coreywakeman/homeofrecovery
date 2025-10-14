import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-icebath.jpg";
import Logo from "@/components/Logo";

const Index = () => {
  useEffect(() => {
    // Disable scroll on homepage
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-fade-in"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          animationDuration: "800ms"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-walnut/60 via-walnut/40 to-transparent" />
      </div>

      {/* Minimal Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between animate-fade-in" style={{ animationDelay: "300ms", animationDuration: "600ms" }}>
        {/* Logo */}
        <Link to="/" className="opacity-0 animate-fade-in" style={{ animationDelay: "300ms", animationDuration: "600ms", animationFillMode: "forwards" }}>
          <Logo 
            variant="white"
            className="h-32 md:h-48 lg:h-56 w-auto hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Nav Buttons */}
        <div className="flex gap-3 md:gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "400ms", animationDuration: "600ms", animationFillMode: "forwards" }}>
          <Button 
            variant="ghost"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4 md:px-6"
            asChild
          >
            <Link to="/memberships">Membership</Link>
          </Button>
          <Button 
            variant="ghost"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4 md:px-6"
            asChild
          >
            <Link to="/memberships#intro-offer">Intro Offer</Link>
          </Button>
        </div>
      </nav>

      {/* Centered Frosted Glass Card */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div 
          className="max-w-5xl w-full opacity-0 animate-fade-in"
          style={{ 
            animationDelay: "100ms", 
            animationDuration: "800ms",
            animationFillMode: "forwards"
          }}
        >
          <div 
            className="backdrop-blur-[14px] bg-white/[0.08] border border-white/20 rounded-[24px] p-12 md:p-16 lg:p-20 text-center shadow-2xl"
            style={{
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)"
            }}
          >
            <h1 
              className="font-serif font-bold text-white/95 leading-tight tracking-wide mb-8"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "0.01em"
              }}
            >
              Dubbo's destination for all things recovery and wellness
            </h1>
            <p 
              className="font-body text-white/85 leading-relaxed max-w-3xl mx-auto"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                letterSpacing: "0.015em"
              }}
            >
              Home of Recovery is Dubbo's first dedicated recovery and wellness facility, designed to support both physical and mental wellbeing through industry-leading recovery services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
