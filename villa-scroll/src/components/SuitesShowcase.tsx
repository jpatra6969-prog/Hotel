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
    <section id="suites" className="relative z-20 bg-[#FAF8F5] px-4 sm:px-8 py-24 sm:py-32 border-t border-[#E7E2DA] scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase block mb-3 font-sans">
              Unrivaled Accommodations
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917] tracking-normal leading-[1.2]">
              Suites, Penthouses &amp; Private Residences
            </h2>
            <p className="text-[#57534E] text-base font-normal max-w-2xl mt-4 leading-[1.6]">
              Every residence is an architectural sanctuary featuring panoramic Mediterranean vistas,
              bespoke Italian furnishings, dedicated butler service, and private in-suite dining.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 font-sans">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#14213D] text-white shadow-sm"
                    : "bg-white text-[#57534E] border border-[#E7E2DA] hover:border-[#14213D] hover:text-[#1C1917]"
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
              className="group rounded-2xl bg-white border border-[#E7E2DA] hover:border-[#B8923A] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm"
            >
              {/* Image Preview & Badges */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-zinc-900">
                <img
                  src={suite.coverImage}
                  alt={suite.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Pill */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white text-[#14213D] text-xs font-semibold tracking-[0.08em] uppercase shadow-sm">
                  {suite.category}
                </span>

                {/* Walkthrough Jump Pill */}
                <button
                  onClick={() => onJumpToTourFrame(suite.featuredFrame)}
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#12141A] border border-white/20 text-white text-xs font-medium tracking-[0.08em] uppercase flex items-center gap-1.5 hover:bg-[#B8923A] transition-colors shadow-sm"
                  title="Jump to this space in 3D walkthrough"
                >
                  <span>3D View</span>
                  <span>→</span>
                </button>

                {/* Nightly Price Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-xs uppercase tracking-[0.08em] text-zinc-300 block font-medium">Starting from</span>
                    <span className="text-2xl sm:text-3xl font-sans font-semibold tabular-nums text-white">
                      {currencySymbol}{suite.pricePerNight.toLocaleString("en-US")}
                    </span>
                    <span className="text-xs text-zinc-300 font-normal"> / night</span>
                  </div>
                  <span className="text-xs font-sans font-medium text-[#15803D] bg-white px-2.5 py-1 rounded-full shadow-sm">
                    Available Direct
                  </span>
                </div>
              </div>

              {/* Suite Details Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-serif font-medium text-[#1C1917] group-hover:text-[#B8923A] transition-colors">
                    {suite.name}
                  </h3>
                  <div className="text-xs font-sans text-[#B8923A] font-semibold tracking-[0.08em] uppercase mt-1">
                    {suite.tagline}
                  </div>
                  <p className="text-[#57534E] text-sm font-normal mt-3 leading-[1.6] line-clamp-3">
                    {suite.description}
                  </p>

                  {/* Room Key Metrics */}
                  <div className="grid grid-cols-4 gap-2 py-4 my-4 border-y border-[#E7E2DA] text-xs font-sans text-[#57534E]">
                    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-[#FAF8F5]">
                      <MaximizeIcon size={14} className="text-[#B8923A] mb-1" />
                      <span className="font-semibold text-[#1C1917] tabular-nums">{suite.sqFt.toLocaleString("en-US")}</span>
                      <span className="text-[10px] uppercase">Sq. Ft.</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-[#FAF8F5]">
                      <UsersIcon size={14} className="text-[#B8923A] mb-1" />
                      <span className="font-semibold text-[#1C1917] tabular-nums">{suite.maxGuests}</span>
                      <span className="text-[10px] uppercase">Guests</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-[#FAF8F5]">
                      <BedIcon size={14} className="text-[#B8923A] mb-1" />
                      <span className="font-semibold text-[#1C1917] tabular-nums">{suite.bedrooms}</span>
                      <span className="text-[10px] uppercase">Bedrooms</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-[#FAF8F5]">
                      <BathIcon size={14} className="text-[#B8923A] mb-1" />
                      <span className="font-semibold text-[#1C1917] tabular-nums">{suite.bathrooms}</span>
                      <span className="text-[10px] uppercase">Baths</span>
                    </div>
                  </div>

                  {/* Amenities Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {suite.keyAmenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E7E2DA] text-[#57534E] font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2 font-sans">
                  <button
                    onClick={() => setSelectedModalSuite(suite)}
                    className="flex-1 py-2.5 px-4 rounded-full border border-[#E7E2DA] hover:border-[#14213D] text-[#1C1917] text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                  >
                    Explore Details
                  </button>
                  <button
                    onClick={() => onSelectSuiteForBooking(suite)}
                    className="gold-button flex-1 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                  >
                    Reserve Suite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suite Details Modal */}
      {selectedModalSuite && (
        <SuiteDetailsModal
          suite={selectedModalSuite}
          onClose={() => setSelectedModalSuite(null)}
          onBookSuite={(suite) => {
            setSelectedModalSuite(null);
            onSelectSuiteForBooking(suite);
          }}
          onJumpToTour={(frame) => {
            setSelectedModalSuite(null);
            onJumpToTourFrame(frame);
          }}
          currencySymbol={currencySymbol}
        />
      )}
    </section>
  );
}
