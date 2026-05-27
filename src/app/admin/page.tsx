"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

interface Booking {
  id: number;
  full_name: string;
  phone: string;
  location: string;
  service: string;
  property_type: string;
  number_of_rooms: number;
  date: string;
  time: string;
  notes: string;
  status?: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =========================
  // AUTH PROTECTION
  // =========================
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.replace("/login");
      }
    };

    checkUser();
  }, [router]);

  // =========================
  // FETCH BOOKINGS
  // =========================
  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Fetch error:", error.message);
      alert(error.message);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  // =========================
  // DELETE BOOKING
  // =========================
  const deleteBooking = async (id: number) => {
    const confirmDelete = confirm("Delete this booking?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (!error) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard 📊</h1>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 border rounded-xl"
      />

      {/* CONTENT */}
      {loading ? (
        <p className="text-lg">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet 😢</p>
      ) : (
        <div className="grid gap-4">

          {bookings
            .filter(
              (b) =>
                b.full_name.toLowerCase().includes(search.toLowerCase()) ||
                b.phone.includes(search)
            )
            .map((b) => (
              <div
                key={b.id}
                className="bg-white p-5 rounded-xl shadow space-y-2"
              >

                {/* CUSTOMER INFO */}
                <h2 className="text-xl font-bold">{b.full_name}</h2>

                <p>📞 {b.phone}</p>
                <p>📍 {b.location}</p>
                <p>🧹 {b.service}</p>
                <p>🏠 {b.property_type}</p>
                <p>🚪 Rooms: {b.number_of_rooms}</p>
                <p>📅 {b.date} ⏰ {b.time}</p>

                {b.notes && <p>📝 {b.notes}</p>}

                {/* STATUS */}
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    b.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : b.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {b.status || "pending"}
                </span>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-3 flex-wrap">

                  <button
                    onClick={() => updateStatus(b.id, "confirmed")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateStatus(b.id, "completed")}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}