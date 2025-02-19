"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import MouseImageTrail from "./ui/MouseImageTrail";

export default function HeroSection() {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "/images/mouse-trail/1.jpg",
        "/images/mouse-trail/2.jpg",
        "/images/mouse-trail/3.jpg",
        "/images/mouse-trail/4.jpg",
        "/images/mouse-trail/5.jpg",
        "/images/mouse-trail/6.jpg",
        "/images/mouse-trail/7.jpg",
        "/images/mouse-trail/8.jpg",
      ]}
    >
      <HeroParallax products={products} />
    </MouseImageTrail>
  );
}

export const products = [
  {
    title: "Moonbeam",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
 
  {
    title: "Editorially",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
 
  {
    title: "Algochurn",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
 
  {
    title: "Creme Digital",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
