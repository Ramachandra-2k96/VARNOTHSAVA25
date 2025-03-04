"use client";

import NavbarSection from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import TimelineSection from "@/components/TimelineSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/SplashScreen";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <IntroAnimation/>
      <NavbarSection />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <TimelineSection />
      <GallerySection />
      <Footer />
    </div>
  );
}