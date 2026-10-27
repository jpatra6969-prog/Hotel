"use client";

import React, { useState, useMemo } from "react";
import { HOTEL_SUITES, BOOKING_ADD_ONS, PAYMENT_METHODS, PaymentMethod } from "@/data/hotelData";
import { saveWebsiteReservations, readWebsiteReservations } from "@/lib/websiteReservations";
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
  const [selectedSuiteIds, setSelectedSuiteIds] = useState<string[]>([
    preSelectedSuiteId && HOTEL_SUITES.some((suite) => suite.id === preSelectedSuiteId)
      ? preSelectedSuiteId
      : HOTEL_SUITES[0].id,
  ]);
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);

  // Selected add-ons set
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(["caviar-welcome"]);

  // Guest details
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [bookingError, setBookingError] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [pillowMenu, setPillowMenu] = useState<string>("Hungarian Goose Down");
  const [champagnePreference, setChampagnePreference] = useState<string>("Dom Pérignon Vintage 2013");

  // Promo code
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string>("");

  // Confirmation state
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  // Calculate nights
  const numberOfNights = useMemo(() => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate.getTime() - inDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  const selectedSuites = useMemo(
    () => HOTEL_SUITES.filter((suite) => selectedSuiteIds.includes(suite.id)),
    [selectedSuiteIds]
  );

  // Calculate pricing breakdown
  const suiteSubtotal = useMemo(() => {
    return selectedSuites.reduce((total, suite) => total + suite.pricePerNight, 0) * numberOfNights;
  }, [selectedSuites, numberOfNights]);

  const addOnsSubtotal = useMemo(() => {
    return selectedAddOnIds.reduce((sum, id) => {
      const item = BOOKING_ADD_ONS.find((a) => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
  }, [selectedAddOnIds]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Math.round((suiteSubtotal + addOnsSubtotal) * 0.1); // 10% VIP direct discount
  }, [appliedPromo, suiteSubtotal, addOnsSubtotal]);

  const resortTaxAndService = useMemo(() => {
    const base = suiteSubtotal + addOnsSubtotal - discountAmount;
    return Math.round(base * 0.12); // 12% Italian luxury resort fee & tax
  }, [suiteSubtotal, addOnsSubtotal, discountAmount]);

  const grandTotal = useMemo(() => {
    return suiteSubtotal + addOnsSubtotal - discountAmount + resortTaxAndService;
  }, [suiteSubtotal, addOnsSubtotal, discountAmount, resortTaxAndService]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSuite = (suiteId: string) => {
    setSelectedSuiteIds((current) => {
      if (suiteId === "grand-villa") {
        return current.includes(suiteId) ? current : [suiteId];
      }

      const individualSuites = current.filter((id) => id !== "grand-villa");
      if (individualSuites.includes(suiteId)) {
        return individualSuites.length > 1
          ? individualSuites.filter((id) => id !== suiteId)
          : individualSuites;
      }

      return [...individualSuites, suiteId];
    });
  };

  const handleApplyPromo = () => {
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "VIPLUXURY" || promoCode.trim().toUpperCase() === "AURA") {
      setAppliedPromo(true);
    } else {
      setPromoError("Invalid VIP allocation code. Try 'AURA' or 'VIPLUXURY'.");
    }
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");

    if (
      !checkIn ||
      !checkOut ||
      Date.parse(checkOut) <= Date.parse(checkIn) ||
      selectedSuites.length === 0
    ) {
      setBookingError("Choose valid stay dates and at least one accommodation.");
      return;
    }

    const generatedCode = "AURA-" + Math.floor(100000 + Math.random() * 900000);
    try {
      const reservation = {
        source: "website" as const,
        id: generatedCode,
        registeredAt: new Date().toISOString(),
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim(),
        phone: guestPhone,
        vipTier: "Website Guest",
        suiteId: selectedSuites[0].id,
        suiteName: selectedSuites.map((suite) => suite.name).join(", "),
        checkIn,
        checkOut,
        nights: numberOfNights,
        guests: adults + children,
        status: "pending" as const,
        totalAmount: grandTotal,
        paymentStatus: "pending" as const,
        paymentMethod,
        specialRequests: [
          specialRequests.trim(),
          `Pillow preference: ${pillowMenu}`,
          `Champagne preference: ${champagnePreference}`,
        ]
          .filter(Boolean)
          .join(" | "),
        assignedButler: "Unassigned",
        arrivalMethod: "To be arranged",
        addons: selectedAddOnIds
          .map((id) => BOOKING_ADD_ONS.find((addOn) => addOn.id === id)?.name)
          .filter((name): name is string => Boolean(name)),
      };

      const existingReservations = readWebsiteReservations();
      saveWebsiteReservations([reservation, ...existingReservations]);
      setConfirmationCode(generatedCode);
      setCurrentStep(4);
    } catch (error) {
      console.error("Unable to save website reservation.", error);
      setBookingError("We couldn't save your reservation. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 animate-fadeIn font-sans">
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Drawer Panel */}
      <div className="relative w-full max-w-2xl h-full bg-white border-l border-[#E7E2DA] flex flex-col justify-between shadow-xl z-10 overflow-hidden text-[#1C1917]">
        {/* Top Header */}
        <div className="p-6 border-b border-[#E7E2DA]/20 bg-[#14213D] text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A]">
              Private Reservation Concierge
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-medium mt-0.5 text-white">
              {currentStep === 4 ? "Reservation Confirmed" : "Curate Your Sanctuary Stay"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Stepper Progress Indicator (Steps 1-3) */}
        {currentStep < 4 && (
          <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E7E2DA] flex items-center justify-between text-xs font-sans font-medium">
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
                    ? "text-[#14213D] font-semibold"
                    : currentStep > s.num
                    ? "text-[#57534E] hover:text-[#1C1917]"
                    : "text-zinc-400 cursor-not-allowed"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] tabular-nums font-semibold ${
                    currentStep === s.num
                      ? "bg-[#14213D] text-white"
                      : currentStep > s.num
                      ? "bg-[#B8923A] text-white"
                      : "bg-[#E7E2DA] text-[#57534E]"
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* STEP 1: Stay & Suite Selection */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Dates & Nights */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA]">
                <label className="text-xs uppercase tracking-[0.08em] font-semibold text-[#14213D] block mb-3">
                  1. Dates of Stay ({numberOfNights} Nights)
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-[#57534E] block mb-1 font-medium">Check-In Date</span>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white border border-[#E7E2DA] rounded-lg px-3 py-2 text-[#1C1917] font-sans text-xs focus:outline-none focus:border-[#B8923A] tabular-nums"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#57534E] block mb-1 font-medium">Check-Out Date</span>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white border border-[#E7E2DA] rounded-lg px-3 py-2 text-[#1C1917] font-sans text-xs focus:outline-none focus:border-[#B8923A] tabular-nums"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Selector */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA]">
                <label className="text-xs uppercase tracking-[0.08em] font-semibold text-[#14213D] block mb-3">
                  2. Traveling Party
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E7E2DA]">
                    <span className="text-xs text-[#57534E] font-medium">Adults</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={adults <= 1}
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-6 h-6 rounded-full bg-[#FAF8F5] hover:bg-[#E7E2DA] text-[#1C1917] flex items-center justify-center text-xs disabled:opacity-30 font-semibold"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold tabular-nums w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        disabled={adults >= 10}
                        onClick={() => setAdults(adults + 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF8F5] hover:bg-[#E7E2DA] text-[#1C1917] flex items-center justify-center text-xs font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E7E2DA]">
                    <span className="text-xs text-[#57534E] font-medium">Children</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={children <= 0}
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-6 h-6 rounded-full bg-[#FAF8F5] hover:bg-[#E7E2DA] text-[#1C1917] flex items-center justify-center text-xs disabled:opacity-30 font-semibold"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold tabular-nums w-4 text-center">{children}</span>
                      <button
                        type="button"
                        disabled={children >= 6}
                        onClick={() => setChildren(children + 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF8F5] hover:bg-[#E7E2DA] text-[#1C1917] flex items-center justify-center text-xs font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suite Selection Cards */}
              <div>
                <label className="text-xs uppercase tracking-[0.08em] font-semibold text-[#14213D] block mb-3">
                  3. Select Luxury Accommodation
                </label>
                <p className="text-xs text-[#57534E] mb-3">
                  Select one or more accommodations. The Full Estate buyout cannot be combined with individual suites.
                </p>
                <div className="space-y-3">
                  {HOTEL_SUITES.map((suite) => {
                    const isSelected = selectedSuiteIds.includes(suite.id);
                    return (
                      <div
                        key={suite.id}
                        onClick={() => toggleSuite(suite.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                          isSelected
                            ? "bg-[#FAF8F5] border-[#B8923A]"
                            : "bg-white border-[#E7E2DA] hover:border-[#14213D]"
                        }`}
                      >
                        <img
                          src={suite.coverImage}
                          alt={suite.name}
                          className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-serif text-[#1C1917] truncate font-medium">
                              {suite.name}
                            </h4>
                            <span className="text-xs font-sans font-semibold tabular-nums text-[#B8923A] ml-2">
                              {currencySymbol}{suite.pricePerNight.toLocaleString("en-US")}/nt
                            </span>
                          </div>
                          <p className="text-xs text-[#57534E] truncate mt-0.5">
                            {suite.sqFt.toLocaleString("en-US")} sq.ft • {suite.bedrooms} King • {suite.bathrooms} Baths • Max {suite.maxGuests} Guests
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[#B8923A] bg-[#B8923A] text-white font-bold text-xs"
                              : "border-[#E7E2DA]"
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
                <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A] block mb-1">
                  Tailor Your Experience
                </span>
                <h3 className="text-xl font-serif font-medium text-[#1C1917]">
                  Bespoke Excursions &amp; In-Villa Services
                </h3>
                <p className="text-sm text-[#57534E] font-normal mt-1">
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
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isChecked
                          ? "bg-[#FAF8F5] border-[#B8923A]"
                          : "bg-white border-[#E7E2DA] hover:border-[#14213D]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked
                              ? "border-[#B8923A] bg-[#B8923A] text-white font-bold text-xs"
                              : "border-[#E7E2DA] bg-white"
                          }`}
                        >
                          {isChecked && "✓"}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#1C1917]">{addOn.name}</h4>
                          <p className="text-xs text-[#57534E] font-normal mt-1 leading-[1.6]">
                            {addOn.description}
                          </p>
                          <span className="inline-block mt-2 text-[10px] uppercase tracking-[0.08em] font-semibold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#14213D]">
                            {addOn.category}
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 font-sans text-xs">
                        <span className="text-[#B8923A] font-semibold tabular-nums">
                          +{currencySymbol}{addOn.price.toLocaleString("en-US")}
                        </span>
                        <span className="text-[11px] text-[#57534E] block">{addOn.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details & Preferences */}
          {currentStep === 3 && (
            <form id="guest-details-form" onSubmit={handleFinalBooking} className="space-y-5 animate-fadeIn">
              <div>
                <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A] block mb-1">
                  VIP Guest Registry
                </span>
                <h3 className="text-xl font-serif font-medium text-[#1C1917]">Guest Information &amp; Preferences</h3>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#57534E] font-medium block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Singhania"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#57534E] font-medium block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      placeholder="concierge@private.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#57534E] font-medium block mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Enter a 10-digit mobile number"
                      placeholder="10-digit mobile number"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                    />
                  </div>
                </div>
              </div>

              {/* Bespoke Butler Preferences */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-3 text-xs">
                <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#14213D] block">
                  Bespoke In-Suite Preferences
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#57534E] block mb-1 font-medium">Pillow Menu</label>
                    <select
                      value={pillowMenu}
                      onChange={(e) => setPillowMenu(e.target.value)}
                      className="w-full bg-white border border-[#E7E2DA] rounded-lg px-3 py-2 text-[#1C1917] font-sans text-xs focus:outline-none cursor-pointer"
                    >
                      <option>Hungarian Goose Down</option>
                      <option>Organic Mulberry Silk</option>
                      <option>Orthopedic Memory Foam</option>
                      <option>Lavender Infused Aromatherapy</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#57534E] block mb-1 font-medium">Arrival Champagne</label>
                    <select
                      value={champagnePreference}
                      onChange={(e) => setChampagnePreference(e.target.value)}
                      className="w-full bg-white border border-[#E7E2DA] rounded-lg px-3 py-2 text-[#1C1917] font-sans text-xs focus:outline-none cursor-pointer"
                    >
                      <option>Dom Pérignon Vintage 2013</option>
                      <option>Krug Grande Cuvée 170th Edition</option>
                      <option>Louis Roederer Cristal 2014</option>
                      <option>Non-Alcoholic Artisanal Botanical Elixir</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#57534E] block mb-1 font-medium">Special Requests &amp; Dietary</label>
                  <textarea
                    rows={2}
                    placeholder="Anniversary, private dietary restrictions, bespoke itinerary requests..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-white border border-[#E7E2DA] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  />
                </div>
              </div>

              {/* Promotional Code */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA]">
                <label className="text-xs uppercase tracking-[0.08em] font-semibold text-[#14213D] block mb-2">
                  VIP Direct Access Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. VIPLUXURY)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white border border-[#E7E2DA] rounded-lg px-3 py-2 text-xs text-[#1C1917] uppercase focus:outline-none focus:border-[#B8923A]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#14213D] text-white hover:bg-[#1d2f57] rounded-lg text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[#15803D] text-xs font-medium mt-1.5 flex items-center gap-1">
                    ✓ VIP Voucher Applied: 10% Exclusive Direct Privilege
                  </p>
                )}
                {promoError && (
                  <p className="text-[#B91C1C] text-xs font-medium mt-1.5">{promoError}</p>
                )}
              </div>

                {bookingError && (
                  <p role="alert" className="text-[#B91C1C] text-xs font-medium">
                    {bookingError}
                  </p>
                )}

                <fieldset className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA]">
                <legend className="text-xs uppercase tracking-[0.08em] font-semibold text-[#14213D] px-1">
                  Payment Method
                </legend>
                <p className="text-xs text-[#57534E] mb-3">
                  Choose how you plan to pay. Payment is not processed in this demo.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-2 rounded-lg border p-3 text-xs cursor-pointer transition-colors ${
                        paymentMethod === method
                          ? "border-[#B8923A] bg-white text-[#14213D]"
                          : "border-[#E7E2DA] bg-white/60 text-[#57534E]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="accent-[#B8923A]"
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>
          )}

          {/* STEP 4: Reservation Confirmation */}
          {currentStep === 4 && (
            <div className="py-6 space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#15803D]/10 border-2 border-[#15803D] flex items-center justify-center text-[#15803D] mx-auto shadow-sm">
                <CheckIcon size={32} />
              </div>

              <div>
                <span className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase">
                  Reservation Confirmed
                </span>
                <h3 className="text-3xl font-serif font-medium text-[#1C1917] mt-1">
                  We Await Your Arrival, {guestName || "Distinguished Guest"}
                </h3>
                <p className="text-[#57534E] text-sm mt-2 max-w-md mx-auto font-normal leading-[1.6]">
                  Your private sanctuary has been secured. Your dedicated VIP Butler will contact you
                  48 hours prior to arrange bespoke arrivals and transfers.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#E7E2DA] pb-2">
                  <span className="text-[#57534E]">Booking Reference</span>
                  <span className="text-[#14213D] font-bold tabular-nums">{confirmationCode}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#57534E]">
                    {selectedSuites.length === 1 ? "Accommodation" : "Accommodations"}
                  </span>
                  <span className="text-[#1C1917] text-right font-serif text-sm font-medium">
                    {selectedSuites.map((suite) => suite.name).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57534E]">Dates of Stay</span>
                  <span className="text-[#1C1917] tabular-nums">{checkIn} → {checkOut} ({numberOfNights} Nights)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57534E]">Guests</span>
                  <span className="text-[#1C1917] tabular-nums">{adults} Adults {children > 0 ? `, ${children} Children` : ""}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57534E]">Arrival Champagne</span>
                  <span className="text-[#1C1917] text-right truncate max-w-[200px]">{champagnePreference}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57534E]">Payment Method</span>
                  <span className="text-[#1C1917] font-medium">{paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57534E]">Payment Status</span>
                  <span className="text-[#D97706] font-medium">Pending</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#E7E2DA] pt-2 text-sm font-semibold">
                  <span className="text-[#1C1917]">Total Reserved</span>
                  <span className="text-[#B8923A] tabular-nums">{currencySymbol}{grandTotal.toLocaleString("en-US")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#E7E2DA] text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[#FAF8F5] transition-colors"
                >
                  Print Voucher
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto gold-button px-8 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                >
                  Return to Resort Tour
                </button>
              </div>
            </div>
          )}

          {/* Pricing Breakdown Summary (Steps 1-3) */}
          {currentStep < 4 && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-2 text-xs">
              <div className="flex justify-between text-[#57534E]">
                <span>
                  {selectedSuites.length === 1
                    ? selectedSuites[0].name.slice(0, 24) + "..."
                    : `${selectedSuites.length} accommodations`}{" "}
                  × {numberOfNights} Nights
                </span>
                <span className="tabular-nums font-medium text-[#1C1917]">{currencySymbol}{suiteSubtotal.toLocaleString("en-US")}</span>
              </div>

              {addOnsSubtotal > 0 && (
                <div className="flex justify-between text-[#57534E]">
                  <span>Bespoke Add-Ons ({selectedAddOnIds.length})</span>
                  <span className="tabular-nums font-medium text-[#1C1917]">+{currencySymbol}{addOnsSubtotal.toLocaleString("en-US")}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-[#15803D]">
                  <span>VIP Direct Privilege (10%)</span>
                  <span className="tabular-nums font-semibold">-{currencySymbol}{discountAmount.toLocaleString("en-US")}</span>
                </div>
              )}

              <div className="flex justify-between text-[#57534E] text-[11px]">
                <span>Luxury Tax &amp; Resort Surcharge (12%)</span>
                <span className="tabular-nums">{currencySymbol}{resortTaxAndService.toLocaleString("en-US")}</span>
              </div>

              <div className="border-t border-[#E7E2DA] pt-2 flex justify-between items-baseline font-serif text-base text-[#1C1917]">
                <span className="font-sans text-xs uppercase tracking-[0.08em] font-semibold text-[#14213D]">
                  Grand Total
                </span>
                <span className="text-2xl text-[#B8923A] font-serif font-medium tabular-nums">
                  {currencySymbol}{grandTotal.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Bottom Actions (Steps 1-3) */}
        {currentStep < 4 && (
          <div className="p-6 border-t border-[#E7E2DA] bg-white flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-5 py-2.5 rounded-full border border-[#E7E2DA] hover:bg-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.08em] text-[#57534E] transition-colors"
              >
                Back
              </button>
            ) : (
              <div className="text-xs text-[#57534E] flex items-center gap-1.5 font-medium">
                <ShieldCheckIcon size={14} className="text-[#15803D]" />
                <span>Zero Booking Fees</span>
              </div>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="gold-button px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.08em] flex items-center gap-2 transition-colors"
              >
                <span>Continue to {currentStep === 1 ? "Experiences" : "Guest Info"}</span>
                <ChevronRightIcon size={14} />
              </button>
            ) : (
              <button
                type="submit"
                form="guest-details-form"
                className="gold-button px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.08em] flex items-center gap-2 transition-colors"
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
