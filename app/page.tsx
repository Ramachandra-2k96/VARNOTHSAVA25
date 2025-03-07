"use client";

import NavbarSection from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpandableCards from "@/components/events/ExpandableCards";
import TimelineSection from "@/components/TimelineSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import WebsiteReveal from "@/components/SplashScreen"; 
import EventsSection from "@/components/EventsSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* <WebsiteReveal/> */}
      <NavbarSection />
      <HeroSection />
      <ExpandableCards />
      <TimelineSection />
      <GallerySection />
      <Footer />
    </div>
  );
}