"use client"

import { useEffect } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { Trophy, Award, Users } from "lucide-react"
import { useInView } from "react-intersection-observer"

export default function AboutSection() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [0, 1])
  const scale = useTransform(scrollY, [0, 300], [0.8, 1])

  const stats = [
    {
      icon: Trophy,
      title: "₹2,00,000",
      description: "Total Prize Pool",
      gradient: "from-rose-500 to-orange-500"
    },
    {
      icon: Award, 
      title: "30+ Events",
      description: "Tech & Cultural",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Industry Experts",
      description: "Professional Judges",
      gradient: "from-cyan-500 to-blue-500"
    },
  ]

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

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Improved animated gradient background with better blending */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-800/20 via-transparent to-transparent animate-pulse-slow delay-2000"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent animate-pulse-slow delay-4000"></div>
      </div>

      {/* Enhanced floating particles with different sizes */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'h-1 w-1 bg-white/80' : i % 3 === 1 ? 'h-2 w-2 bg-purple-400/50' : 'h-3 w-3 bg-blue-400/30'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 30 - 20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [0, Math.random() * 0.5 + 0.5, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Content with improved responsive layout */}
      <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-center mb-12 sm:mb-20"
        >
          {/* Responsive title with better scaling */}
          <h1 className="text-4xl sm:text-4xl md:text-8xl lg:text-9xl font-black tracking-tighter">
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              VARNOTHSAVA
            </motion.span>
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white ml-1 sm:ml-2 inline-block">25</span>
          </h1>
        </motion.div>

        {/* Improved cards layout with better spacing for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.2 
                  } 
                }
              }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-xl opacity-50 blur-sm group-hover:opacity-100 group-hover:blur transition duration-300`} />
              <div className="relative bg-black/90 backdrop-blur-sm rounded-lg p-6 sm:p-8 h-full border border-white/10 flex flex-col items-center sm:items-start">
                <motion.div 
                  className="mb-4 sm:mb-6"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">{stat.title}</h3>
                <p className="text-gray-400 text-base sm:text-lg">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced call-to-action with better mobile spacing */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.5,
                delay: 0.6 
              } 
            }
          }}
          className="text-center mt-12 sm:mt-20"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Experience SMVITM's premier techno-cultural fest where innovation meets creativity. Join us for an unforgettable celebration of talent and technology.
          </p>
          
          {/* Enhanced button with animation and glow effect */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px 0 rgba(168, 85, 247, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 sm:mt-10 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg sm:text-xl font-bold text-white relative overflow-hidden group"
          >
            <span className="relative z-10">Register Now</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.span 
              className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-0"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced animations with smoother transitions */}
      <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </motion.section>
  )
}