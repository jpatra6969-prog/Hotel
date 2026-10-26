"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/hotelData";
import { ChevronDownIcon } from "./Icons";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative z-20 bg-zinc-950 px-4 sm:px-8 py-24 sm:py-32 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            Guest Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Everything you need to know about preparing for your stay at Aura Sanctuary.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:text-amber-300 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`transform transition-transform duration-300 flex-shrink-0 text-amber-400 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ChevronDownIcon size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed border-t border-white/5 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
