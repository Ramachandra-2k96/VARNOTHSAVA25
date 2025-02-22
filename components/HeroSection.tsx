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
        "/images/mouse-trail/3.jpg",
        "/images/mouse-trail/4.jpg",
        "/images/mouse-trail/5.jpg",
        "/images/mouse-trail/6.jpg",
        "/images/mouse-trail/7.jpg",
      ]}
    >
      <HeroParallax products={products} />
    </MouseImageTrail>
  );
}

export const products = [
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC01664.webp",
  },
  {
    title: "Moto mania",
    thumbnail:
      "/images/main/DSC_0018.webp",
  },
  {
    title: "Moto mania",
    thumbnail:
      "/images/main/DSC_0355.webp",
  },
 
  {
    title: "College band",
    thumbnail:
      "/images/main/DSC_0513.webp",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_0421.webp",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC02460.webp",
  },
 
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0041.webp",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_0497.webp",
  },
  {
    title: "Algoritham",
    thumbnail:
      "/images/main/IMG_7708.webp",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_3927.webp",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0027.webp",
  },
 
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_0399.webp",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0014.webp",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0293.webp",
  },
  {
    title: "Tech-event Varnothsava",
    thumbnail:
      "/images/main/IMG_3858.webp",
  },
];
