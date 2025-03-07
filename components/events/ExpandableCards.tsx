"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

type Event = {
  description: string;
  title: string;
  tag: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
};

type Tag = {
  id: string;
  name: string;
};

export default function EventCardDemo() {
  const [active, setActive] = useState<Event | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Filter events based on selected tag
  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.tag === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-emerald-400">Campus Events</h1>
      
      {/* Filter Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setFilter(tag.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              filter === tag.id
                ? "bg-emerald-500 text-gray-900"
                : "bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/70 border border-gray-800/30"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="flex absolute top-4 right-4 items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-full h-10 w-10 z-[110]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-[90vh] md:h-auto max-h-[90vh] flex flex-col bg-gray-900/70 backdrop-blur-md border border-gray-700/50 rounded-3xl overflow-hidden shadow-xl relative"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={400}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 lg:h-80 rounded-tr-3xl rounded-tl-3xl object-cover object-center"
                />
              </motion.div>

              <div className="flex flex-col overflow-hidden">
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.span
                      layoutId={`tag-${active.title}-${id}`}
                      className={`px-2 py-1 text-xs rounded-md ${
                        active.tag === "technical" 
                          ? "bg-blue-900/70 text-blue-200 backdrop-blur-sm" 
                          : active.tag === "cultural" 
                          ? "bg-purple-900/70 text-purple-200 backdrop-blur-sm"
                          : active.tag === "gaming"
                          ? "bg-red-900/70 text-red-200 backdrop-blur-sm"
                          : "bg-gray-800/70 text-gray-300 backdrop-blur-sm"
                      }`}
                    >
                      {active.tag.charAt(0).toUpperCase() + active.tag.slice(1)}
                    </motion.span>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-xl mt-2 text-white"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-gray-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-emerald-500 text-gray-900 hover:bg-emerald-400 transition-colors"
                  >
                    Register
                  </motion.a>
                </div>
                
                <div className="px-4 pb-4 flex-grow overflow-auto" style={{ maxHeight: "calc(90vh - 60px - 160px)" }}>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-300 text-sm pb-6"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
                
                {/* Mobile-friendly back button at bottom */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActive(null)}
                  className="md:hidden sticky bottom-0 w-full py-3 bg-gray-800 text-white text-center font-medium"
                >
                  Back to Events
                </motion.button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <ul className="max-w-2xl mx-auto w-full gap-4 grid grid-cols-1">
        {currentEvents.map((event) => (
          <motion.div
            layoutId={`card-${event.title}-${id}`}
            key={`card-${event.title}-${id}`}
            onClick={() => setActive(event)}
            className="p-4 flex flex-col md:flex-row justify-between items-center bg-gray-900/40 hover:bg-gray-800/60 backdrop-blur-md border border-gray-800/30 rounded-xl cursor-pointer transition-colors shadow-lg"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${event.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={event.src}
                  alt={event.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="">
                <motion.span
                  layoutId={`tag-${event.title}-${id}`}
                  className={`inline-block px-2 py-1 text-xs rounded-md mb-2 ${
                    event.tag === "technical" 
                      ? "bg-blue-900/70 text-blue-200 backdrop-blur-sm" 
                      : event.tag === "cultural" 
                      ? "bg-purple-900/70 text-purple-200 backdrop-blur-sm"
                      : event.tag === "gaming"
                      ? "bg-red-900/70 text-red-200 backdrop-blur-sm"
                      : "bg-gray-800/70 text-gray-300 backdrop-blur-sm"
                  }`}
                >
                  {event.tag.charAt(0).toUpperCase() + event.tag.slice(1)}
                </motion.span>
                <motion.h3
                  layoutId={`title-${event.title}-${id}`}
                  className="font-medium text-white text-center md:text-left"
                >
                  {event.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${event.description}-${id}`}
                  className="text-gray-400 text-center md:text-left"
                >
                  {event.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${event.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-800/70 backdrop-blur-sm hover:bg-emerald-500 hover:text-gray-900 text-gray-300 mt-4 md:mt-0 transition-colors border border-gray-700/30"
            >
              Know More
            </motion.button>
          </motion.div>
        ))}
      </ul>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-800/30 text-gray-500 cursor-not-allowed"
                : "bg-gray-800/70 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === page
                    ? "bg-emerald-500 text-gray-900"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-800/30 text-gray-500 cursor-not-allowed"
                : "bg-gray-800/70 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-gray-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// Navigation tags
const tags: Tag[] = [
  { id: "all", name: "All Events" },
  { id: "technical", name: "Technical" },
  { id: "cultural", name: "Cultural" },
  { id: "gaming", name: "Gaming" },
  { id: "workshop", name: "Workshops" }
];

// Event data
const events: Event[] = [
  {
    description: "Annual Coding Competition",
    title: "CodeQuest 2025",
    tag: "technical",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
    ctaText: "Know More",
    ctaLink: "#register",
    content: () => {
      return (
        <div>
          <p>
            <strong>Date:</strong> April 15, 2025
          </p>
          <p>
            <strong>Location:</strong> Main Auditorium
          </p>
          <p>
            <strong>Time:</strong> 10:00 AM - 6:00 PM
          </p>
          <br />
          <p>
            CodeQuest is our flagship annual coding competition bringing together
            the brightest programming minds on campus. Participants will tackle
            complex algorithmic challenges and real-world problems in a timed
            environment.
          </p>
          <br />
          <p>
            This year's competition features three difficulty tiers to accommodate
            everyone from beginners to advanced coders. Valuable prizes and
            internship opportunities await the winners!
          </p>
          <p>
            Registration closes on April 10th. Team size: 1-3 members.
          </p>
          <br />
          <p>
            <strong>Competition Format:</strong>
          </p>
          <p>
            The contest will run for 6 hours with challenges across algorithms, 
            data structures, machine learning, and system design. All solutions 
            must be submitted through our online platform.
          </p>
          <br />
          <p>
            <strong>Prizes:</strong>
          </p>
          <p>
            First Place: $1000 + Internship Opportunity<br />
            Second Place: $500 + Tech Gadgets<br />
            Third Place: $250 + Swag Pack<br />
            Best Freshman Team: $200
          </p>
        </div>
      );
    },
  },
  {
    description: "Annual Cultural Fest",
    title: "Rhythmix 2025",
    tag: "cultural",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070",
    ctaText: "Know More",
    ctaLink: "#register",
    content: () => {
      return (
        <div>
          <p>
            <strong>Date:</strong> March 25-27, 2025
          </p>
          <p>
            <strong>Location:</strong> Campus Grounds
          </p>
          <p>
            <strong>Time:</strong> Various
          </p>
          <br />
          <p>
            Rhythmix is our three-day cultural extravaganza featuring music,
            dance, theater, and art from talents across the region. This year's
            theme is "Fusion Horizons" - celebrating the blend of traditional
            and contemporary cultural expressions.
          </p>
          <br />
          <p>
            Highlights include the Battle of Bands, Dance-Off competition, 
            Fashion Show, and our famous Celebrity Night featuring top artists
            from the music industry (to be announced).
          </p>
          <p>
            Early bird registrations are now open with special discounts for
            students.
          </p>
          <br />
          <p>
            <strong>Event Schedule:</strong>
          </p>
          <p>
            Day 1: Opening Ceremony, Art Exhibition, Theater Performances<br />
            Day 2: Dance Competitions, Fashion Show, Poetry Slam<br />
            Day 3: Battle of Bands, Celebrity Performance, Awards Ceremony
          </p>
          <br />
          <p>
            <strong>Registration Details:</strong>
          </p>
          <p>
            Early Bird (Before Feb 28): $15<br />
            Regular (Mar 1-20): $25<br />
            At Door: $35<br />
            Festival Pass (All Events): $50
          </p>
        </div>
      );
    },
  },
  {
    description: "Gaming Tournament",
    title: "GamersClash",
    tag: "gaming",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
    ctaText: "Know More",
    ctaLink: "#register",
    content: () => {
      return (
        <div>
          <p>
            <strong>Date:</strong> May 5-6, 2025
          </p>
          <p>
            <strong>Location:</strong> Computer Science Building
          </p>
          <p>
            <strong>Time:</strong> 9:00 AM - 9:00 PM
          </p>
          <br />
          <p>
            GamersClash brings together gaming enthusiasts for two days of
            intense competition across multiple platforms and genres. This year's
            featured tournaments include Valorant, CS:GO, FIFA 25, and Mobile
            Legends.
          </p>
          <br />
          <p>
            Our state-of-the-art gaming setup features high-end PCs and consoles,
            ensuring the best experience for competitors and spectators alike.
            Total prize pool: $5,000.
          </p>
          <p>
            Both team and individual registrations are welcome. Equipment will be
            provided, but participants may bring their own peripherals.
          </p>
          <br />
          <p>
            <strong>Tournament Schedule:</strong>
          </p>
          <p>
            Day 1: Qualifiers and Group Stages for all games<br />
            Day 2: Semifinals and Finals, Award Ceremony
          </p>
          <br />
          <p>
            <strong>Registration Fees:</strong>
          </p>
          <p>
            PC Games (Valorant, CS:GO): $25 per team<br />
            Console Games (FIFA 25): $15 per player<br />
            Mobile Games: $10 per player<br />
            Spectator Pass: $5
          </p>
        </div>
      );
    },
  },
  {
    description: "AI and Machine Learning",
    title: "TechSummit",
    tag: "technical",
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070",
    ctaText: "Know More",
    ctaLink: "#register",
    content: () => {
      return (
        <div>
          <p>
            <strong>Date:</strong> June 12, 2025
          </p>
          <p>
            <strong>Location:</strong> Engineering Block
          </p>
          <p>
            <strong>Time:</strong> 11:00 AM - 4:00 PM
          </p>
          <br />
          <p>
            TechSummit is our premier technology conference focusing on emerging
            trends in AI, machine learning, and data science. This year's event
            features keynote speakers from leading tech companies and research
            institutions.
          </p>
          <br />
          <p>
            The summit includes hands-on workshops, panel discussions, and 
            networking opportunities with industry professionals. Special
            sessions will cover generative AI applications, ethical considerations,
            and career opportunities in the field.
          </p>
          <p>
            Limited seats available. Early registration recommended.
          </p>
          <br />
          <p>
            <strong>Program Highlights:</strong>
          </p>
          <p>
            Keynote Address: "The Future of AI in Society" - Dr. Emily Chen, MIT<br />
            Panel Discussion: "Ethical AI Development in Industry"<br />
            Workshop: "Building Your First Large Language Model"<br />
            Research Showcase: Student Projects and Innovations
          </p>
          <br />
          <p>
            <strong>Registration:</strong>
          </p>
          <p>
            Students: $25<br />
            Faculty: $40<br />
            Industry Professionals: $75<br />
            Virtual Attendance: $15
          </p>
        </div>
      );
    },
  },
  {
    description: "Musical Evening",
    title: "Melodyverse",
    tag: "cultural",
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070",
    ctaText: "Know More",
    ctaLink: "#register",
    content: () => {
      return (
        <div>
          <p>
            <strong>Date:</strong> April 30, 2025
          </p>
          <p>
            <strong>Location:</strong> Open Air Amphitheater
          </p>
          <p>
            <strong>Time:</strong> 6:30 PM - 10:00 PM
          </p>
          <br />
          <p>
            Melodyverse is an enchanting musical evening showcasing the diverse
            talents of our campus musicians. From classical to contemporary,
            experience a journey through various genres and musical traditions.
          </p>
          <br />
          <p>
            This year's event features solo performances, band showcases, and
            collaborative pieces that push the boundaries of musical expression.
            Special guest performers include alumni who have gone on to professional
            music careers.
          </p>
          <p>
            Entry is free for all students with valid ID cards. Limited seating
            available on first-come, first-served basis.
          </p>
          <br />
          <p>
            <strong>Performance Schedule:</strong>
          </p>
          <p>
            6:30 PM - 7:00 PM: Classical Music Ensemble<br />
            7:00 PM - 7:30 PM: Acoustic Solos<br />
            7:30 PM - 8:15 PM: Jazz Ensemble<br />
            8:15 PM - 8:30 PM: Intermission<br />
            8:30 PM - 9:15 PM: Rock and Pop Bands<br />
            9:15 PM - 10:00 PM: Alumni Special Performance
          </p>
          <br />
          <p>
            <strong>Additional Information:</strong><br />
            Light refreshments will be available for purchase.<br />
            Photography and recording are permitted for personal use only.
          </p>
        </div>
      );
    },
  },
  {
    description: "Data Science Workshop",
    title: "DataXplore",
    tag: "workshop",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    ctaText: "Know More",
    ctaLink: "#register",
    content: () => {
      return (
        <div>
          <p>
            <strong>Date:</strong> May 20, 2025
          </p>
          <p>
            <strong>Location:</strong> Data Science Lab
          </p>
          <p>
            <strong>Time:</strong> 10:00 AM - 5:00 PM
          </p>
          <br />
          <p>
            DataXplore is a hands-on workshop designed to introduce students to
            practical data science techniques and tools. The workshop covers data
            collection, cleaning, analysis, and visualization using Python and
            popular libraries.
          </p>
          <br />
          <p>
            Participants will work with real-world datasets to solve actual
            problems. By the end of the workshop, you'll have built a complete
            data science project that you can add to your portfolio.
          </p>
          <p>
            Basic programming knowledge is required. Laptops will be provided,
            but you're welcome to bring your own.
          </p>
          <br />
          <p>
            <strong>Workshop Modules:</strong>
          </p>
          <p>
            Module 1: Data Collection and Cleaning<br />
            Module 2: Exploratory Data Analysis<br />
            Module 3: Machine Learning Basics<br />
            Module 4: Data Visualization and Storytelling
          </p>
          <br />
          <p>
            <strong>Registration:</strong>
          </p>
          <p>
            Early Registration (Before May 10): $30<br />
            Standard Registration: $45<br />
            Includes lunch, refreshments, and workshop materials
          </p>
        </div>
      );
    },
  },
  {
    description: "Web Development Bootcamp",
    title: "WebCraft",
    tag: "workshop",
    src: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070",
    ctaText: "Know More",
    ctaLink: "#register",
    content: () => {
      return (
        <div>
          <p>
            <strong>Date:</strong> June 5-7, 2025
          </p>
          <p>
            <strong>Location:</strong> Computer Lab 2
          </p>
          <p>
            <strong>Time:</strong> 9:00 AM - 4:00 PM
          </p>
          <br />
          <p>
            WebCraft is an intensive three-day bootcamp that takes you from HTML
            basics to building modern, responsive web applications. Learn from
            industry professionals and create a portfolio-ready project.
          </p>
          <br />
          <p>
            The bootcamp covers HTML, CSS, JavaScript, and React, with a focus on
            practical, hands-on learning. No prior experience is required, but
            basic computer literacy is needed.
          </p>
          <p>
            Limited to 30 participants to ensure personalized attention.
          </p>
          <br />
          <p>
            <strong>Daily Schedule:</strong>
          </p>
          <p>
            Day 1: HTML/CSS Fundamentals and Responsive Design<br />
            Day 2: JavaScript and DOM Manipulation<br />
            Day 3: React Basics and Final Project Development
          </p>
          <br />
          <p>
            <strong>Registration:</strong>
          </p>
          <p>
            Students: $85<br />
            Non-Students: $120<br />
            Includes lunch, refreshments, and all learning materials
          </p>
        </div>
      );
    },
  },
];