"use client";

import React, { useState } from "react";
import { HOTEL_AMENITIES } from "@/data/hotelData";
import { SparklesIcon } from "./Icons";

interface AmenitiesSectionProps {
  onOpenBooking: () => void;
}

export default function AmenitiesSection({ onOpenBooking }: AmenitiesSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="amenities" className="relative z-20 bg-[#FAF8F5] px-4 sm:px-8 py-24 sm:py-32 border-t border-[#E7E2DA] font-sans scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase block mb-3">
            Bespoke Resort Inclusions
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917] tracking-normal leading-[1.2]">
            Curated World-Class Amenities
          </h2>
          <p className="text-[#57534E] text-base mt-4 font-normal leading-[1.6]">
            Every moment at Aura Sanctuary is orchestrated for elevated leisure. From private 3-star Michelin
            dining pavilions to secluded Riva yacht charters and on-site heliport access.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {HOTEL_AMENITIES.map((amenity, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-all ${
                activeTab === idx
                  ? "bg-[#14213D] text-white shadow-sm"
                  : "bg-white text-[#57534E] border border-[#E7E2DA] hover:border-[#14213D] hover:text-[#1C1917]"
              }`}
            >
              {amenity.title}
            </button>
          ))}
        </div>

        {/* Active Amenity Spotlight Display */}
        {HOTEL_AMENITIES[activeTab] && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-10 border border-[#E7E2DA] shadow-sm">
            {/* Visual Preview */}
            <div className="lg:col-span-7 relative h-80 sm:h-[460px] rounded-xl overflow-hidden border border-[#E7E2DA]">
              <img
                src={HOTEL_AMENITIES[activeTab].image}
                alt={HOTEL_AMENITIES[activeTab].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[#FAF8F5] text-xs font-semibold tracking-[0.08em] uppercase block mb-1">
                  Private Privilege
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium">
                  {HOTEL_AMENITIES[activeTab].subtitle}
                </h3>
              </div>
            </div>

            {/* Description & Tags */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase">
                  Spotlight Feature
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917] mt-1">
                  {HOTEL_AMENITIES[activeTab].title}
                </h3>
                <p className="text-[#57534E] text-base leading-[1.6] mt-4 font-normal">
                  {HOTEL_AMENITIES[activeTab].description}
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-[0.08em] block">
                  Included In Stay
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {HOTEL_AMENITIES[activeTab].tags.map((tag, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] text-[#57534E] flex items-center gap-2 font-medium"
                    >
                      <SparklesIcon size={14} className="text-[#B8923A] flex-shrink-0" />
                      <span className="truncate">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="gold-button w-full sm:w-auto px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                >
                  Reserve Experience Stay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
