"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import CanvasPreloader, { CanvasPreloaderHandle } from "./CanvasPreloader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

import TourChapterOverlay from "./TourChapterOverlay";
import QuickBookingBar from "./QuickBookingBar";
import EstateStorySection from "./EstateStorySection";
import SuitesShowcase from "./SuitesShowcase";
import AmenitiesSection from "./AmenitiesSection";
import GastronomySection from "./GastronomySection";
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

  const currencySymbol = "$";

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

  // Jump to specific frame smoothly
  const handleJumpToFrame = useCallback((frame: number) => {
    setIsAutoTour(false);
    if (!containerRef.current || !triggerRef.current) return;

    const trigger = triggerRef.current;
    const progress = (frame - 1) / (TOTAL_FRAMES - 1);
    const targetScroll = trigger.start + progress * SCROLL_DISTANCE;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // Jump to specific chapter
  const handleSelectChapter = useCallback((chapter: TourChapter) => {
    handleJumpToFrame(chapter.startFrame);
  }, [handleJumpToFrame]);

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

  // Handle Quick Booking from bar, cards or modal
  const handleOpenBooking = (suiteId?: string) => {
    if (suiteId) {
      setBookingSuiteId(suiteId);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="relative bg-[#FAF8F5] text-[#1C1917] min-h-screen selection:bg-[#B8923A] selection:text-white font-sans">
      {/* Luxury Navigation Header with Atmospheric Scrim */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Pinned 4K Spatial Canvas Tour Section (Dramatic Softer Dark #12141A Hero) */}
      <div id="virtual-tour" className="relative w-full bg-[#12141A] scroll-mt-20">
        <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-[#12141A]">
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

          {/* Luxury Sanctuary Editorial Card & Chapter Timeline */}
          <TourChapterOverlay
            currentFrame={currentFrame}
            totalFrames={TOTAL_FRAMES}
            onSelectChapter={handleSelectChapter}
            isAutoTour={isAutoTour}
            onToggleAutoTour={handleToggleAutoTour}
            onReserveSuite={handleOpenBooking}
          />
        </div>
      </div>

      {/* Integrated Luxury Quick Booking Bar */}
      <QuickBookingBar
        onCheckAvailability={(details) => {
          setBookingCheckIn(details.checkIn);
          setBookingCheckOut(details.checkOut);
          if (details.suiteId !== "all") {
            setBookingSuiteId(details.suiteId);
          }
          setBookingAdults(details.adults);
          setBookingChildren(details.children);
          setIsBookingOpen(true);
        }}
        currencySymbol={currencySymbol}
      />

      {/* Architectural Heritage & Spatial Exploration Guide */}
      <EstateStorySection
        onJumpToTourChapter={(startFrame) => handleJumpToFrame(startFrame)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Accommodations Showcase: Suites, Penthouses & Private Residences */}
      <SuitesShowcase
        onSelectSuiteForBooking={(suite) => {
          setBookingSuiteId(suite.id);
          setIsBookingOpen(true);
        }}
        onJumpToTourFrame={(frame) => handleJumpToFrame(frame)}
        currencySymbol={currencySymbol}
      />

      {/* Resort Amenities & Curated Experiences */}
      <AmenitiesSection onOpenBooking={() => handleOpenBooking()} />

      {/* Epicurean Gastronomy & Sommelier Cellar */}
      <GastronomySection onOpenBooking={() => handleOpenBooking()} />

      {/* Forbes 5-Star Accolades & Verified Guest Testimonials */}
      <TestimonialsSection />

      {/* Geographic Location & Helicopter Transfers */}
      <LocationSection onOpenBooking={() => handleOpenBooking()} />

      {/* Guest Inquiries & FAQ */}
      <FAQSection />

      {/* Editorial Luxury Brand Footer */}
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
