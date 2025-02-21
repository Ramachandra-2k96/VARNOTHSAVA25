import React from 'react';
import { Code2, Palette, Brain, Gamepad2 } from 'lucide-react';
import { EventCard } from './ui/EventCard';
import { motion } from 'framer-motion';

export default function EventsSection() {
  const events = [
    {
      title: 'Tech Events',
      description: 'Join exciting hackathons and coding challenges to showcase your technical prowess and build innovative solutions.',
      icon: Code2,
      delay: 100,
      slug: 'tech'
    },
    {
      title: 'Cultural Events',
      description: 'Express yourself through dance, drama, and art in our vibrant cultural showcases that celebrate diversity.',
      icon: Palette,
      delay: 200,
      slug: 'cultural'
    },
    {
      title: 'General Events',
      description: 'Engage in stimulating quizzes, debates, and public speaking competitions to sharpen your intellectual abilities.',
      icon: Brain,
      delay: 300,
      slug: 'general'
    },
    {
      title: 'Gaming Events',
      description: 'Compete in thrilling e-sports tournaments and LAN gaming championships to prove your gaming mastery.',
      icon: Gamepad2,
      delay: 400,
      slug: 'gaming'
    }
  ];

  return (
    <section className="relative min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full animate-pulse opacity-30 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_30%)]" />
        
        {/* Animated grid lines */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `linear-gradient(to right, rgba(139,92,246,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(139,92,246,0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px',
               mask: 'radial-gradient(circle at center, transparent 30%, black)'
             }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 
                       bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 
                       bg-clip-text text-transparent
                       [text-shadow:0_0_30px_rgba(139,92,246,0.3)]">
            Competitions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover and participate in our diverse range of events designed to challenge,
            inspire, and bring out the best in you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}