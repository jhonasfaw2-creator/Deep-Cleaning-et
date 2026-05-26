"use client";

import React, { useEffect, useRef, useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Home Cleaning",
    description:
      "Complete house cleaning service covering every room with meticulous attention to detail.",
    icon: "🏠",
  },
  {
    id: 2,
    title: "Office Cleaning",
    description:
      "Professional workspace cleaning to maintain a pristine and productive environment.",
    icon: "🏢",
  },
  {
    id: 3,
    title: "Carpet Cleaning",
    description:
      "Deep steam cleaning that removes stains, allergens, and restores carpet freshness.",
    icon: "🪑",
  },
  {
    id: 4,
    title: "Sofa Cleaning",
    description:
      "Gentle yet effective upholstery cleaning that extends furniture life.",
    icon: "🛋️",
  },
  {
    id: 5,
    title: "Deep Sanitization",
    description:
      "Hospital-grade disinfection eliminating 99.9% of bacteria and viruses.",
    icon: "🦠",
  },
  {
    id: 6,
    title: "Post-Construction Cleaning",
    description:
      "Complete debris removal and fine dust cleaning for move-in ready spaces.",
    icon: "🏗️",
  },
];

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
              What We Offer
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Professional{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-700 to-blue-600">
              Cleaning Services
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Comprehensive cleaning solutions tailored to your specific needs.
            Premium quality service with guaranteed satisfaction.
          </p>

          {/* Decorative divider */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-12 h-0.5 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-0.5 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-0.5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white rounded-2xl border border-gray-100 p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Icon with premium styling */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 flex items-center justify-center bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-100 group-hover:border-blue-200 transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </span>
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-gray-600 leading-relaxed mb-6 min-h-80">
                {service.description}
              </p>

              {/* Price indicator (optional) */}
              <div className="mb-6 pt-2 border-t border-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Starting from</span>
                  <span className="text-gray-900 font-semibold">ETB 1,500</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button className="relative w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-xl overflow-hidden group/btn transition-all duration-300 hover:shadow-lg">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Now
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Decorative corner element */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-full border-t-2 border-r-2 border-blue-200 rounded-tr-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-600 mb-4">Need a customized cleaning plan?</p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105">
            Contact Us for Custom Quote
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
