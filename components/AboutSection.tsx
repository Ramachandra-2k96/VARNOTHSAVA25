"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Trophy, Award, Users } from "lucide-react"
import { useInView } from "react-intersection-observer"

export default function AboutSection() {
  const stats = [
    {
      icon: Trophy,
      title: "2 Lakh Cash Prize",
      description: "Get your talent recognized here and win high cash prizes.",
    },
    {
      icon: Award,
      title: "30+ Competitions",
      description: "Competitions are held in each different categories to bring out the hidden talents in you.",
    },
    {
      icon: Users,
      title: "Professional Judges",
      description: "All the competitions are judged by highly qualified and experienced individuals.",
    },
  ]

  // Animation controls for scroll reveal
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  }

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Improved background with subtle texture */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(120,_81,_169,_0.3)_0%,_rgba(0,_0,_0,_0)_60%)]"></div>
      
      {/* Enhanced accent lines with better contrast */}
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent"></div>
      <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-600/30 to-transparent"></div>
      
      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${3 + Math.random() * 4}s infinite ${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10"
      >
        {/* Main Title - Enhanced with better gradient */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight inline-block">
            Varnothsava&apos;25
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Description Sections - Improved layout and typography */}
        <div className="space-y-6 max-w-3xl mx-auto mb-16 relative">
          {/* Subtle side decorations */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent hidden lg:block"></div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent hidden lg:block"></div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-100 text-center leading-relaxed"
          >
            "Varnothsava" has been the flagship intercollegiate techno-cultural fest of SMVITM. Through the years, it has been a great platform for students to participate, collaborate and compete with their peers, learning and enjoying in the process.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200 text-center leading-relaxed"
          >
            The perfect combination of technical and cultural events along with the vibrant enthusiasm of the participants creates a sportive environment.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-100 text-center leading-relaxed"
          >
            This year too, Varnothsava retains its charm and essence. With technical events testing and challenging the technical enthusiasts and the cultural events drawing in all the art lovers, Varnothsava surely provokes hidden talents and blends it all into a dynamic mix of varied hues.
          </motion.p>
        </div>

        {/* Stats Grid - Completely redesigned cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="relative group"
            >
              {/* Enhanced glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Redesigned card with improved styling */}
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-purple-500/10 rounded-xl p-8 h-full flex flex-col items-center text-center transition-all duration-300 group-hover:border-purple-500/30">
                {/* Icon container with better glow effect */}
                <div className="mb-5 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.1 }} 
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative bg-gray-800/80 p-4 rounded-full border border-purple-500/20"
                  >
                    <stat.icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                  </motion.div>
                </div>
                
                {/* Title with better gradient effect */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">{stat.title}</h3>
                
                {/* Description with improved readability */}
                <p className="text-gray-300 leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2); opacity: 0.7; }
        }
      `}</style>
    </section>
  )
}