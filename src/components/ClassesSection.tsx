import { Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ClassesSection = () => {
  const classes = [
    {
      name: "Recovery Yoga",
      description: "Gentle yoga designed for injury recovery and mobility enhancement",
      duration: "60 min",
      capacity: "12 people",
      rating: "4.9",
      image: "🧘‍♀️",
      color: "from-coral/20 to-violet/20"
    },
    {
      name: "Strength & Conditioning",
      description: "Build functional strength with personalized modifications",
      duration: "45 min", 
      capacity: "8 people",
      rating: "4.8",
      image: "💪",
      color: "from-ember/20 to-calm-blue/20"
    },
    {
      name: "Mindfulness Meditation",
      description: "Guided meditation for mental clarity and stress relief",
      duration: "30 min",
      capacity: "15 people", 
      rating: "5.0",
      image: "🧠",
      color: "from-calm-blue/20 to-violet/20"
    },
    {
      name: "Physical Therapy",
      description: "One-on-one sessions with licensed physical therapists",
      duration: "50 min",
      capacity: "1 person",
      rating: "4.9",
      image: "🏥",
      color: "from-taupe/20 to-coral/20"
    },
    {
      name: "Group Wellness",
      description: "Supportive group sessions focusing on holistic healing",
      duration: "75 min",
      capacity: "10 people",
      rating: "4.7",
      image: "👥",
      color: "from-violet/20 to-ember/20"
    },
    {
      name: "Breathwork",
      description: "Therapeutic breathing techniques for anxiety and trauma",
      duration: "45 min",
      capacity: "12 people",
      rating: "4.8",
      image: "🌬️",
      color: "from-calm-blue/20 to-coral/20"
    }
  ];

  return (
    <section id="classes" className="py-20 lg:py-32 bg-gradient-wellness">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Healing Through Movement
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our diverse range of classes combines traditional healing practices with modern recovery science, 
            designed to support every stage of your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <Card 
              key={classItem.name} 
              className="wellness-card group animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${classItem.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {classItem.image}
                </div>
                <CardTitle className="font-heading text-xl text-foreground">
                  {classItem.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {classItem.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {classItem.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {classItem.capacity}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current text-coral" />
                    {classItem.rating}
                  </div>
                </div>
                
                <Button className="w-full btn-wellness">
                  Book Class
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-ghost-wellness">
            View Full Timetable
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;