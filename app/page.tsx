"use client";

import NavbarSection from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import TimelineSection from "@/components/TimelineSection";
import SpeakersSection from "@/components/SpeakersSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarSection />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <TimelineSection />
      <SpeakersSection />
      <GallerySection />
      <Footer />
    </div>
  );
}