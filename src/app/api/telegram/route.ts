import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🔥 TELEGRAM API HIT");

  try {
    const body = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // DEBUG
    console.log("TOKEN EXISTS:", !!token);
    console.log("CHAT ID:", chatId);

    const message = `
🧹 NEW BOOKING

👤 Name: ${body.name}
📞 Phone: ${body.phone}
🧼 Service: ${body.service}
📅 Date: ${body.date}
⏰ Time: ${body.time}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      },
    );

    const data = await response.json();

    console.log("✅ TELEGRAM RESPONSE:", data);

    return NextResponse.json({
      success: true,
      telegram: data,
    });
  } catch (error) {
    console.log("❌ TELEGRAM ERROR:", error);

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
