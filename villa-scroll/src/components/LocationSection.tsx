"use client";

import React from "react";
import { MapPinIcon, PhoneIcon } from "./Icons";

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export default function LocationSection({ onOpenBooking }: LocationSectionProps) {
  return (
    <section id="location" className="relative z-20 bg-[#FAF8F5] px-4 sm:px-8 py-24 sm:py-32 border-t border-[#E7E2DA] font-sans scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase block">
              Secluded Coastal Geography
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917] tracking-normal leading-[1.2]">
              An Inaccessible Jewel on the Tyrrhenian Coast
            </h2>
            <p className="text-[#57534E] text-base font-normal leading-[1.6]">
              Situated on a private limestone promontory along the Amalfi peninsula overlooking the Faraglioni
              islands, Aura Sanctuary is reachable exclusively via private marine dock, gated private road, or
              direct helicopter touchdown.
            </p>

            {/* Travel Times Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-white border border-[#E7E2DA] shadow-sm">
                <div className="text-[#B8923A] text-xs font-semibold uppercase tracking-[0.08em]">
                  Naples Capodichino (NAP)
                </div>
                <div className="text-[#1C1917] text-xl font-serif font-medium mt-1">15 Mins Flight</div>
                <div className="text-[#57534E] text-xs mt-1 font-normal leading-[1.5]">
                  Direct twin-engine helicopter to on-site helipad
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E7E2DA] shadow-sm">
                <div className="text-[#B8923A] text-xs font-semibold uppercase tracking-[0.08em]">
                  Rome Fiumicino (FCO)
                </div>
                <div className="text-[#1C1917] text-xl font-serif font-medium mt-1">45 Mins Flight</div>
                <div className="text-[#57534E] text-xs mt-1 font-normal leading-[1.5]">
                  VIP ramp escort and direct flight transfer
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E7E2DA] shadow-sm">
                <div className="text-[#B8923A] text-xs font-semibold uppercase tracking-[0.08em]">
                  Capri Marina Grande
                </div>
                <div className="text-[#1C1917] text-xl font-serif font-medium mt-1">10 Mins Riva Yacht</div>
                <div className="text-[#57534E] text-xs mt-1 font-normal leading-[1.5]">
                  Private high-speed tender straight to villa dock
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E7E2DA] shadow-sm">
                <div className="text-[#B8923A] text-xs font-semibold uppercase tracking-[0.08em]">
                  Private Marina Draft
                </div>
                <div className="text-[#1C1917] text-xl font-serif font-medium mt-1">Up to 80m Mega-Yachts</div>
                <div className="text-[#57534E] text-xs mt-1 font-normal leading-[1.5]">
                  Deep-water mooring buoy and 24/7 harbor tender
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="gold-button px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
              >
                Arrange Private Arrival
              </button>
              <a
                href="tel:+390819924800"
                className="px-6 py-3 rounded-full border border-[#E7E2DA] hover:border-[#14213D] text-[#1C1917] text-xs font-semibold tracking-[0.08em] uppercase flex items-center gap-2 transition-colors"
              >
                <PhoneIcon size={14} className="text-[#B8923A]" />
                <span>Call Flight Desk</span>
              </a>
            </div>
          </div>

          {/* Right Visual / Map Simulator */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E7E2DA] bg-white p-4">
            <div className="relative h-80 sm:h-[480px] w-full rounded-xl overflow-hidden bg-zinc-900">
              <img
                src="/frames/frame_0001.jpg"
                alt="Capri Peninsula Coastline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Pin Callout - Clean stationary architectural marker, no pulsing radar glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#14213D] border-2 border-[#B8923A] flex items-center justify-center text-[#B8923A] shadow-sm">
                  <MapPinIcon size={18} />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-white text-[#1C1917] text-xs font-semibold tracking-[0.08em] uppercase shadow-sm border border-[#E7E2DA]">
                  Aura Sanctuary Peninsula
                </div>
              </div>

              {/* Bottom Telemetry Card - Solid soft dark #12141A, natural borders */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#12141A] border border-white/15 text-white flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-xs uppercase tracking-[0.08em] text-[#B8923A] font-semibold">
                    Geographic Coordinates
                  </div>
                  <div className="text-sm font-sans font-semibold mt-0.5 tabular-nums text-white">
                    40.5507° N, 14.2426° E
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-[0.08em] text-zinc-300">
                    Aviation Code
                  </div>
                  <div className="text-sm font-sans font-semibold text-[#B8923A] mt-0.5">
                    LIRN / HELI-AURA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
