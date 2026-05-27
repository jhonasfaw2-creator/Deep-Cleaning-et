import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BOOKING RECEIVED:", body);

    return NextResponse.json({
      success: true,
      message: "Booking received",
    });
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Booking failed",
    });
  }
}
