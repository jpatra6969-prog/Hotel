"use client";

import React, { useState, useEffect } from "react";
import { PhoneIcon, CalendarIcon } from "./Icons";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 78;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight - 16;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none bg-[#14213D] shadow-sm border-b border-white/10">
      {/* Top Utility Bar - Solid deep tone, hairline border, no transparent gap */}
      <div
        className={`w-full px-4 sm:px-8 bg-[#0e172a] border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isScrolled ? "max-h-0 py-0 opacity-0 border-b-0" : "max-h-12 py-2 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans text-xs text-zinc-300">
          <div className="flex items-center gap-4 pointer-events-auto">
            <span className="flex items-center gap-2 text-[#FAF8F5] tracking-[0.08em] uppercase font-medium text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] inline-block" />
              Capri Coast • 24°C / 75°F • Sunset 19:42
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-zinc-300 text-xs">Private Peninsula Sanctuary</span>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            <a
              href="tel:+390819924800"
              className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-[#B8923A] transition-colors text-xs font-medium"
            >
              <PhoneIcon size={12} className="text-[#B8923A]" />
              <span>VIP Concierge: +39 081 992 4800</span>
            </a>

          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Solid luxury navy #14213D */}
      <div className="w-full px-4 sm:px-8 py-3 sm:py-3.5 bg-[#14213D]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Monogram */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left group pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full border border-[#B8923A] bg-[#14213D] flex items-center justify-center text-[#B8923A] group-hover:bg-[#B8923A] group-hover:text-white transition-colors">
              <span className="font-serif text-lg font-semibold">A</span>
            </div>
            <div>
              <div className="text-white font-serif tracking-[0.08em] text-lg font-medium leading-none group-hover:text-[#B8923A] transition-colors">
                AURA SANCTUARY
              </div>
              <div className="text-[11px] font-sans uppercase tracking-[0.08em] text-[#B8923A] mt-1 font-medium">
                Capri Peninsula • Private Estate
              </div>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-7 text-[13px] tracking-[0.08em] uppercase font-semibold text-zinc-200 pointer-events-auto">
            <button
              onClick={() => scrollToSection("sanctuary")}
              className="hover:text-[#B8923A] transition-colors py-1 relative group"
            >
              The Sanctuary
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8923A] transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("virtual-tour")}
              className="hover:text-[#B8923A] transition-colors py-1 relative group"
            >
              3D Walkthrough
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8923A] transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("suites")}
              className="hover:text-[#B8923A] transition-colors py-1 relative group"
            >
              Accommodations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8923A] transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="hover:text-[#B8923A] transition-colors py-1 relative group"
            >
              Experiences
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8923A] transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("dining")}
              className="hover:text-[#B8923A] transition-colors py-1 relative group"
            >
              Gastronomy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8923A] transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="hover:text-[#B8923A] transition-colors py-1 relative group"
            >
              Location
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8923A] transition-all group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {/* Primary Reserve Button */}
            <button
              onClick={onOpenBooking}
              className="gold-button px-5 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center gap-2 transition-colors"
            >
              <CalendarIcon size={14} className="text-white" />
              <span>Reserve Stay</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-zinc-200 hover:text-white bg-white/10 rounded-full border border-white/15"
              aria-label="Toggle Navigation Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#14213D] border-b border-[#E7E2DA]/20 px-6 py-6 shadow-2xl pointer-events-auto">
          <div className="flex flex-col gap-4 text-[13px] uppercase tracking-[0.08em] font-semibold text-zinc-200">
            <button
              onClick={() => scrollToSection("sanctuary")}
              className="text-left py-2 hover:text-[#B8923A] border-b border-white/5"
            >
              The Sanctuary
            </button>
            <button
              onClick={() => scrollToSection("virtual-tour")}
              className="text-left py-2 hover:text-[#B8923A] border-b border-white/5"
            >
              3D Walkthrough
            </button>
            <button
              onClick={() => scrollToSection("suites")}
              className="text-left py-2 hover:text-[#B8923A] border-b border-white/5"
            >
              Accommodations
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="text-left py-2 hover:text-[#B8923A] border-b border-white/5"
            >
              Experiences &amp; Amenities
            </button>
            <button
              onClick={() => scrollToSection("dining")}
              className="text-left py-2 hover:text-[#B8923A] border-b border-white/5"
            >
              Gastronomy &amp; Cellar
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="text-left py-2 hover:text-[#B8923A] border-b border-white/5"
            >
              Location &amp; Helicopter Transfer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="gold-button w-full py-3 rounded-full mt-2 text-center text-[13px] font-semibold uppercase tracking-[0.08em]"
            >
              Check Availability &amp; Reserve
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
