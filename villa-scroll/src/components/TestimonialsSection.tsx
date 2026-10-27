"use client";

import React from "react";
import { GUEST_REVIEWS } from "@/data/hotelData";
import { StarIcon, AwardIcon, ShieldCheckIcon } from "./Icons";

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="relative z-20 bg-[#FAF8F5] px-4 sm:px-8 py-24 sm:py-32 border-t border-[#E7E2DA] font-sans scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Accolades Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 sm:p-10 rounded-2xl bg-white border border-[#E7E2DA] shadow-sm mb-20 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#B8923A]/10 border border-[#B8923A]/30 flex items-center justify-center text-[#B8923A] mb-3">
              <AwardIcon size={24} />
            </div>
            <div className="text-[#1C1917] font-serif text-xl font-medium">Forbes Travel Guide</div>
            <div className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase mt-1">
              5-Star Verified Hotel 2026
            </div>
            <p className="text-[#57534E] text-xs mt-2 max-w-xs font-normal leading-[1.6]">
              Awarded the highest global hospitality rating for intuitive butler service and architecture.
            </p>
          </div>

          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-[#E7E2DA] py-6 md:py-0">
            <div className="w-12 h-12 rounded-full bg-[#B8923A]/10 border border-[#B8923A]/30 flex items-center justify-center text-[#B8923A] mb-3">
              <StarIcon size={24} />
            </div>
            <div className="text-[#1C1917] font-serif text-xl font-medium">Michelin Guide</div>
            <div className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase mt-1">
              Three Michelin Keys Distinction
            </div>
            <p className="text-[#57534E] text-xs mt-2 max-w-xs font-normal leading-[1.6]">
              Honored as an extraordinary stay with bespoke culinary mastery and exceptional sanctuary setting.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#B8923A]/10 border border-[#B8923A]/30 flex items-center justify-center text-[#B8923A] mb-3">
              <ShieldCheckIcon size={24} />
            </div>
            <div className="text-[#1C1917] font-serif text-xl font-medium">World Travel Awards</div>
            <div className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase mt-1">
              #1 Private Waterfront Estate
            </div>
            <p className="text-[#57534E] text-xs mt-2 max-w-xs font-normal leading-[1.6]">
              Voted Europe's leading private luxury villa retreat by discerning global travelers.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase block mb-3">
            Guest Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917] tracking-normal leading-[1.2]">
            Words From Our Distinguished Guests
          </h2>
          <p className="text-[#57534E] text-base mt-4 font-normal leading-[1.6]">
            Unfiltered reflections from leaders, artists, and families who have experienced the absolute
            privacy of the peninsula.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUEST_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-2xl bg-white border border-[#E7E2DA] shadow-sm hover:border-[#B8923A] transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#B8923A] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <StarIcon key={i} size={14} className="fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#1C1917] text-base font-serif italic leading-[1.6] mb-6">
                  "{rev.content}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-[#E7E2DA] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#1C1917]">{rev.author}</div>
                  <div className="text-[#57534E]">{rev.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#B8923A] font-medium">{rev.stayType}</div>
                  <div className="text-[#57534E] text-[11px] font-normal">{rev.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
