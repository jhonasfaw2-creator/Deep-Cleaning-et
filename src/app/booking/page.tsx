// app/booking/page.tsx
"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import Button from "../../components/ui/Button"

interface FormData {
  fullName: string;
  phoneNumber: string;
  location: string;
  selectedService: string;
  propertyType: string;
  numberOfRooms: number;
  date: string;
  time: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  location?: string;
  selectedService?: string;
  propertyType?: string;
  numberOfRooms?: string;
  date?: string;
  time?: string;
}

export default function BookingPage() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    location: "",
    selectedService: "",
    propertyType: "",
    numberOfRooms: 1,
    date: "",
    time: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedSection, setFocusedSection] = useState<string>("personal");

  // Refs for auto-focus
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const serviceSelectRef = useRef<HTMLSelectElement>(null);
  const propertySelectRef = useRef<HTMLSelectElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeSelectRef = useRef<HTMLSelectElement>(null);

  // Service options
  const services = [
    { value: "standard", label: "Standard Cleaning", price: "From $50" },
    { value: "deep", label: "Deep Cleaning", price: "From $75" },
    { value: "premium", label: "Premium VIP Cleaning", price: "From $100" },
    { value: "movein", label: "Move-In/Move-Out Cleaning", price: "From $120" },
    { value: "office", label: "Office/Commercial Cleaning", price: "From $150" },
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: "🏢" },
    { value: "villa", label: "Villa", icon: "🏠" },
    { value: "office", label: "Office", icon: "💼" },
    { value: "commercial", label: "Commercial Space", icon: "🏭" },
    { value: "studio", label: "Studio", icon: "📐" },
  ];

  // Time slots
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.selectedService) {
      newErrors.selectedService = "Please select a service";
    }

    if (!formData.propertyType) {
      newErrors.propertyType = "Please select property type";
    }

    if (formData.numberOfRooms < 1) {
      newErrors.numberOfRooms = "Number of rooms must be at least 1";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: "",
        phoneNumber: "",
        location: "",
        selectedService: "",
        propertyType: "",
        numberOfRooms: 1,
        date: "",
        time: "",
        notes: "",
      });
      setSubmitSuccess(false);
      setIsSubmitting(false);
      setFocusedSection("personal");
      nameInputRef.current?.focus();
    }, 3000);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "numberOfRooms" ? parseInt(value) || 1 : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Auto-focus next field on enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, nextField: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = document.querySelector(`[name="${nextField}"]`) as HTMLElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Check if form is valid for button enable
  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.location.trim() !== "" &&
      formData.selectedService !== "" &&
      formData.propertyType !== "" &&
      formData.date !== "" &&
      formData.time !== ""
    );
  };

  // Get selected service details
  const selectedServiceDetails = services.find(s => s.value === formData.selectedService);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Cleaning
          </h1>
          <p className="text-lg text-gray-600">
            Schedule a professional cleaning service. Free consultation & instant confirmation.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-5 bg-green-50 border border-green-200 rounded-2xl animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-semibold text-lg">Booking Confirmed!</p>
                <p className="text-green-600">Your booking has been received. Our team will contact you shortly via WhatsApp.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Progress Indicator */}
            <div className="mb-8 flex justify-between items-center">
              {["personal", "service", "schedule", "notes"].map((section, index) => (
                <div key={section} className="flex-1 relative">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        focusedSection === section
                          ? "bg-black text-white scale-110"
                          : index < ["personal", "service", "schedule", "notes"].indexOf(focusedSection)
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-10">
                      <div
                        className={`h-full bg-black transition-all duration-500 ${
                          index < ["personal", "service", "schedule", "notes"].indexOf(focusedSection)
                            ? "w-full"
                            : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Section 1: Personal Info */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "phoneNumber")}
                    onFocus={() => setFocusedSection("personal")}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${
                      errors.fullName ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "location")}
                    onFocus={() => setFocusedSection("personal")}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="+251 911 111 111"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location / Address *
                  </label>
                  <input
                    ref={locationInputRef}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedSection("personal")}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${
                      errors.location ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Addis Ababa, Bole Road"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Service Info */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
                Service Details
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    ref={serviceSelectRef}
                    name="selectedService"
                    value={formData.selectedService}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedSection("service")}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${
                      errors.selectedService ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.value} value={service.value}>
                        {service.label} - {service.price}
                      </option>
                    ))}
                  </select>
                  {errors.selectedService && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.selectedService}</p>
                  )}
                  {selectedServiceDetails && (
                    <p className="mt-2 text-xs text-gray-500 animate-fade-in">
                      ✓ {selectedServiceDetails.label} includes premium equipment and eco-friendly products
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    ref={propertySelectRef}
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedSection("service")}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${
                      errors.propertyType ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.propertyType && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.propertyType}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rooms *
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const newValue = Math.max(1, formData.numberOfRooms - 1);
                        setFormData(prev => ({ ...prev, numberOfRooms: newValue }));
                        if (errors.numberOfRooms) setErrors(prev => ({ ...prev, numberOfRooms: undefined }));
                      }}
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all duration-200 hover:scale-110"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="numberOfRooms"
                      value={formData.numberOfRooms}
                      onChange={handleInputChange}
                      className="w-20 text-center px-2 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                      min="1"
                      max="20"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newValue = Math.min(20, formData.numberOfRooms + 1);
                        setFormData(prev => ({ ...prev, numberOfRooms: newValue }));
                        if (errors.numberOfRooms) setErrors(prev => ({ ...prev, numberOfRooms: undefined }));
                      }}
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all duration-200 hover:scale-110"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500 ml-2">rooms</span>
                  </div>
                  {errors.numberOfRooms && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.numberOfRooms}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Schedule */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
                Schedule
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    ref={dateInputRef}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedSection("schedule")}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${
                      errors.date ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    ref={timeSelectRef}
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedSection("schedule")}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${
                      errors.time ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time} {parseInt(time) < 12 ? "AM" : "PM"}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-500 error-message">{errors.time}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 4: Additional Notes */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">4</span>
                Additional Notes
              </h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                onFocus={() => setFocusedSection("notes")}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all duration-200"
                placeholder="Any special requests, instructions, or specific areas you'd like us to focus on?"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full bg-black text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  !isFormValid() || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Your Booking...
                  </div>
                ) : (
                  "Book Cleaning Service"
                )}
              </button>
              
              {/* Trust Element */}
              <div className="mt-4 text-center">
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> No hidden fees
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Fast response
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Trusted professionals
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Free consultation
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  By booking, you agree to our terms of service. We'll contact you within 30 minutes.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Features Highlight */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-2">🧹</div>
            <p className="text-xs text-gray-600">Eco-friendly products</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-2">⭐</div>
            <p className="text-xs text-gray-600">5-star rated service</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-xs text-gray-600">Secure booking</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-2">💎</div>
            <p className="text-xs text-gray-600">Premium guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}