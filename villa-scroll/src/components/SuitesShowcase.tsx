"use client";

import React, { useState } from "react";
import { HOTEL_SUITES, SuiteItem } from "@/data/hotelData";
import {
  BedIcon,
  BathIcon,
  MaximizeIcon,
  UsersIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "./Icons";
import SuiteDetailsModal from "./SuiteDetailsModal";

interface SuitesShowcaseProps {
  onSelectSuiteForBooking: (suite: SuiteItem) => void;
  onJumpToTourFrame: (frame: number) => void;
  currencySymbol: string;
}

export default function SuitesShowcase({
  onSelectSuiteForBooking,
  onJumpToTourFrame,
  currencySymbol,
}: SuitesShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedModalSuite, setSelectedModalSuite] = useState<SuiteItem | null>(null);

  const categories = [
    { id: "all", label: "All Accommodations" },
    { id: "villa", label: "Signature Villa" },
    { id: "penthouse", label: "Ocean Penthouses" },
    { id: "residence", label: "Spa Residences" },
    { id: "suite", label: "Dining Suites" },
  ];

  const filteredSuites = HOTEL_SUITES.filter((suite) => {
    if (activeCategory === "all") return true;
    return suite.category === activeCategory;
  });

  return (
    <section id="suites" className="relative z-20 bg-zinc-950 px-4 sm:px-8 py-24 sm:py-32 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
              Unrivaled Accommodations
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide leading-tight">
              Suites, Penthouses & Private Residences
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-4 font-light leading-relaxed">
              Every residence is an architectural sanctuary featuring panoramic Mediterranean vistas,
              bespoke Italian furnishings, dedicated butler service, and private culinary options.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/60 font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    : "bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              className="group rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-400/40 transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            >
              {/* Image Preview & Badges */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden">
                <img
                  src={suite.coverImage}
                  alt={suite.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Category Pill */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-[10px] font-mono tracking-widest uppercase">
                  {suite.category}
                </span>

                {/* 4K Walkthrough Jump Pill */}
                <button
                  onClick={() => onJumpToTourFrame(suite.featuredFrame)}
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 hover:bg-amber-400/20 text-amber-300 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 transition-all"
                >
                  <SparklesIcon size={12} />
                  <span>View in 4K Tour</span>
                </button>

                {/* Price Display */}
                <div className="absolute bottom-4 right-6 text-right">
                  <div className="text-2xl sm:text-3xl font-serif text-white">
                    {currencySymbol}
                    {suite.pricePerNight.toLocaleString()}
                    <span className="text-xs text-zinc-400 font-sans font-light"> / night</span>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-amber-300 transition-colors">
                    {suite.name}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-light italic">
                    {suite.tagline}
                  </p>

                  <p className="text-zinc-300 text-xs leading-relaxed mt-4 font-light line-clamp-3">
                    {suite.description}
                  </p>

                  {/* Specifications Row */}
                  <div className="grid grid-cols-4 gap-2 py-5 my-4 border-y border-white/5 text-[11px] font-mono text-zinc-300">
                    <div className="flex flex-col">
                      <span className="text-zinc-500 text-[9px] uppercase">Space</span>
                      <span className="text-white font-medium">{suite.sqFt.toLocaleString()} sq.ft</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-500 text-[9px] uppercase">Bedrooms</span>
                      <span className="text-white font-medium">{suite.bedrooms} King</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-500 text-[9px] uppercase">Baths</span>
                      <span className="text-white font-medium">{suite.bathrooms} Marble</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-500 text-[9px] uppercase">Max Guests</span>
                      <span className="text-white font-medium">{suite.maxGuests} Guests</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {suite.keyAmenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/5 text-zinc-300 font-mono"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedModalSuite(suite)}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 hover:border-amber-400/40 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors text-center"
                  >
                    Details & 360°
                  </button>
                  <button
                    onClick={() => onSelectSuiteForBooking(suite)}
                    className="flex-1 gold-button py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve</span>
                    <ChevronRightIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suite Details Modal */}
      <SuiteDetailsModal
        suite={selectedModalSuite}
        onClose={() => setSelectedModalSuite(null)}
        onBookSuite={(s) => {
          setSelectedModalSuite(null);
          onSelectSuiteForBooking(s);
        }}
        onJumpToTour={onJumpToTourFrame}
        currencySymbol={currencySymbol}
      />
    </section>
  );
}
