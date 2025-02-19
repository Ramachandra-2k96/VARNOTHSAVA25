import { Code, Palette, Users, Music } from "lucide-react";

const events = [
  { title: "Technical Events", icon: <Code />, description: "Hackathons, Coding Competitions, Tech Talks" },
  { title: "Cultural Events", icon: <Palette />, description: "Dance, Drama, Art Exhibitions" },
  { title: "Sports Events", icon: <Users />, description: "Cricket, Football, Athletics" },
  { title: "Musical Events", icon: <Music />, description: "Band Performances, Solo Singing" }
];

export default function EventsSection() {
  return (
    <section id="events" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Event Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">{event.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">{event.title}</h3>
              <p className="text-muted-foreground text-center">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}