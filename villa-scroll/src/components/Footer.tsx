"use client";

import React, { useState } from "react";
import { PhoneIcon, MapPinIcon } from "./Icons";

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative z-20 bg-black text-white border-t border-zinc-900 pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter & Estate Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-amber-500/20 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase block mb-2">
              The Sanctuary Journal
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light">
              Receive Private Invitations & Seasonal Villa Allocations
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 font-light">
              Privileged access to unlisted summer dates, vintage cellar tasting events, and bespoke yacht excursions.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="px-6 py-3 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 font-mono text-xs text-center">
                ✓ You are on the private guest allocation registry.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter private email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-full px-5 py-3 text-xs text-white focus:outline-none focus:border-amber-400 font-sans flex-1"
                />
                <button
                  type="submit"
                  className="gold-button px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-lg"
                >
                  Join Registry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10 text-xs">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-amber-400/60 bg-black flex items-center justify-center text-amber-300 font-serif font-bold text-base">
                A
              </div>
              <div>
                <div className="font-serif tracking-[0.25em] text-sm text-white">
                  AURA SANCTUARY
                </div>
                <div className="text-[9px] font-mono tracking-widest text-amber-400/80 uppercase">
                  Capri Peninsula
                </div>
              </div>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              An architectural masterwork blending modernist transparency with timeless Mediterranean coastline luxury.
            </p>
            <div className="text-[11px] font-mono text-zinc-500">
              Forbes 5-Star Hotel • Three Michelin Keys 2026
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400">
              The Sanctuary
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li>
                <a href="#virtual-tour" className="hover:text-amber-300 transition-colors">
                  4K Cinematic Virtual Tour
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-amber-300 transition-colors">
                  Curated Resort Amenities
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors">
                  Forbes 5-Star Accolades
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-300 transition-colors">
                  Helicopter & Marine Transfers
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="text-amber-300 hover:underline">
                  Check Real-Time Availability →
                </button>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400">
              Sanctuary Life
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li>
                <a href="#dining" className="hover:text-amber-300 transition-colors">
                  L'Orizzonte 3-Star Gastronomy
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-amber-300 transition-colors">
                  Thalasso Spa & Hammam
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-amber-300 transition-colors">
                  Riva DolceVita Yacht Fleet
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-300 transition-colors">
                  Helicopter Concierge & Valet
                </a>
              </li>
              <li>
                <a href="#virtual-tour" className="hover:text-amber-300 transition-colors">
                  4K Cinematic Virtual Tour
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400">
              VIP Concierge
            </h4>
            <div className="space-y-2 text-zinc-400 font-light">
              <div className="flex items-start gap-2">
                <MapPinIcon size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Via Panoramica 18, Capri Peninsula, Italy</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon size={14} className="text-amber-400 flex-shrink-0" />
                <span>+39 081 992 4800 (Direct 24/7)</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                Email: concierge@aurasanctuary.com
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="gold-button w-full py-2.5 rounded-xl text-center text-xs font-semibold uppercase tracking-wider"
                >
                  Direct Booking Desk
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Sustainability */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-light">
          <div>
            © 2026 Aura Sanctuary Resort & Villas. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>100% Solar-Powered Marine Sanctuary</span>
            <span>Privacy Policy</span>
            <span>Terms of Stay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
