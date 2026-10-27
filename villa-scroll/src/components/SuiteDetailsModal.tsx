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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 animate-fadeIn font-sans">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-[#E7E2DA] rounded-2xl shadow-xl text-[#1C1917] no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white border border-[#E7E2DA] hover:border-[#14213D] text-[#1C1917] flex items-center justify-center transition-colors shadow-sm"
        >
          <CloseIcon size={16} />
        </button>

        {/* Hero Gallery */}
        <div className="relative w-full h-72 sm:h-96 overflow-hidden rounded-t-2xl bg-zinc-900">
          <img
            src={suite.galleryImages[activeImageIndex] || suite.coverImage}
            alt={suite.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Jump to 4K Walkthrough */}
          <button
            onClick={() => {
              onClose();
              onJumpToTour(suite.featuredFrame);
            }}
            className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#12141A] border border-white/20 text-white text-xs font-semibold uppercase tracking-[0.08em] flex items-center gap-2 hover:bg-[#B8923A] transition-colors"
          >
            <span>Explore in 3D</span>
            <span>→</span>
          </button>

          {/* Thumbnails */}
          {suite.galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1">
              {suite.galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                    activeImageIndex === i
                      ? "border-[#B8923A]"
                      : "border-white/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
            <div>
              <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A] block mb-1">
                {suite.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#1C1917]">
                {suite.name}
              </h2>
              <p className="text-sm text-[#57534E] font-medium mt-1">
                {suite.tagline}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs uppercase tracking-[0.08em] text-[#57534E] block">Starting from</span>
              <div className="text-3xl font-sans font-semibold text-[#1C1917] tabular-nums">
                {currencySymbol}{suite.pricePerNight.toLocaleString("en-US")}
              </div>
              <span className="text-xs text-[#57534E]">per night • taxes included</span>
            </div>
          </div>

          {/* Key Dimensions Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] text-center text-xs">
            <div className="flex flex-col items-center">
              <MaximizeIcon size={16} className="text-[#B8923A] mb-1" />
              <span className="font-semibold text-[#1C1917] tabular-nums">{suite.sqFt.toLocaleString("en-US")} sq.ft</span>
              <span className="text-[#57534E] text-[11px]">Private Living Area</span>
            </div>
            <div className="flex flex-col items-center">
              <UsersIcon size={16} className="text-[#B8923A] mb-1" />
              <span className="font-semibold text-[#1C1917] tabular-nums">Up to {suite.maxGuests} Guests</span>
              <span className="text-[#57534E] text-[11px]">Max Occupancy</span>
            </div>
            <div className="flex flex-col items-center">
              <BedIcon size={16} className="text-[#B8923A] mb-1" />
              <span className="font-semibold text-[#1C1917] tabular-nums">{suite.bedrooms} Master Bedrooms</span>
              <span className="text-[#57534E] text-[11px]">En-Suite Kings</span>
            </div>
            <div className="flex flex-col items-center">
              <BathIcon size={16} className="text-[#B8923A] mb-1" />
              <span className="font-semibold text-[#1C1917] tabular-nums">{suite.bathrooms} Luxury Baths</span>
              <span className="text-[#57534E] text-[11px]">Marble Bathrooms</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#1C1917] mb-2">
              The Living Experience
            </h4>
            <p className="text-[#57534E] text-sm leading-[1.6] font-normal">
              {suite.description}
            </p>
          </div>

          {/* Key Amenities & Inclusions Split Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div>
              <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#1C1917] mb-3">
                Key Residence Amenities
              </h4>
              <ul className="space-y-2 text-xs text-[#57534E]">
                {suite.keyAmenities.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-[#15803D] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#1C1917] mb-3">
                Complimentary Inclusions
              </h4>
              <ul className="space-y-2 text-xs text-[#57534E]">
                {suite.includedServices.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-[#B8923A] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E7E2DA]">
            <div className="text-xs text-[#57534E] text-center sm:text-left">
              Direct bookings include VIP airport Riva transfer and Dom Pérignon arrival greeting.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-[#E7E2DA] hover:border-[#14213D] text-[#1C1917] text-xs font-semibold uppercase tracking-[0.08em]"
              >
                Close
              </button>

              <button
                onClick={() => onBookSuite(suite)}
                className="gold-button flex-1 sm:flex-initial px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
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
