"use client";

import React, { useState, useEffect } from "react";
import { PhoneIcon, CalendarIcon } from "./Icons";

interface NavbarProps {
  onOpenBooking: () => void;
  currency: string;
  setCurrency: (c: string) => void;
}

export default function Navbar({ onOpenBooking, currency, setCurrency }: NavbarProps) {
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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none">
      {/* Top Utility Bar - Completely transparent */}
      <div
        className={`w-full px-4 sm:px-8 py-2 text-[11px] text-zinc-300 transition-all duration-300 ${
          isScrolled ? "h-0 py-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 pointer-events-auto">
            <span className="flex items-center gap-1.5 text-amber-300 font-mono tracking-wider drop-shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              CAPRI COAST • 24°C / 75°F • SUNSET 19:42
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-zinc-300 drop-shadow-md">Private Peninsula Sanctuary</span>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            <a
              href="tel:+390819924800"
              className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors drop-shadow-md"
            >
              <PhoneIcon size={12} className="text-amber-400" />
              <span>VIP Concierge: +39 081 992 4800</span>
            </a>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md rounded-full px-2 py-0.5 border border-white/15 shadow-sm">
              {(["USD", "EUR", "GBP", "JPY"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-all ${
                    currency === c
                      ? "bg-amber-400/25 text-amber-300 font-semibold"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {c === "USD" ? "$" : c === "EUR" ? "€" : c === "GBP" ? "£" : "¥"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Completely transparent when at top, sleek glass when scrolled */}
      <div
        className={`w-full px-4 sm:px-8 transition-all duration-500 ${
          isScrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl py-3"
            : "bg-transparent border-b border-transparent py-2 sm:py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Monogram */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left group pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full border border-amber-400/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-amber-300 transition-all">
              <span className="font-serif text-lg tracking-widest font-bold">A</span>
            </div>
            <div>
              <div className="text-white font-serif tracking-[0.25em] text-base sm:text-lg font-light leading-none group-hover:text-amber-300 transition-colors drop-shadow-md">
                AURA SANCTUARY
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.35em] text-amber-400/90 mt-1 drop-shadow-md">
                Private Villa & Resort
              </div>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) - (Suites & Villas removed) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-light text-zinc-200 pointer-events-auto">
            <button
              onClick={() => scrollToSection("virtual-tour")}
              className="hover:text-amber-300 transition-colors py-1 relative group drop-shadow-md"
            >
              Virtual Tour
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="hover:text-amber-300 transition-colors py-1 relative group drop-shadow-md"
            >
              Experiences
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("dining")}
              className="hover:text-amber-300 transition-colors py-1 relative group drop-shadow-md"
            >
              Gastronomy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="hover:text-amber-300 transition-colors py-1 relative group drop-shadow-md"
            >
              Accolades
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="hover:text-amber-300 transition-colors py-1 relative group drop-shadow-md"
            >
              Location
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="gold-button px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <CalendarIcon size={14} className="text-zinc-950" />
              <span>Book Your Stay</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-200 hover:text-white bg-black/40 backdrop-blur-md rounded-full border border-white/10"
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
        <div className="lg:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-amber-500/20 px-6 py-6 animate-fadeIn pointer-events-auto">
          <div className="flex flex-col gap-4 text-sm uppercase tracking-widest font-light text-zinc-200">
            <button
              onClick={() => scrollToSection("virtual-tour")}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Cinematic Virtual Tour
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Experiences & Amenities
            </button>
            <button
              onClick={() => scrollToSection("dining")}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Gastronomy & Cellar
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Accolades & Reviews
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Location & Helicopter Transfer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="gold-button w-full py-3 rounded-xl mt-2 text-center text-xs font-semibold uppercase tracking-wider"
            >
              Check Availability & Book
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
