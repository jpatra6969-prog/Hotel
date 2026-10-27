"use client";

import React from "react";
import { PhoneIcon, MapPinIcon } from "./Icons";

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="relative z-20 bg-[#14213D] text-white border-t border-[#E7E2DA]/20 pt-20 pb-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10 text-xs">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#B8923A] bg-[#14213D] flex items-center justify-center text-[#B8923A] font-serif font-semibold text-base shadow-sm">
                A
              </div>
              <div>
                <div className="font-serif tracking-[0.08em] text-base text-white font-medium">
                  AURA SANCTUARY
                </div>
                <div className="text-[11px] font-sans tracking-[0.08em] text-[#B8923A] uppercase font-semibold">
                  Capri Peninsula
                </div>
              </div>
            </div>
            <p className="text-zinc-300 text-xs leading-[1.6] font-normal">
              An architectural masterwork blending modernist transparency with timeless Mediterranean coastline luxury.
            </p>
            <div className="text-xs text-zinc-400 font-medium">
              Forbes 5-Star Hotel • Three Michelin Keys 2026
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A]">
              The Sanctuary
            </h4>
            <ul className="space-y-2 text-zinc-300 font-normal">
              <li>
                <a href="#virtual-tour" className="hover:text-white transition-colors">
                  4K Spatial Virtual Tour
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Curated Resort Amenities
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Forbes 5-Star Accolades
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Helicopter &amp; Marine Transfers
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="text-[#B8923A] hover:underline font-medium">
                  Check Real-Time Availability →
                </button>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A]">
              Sanctuary Life
            </h4>
            <ul className="space-y-2 text-zinc-300 font-normal">
              <li>
                <a href="#dining" className="hover:text-white transition-colors">
                  L'Orizzonte 3-Star Gastronomy
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Thalasso Spa &amp; Hammam
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Riva DolceVita Yacht Fleet
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Helicopter Concierge &amp; Valet
                </a>
              </li>
              <li>
                <a href="#virtual-tour" className="hover:text-white transition-colors">
                  4K Cinematic Virtual Tour
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A]">
              VIP Concierge
            </h4>
            <div className="space-y-2 text-zinc-300 font-normal">
              <div className="flex items-start gap-2">
                <MapPinIcon size={14} className="text-[#B8923A] flex-shrink-0 mt-0.5" />
                <span>Via Panoramica 18, Capri Peninsula, Italy</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon size={14} className="text-[#B8923A] flex-shrink-0" />
                <span className="tabular-nums">+39 081 992 4800 (Direct 24/7)</span>
              </div>
              <div className="text-xs text-zinc-400">
                Email: concierge@aurasanctuary.com
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="gold-button w-full py-2.5 rounded-full text-center text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                >
                  Direct Booking Desk
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Sustainability */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-normal">
          <div>
            © 2026 Aura Sanctuary Resort &amp; Villas. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span>100% Solar-Powered Marine Sanctuary</span>
            <span>Privacy Policy</span>
            <span>Terms of Stay</span>
            <a href="/admin" className="text-[#B8923A] hover:underline font-semibold flex items-center gap-1">
              <span>Estate Admin Console</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
