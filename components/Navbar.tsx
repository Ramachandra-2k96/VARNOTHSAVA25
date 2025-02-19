"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NavbarSection() {
  return (
    <div className="relative w-full flex items-center justify-center z-[9999]">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIsMobile();
    // Listen for screen resize
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close dropdown when switching to mobile
  useEffect(() => {
    if (isMobile) {
      setActive(null);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      {isMobile ? (
        // ─────────────────────────────────────────────────────────────────
        // Mobile Menu
        // ─────────────────────────────────────────────────────────────────
        <div className="relative">
          {/* Mobile Toggle Button */}
          <div className="flex justify-end px-4">
            <button
              onClick={toggleMobileMenu}
              className="rounded-full bg-black p-2 border border-white/20 text-white z-50"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

          {/* Mobile Menu Container */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/95 pt-16 px-4 overflow-y-auto min-h-screen">
              <div className="flex flex-col space-y-6 mt-4">
                {/* Example: Direct Link (no accordion) */}
                <MobileDirectLink href="/about" label="About" />

                {/* Mobile Menu Item (accordion) */}

                <MobileMenuItem title="Events">
                  <div className="grid grid-cols-1 gap-6 py-2">
                    <MobileProductItem
                      title="Algochurn"
                      href="https://algochurn.com"
                      src="https://assets.aceternity.com/demos/algochurn.webp"
                      description="Prepare for tech interviews like never before."
                    />
                    <MobileProductItem
                      title="Tailwind Master Kit"
                      href="https://tailwindmasterkit.com"
                      src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                      description="Production ready Tailwind css components for your next project"
                    />
                    <MobileProductItem
                      title="Moonbeam"
                      href="https://gomoonbeam.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                      description="Never write from scratch again. Go from idea to blog in minutes."
                    />
                    <MobileProductItem
                      title="Rogue"
                      href="https://userogue.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                      description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                    />
                  </div>
                </MobileMenuItem>
              </div>
            </div>
          )}
        </div>
      ) : (
        // ─────────────────────────────────────────────────────────────────
        // Desktop Menu
        // ─────────────────────────────────────────────────────────────────
        <Menu setActive={setActive}>
          <MenuItem direct href="#about" item="About" setActive={setActive} active={active} />

          <MenuItem setActive={setActive} active={active} item="Events">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Technical"
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Cultural"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="General"
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Gaming"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Mobile-specific components
// ──────────────────────────────────────────────────────────────

// Accordion-like mobile item
const MobileMenuItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-white font-medium py-2"
      >
        {title}
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="pl-4 mt-2">{children}</div>}
    </div>
  );
};

// Direct link for mobile (no accordion)
const MobileDirectLink = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <div className="border-b border-white/10 pb-4">
      <Link
        href={href}
        className="block w-full text-left text-white font-medium py-2 
                   hover:bg-purple-800 rounded-lg transition-colors"
      >
        {label}
      </Link>
    </div>
  );
};

const MobileProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex flex-col space-y-2">
      <div className="flex items-center space-x-3">
        <Image
          src={src}
          width={80}
          height={40}
          alt={title}
          className="rounded-md shadow-lg"
        />
        <h4 className="text-lg font-bold text-white">{title}</h4>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </Link>
  );
};
