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
    <section id="faq" className="relative z-20 bg-[#FAF8F5] px-4 sm:px-8 py-24 sm:py-32 border-t border-[#E7E2DA] font-sans scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase block mb-3">
            Guest Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917] tracking-normal leading-[1.2]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#57534E] text-base mt-4 font-normal leading-[1.6]">
            Everything you need to know about preparing for your stay at Aura Sanctuary.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-[#E7E2DA] shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:text-[#B8923A] transition-colors"
                >
                  <span className="font-serif text-lg font-medium text-[#1C1917]">
                    {faq.question}
                  </span>
                  <div
                    className={`transform transition-transform duration-300 flex-shrink-0 text-[#B8923A] ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ChevronDownIcon size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#57534E] font-normal leading-[1.6] border-t border-[#E7E2DA] animate-fadeIn">
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
