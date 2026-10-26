"use client";

import React, { useState } from "react";
import { HOTEL_AMENITIES } from "@/data/hotelData";
import { WineIcon, SparklesIcon, ChevronRightIcon } from "./Icons";

interface AmenitiesSectionProps {
  onOpenBooking: () => void;
}

export default function AmenitiesSection({ onOpenBooking }: AmenitiesSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="amenities" className="relative z-20 bg-zinc-950 px-4 sm:px-8 py-24 sm:py-32 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            Bespoke Resort Inclusions
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide leading-tight">
            Curated World-Class Amenities
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Every moment at Aura Sanctuary is orchestrated for elevated leisure. From private 3-star Michelin
            dining pavilions to secluded Riva yacht charters and on-site heliport access.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {HOTEL_AMENITIES.map((amenity, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === idx
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/60 font-semibold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  : "bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:border-white/20"
              }`}
            >
              {amenity.title}
            </button>
          ))}
        </div>

        {/* Active Amenity Spotlight Display */}
        {HOTEL_AMENITIES[activeTab] && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 rounded-3xl p-6 sm:p-10 border border-zinc-800/80">
            {/* Visual Preview */}
            <div className="lg:col-span-7 relative h-80 sm:h-[460px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={HOTEL_AMENITIES[activeTab].image}
                alt={HOTEL_AMENITIES[activeTab].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-amber-400 text-xs font-mono tracking-widest uppercase block mb-1">
                  Private Privilege
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  {HOTEL_AMENITIES[activeTab].subtitle}
                </h3>
              </div>
            </div>

            {/* Description & Tags */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase">
                  Spotlight Feature
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                  {HOTEL_AMENITIES[activeTab].title}
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4 font-light">
                  {HOTEL_AMENITIES[activeTab].description}
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Included In Stay
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {HOTEL_AMENITIES[activeTab].tags.map((tag, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 text-zinc-300 flex items-center gap-2"
                    >
                      <SparklesIcon size={14} className="text-amber-400 flex-shrink-0" />
                      <span className="truncate">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="gold-button px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl"
                >
                  <span>Inquire with Private Concierge</span>
                  <ChevronRightIcon size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
