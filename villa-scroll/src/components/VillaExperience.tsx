"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import CanvasPreloader, { CanvasPreloaderHandle } from "./CanvasPreloader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

import TourChapterOverlay from "./TourChapterOverlay";
import AmenitiesSection from "./AmenitiesSection";
import TestimonialsSection from "./TestimonialsSection";
import LocationSection from "./LocationSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import BookingDrawer from "./BookingDrawer";
import { TourChapter } from "@/data/hotelData";

const TOTAL_FRAMES = 865;
const SCROLL_DISTANCE = TOTAL_FRAMES * 5; // ~4325px pinned scroll

export default function VillaExperience() {
  // Preloading states
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isFullyCached, setIsFullyCached] = useState<boolean>(false);

  // Active frame state for HUD
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);

  // Currency selection
  const [currency, setCurrency] = useState<string>("USD");
  const currencySymbol =
    currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "¥";

  // Booking Drawer states
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingSuiteId, setBookingSuiteId] = useState<string>("grand-villa");
  const [bookingCheckIn, setBookingCheckIn] = useState<string>("");
  const [bookingCheckOut, setBookingCheckOut] = useState<string>("");
  const [bookingAdults, setBookingAdults] = useState<number>(2);
  const [bookingChildren, setBookingChildren] = useState<number>(0);

  // Element and frame references
  const containerRef = useRef<HTMLDivElement | null>(null);
  const preloaderRef = useRef<CanvasPreloaderHandle | null>(null);
  const lastFrameRef = useRef<number>(-1);
  const rafPendingRef = useRef<number | null>(null);
  const autoTourRafRef = useRef<number | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Setup GSAP ScrollTrigger for 1-to-1 scroll scrubbing
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let hudRafId: number | null = null;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      triggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${SCROLL_DISTANCE}`,
        pin: true,
        scrub: false,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.floor(self.progress * (TOTAL_FRAMES - 1)) + 1)
          );

          if (frameIndex === lastFrameRef.current) return;
          lastFrameRef.current = frameIndex;

          // Sync canvas redraw with display refresh
          if (rafPendingRef.current !== null) {
            cancelAnimationFrame(rafPendingRef.current);
          }
          rafPendingRef.current = requestAnimationFrame(() => {
            rafPendingRef.current = null;
            preloaderRef.current?.renderFrame(frameIndex);
          });

          // Smoothly update HUD frame state without bottlenecking scroll
          if (hudRafId === null) {
            hudRafId = requestAnimationFrame(() => {
              hudRafId = null;
              setCurrentFrame(frameIndex);
            });
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (rafPendingRef.current !== null) cancelAnimationFrame(rafPendingRef.current);
      if (hudRafId !== null) cancelAnimationFrame(hudRafId);
      if (autoTourRafRef.current !== null) cancelAnimationFrame(autoTourRafRef.current);
    };
  }, []);

  // Jump to specific chapter
  const handleSelectChapter = useCallback((chapter: TourChapter) => {
    setIsAutoTour(false);
    if (!containerRef.current || !triggerRef.current) return;

    const trigger = triggerRef.current;
    const progress = (chapter.startFrame - 1) / (TOTAL_FRAMES - 1);
    const targetScroll = trigger.start + progress * SCROLL_DISTANCE;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // Toggle Auto-Tour Playback
  const handleToggleAutoTour = useCallback(() => {
    setIsAutoTour((prev) => {
      const next = !prev;
      if (!next) {
        if (autoTourRafRef.current !== null) {
          cancelAnimationFrame(autoTourRafRef.current);
          autoTourRafRef.current = null;
        }
      }
      return next;
    });
  }, []);

  // Run auto tour scroll loop
  useEffect(() => {
    if (!isAutoTour) {
      if (autoTourRafRef.current !== null) {
        cancelAnimationFrame(autoTourRafRef.current);
        autoTourRafRef.current = null;
      }
      return;
    }

    const speed = 2.8; // px per tick
    const loop = () => {
      if (!triggerRef.current) return;
      const trigger = triggerRef.current;

      if (window.scrollY < trigger.start) {
        window.scrollTo({ top: trigger.start });
      } else if (window.scrollY >= trigger.end) {
        window.scrollTo({ top: trigger.start });
      } else {
        window.scrollBy(0, speed);
      }

      autoTourRafRef.current = requestAnimationFrame(loop);
    };

    autoTourRafRef.current = requestAnimationFrame(loop);

    return () => {
      if (autoTourRafRef.current !== null) {
        cancelAnimationFrame(autoTourRafRef.current);
        autoTourRafRef.current = null;
      }
    };
  }, [isAutoTour]);

  // Handle Quick Booking from bar or modal
  const handleOpenBooking = (suiteId?: string) => {
    if (suiteId) {
      setBookingSuiteId(suiteId);
    }
    setIsBookingOpen(true);
  };



  return (
    <div className="relative bg-zinc-950 text-white min-h-screen selection:bg-amber-400 selection:text-black">
      {/* Royal Luxury Navigation Header (Transparent overlay) */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Pinned 4K Cinematic Canvas Section */}
      <div id="virtual-tour" className="relative w-full">
        <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black">
          {/* Canvas Component with 150-frame instant precache & background queue */}
          <CanvasPreloader
            ref={preloaderRef}
            totalFrames={TOTAL_FRAMES}
            initialFramesCount={150}
            framesDir="/frames"
            onInitialLoadComplete={() => {
              setIsReady(true);
              preloaderRef.current?.renderFrame(1);
              lastFrameRef.current = 1;
            }}
            onAllFramesLoaded={() => setIsFullyCached(true)}
            title="AURA SANCTUARY"
            subtitle="Private Waterfront Villa & Resort"
            className="w-full h-full"
          />

          {/* Interactive Chapter HUD on Canvas */}
          <TourChapterOverlay
            currentFrame={currentFrame}
            totalFrames={TOTAL_FRAMES}
            onSelectChapter={handleSelectChapter}
            isAutoTour={isAutoTour}
            onToggleAutoTour={handleToggleAutoTour}
            onReserveSuite={handleOpenBooking}
          />

          {/* Subtle Bottom Scroll Hint */}
          {currentFrame <= 20 && (
            <div className="absolute inset-x-0 bottom-6 pointer-events-none flex flex-col items-center justify-center z-30 animate-pulse">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-300">
                Scroll or Select a Chapter Above to Explore
              </span>
              <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1 mt-2">
                <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </div>



      {/* Resort Amenities & Experiences */}
      <AmenitiesSection onOpenBooking={() => handleOpenBooking()} />

      {/* Forbes 5-Star Accolades & Guest Testimonials */}
      <TestimonialsSection />

      {/* Geographic Location & Helicopter Transfers */}
      <LocationSection onOpenBooking={() => handleOpenBooking()} />

      {/* Guest Inquiries & FAQ */}
      <FAQSection />

      {/* Editorial Luxury Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Reservation Drawer */}
      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedSuiteId={bookingSuiteId}
        initialCheckIn={bookingCheckIn}
        initialCheckOut={bookingCheckOut}
        initialAdults={bookingAdults}
        initialChildren={bookingChildren}
        currencySymbol={currencySymbol}
      />
    </div>
  );
}
