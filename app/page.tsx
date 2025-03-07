"use client";

import NavbarSection from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import TimelineSection from "@/components/TimelineSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import WebsiteReveal from "@/components/SplashScreen"; 
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* <WebsiteReveal/> */}
      <NavbarSection />
      <HeroSection />
      <EventsSection />
      <TimelineSection />
      <GallerySection />
      <Footer />
    </div>
  );
}