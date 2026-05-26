'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Home Cleaning',
    description: 'Complete house cleaning service covering every room with meticulous attention to detail.',
    icon: '🏠',
    features: ['All rooms included', 'Surface sanitization', 'Floor deep cleaning', 'Kitchen & bathroom focus'],
    price: 'ETB 1,500+',
  },
  {
    id: 2,
    title: 'Office Cleaning',
    description: 'Professional workspace maintenance ensuring a pristine and productive environment.',
    icon: '🏢',
    features: ['Workstation cleaning', 'Common areas', 'Restroom sanitization', 'Trash removal'],
    price: 'ETB 2,500+',
  },
  {
    id: 3,
    title: 'Carpet Cleaning',
    description: 'Deep steam cleaning that removes stains, allergens, and restores carpet freshness.',
    icon: '🪑',
    features: ['Steam cleaning', 'Stain removal', 'Deodorizing', 'Quick-dry technology'],
    price: 'ETB 800+ per room',
  },
  {
    id: 4,
    title: 'Sofa Cleaning',
    description: 'Gentle yet effective upholstery cleaning that extends furniture life.',
    icon: '🛋️',
    features: ['Fabric-safe cleaning', 'Stain treatment', 'Deodorization', 'Protection coating'],
    price: 'ETB 600+ per piece',
  },
  {
    id: 5,
    title: 'Deep Sanitization',
    description: 'Hospital-grade disinfection eliminating 99.9% of bacteria and viruses.',
    icon: '🦠',
    features: ['Electrostatic spraying', 'High-touch areas', 'Air purification', 'Safe for kids & pets'],
    price: 'ETB 2,000+',
  },
  {
    id: 6,
    title: 'Post-Construction Cleaning',
    description: 'Complete debris removal and fine dust cleaning for move-in ready spaces.',
    icon: '🏗️',
    features: ['Debris removal', 'Dust elimination', 'Window cleaning', 'Final polish'],
    price: 'Custom quote',
  },
];

const features = [
  {
    title: 'Trusted Professionals',
    description: 'Every team member is vetted, trained, and insured to handle premium properties with care.',
    icon: '✓',
  },
  {
    title: 'Fast & Reliable Service',
    description: 'Punctual arrival and efficient cleaning processes that respect your valuable time.',
    icon: '⚡',
  },
  {
    title: 'Affordable Pricing',
    description: 'Transparent, competitive rates with no hidden fees. Quality cleaning at fair prices.',
    icon: '💰',
  },
];

export default function ServicesPage() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-cta');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-white via-white to-blue-50/30 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
                Premium Cleaning Solutions
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-700 to-blue-600">
                Cleaning Services
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of professional cleaning services
              tailored for homes, offices, and commercial spaces in Addis Ababa, Ethiopia.
            </p>

            <div className="flex justify-center gap-2 mt-8">
              <div className="w-12 h-0.5 bg-blue-500 rounded-full"></div>
              <div className="w-3 h-0.5 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-0.5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
      </section>

      {/* Services Grid Section */}
      <section ref={sectionRef} className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="p-6 md:p-8">
                  {/* Icon and Title */}
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <div className="relative w-16 h-16 flex items-center justify-center bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-100 group-hover:border-blue-200 transition-all duration-300 shadow-sm group-hover:shadow-md mb-4">
                        <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-6 pt-4 border-t border-gray-50">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and Button */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Starting from</span>
                      <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                    </div>
                    <button
                      onClick={scrollToBooking}
                      className="relative w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-xl overflow-hidden group/btn transition-all duration-300 hover:shadow-lg"
                    >
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-blue-600">
                Deep Cleaning et
              </span>
            </h2>
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
            <p className="text-gray-600">
              Experience the difference that professional, reliable, and affordable cleaning makes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 bg-linear-to-br from-gray-900 to-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="booking-cta" className="py-20 md:py-28 bg-linear-to-br from-gray-900 to-gray-800 scroll-mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                Ready to Transform Your Space?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Book a Cleaning Service?
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Join hundreds of satisfied customers who trust Deep Cleaning et for their professional cleaning needs. 
              Book your service today and experience the difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/booking">
                <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-2">
                  Book Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              
              <Link href="/contact">
                <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-medium rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  Contact Us
                </button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                📞 Or call us directly: <span className="text-white font-medium">+251 XXX XXX XXX</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}