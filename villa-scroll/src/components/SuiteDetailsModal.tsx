"use client";

import React, { useState } from "react";
import { SuiteItem } from "@/data/hotelData";
import {
  CloseIcon,
  CheckIcon,
  BedIcon,
  BathIcon,
  MaximizeIcon,
  UsersIcon,
  SparklesIcon,
} from "./Icons";

interface SuiteDetailsModalProps {
  suite: SuiteItem | null;
  onClose: () => void;
  onBookSuite: (suite: SuiteItem) => void;
  onJumpToTour: (frame: number) => void;
  currencySymbol: string;
}

export default function SuiteDetailsModal({
  suite,
  onClose,
  onBookSuite,
  onJumpToTour,
  currencySymbol,
}: SuiteDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!suite) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-amber-500/30 rounded-3xl shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 hover:border-amber-400 text-white flex items-center justify-center transition-all"
        >
          <CloseIcon size={18} />
        </button>

        {/* Hero Gallery */}
        <div className="relative w-full h-72 sm:h-96 overflow-hidden rounded-t-3xl bg-zinc-900">
          <img
            src={suite.galleryImages[activeImageIndex] || suite.coverImage}
            alt={suite.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

          {/* Jump to 4K Walkthrough */}
          <button
            onClick={() => {
              onClose();
              onJumpToTour(suite.featuredFrame);
            }}
            className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-amber-400/20 transition-all"
          >
            <SparklesIcon size={14} />
            <span>View in 4K Virtual Tour</span>
          </button>

          {/* Gallery Thumbnails */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2 overflow-x-auto pb-1">
            {suite.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  activeImageIndex === idx
                    ? "border-amber-400 scale-105"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10">
          {/* Header & Pricing */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-amber-400 text-xs font-mono tracking-[0.25em] uppercase">
                {suite.category} • Signature Collection
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif mt-1">{suite.name}</h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-light italic">
                {suite.tagline}
              </p>
            </div>

            <div className="sm:text-right">
              <div className="text-2xl sm:text-3xl font-serif text-amber-300">
                {currencySymbol}
                {suite.pricePerNight.toLocaleString()}
                <span className="text-xs text-zinc-400 font-sans font-light"> / night</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">Taxes & butler service included</span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-white/10 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <MaximizeIcon size={18} className="text-amber-400" />
              <div>
                <div className="text-[10px] text-zinc-400">Total Area</div>
                <div className="text-white font-semibold">{suite.sqFt.toLocaleString()} sq.ft</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <BedIcon size={18} className="text-amber-400" />
              <div>
                <div className="text-[10px] text-zinc-400">Bedrooms</div>
                <div className="text-white font-semibold">{suite.bedrooms} King Suites</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <BathIcon size={18} className="text-amber-400" />
              <div>
                <div className="text-[10px] text-zinc-400">Bathrooms</div>
                <div className="text-white font-semibold">{suite.bathrooms} Marble Baths</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <UsersIcon size={18} className="text-amber-400" />
              <div>
                <div className="text-[10px] text-zinc-400">Occupancy</div>
                <div className="text-white font-semibold">Up to {suite.maxGuests} Guests</div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="py-6 border-b border-white/10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400/90 mb-2">
              The Experience
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              {suite.description}
            </p>
          </div>

          {/* Key Amenities & Inclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-white/10">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400/90 mb-3">
                Key Amenities
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {suite.keyAmenities.map((amenity, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-amber-400 flex-shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400/90 mb-3">
                VIP Inclusions
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {suite.includedServices.map((service, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <SparklesIcon size={14} className="text-amber-400 flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400">
              Complimentary cancellation up to 14 days prior to arrival.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-6 py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookSuite(suite);
                }}
                className="w-1/2 sm:w-auto gold-button px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xl"
              >
                Reserve This Suite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
