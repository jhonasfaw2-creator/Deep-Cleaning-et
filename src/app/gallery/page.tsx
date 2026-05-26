"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Living Room Transformation",
    category: "Home Cleaning",
    description: "From cluttered and dusty to sparkling clean and organized.",
    beforeImage: "/images/before-living.jpg",
    afterImage: "/images/after-living.jpg",
  },
  {
    id: 2,
    title: "Office Workspace Revival",
    category: "Office Cleaning",
    description: "Professional workspace deep clean for maximum productivity.",
    beforeImage: "/images/before-office.jpg",
    afterImage: "/images/after-office.jpg",
  },
  {
    id: 3,
    title: "Carpet Stain Removal",
    category: "Carpet Cleaning",
    description: "Deep steam extraction removed years of embedded stains.",
    beforeImage: "/images/before-carpet.jpg",
    afterImage: "/images/after-carpet.jpg",
  },
  {
    id: 4,
    title: "Sofa Upholstery Refresh",
    category: "Sofa Cleaning",
    description: "Gentle yet powerful cleaning restored fabric freshness.",
    beforeImage: "/images/before-sofa.jpg",
    afterImage: "/images/after-sofa.jpg",
  },
  {
    id: 5,
    title: "Post-Construction Cleanup",
    category: "Post-Construction",
    description: "Complete debris removal and fine dust elimination.",
    beforeImage: "/images/before-construction.jpg",
    afterImage: "/images/after-construction.jpg",
  },
  {
    id: 6,
    title: "Kitchen Deep Clean",
    category: "Home Cleaning",
    description: "Meticulous sanitization of all surfaces and appliances.",
    beforeImage: "/images/before-kitchen.jpg",
    afterImage: "/images/after-kitchen.jpg",
  },
];

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle slider drag for before/after comparison
  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove as any);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const featuredItem = galleryItems[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-white via-white to-blue-50/30 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
                Visual Proof of Quality
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Before & After{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-700 to-blue-600">
                Cleaning Results
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See the transformation our professional team delivers. Real
              results from real cleaning projects across Addis Ababa.
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

      {/* Featured Before/After Slider */}
      <section className="py-20 md:py-28 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Interactive Comparison
            </h2>
            <p className="text-gray-600">
              Drag the slider to see the dramatic transformation
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div
              ref={sliderRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              style={{ aspectRatio: "16/9" }}
            >
              {/* After Image (Full) */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-2 block">✨</span>
                    <p className="text-gray-600 font-medium">
                      After Image Placeholder
                    </p>
                    <p className="text-sm text-gray-500">
                      Professional cleaning result
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                  AFTER
                </div>
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-2 block">😕</span>
                    <p className="text-gray-600 font-medium">
                      Before Image Placeholder
                    </p>
                    <p className="text-sm text-gray-500">Before cleaning</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                  BEFORE
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300">
                  <div className="flex gap-1">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-600"
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
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-700 rounded-full"></span> Drag
                to compare
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Transformation Stories
            </h2>
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
            <p className="text-gray-600">
              Browse through our collection of successful cleaning projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">📸</span>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>

                  {/* Before/After Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white">
                      BEFORE
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-900">
                      AFTER
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-medium">
                      Click to view details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      Transformation
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 font-light italic mb-4">
              "Trusted by homeowners and businesses across Addis Ababa."
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-500">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-linear-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready for Your Transformation?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Join our satisfied customers and experience the Deep Cleaning et
              difference. Book your cleaning service today and see the results
              for yourself.
            </p>
            <Link href="/booking">
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
                Book Your Cleaning Today
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for detailed view */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedItem.title}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl mb-2 block">😕</span>
                      <p className="text-gray-600">Before Image</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Before Cleaning
                  </p>
                </div>
                <div>
                  <div className="bg-linear-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl mb-2 block">✨</span>
                      <p className="text-gray-600">After Image</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    After Cleaning
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-700 mb-4">{selectedItem.description}</p>
                <Link href="/booking">
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300">
                    Book This Service
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
