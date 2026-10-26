"use client";

import React, { useState, useMemo } from "react";
import { HOTEL_SUITES, BOOKING_ADD_ONS, SuiteItem, AddOnItem } from "@/data/hotelData";
import {
  CloseIcon,
  CheckIcon,
  CalendarIcon,
  UsersIcon,
  BedIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
} from "./Icons";

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedSuiteId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  currencySymbol: string;
}

export default function BookingDrawer({
  isOpen,
  onClose,
  preSelectedSuiteId,
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  initialChildren = 0,
  currencySymbol,
}: BookingDrawerProps) {
  // Stepper state: 1 = Dates & Suite, 2 = Upgrades, 3 = Guest Details & Payment, 4 = Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const today = new Date();
  const defaultIn = initialCheckIn || new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const defaultOut = initialCheckOut || new Date(today.getTime() + 19 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState<string>(defaultIn);
  const [checkOut, setCheckOut] = useState<string>(defaultOut);
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(
    preSelectedSuiteId && HOTEL_SUITES.some((s) => s.id === preSelectedSuiteId)
      ? preSelectedSuiteId
      : HOTEL_SUITES[0].id
  );
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);

  // Selected add-ons set
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(["caviar-welcome"]);

  // Guest details
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [pillowMenu, setPillowMenu] = useState<string>("Hungarian Goose Down");
  const [champagnePreference, setChampagnePreference] = useState<string>("Dom Pérignon Vintage");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string>("");

  // Confirmation ID
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  // Sync when preSelectedSuiteId changes
  React.useEffect(() => {
    if (preSelectedSuiteId && HOTEL_SUITES.some((s) => s.id === preSelectedSuiteId)) {
      setSelectedSuiteId(preSelectedSuiteId);
    }
  }, [preSelectedSuiteId]);

  // Selected Suite object
  const selectedSuite = useMemo(() => {
    return HOTEL_SUITES.find((s) => s.id === selectedSuiteId) || HOTEL_SUITES[0];
  }, [selectedSuiteId]);

  // Calculate nights
  const numberOfNights = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, isNaN(diff) ? 5 : diff);
  }, [checkIn, checkOut]);

  // Calculate costs
  const suiteSubtotal = selectedSuite.pricePerNight * numberOfNights;

  const addOnsSubtotal = useMemo(() => {
    return selectedAddOnIds.reduce((total, id) => {
      const item = BOOKING_ADD_ONS.find((a) => a.id === id);
      return total + (item ? item.price : 0);
    }, 0);
  }, [selectedAddOnIds]);

  const discountAmount = appliedPromo ? Math.round((suiteSubtotal + addOnsSubtotal) * 0.1) : 0;
  const taxableAmount = suiteSubtotal + addOnsSubtotal - discountAmount;
  const resortTaxAndService = Math.round(taxableAmount * 0.12);
  const grandTotal = taxableAmount + resortTaxAndService;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "VIPLUXURY" || code === "SUMMER2026" || code === "AURA10") {
      setAppliedPromo(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promotional voucher. Try 'VIPLUXURY'");
    }
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      alert("Please enter your name and email address to confirm your reservation.");
      return;
    }
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setConfirmationCode(`AURA-2026-${randomNum}`);
    setCurrentStep(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Drawer Panel */}
      <div className="relative w-full max-w-2xl h-full bg-zinc-950 border-l border-amber-500/30 flex flex-col justify-between shadow-2xl z-10 overflow-hidden text-white">
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 bg-zinc-900/60 backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400">
              Private Reservation Concierge
            </span>
            <h2 className="text-xl sm:text-2xl font-serif mt-0.5 text-white">
              {currentStep === 4 ? "Reservation Confirmed" : "Curate Your Sanctuary Stay"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-amber-400 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Stepper Progress Indicator (Steps 1-3) */}
        {currentStep < 4 && (
          <div className="px-6 py-3 bg-zinc-900/30 border-b border-white/5 flex items-center justify-between text-xs font-mono">
            {[
              { num: 1, label: "Stay & Suite" },
              { num: 2, label: "VIP Add-Ons" },
              { num: 3, label: "Guest Profile" },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => {
                  if (currentStep > s.num) setCurrentStep(s.num);
                }}
                disabled={currentStep < s.num}
                className={`flex items-center gap-2 transition-colors ${
                  currentStep === s.num
                    ? "text-amber-300 font-semibold"
                    : currentStep > s.num
                    ? "text-zinc-300 hover:text-white"
                    : "text-zinc-600 cursor-not-allowed"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep === s.num
                      ? "bg-amber-400 text-zinc-950 font-bold"
                      : currentStep > s.num
                      ? "bg-amber-400/20 text-amber-300"
                      : "bg-white/5 text-zinc-600"
                  }`}
                >
                  {currentStep > s.num ? "✓" : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: Stay & Suite Selection */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Dates & Nights */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-3">
                  1. Dates of Stay ({numberOfNights} Nights)
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 block mb-1">Check-In Date</span>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block mb-1">Check-Out Date</span>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Selector */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-3">
                  2. Traveling Party
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-white/10">
                    <span className="text-xs text-zinc-300">Adults</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={adults <= 1}
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        disabled={adults >= 10}
                        onClick={() => setAdults(adults + 1)}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-white/10">
                    <span className="text-xs text-zinc-300">Children</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={children <= 0}
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono w-4 text-center">{children}</span>
                      <button
                        type="button"
                        disabled={children >= 6}
                        onClick={() => setChildren(children + 1)}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suite Selection Cards */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-3">
                  3. Select Luxury Accommodation
                </label>
                <div className="space-y-3">
                  {HOTEL_SUITES.map((suite) => {
                    const isSelected = suite.id === selectedSuiteId;
                    return (
                      <div
                        key={suite.id}
                        onClick={() => setSelectedSuiteId(suite.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                          isSelected
                            ? "bg-amber-400/10 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                            : "bg-zinc-900/60 border-white/5 hover:border-white/20"
                        }`}
                      >
                        <img
                          src={suite.coverImage}
                          alt={suite.name}
                          className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-serif text-white truncate font-medium">
                              {suite.name}
                            </h4>
                            <span className="text-xs font-mono text-amber-300 font-semibold ml-2">
                              {currencySymbol}{suite.pricePerNight.toLocaleString()}/nt
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {suite.sqFt} sq.ft • {suite.bedrooms} King • {suite.bathrooms} Baths • Max {suite.maxGuests} Guests
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-amber-400 bg-amber-400 text-zinc-950 font-bold text-xs"
                              : "border-white/20"
                          }`}
                        >
                          {isSelected && "✓"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Bespoke Luxury Upgrades & Experiences */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  Tailor Your Experience
                </span>
                <h3 className="text-lg font-serif text-white">
                  Bespoke Excursions & In-Villa Services
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  Enhance your stay with private aviation, sommelier dinners, and yacht charters.
                </p>
              </div>

              <div className="space-y-3">
                {BOOKING_ADD_ONS.map((addOn) => {
                  const isChecked = selectedAddOnIds.includes(addOn.id);
                  return (
                    <div
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isChecked
                          ? "bg-amber-400/10 border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                          : "bg-zinc-900/60 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked
                              ? "border-amber-400 bg-amber-400 text-zinc-950 font-bold text-xs"
                              : "border-white/20 bg-black/40"
                          }`}
                        >
                          {isChecked && "✓"}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{addOn.name}</h4>
                          <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
                            {addOn.description}
                          </p>
                          <span className="inline-block mt-2 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-amber-400">
                            {addOn.category}
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 font-mono text-xs">
                        <span className="text-amber-300 font-semibold">
                          +{currencySymbol}{addOn.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-zinc-500 block">{addOn.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details & Preferences */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalBooking} className="space-y-5 animate-fadeIn">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  VIP Guest Registry
                </span>
                <h3 className="text-lg font-serif text-white">Guest Information & Preferences</h3>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Victoria Sterling"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="concierge@private.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Bespoke Butler Preferences */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  Bespoke In-Suite Preferences
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Pillow Menu</label>
                    <select
                      value={pillowMenu}
                      onChange={(e) => setPillowMenu(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-xs focus:outline-none cursor-pointer"
                    >
                      <option>Hungarian Goose Down</option>
                      <option>Organic Mulberry Silk</option>
                      <option>Orthopedic Memory Foam</option>
                      <option>Lavender Infused Aromatherapy</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Arrival Champagne</label>
                    <select
                      value={champagnePreference}
                      onChange={(e) => setChampagnePreference(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-xs focus:outline-none cursor-pointer"
                    >
                      <option>Dom Pérignon Vintage 2013</option>
                      <option>Krug Grande Cuvée 170th Edition</option>
                      <option>Louis Roederer Cristal 2014</option>
                      <option>Non-Alcoholic Artisanal Botanical Elixir</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1">Special Occasion & Dietary Requests</label>
                  <textarea
                    rows={2}
                    placeholder="Anniversary, private dietary restrictions, bespoke itinerary requests..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>
              </div>

              {/* Promotional Code */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-2">
                  Promotional or VIP Access Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. VIPLUXURY)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 rounded-xl text-xs font-mono uppercase transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-emerald-400 text-[11px] font-mono mt-1.5 flex items-center gap-1">
                    ✓ VIP Voucher Applied: 10% Exclusive Direct Privilege
                  </p>
                )}
                {promoError && (
                  <p className="text-rose-400 text-[11px] font-mono mt-1.5">{promoError}</p>
                )}
              </div>
            </form>
          )}

          {/* STEP 4: Reservation Confirmation */}
          {currentStep === 4 && (
            <div className="py-6 space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 mx-auto shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <CheckIcon size={32} />
              </div>

              <div>
                <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase">
                  Reservation Confirmed
                </span>
                <h3 className="text-3xl font-serif text-white mt-1">
                  We Await Your Arrival, {guestName || "Distinguished Guest"}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-md mx-auto font-light">
                  Your private sanctuary has been secured. Your dedicated VIP Butler will contact you
                  48 hours prior to arrange bespoke arrivals and transfers.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/30 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-zinc-400">Booking Reference</span>
                  <span className="text-amber-300 font-bold">{confirmationCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Accommodation</span>
                  <span className="text-white text-right font-serif text-sm">{selectedSuite.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Dates of Stay</span>
                  <span className="text-white">{checkIn} → {checkOut} ({numberOfNights} Nights)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Guests</span>
                  <span className="text-white">{adults} Adults {children > 0 ? `, ${children} Children` : ""}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Arrival Champagne</span>
                  <span className="text-white text-right truncate max-w-[200px]">{champagnePreference}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-2 text-sm font-semibold">
                  <span className="text-zinc-300 font-sans">Total Reserved</span>
                  <span className="text-amber-300">{currencySymbol}{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase hover:bg-white/5 transition-colors"
                >
                  Print Voucher
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto gold-button px-8 py-2.5 rounded-full text-xs font-semibold uppercase shadow-xl"
                >
                  Return to Resort Tour
                </button>
              </div>
            </div>
          )}

          {/* Pricing Breakdown Summary (Steps 1-3) */}
          {currentStep < 4 && (
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-300">
                <span>
                  {selectedSuite.name.slice(0, 24)}... × {numberOfNights} Nights
                </span>
                <span>{currencySymbol}{suiteSubtotal.toLocaleString()}</span>
              </div>

              {addOnsSubtotal > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>Bespoke Add-Ons ({selectedAddOnIds.length})</span>
                  <span>+{currencySymbol}{addOnsSubtotal.toLocaleString()}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Direct Privilege (10%)</span>
                  <span>-{currencySymbol}{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-400 text-[11px]">
                <span>Luxury Tax & Resort Surcharge (12%)</span>
                <span>{currencySymbol}{resortTaxAndService.toLocaleString()}</span>
              </div>

              <div className="border-t border-white/10 pt-2 flex justify-between items-baseline font-serif text-base text-white">
                <span className="font-sans text-xs uppercase tracking-wider text-amber-400 font-mono">
                  Grand Total
                </span>
                <span className="text-2xl text-amber-300 font-serif">
                  {currencySymbol}{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Bottom Actions (Steps 1-3) */}
        {currentStep < 4 && (
          <div className="p-6 border-t border-white/10 bg-zinc-900/60 backdrop-blur-md flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : (
              <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
                <ShieldCheckIcon size={14} className="text-amber-400" />
                <span>Zero Booking Fees</span>
              </div>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="gold-button px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl"
              >
                <span>Continue to {currentStep === 1 ? "Experiences" : "Guest Info"}</span>
                <ChevronRightIcon size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalBooking}
                className="gold-button px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl"
              >
                <SparklesIcon size={14} />
                <span>Confirm Reservation</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
