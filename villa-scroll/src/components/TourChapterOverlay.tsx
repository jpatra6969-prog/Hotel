"use client";

import React, { useMemo } from "react";
import { TOUR_CHAPTERS, TourChapter } from "@/data/hotelData";
import { BedIcon, PauseIcon, PlayIcon } from "./Icons";

interface TourChapterOverlayProps {
  currentFrame: number;
  totalFrames?: number;
  onReserveSuite: (suiteId?: string) => void;
  onSelectChapter?: (chapter: TourChapter) => void;
  isAutoTour?: boolean;
  onToggleAutoTour?: () => void;
}

const CHAPTER_SHORT_LABELS: Record<string, string> = {
  arrival: "01 Arrival",
  lounge: "02 Sunset Lounge",
  dining: "03 Dining Suite",
  bath: "04 Marble Spa",
  pool: "05 Twilight Pool",
};

export default function TourChapterOverlay({
  currentFrame,
  totalFrames = 865,
  onReserveSuite,
  onSelectChapter,
  isAutoTour = false,
  onToggleAutoTour,
}: TourChapterOverlayProps) {
  // Determine which chapter is active based on current frame
  const activeChapter = useMemo(() => {
    return (
      TOUR_CHAPTERS.find(
        (ch) => currentFrame >= ch.startFrame && currentFrame <= ch.endFrame
      ) || TOUR_CHAPTERS[0]
    );
  }, [currentFrame]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end p-4 sm:p-6 lg:p-8 pb-5 sm:pb-7 select-none">
      {/* Bottom Soft Dark Scrim for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#12141A] via-[#12141A]/60 to-transparent pointer-events-none -z-10" />

      {/* Main Bottom HUD Row */}
      <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-4 sm:gap-6 pointer-events-none">
        {/* Left: Sanctuary Space Card - Solid Softer Dark #12141A, compact editorial height */}
        <div className="pointer-events-auto w-full max-w-md bg-[#12141A] border border-white/15 p-4 sm:p-5 rounded-2xl shadow-lg transition-all">
          {/* Chapter Pill */}
          <div className="flex items-center justify-between gap-2 mb-1.5 font-sans">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-[#B8923A] text-xs font-medium tracking-[0.08em] uppercase tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8923A]" />
              Chapter {activeChapter.number} of 05
            </span>
            <span className="text-xs uppercase tracking-[0.08em] text-zinc-300 font-medium">
              {activeChapter.title}
            </span>
          </div>

          {/* Space Title */}
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-normal leading-[1.2] line-clamp-2 mt-0.5">
            {activeChapter.subtitle}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm font-sans text-zinc-300 mt-1.5 font-normal leading-[1.5] line-clamp-2">
            {activeChapter.description}
          </p>

          {/* Feature Specs */}
          <div className="flex flex-wrap gap-1.5 mt-2.5 font-sans">
            {activeChapter.specs.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-200 font-medium"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 font-sans">
            <button
              onClick={() => onReserveSuite(activeChapter.suiteId)}
              className="gold-button flex-1 py-2 sm:py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.08em] flex items-center justify-center gap-2 transition-colors"
            >
              <BedIcon size={14} className="text-white" />
              <span>Reserve Space</span>
            </button>

            {onToggleAutoTour && (
              <button
                onClick={onToggleAutoTour}
                className={`py-2 sm:py-2.5 px-3.5 rounded-full border text-xs font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-1.5 transition-colors ${
                  isAutoTour
                    ? "bg-[#B8923A] border-[#B8923A] text-white"
                    : "bg-white/5 border-white/15 hover:border-[#B8923A] text-zinc-200 hover:text-white"
                }`}
                title="Toggle smooth automated tour"
              >
                {isAutoTour ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
                <span>{isAutoTour ? "Pause" : "Auto Tour"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Scroll to Explore Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.08em] text-zinc-300 bg-[#12141A] px-4 py-2 rounded-full border border-white/15 shadow-sm">
          <span>Scroll to Explore</span>
          <span className="text-[#B8923A] font-semibold">↓</span>
        </div>
      </div>
    </div>
  );
}
