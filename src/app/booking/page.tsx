"use client";

import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";

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

export default function BookingPage() {
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfRooms" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          full_name: formData.fullName,
          phone: formData.phoneNumber,
          location: formData.location,
          service: formData.selectedService,
          property_type: formData.propertyType,
          number_of_rooms: formData.numberOfRooms,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          status: "pending",
        },
      ]);

      if (error) {
        console.log("SUPABASE ERROR:", error);
        setError(error.message || "Booking failed");
        setLoading(false);
        return;
      }
      await fetch("/api/telegram", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: formData.fullName,
    phone: formData.phoneNumber,
    service: formData.selectedService,
    date: formData.date,
    time: formData.time,
  }),
});

      // ✅ SUCCESS
      setSuccess(true);

      // OPTIONAL: Telegram notification (won't break booking if fails)
      try {
        await fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            phone: formData.phoneNumber,
            date: formData.date,
            time: formData.time,
            service: formData.selectedService,
          }),
        });
      } catch (err) {
        console.log("Telegram failed (non-critical)");
      }

      // reset form
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

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err: any) {
      console.log("Unexpected error:", err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center mb-6">
          Book Cleaning Service
        </h1>

        {/* SUCCESS TICKET */}
        {success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-4 text-center">
            ✅ Booking Confirmed! We will contact you soon.
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4 text-center">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            ref={nameRef}
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <select
            name="selectedService"
            value={formData.selectedService}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Service</option>
            <option value="standard">Standard Cleaning</option>
            <option value="deep">Deep Cleaning</option>
            <option value="premium">Premium Cleaning</option>
            <option value="office">Office Cleaning</option>
          </select>

          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
          </select>

          <input
            type="number"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            min={1}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-xl hover:bg-gray-800"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
}