import { Star, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CoachesSection = () => {
  const coaches = [
    {
      name: "Dr. Sarah Mitchell",
      specialty: "Physical Therapy & Recovery",
      experience: "12 years",
      rating: "4.9",
      bio: "Specialized in sports injury recovery and chronic pain management",
      credentials: "DPT, CSCS",
      avatar: "👩‍⚕️"
    },
    {
      name: "Marcus Chen",
      specialty: "Mindfulness & Meditation",
      experience: "8 years", 
      rating: "5.0",
      bio: "Certified meditation teacher with expertise in trauma-informed practices",
      credentials: "MBSR, NARM",
      avatar: "🧘‍♂️"
    },
    {
      name: "Elena Rodriguez",
      specialty: "Therapeutic Yoga",
      experience: "10 years",
      rating: "4.8",
      bio: "Integrative approach combining yoga therapy with modern rehabilitation",
      credentials: "RYT-500, IAYT",
      avatar: "🧘‍♀️"
    },
    {
      name: "James Thompson",
      specialty: "Strength & Conditioning",
      experience: "15 years",
      rating: "4.9",
      bio: "Former athlete specializing in functional movement and injury prevention",
      credentials: "NSCA-CSCS, FMS",
      avatar: "💪"
    }
  ];

  return (
    <section id="coaches" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Expert Guidance, Compassionate Care
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our team of certified professionals brings together years of experience in 
            rehabilitation, wellness, and holistic healing practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coaches.map((coach, index) => (
            <Card 
              key={coach.name}
              className="wellness-card text-center animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-coral/20 to-violet/20 rounded-full flex items-center justify-center text-3xl">
                  {coach.avatar}
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {coach.name}
                </h3>
                
                <p className="text-primary font-medium mb-3">
                  {coach.specialty}
                </p>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {coach.bio}
                </p>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    {coach.experience}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current text-coral" />
                    {coach.rating}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {coach.credentials}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Values */}
        <div className="bg-gradient-hero rounded-3xl p-8 lg:p-12 text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-coral" />
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Our Commitment to You
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every member of our team is dedicated to creating a safe, supportive environment 
            where healing happens naturally. We believe in treating the whole person, not just symptoms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;