import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid } from "./ui/bento-grid";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-12 bg-black text-neutral-200">
      {/* Section Heading */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Gallery</h2>
        <p className="mt-2 text-lg text-neutral-400">
          A few shots about previous Varnothsava
        </p>
      </div>
      {/* Grid of Images */}
      <BentoGrid className="max-w-6xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "relative group rounded-xl overflow-hidden bg-neutral-800",
              (i === 3 || i === 6) && "md:col-span-2"
            )}
          >
            {/* The Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            {/* Overlay with Text (hidden until hover) */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 group-hover:bg-opacity-60 transition-all duration-300">
              <h3 className="text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition duration-300">
                {item.title}
              </h3>
              <p className="text-neutral-300 text-sm opacity-0 group-hover:opacity-100 transition duration-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </BentoGrid>
    </section>
  );
}

const items = [
  {
    title: "Sunset Glory",
    description: "Experience the serene sunset over the horizon.",
    image: "/images/sunset.jpg",
  },
  {
    title: "Historic Moments",
    description: "Cherished memories from Varnothsava.",
    image: "/images/historic.jpg",
  },
  {
    title: "Cultural Fiesta",
    description: "Diving into vibrant traditions and festivities.",
    image: "/images/fiesta.jpg",
  },
  {
    title: "Architectural Marvels",
    description: "Witness the blend of tradition and modernity.",
    image: "/images/architecture.jpg",
  },
  {
    title: "Nature's Embrace",
    description: "Green landscapes and natural beauty.",
    image: "/images/nature.jpg",
  },
  {
    title: "Dramatic Performances",
    description: "Capturing the emotion of the event.",
    image: "/images/performance.jpg",
  },
  {
    title: "Night Lights",
    description: "The city comes alive under the night sky.",
    image: "/images/mouse-trail/1.jpg",
  },
  {
    title: "Night Lights",
    description: "The city comes alive under the night sky.",
    image: "/images/mouse-trail/1.jpg",
  },
];
