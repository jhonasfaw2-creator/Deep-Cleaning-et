"use client";

import React, { useEffect, useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  type:
    | "Homeowner"
    | "Office Manager"
    | "Apartment Resident"
    | "Business Owner";
  content: string;
  rating: number;
  date: string;
  avatarInitial: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Selam A.",
    role: "Homeowner",
    type: "Homeowner",
    content:
      "Absolutely transformed our home! The team was punctual, professional, and left every corner spotless. I came home to a space that felt brand new. Highly recommend Deep Cleaning et for anyone looking for premium service.",
    rating: 5,
    date: "December 2024",
    avatarInitial: "S",
  },
  {
    id: 2,
    name: "Michael B.",
    role: "Office Manager",
    type: "Office Manager",
    content:
      "Our office has never looked better. The deep cleaning service was thorough and non-disruptive to our operations. Staff noticed the difference immediately. Will definitely be using their recurring service.",
    rating: 5,
    date: "January 2025",
    avatarInitial: "M",
  },
  {
    id: 3,
    name: "David K.",
    role: "Property Manager",
    type: "Business Owner",
    content:
      "Excellent post-construction clean. They paid attention to every detail, removing fine dust from places we didn't even think to check. Professional equipment and even more professional team.",
    rating: 5,
    date: "December 2024",
    avatarInitial: "D",
  },
  {
    id: 4,
    name: "Ruth T.",
    role: "Apartment Resident",
    type: "Apartment Resident",
    content:
      "Best cleaning service in Addis! My carpets look brand new and the team was so respectful of my space. The online booking was easy and they arrived exactly on time.",
    rating: 5,
    date: "January 2025",
    avatarInitial: "R",
  },
  {
    id: 5,
    name: "Henok W.",
    role: "Business Owner",
    type: "Business Owner",
    content:
      "We've tried several cleaning companies, but Deep Cleaning et stands out. Their attention to detail and customer service is unmatched. A true partner in keeping our commercial space pristine.",
    rating: 5,
    date: "November 2024",
    avatarInitial: "H",
  },
  {
    id: 6,
    name: "Tigist M.",
    role: "Homeowner",
    type: "Homeowner",
    content:
      "The sofa cleaning service worked wonders on our white upholstery. Stains that we thought were permanent are completely gone. Very impressed with the results!",
    rating: 4,
    date: "December 2024",
    avatarInitial: "T",
  },
];

const stats = [
  { value: "500+", label: "Happy Clients", icon: "😊" },
  { value: "1200+", label: "Cleanings Completed", icon: "✨" },
  { value: "4.9", label: "Customer Rating", icon: "⭐" },
];

export default function Testimonials() {
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
      className="py-20 md:py-28 bg-linear-to-br from-white via-white to-blue-50/20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-700 to-blue-600">
              Customers Say
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Trusted by homeowners and businesses across Addis Ababa. Real
            reviews from real clients.
          </p>

          <div className="flex justify-center gap-2 mt-8">
            <div className="w-12 h-0.5 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-0.5 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-0.5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                    } transition-colors duration-300`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Icon */}
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-blue-200 group-hover:text-blue-300 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed mb-6 min-h-120px">
                "{testimonial.content}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                  {testimonial.avatarInitial}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <p className="text-xs text-gray-400">{testimonial.date}</p>
                  </div>

                  {/* Type Badge */}
                  <div className="mt-1">
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats Section */}
        <div className="mt-16 md:mt-20">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group"
                  style={{
                    animation: isVisible
                      ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 mt-8 pt-8 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified Reviews
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  100% Real Customers
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Updated Monthly
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Join our community of satisfied customers
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
            Read More Reviews
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
