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
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 pointer-events-none"></div>
      
      {/* Accent lines */}
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-6 sm:px-8 relative"
      >
        {/* Legacy Badge - Refined */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center mb-16"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-md"></div>
            <div className="relative bg-black rounded-full border border-white/5 px-6 py-2">
              <span className="text-white font-medium tracking-wide text-sm">Since 2014</span>
            </div>
          </div>
        </motion.div>

        {/* Main Title - Enhanced */}
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text leading-tight"
        >
          Varnothsava&apos;25
        </motion.h2>

        {/* Description Sections - Improved spacing and contrast */}
        <div className="space-y-6 max-w-3xl mx-auto mb-20">
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200 text-center leading-relaxed"
          >
            "Varnothsava" has been the flagship intercollegiate techno-cultural fest of SMVITM. Through the years, it has been a great platform for students to participate, collaborate and compete with their peers, learning and enjoying in the process.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 text-center leading-relaxed"
          >
            The perfect combination of technical and cultural events along with the vibrant enthusiasm of the participants creates a sportive environment.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200 text-center leading-relaxed"
          >
            This year too, Varnothsava retains its charm and essence. With technical events testing and challenging the technical enthusiasts and the cultural events drawing in all the art lovers, Varnothsava surely provokes hidden talents and blends it all into a dynamic mix of varied hues.
          </motion.p>
        </div>

        {/* Stats Grid - Modernized cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="relative group"
            >
              {/* Enhanced gradient blur effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Card with improved styling */}
              <div className="relative bg-black border border-white/10 rounded-2xl p-8 h-full group-hover:border-white/20 transition-colors duration-300">
                <div className="flex flex-col items-center text-center space-y-5">
                  {/* Icon container with subtle glow */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }} 
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="relative"
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Title with gradient accent */}
                  <h3 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">{stat.title}</h3>
                  
                  {/* Description with improved readability */}
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}