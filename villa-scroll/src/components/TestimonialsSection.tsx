"use client";

import React from "react";
import { GUEST_REVIEWS } from "@/data/hotelData";
import { StarIcon, AwardIcon, ShieldCheckIcon } from "./Icons";

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="relative z-20 bg-zinc-950 px-4 sm:px-8 py-24 sm:py-32 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Accolades Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-zinc-900/40 border border-amber-500/20 mb-20 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
              <AwardIcon size={24} />
            </div>
            <div className="text-white font-serif text-lg font-medium">Forbes Travel Guide</div>
            <div className="text-amber-400 text-xs font-mono tracking-widest uppercase mt-1">
              5-Star Verified Hotel 2026
            </div>
            <p className="text-zinc-400 text-xs mt-2 max-w-xs font-light">
              Awarded the highest global hospitality rating for intuitive butler service and architecture.
            </p>
          </div>

          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
              <StarIcon size={24} />
            </div>
            <div className="text-white font-serif text-lg font-medium">Michelin Guide</div>
            <div className="text-amber-400 text-xs font-mono tracking-widest uppercase mt-1">
              Three Michelin Keys Distinction
            </div>
            <p className="text-zinc-400 text-xs mt-2 max-w-xs font-light">
              Honored as an extraordinary stay with bespoke culinary mastery and exceptional sanctuary setting.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
              <ShieldCheckIcon size={24} />
            </div>
            <div className="text-white font-serif text-lg font-medium">World Travel Awards</div>
            <div className="text-amber-400 text-xs font-mono tracking-widest uppercase mt-1">
              #1 Private Waterfront Estate
            </div>
            <p className="text-zinc-400 text-xs mt-2 max-w-xs font-light">
              Voted Europe's leading private luxury villa retreat by discerning global travelers.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            Guest Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide leading-tight">
            Words From Our Distinguished Guests
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            From royal families to global luminaries, discover what makes a stay at Aura Sanctuary
            an indelible lifetime memory.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUEST_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} size={16} />
                  ))}
                </div>

                <h3 className="text-lg font-serif text-white mb-3">
                  "{review.title}"
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                  {review.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-xs font-serif">
                    {review.author}
                  </div>
                  <div className="text-zinc-500 text-[10px] font-mono">
                    {review.location}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-amber-400/80 font-mono block">
                    {review.stayType}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono">
                    ✓ Verified Stay
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
