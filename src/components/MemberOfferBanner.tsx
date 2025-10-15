const MemberOfferBanner = () => {
  const offers = [
    "Members Save 20% on All Services",
    "Unlimited Monthly Access for $199",
    "Join Today & Get Your First Session Free",
    "Exclusive Member-Only Benefits",
    "Premium Recovery at Member Prices",
    "Flexible Membership Plans Available"
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-accent py-3 border-b border-cream/20">
      <div className="animate-marquee whitespace-nowrap">
        <div className="inline-flex items-center gap-12">
          {[...offers, ...offers].map((offer, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 text-cream"
            >
              <span className="font-serif text-lg font-semibold">{offer}</span>
              <span className="text-cream/60">•</span>
            </span>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MemberOfferBanner;
