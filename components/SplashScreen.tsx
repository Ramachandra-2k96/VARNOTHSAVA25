"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const IntroAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeline = [
      { step: 1, delay: 200 },    // First layer reveal
      { step: 2, delay: 200 },    // Second layer reveal
      { step: 3, delay: 200 },    // Third layer reveal
      { step: 4, delay: 1000 },   // Logo appearance
      { step: 5, delay: 1200 },   // Text animation
      { step: 6, delay: 1500 },   // Final transition
      { step: 7, delay: 800 }     // Complete
    ];
    
    let timeoutId: NodeJS.Timeout;
    
    const runTimeline = (index = 0) => {
      if (index < timeline.length) {
        timeoutId = setTimeout(() => {
          setCurrentStep(timeline[index].step);
          runTimeline(index + 1);
        }, timeline[index].delay);
      } else {
        setTimeout(() => setAnimationComplete(true), 1000);
      }
    };
    
    if (containerRef.current) {
      createParticles();
    }
    
    runTimeline();
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  const createParticles = () => {
    if (!containerRef.current) return;
    
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("div");
      
      // Random properties
      const size = Math.random() * 6 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = Math.random() * 10 + 10;
      const blur = Math.random() * 5;
      
      // Apply styles
      particle.className = "absolute rounded-full bg-white/30";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.filter = `blur(${blur}px)`;
      particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
      
      containerRef.current.appendChild(particle);
    }
  };

  return (
    <AnimatePresence>
      {!animationComplete && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-hidden bg-[#0A0A0A]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Background layers */}
          <div className="relative w-full h-full">
            {/* Layer 1 - First reveal */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.645, 0.045, 0.355, 1],
                delay: 0.2
              }}
              className="absolute inset-0 origin-right bg-[#0F0F0F]"
            />

            {/* Layer 2 - Second reveal */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.645, 0.045, 0.355, 1],
                delay: 0.4
              }}
              className="absolute inset-0 origin-right bg-[#141414]"
            />

            {/* Layer 3 - Final reveal */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.645, 0.045, 0.355, 1],
                delay: 0.6
              }}
              className="absolute inset-0 origin-right bg-[#1A1A1A]"
            />

            {/* Main content container */}
            <div className="relative w-full h-full bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]">
              {/* Animated grid background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2, delay: 1.5 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #333 1px, transparent 0)`,
                  backgroundSize: '50px 50px'
                }}
              />

              {/* Particle effect */}
              <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-40" />

              {/* Content wrapper */}
              <div className="relative h-full flex flex-col items-center justify-center">
                {/* Logo section with enhanced reveal */}
                <motion.div
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: currentStep >= 4 ? 1 : 0
                  }}
                  transition={{ 
                    duration: 1.8,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  className="mb-12 relative"
                >
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative">
                    {/* Logo background glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"
                    />
                    
                    {/* Logo container */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                      <div className="relative w-full h-full flex items-center justify-center p-8">
                        <Image 
                          src="https://th.bing.com/th/id/OIP.lZtG95GSzB8X9_q7vUnclAHaHK?rs=1&pid=ImgDetMain"
                          fill
                          className="object-contain rounded-full"
                          alt="Logo"
                          priority
                        />
                      </div>
                    </div>

                    {/* Animated rings */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 rounded-full border border-white/10"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Text reveal section */}
                <div className="overflow-hidden relative">
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ 
                      y: currentStep >= 5 ? 0 : 100
                    }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                    className="text-center"
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-widest">
                      {["WELCOME", "TO", "VARNOTHSAVA", "2025"].map((word, i) => (
                        <motion.span
                          key={word}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: currentStep >= 5 ? 1 : 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.1 * i + 0.5
                          }}
                          className={`inline-block mx-2 ${
                            i === 3 ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600" : "text-white/90"
                          }`}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h2>
                  </motion.div>
                </div>

                {/* Enhanced gradient line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentStep >= 5 ? 1 : 0 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-[1px] w-[280px] sm:w-[400px] md:w-[600px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12"
                />
              </div>

              {/* Final transition */}
              {currentStep >= 6 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.645, 0.045, 0.355, 1],
                  }}
                  className="absolute inset-0 origin-left bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]"
                />
              )}
            </div>
          </div>

          <style jsx global>{`
            @keyframes floatParticle {
              0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
              }
              20% {
                opacity: 0.15;
              }
              80% {
                opacity: 0.1;
              }
              100% {
                transform: translateY(-100vh) translateX(20px);
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;