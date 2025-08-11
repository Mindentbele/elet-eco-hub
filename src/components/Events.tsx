import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Őszi betakarítási nap",
      date: "2024. október 15.",
      time: "09:00 - 17:00",
      location: "Közösségi kert, Budakeszi",
      description: "Közös betakarítás, befőzés és téli készületek elkészítése. Családias hangulat, közös ebéd.",
      participants: 25,
      image: "🍂"
    },
    {
      id: 2,
      title: "Hagyományos kenyérsütő workshop",
      date: "2024. október 22.",
      time: "10:00 - 16:00",
      location: "Falusi ház, Szentendre",
      description: "Tanulj meg kovászos kenyeret sütni hagyományos módszerekkel. Receptekkel és mintákkal hazamehetsz.",
      participants: 15,
      image: "🍞"
    },
    {
      id: 3,
      title: "Természeti séta és gyógynövény gyűjtés",
      date: "2024. november 5.",
      time: "08:00 - 14:00",
      location: "Pilis hegység",
      description: "Szakvezetéssel ismerkedj meg a környék gyógynövényeivel és azok felhasználásával.",
      participants: 20,
      image: "🌿"
    },
    {
      id: 4,
      title: "Téli felkészülés workshop",
      date: "2024. november 12.",
      time: "09:00 - 15:00",
      location: "Közösségi ház, Gödöllő",
      description: "Készülj fel a télre! Tartósítás, fűtés, energiatakarékosság és más hasznos tippek.",
      participants: 30,
      image: "❄️"
    }
  ];

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Eseményeink
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Csatlakozz programjainkhoz, ahol együtt tanulunk, dolgozunk és építjük közösségünket. 
            Minden esemény nyitott minden érdeklődő számára.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-organic transition-all duration-300">
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
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {event.location}
                  </div>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Jelentkezés
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Összes esemény megtekintése
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;