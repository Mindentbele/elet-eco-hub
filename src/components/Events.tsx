import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { siteData, defaultEvents, type EventItem } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    const saved = siteData.getEvents();
    setEvents(saved.length > 0 ? saved : defaultEvents);
  }, []);

  return (
    <section id="events" className="py-20 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Eseményeink</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Csatlakozz programjainkhoz, ahol együtt tanulunk, dolgozunk és építjük közösségünket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-organic transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{event.image}</div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      {event.participants} résztvevő
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground"><Calendar className="h-4 w-4 mr-2 text-primary" />{event.date}</div>
                  <div className="flex items-center text-sm text-muted-foreground"><Clock className="h-4 w-4 mr-2 text-primary" />{event.time}</div>
                  <div className="flex items-center text-sm text-muted-foreground"><MapPin className="h-4 w-4 mr-2 text-primary" />{event.location}</div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Jelentkezés</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
