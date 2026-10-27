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
    <section id="booking-bar" className="relative z-30 bg-[#FAF8F5] py-8 sm:py-12 font-sans border-b border-[#E7E2DA]">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#E7E2DA]">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Check-in & Check-out Dates */}
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8923A] transition-colors">
            <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#57534E] flex items-center gap-1.5">
              <CalendarIcon size={13} className="text-[#B8923A]" />
              Dates of Stay
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-[#57534E] block mb-0.5 font-medium">Check-In</label>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent text-[#1C1917] font-sans font-medium text-xs focus:outline-none cursor-pointer tabular-nums"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#57534E] block mb-0.5 font-medium">Check-Out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-[#1C1917] font-sans font-medium text-xs focus:outline-none cursor-pointer tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* Suite / Accommodation Selector */}
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8923A] transition-colors">
            <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#57534E] flex items-center gap-1.5">
              <BedIcon size={13} className="text-[#B8923A]" />
              Accommodation
            </span>
            <div className="relative">
              <select
                value={suiteId}
                onChange={(e) => setSuiteId(e.target.value)}
                className="w-full bg-transparent text-[#1C1917] font-serif text-sm focus:outline-none cursor-pointer pr-6 appearance-none font-medium"
              >
                <option value="all" className="bg-white text-[#1C1917]">
                  All Suites &amp; Residences
                </option>
                {HOTEL_SUITES.map((s) => (
                  <option key={s.id} value={s.id} className="bg-white text-[#1C1917]">
                    {s.name} ({currencySymbol}{s.pricePerNight}/nt)
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} className="absolute right-0 top-1 text-[#57534E] pointer-events-none" />
            </div>
          </div>

          {/* Guests Count Dropdown */}
          <div className="relative">
            <div
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="flex flex-col gap-1 p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8923A] transition-colors cursor-pointer"
            >
              <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#57534E] flex items-center gap-1.5">
                <UsersIcon size={13} className="text-[#B8923A]" />
                Guests
              </span>
              <div className="flex items-center justify-between text-xs text-[#1C1917]">
                <span className="font-sans text-sm font-medium tabular-nums">
                  {adults} Adult{adults > 1 ? "s" : ""}{children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}
                </span>
                <ChevronDownIcon size={14} className="text-[#57534E]" />
              </div>
            </div>

            {/* Guest Popover */}
            {guestPickerOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-xl shadow-md border border-[#E7E2DA] z-40 animate-fadeIn">
                <div className="flex items-center justify-between py-2 border-b border-[#E7E2DA]">
                  <div>
                    <div className="text-xs font-semibold text-[#1C1917]">Adults</div>
                    <div className="text-[11px] text-[#57534E]">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdults(Math.max(1, adults - 1));
                      }}
                      className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#E7E2DA] text-[#1C1917] flex items-center justify-center hover:border-[#B8923A] disabled:opacity-30 disabled:cursor-not-allowed font-medium"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[#1C1917] w-4 text-center tabular-nums">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 12}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdults(adults + 1);
                      }}
                      className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#E7E2DA] text-[#1C1917] flex items-center justify-center hover:border-[#B8923A] disabled:opacity-30 font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-xs font-semibold text-[#1C1917]">Children</div>
                    <div className="text-[11px] text-[#57534E]">Ages 0-12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChildren(Math.max(0, children - 1));
                      }}
                      className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#E7E2DA] text-[#1C1917] flex items-center justify-center hover:border-[#B8923A] disabled:opacity-30 font-medium"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[#1C1917] w-4 text-center tabular-nums">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 8}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChildren(children + 1);
                      }}
                      className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#E7E2DA] text-[#1C1917] flex items-center justify-center hover:border-[#B8923A] disabled:opacity-30 font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestPickerOpen(false)}
                  className="w-full mt-3 py-2 bg-[#14213D] text-white rounded-lg text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[#1d2f57]"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Check Availability CTA */}
          <div>
            <button
              type="submit"
              className="gold-button w-full py-3.5 px-6 rounded-xl text-xs uppercase tracking-[0.08em] font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Check Availability</span>
              <span>→</span>
            </button>
          </div>
        </form>

        {/* Guarantee Points */}
        <div className="mt-4 pt-3.5 border-t border-[#E7E2DA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="font-medium">Best Direct Rate Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="font-medium">Flexible 14-Day Cancellation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="font-medium">Complimentary Champagne &amp; Butler</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
