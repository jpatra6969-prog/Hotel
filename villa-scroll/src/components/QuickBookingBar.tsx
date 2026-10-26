"use client";

import React, { useState } from "react";
import { CalendarIcon, UsersIcon, BedIcon, ChevronDownIcon } from "./Icons";
import { HOTEL_SUITES } from "@/data/hotelData";

interface QuickBookingBarProps {
  onCheckAvailability: (details: {
    checkIn: string;
    checkOut: string;
    suiteId: string;
    adults: number;
    children: number;
  }) => void;
  currencySymbol: string;
}

export default function QuickBookingBar({ onCheckAvailability, currencySymbol }: QuickBookingBarProps) {
  // Default to sensible future dates
  const today = new Date();
  const defaultCheckIn = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const defaultCheckOut = new Date(today.getTime() + 19 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState<string>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<string>(defaultCheckOut);
  const [suiteId, setSuiteId] = useState<string>("all");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [guestPickerOpen, setGuestPickerOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      suiteId,
      adults,
      children,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-30">
      <div className="glass-panel-gold rounded-3xl p-4 sm:p-6 shadow-2xl border border-amber-500/30">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Check-in & Check-out Dates */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-black/40 border border-white/5 hover:border-amber-400/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 flex items-center gap-1.5">
              <CalendarIcon size={12} />
              Dates of Stay
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[9px] text-zinc-400 block mb-0.5">Check-In</label>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 block mb-0.5">Check-Out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Suite / Accommodation Selector */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-black/40 border border-white/5 hover:border-amber-400/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 flex items-center gap-1.5">
              <BedIcon size={12} />
              Accommodation
            </span>
            <div className="relative">
              <select
                value={suiteId}
                onChange={(e) => setSuiteId(e.target.value)}
                className="w-full bg-transparent text-white font-serif text-sm focus:outline-none cursor-pointer pr-6 appearance-none"
              >
                <option value="all" className="bg-zinc-900 text-white">
                  All Suites & Residences
                </option>
                {HOTEL_SUITES.map((s) => (
                  <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                    {s.name} ({currencySymbol}{s.pricePerNight}/nt)
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} className="absolute right-0 top-1 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Guests Count Dropdown */}
          <div className="relative">
            <div
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="flex flex-col gap-1.5 p-3 rounded-2xl bg-black/40 border border-white/5 hover:border-amber-400/30 transition-colors cursor-pointer"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 flex items-center gap-1.5">
                <UsersIcon size={12} />
                Guests
              </span>
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-serif text-sm">
                  {adults} Adult{adults > 1 ? "s" : ""}{children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}
                </span>
                <ChevronDownIcon size={14} className="text-zinc-400" />
              </div>
            </div>

            {/* Guest Popover */}
            {guestPickerOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-4 shadow-2xl z-40 animate-fadeIn">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <div>
                    <div className="text-xs font-medium text-white">Adults</div>
                    <div className="text-[10px] text-zinc-400">Ages 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdults(Math.max(1, adults - 1));
                      }}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 12}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdults(adults + 1);
                      }}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-xs font-medium text-white">Children</div>
                    <div className="text-[10px] text-zinc-400">Ages 0-12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChildren(Math.max(0, children - 1));
                      }}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono w-4 text-center">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChildren(children + 1);
                      }}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGuestPickerOpen(false);
                  }}
                  className="w-full mt-3 py-1.5 bg-amber-400/20 text-amber-300 rounded-lg text-[11px] font-mono uppercase tracking-wider hover:bg-amber-400/30"
                >
                  Confirm Guests
                </button>
              </div>
            )}
          </div>

          {/* Check Availability CTA */}
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="gold-button w-full py-4 px-6 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xl group"
            >
              <span>Check Availability</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </form>

        {/* Guarantee Pills */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-400 font-light">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Best Direct Rate Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Flexible 14-Day Cancellation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Complimentary Champagne & VIP Butler</span>
          </div>
        </div>
      </div>
    </div>
  );
}
