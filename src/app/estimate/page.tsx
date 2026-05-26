// app/estimate/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type PropertyType = "apartment" | "villa" | "office" | "commercial";
type CleaningType = "standard" | "deep" | "premium";
type DirtLevel = "light" | "medium" | "heavy";

interface PricingResult {
  minPrice: number;
  maxPrice: number;
  timeHours: number;
  recommendedPackage: string;
}

interface PackageOption {
  name: string;
  description: string;
  price: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export default function EstimatePage() {
  // State management
  const [propertyType, setPropertyType] = useState<PropertyType>("apartment");
  const [rooms, setRooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [cleaningType, setCleaningType] = useState<CleaningType>("standard");
  const [dirtLevel, setDirtLevel] = useState<DirtLevel>("medium");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("recommended");
  const [result, setResult] = useState<PricingResult>({
    minPrice: 0,
    maxPrice: 0,
    timeHours: 0,
    recommendedPackage: "",
  });

  // Pricing logic
  const calculateEstimate = () => {
    // Base prices
    const basePrices = {
      apartment: 50,
      villa: 80,
      office: 100,
      commercial: 120,
    };

    // Multipliers
    const cleaningMultipliers = {
      standard: 1,
      deep: 1.5,
      premium: 2,
    };

    const dirtMultipliers = {
      light: 1,
      medium: 1.2,
      heavy: 1.5,
    };

    // Calculate base price
    const basePrice = basePrices[propertyType];
    const additions = rooms * 10 + bathrooms * 5;
    const subtotal = basePrice + additions;

    // Apply multipliers
    const cleaningMultiplier = cleaningMultipliers[cleaningType];
    const dirtMultiplier = dirtMultipliers[dirtLevel];

    const calculatedPrice = subtotal * cleaningMultiplier * dirtMultiplier;

    // Create price range (±5% for realistic estimation)
    const minPrice = Math.round(calculatedPrice * 0.95);
    const maxPrice = Math.round(calculatedPrice * 1.05);

    // Calculate estimated time
    const baseTime = {
      apartment: 1.5,
      villa: 2.5,
      office: 2,
      commercial: 3,
    };

    let timeHours = baseTime[propertyType];
    timeHours += rooms * 0.25;
    timeHours += bathrooms * 0.15;
    timeHours *= cleaningMultiplier;
    timeHours *= dirtMultiplier;
    timeHours = Math.round(timeHours * 10) / 10;

    // Determine recommended package
    let recommendedPackage = "";
    if (cleaningType === "premium") {
      recommendedPackage = "Premium VIP Experience";
    } else if (cleaningType === "deep" || dirtLevel === "heavy") {
      recommendedPackage = "Deep Cleaning Pro";
    } else if (rooms >= 4 || bathrooms >= 3) {
      recommendedPackage = "Family & Executive";
    } else {
      recommendedPackage = "Standard Excellence";
    }

    setResult({
      minPrice,
      maxPrice,
      timeHours,
      recommendedPackage,
    });
    setShowResult(true);
  };

  // Auto-calculate on input change
  useEffect(() => {
    calculateEstimate();
  }, [propertyType, rooms, bathrooms, cleaningType, dirtLevel]);

  // Generate package options based on calculation
  const getPackageOptions = (): PackageOption[] => {
    const basePrice = (result.minPrice + result.maxPrice) / 2;
    
    return [
      {
        name: "Basic Package",
        description: "Essential cleaning for everyday needs",
        price: Math.round(basePrice * 0.8),
        features: [
          "Standard cleaning supplies",
          "Basic equipment",
          "2 hours service",
          "No warranty",
        ],
      },
      {
        name: result.recommendedPackage,
        description: "Most popular choice for your property",
        price: Math.round(basePrice),
        features: [
          "Premium eco-friendly products",
          "Professional equipment",
          `${result.timeHours}+ hours service`,
          "30-day satisfaction guarantee",
          "Free consultation included",
        ],
        highlighted: true,
        badge: "Most Popular",
      },
      {
        name: "Premium Package",
        description: "Ultimate cleaning experience",
        price: Math.round(basePrice * 1.3),
        features: [
          "VIP eco-friendly products",
          "State-of-the-art equipment",
          `${Math.round(result.timeHours * 1.5)}+ hours service`,
          "90-day satisfaction guarantee",
          "Free deep consultation",
          "Priority scheduling",
        ],
      },
    ];
  };

  const packageOptions = getPackageOptions();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Price Estimator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an instant, transparent estimate for your cleaning project.
            Premium service at competitive rates.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Property Details
            </h2>

            {/* Property Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["apartment", "villa", "office", "commercial"] as const).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        propertyType === type
                          ? "bg-black text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Rooms & Bathrooms */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Rooms
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold text-gray-900 w-12 text-center">
                    {rooms}
                  </span>
                  <button
                    onClick={() => setRooms(Math.min(10, rooms + 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bathrooms
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold text-gray-900 w-12 text-center">
                    {bathrooms}
                  </span>
                  <button
                    onClick={() => setBathrooms(Math.min(6, bathrooms + 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Cleaning Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cleaning Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["standard", "deep", "premium"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCleaningType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      cleaningType === type
                        ? "bg-black text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type === "standard"
                      ? "Standard"
                      : type === "deep"
                      ? "Deep"
                      : "Premium VIP"}
                  </button>
                ))}
              </div>
            </div>

            {/* Dirt Level */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirt Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["light", "medium", "heavy"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDirtLevel(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      dirtLevel === level
                        ? "bg-black text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateEstimate}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Calculate Estimate
            </button>
          </div>

          {/* Result Section */}
          <div
            className={`transition-all duration-500 ${
              showResult
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Price Display Card */}
            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Your Estimate
              </h3>
              <p className="text-gray-300 mb-6">
                Transparent pricing, no hidden fees
              </p>

              <div className="mb-6">
                <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
                  Estimated Price Range
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-white">
                    ${result.minPrice}
                  </span>
                  <span className="text-2xl text-gray-400">-</span>
                  <span className="text-5xl md:text-6xl font-bold text-white">
                    ${result.maxPrice}
                  </span>
                  <span className="text-gray-400 ml-2">ETB</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm text-gray-300 mb-1">Time Required</p>
                  <p className="text-3xl font-bold text-white">
                    {result.timeHours}
                  </p>
                  <p className="text-xs text-gray-400">hours</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm text-gray-300 mb-1">Service Type</p>
                  <p className="text-lg font-bold text-white leading-tight">
                    {cleaningType === "standard"
                      ? "Standard"
                      : cleaningType === "deep"
                      ? "Deep Cleaning"
                      : "Premium VIP"}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Elements */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">✓</div>
                  <p className="text-xs text-gray-600">No hidden fees</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🧹</div>
                  <p className="text-xs text-gray-600">Includes equipment</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">💬</div>
                  <p className="text-xs text-gray-600">Free consultation</p>
                </div>
              </div>
            </div>

            {/* Package Options */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Choose Your Package
              </h3>
              
              {packageOptions.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                    selectedPackage === pkg.name.toLowerCase()
                      ? "ring-2 ring-black transform scale-[1.02]"
                      : ""
                  } ${pkg.highlighted ? "border-2 border-black" : ""}`}
                  onClick={() => setSelectedPackage(pkg.name.toLowerCase())}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-6 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {pkg.badge}
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {pkg.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {pkg.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.slice(0, 3).map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${pkg.price}
                      </div>
                      <div className="text-xs text-gray-500 mb-3">one-time</div>
                      <Link href="/booking">
                        <button className="w-full md:w-auto bg-black text-white px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-gray-800 hover:scale-105">
                          Book This Package
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all duration-300 hover:border-black hover:bg-gray-50 hover:scale-[1.02]"
              >
                Adjust Estimate
              </button>
              <Link href="/booking" className="flex-1">
                <button className="w-full bg-black text-white py-3 rounded-xl font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Free consultation included
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Eco-friendly products
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Insured & bonded
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                24/7 customer support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}