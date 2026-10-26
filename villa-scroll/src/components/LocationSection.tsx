"use client";

import React from "react";
import { MapPinIcon, PhoneIcon } from "./Icons";

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export default function LocationSection({ onOpenBooking }: LocationSectionProps) {
  return (
    <section id="location" className="relative z-20 bg-zinc-950 px-4 sm:px-8 py-24 sm:py-32 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase block">
              Secluded Coastal Geography
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide leading-tight">
              An Inaccessible Jewel on the Tyrrhenian Coast
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              Situated on a private limestone promontory along the Amalfi peninsula overlooking the Faraglioni
              islands, Aura Sanctuary is reachable exclusively via private marine dock, gated private road, or
              direct helicopter touchdown.
            </p>

            {/* Travel Times Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <div className="text-amber-400 font-mono text-xs uppercase tracking-wider">
                  Naples Capodichino (NAP)
                </div>
                <div className="text-white text-lg font-serif mt-1">15 Mins Flight</div>
                <div className="text-zinc-400 text-xs mt-0.5 font-light">
                  Direct twin-engine helicopter to on-site helipad
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <div className="text-amber-400 font-mono text-xs uppercase tracking-wider">
                  Rome Fiumicino (FCO)
                </div>
                <div className="text-white text-lg font-serif mt-1">45 Mins Flight</div>
                <div className="text-zinc-400 text-xs mt-0.5 font-light">
                  VIP ramp escort and direct flight transfer
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <div className="text-amber-400 font-mono text-xs uppercase tracking-wider">
                  Capri Marina Grande
                </div>
                <div className="text-white text-lg font-serif mt-1">10 Mins Riva Yacht</div>
                <div className="text-zinc-400 text-xs mt-0.5 font-light">
                  Private high-speed tender straight to villa dock
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <div className="text-amber-400 font-mono text-xs uppercase tracking-wider">
                  Private Coordinates
                </div>
                <div className="text-white text-lg font-serif mt-1 font-mono text-sm">
                  40.5507° N, 14.2426° E
                </div>
                <div className="text-zinc-400 text-xs mt-0.5 font-light">
                  Helipad ICAO designation: IT-AURA
                </div>
              </div>
            </div>

            {/* Inquire Aviation CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto gold-button px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xl"
              >
                Arrange Private Aviation Transfer
              </button>
              <a
                href="tel:+390819924800"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/10 hover:border-amber-400 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneIcon size={14} className="text-amber-400" />
                <span>Call Chauffeur Desk</span>
              </a>
            </div>
          </div>

          {/* Right Visual Map Card */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 h-96 sm:h-[480px]">
            <img
              src="/frames/frame_0001.jpg"
              alt="Villa Peninsula Arrival"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            {/* Floating Location Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel-gold">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-amber-400 font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5">
                    <MapPinIcon size={12} />
                    Private Peninsula Estate
                  </span>
                  <h3 className="text-xl font-serif text-white mt-1">
                    Via Panoramica 18, Capri Peninsula, Italy
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-light">
                    Gated perimeter with 24/7 security detail and dedicated marine anchorage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
