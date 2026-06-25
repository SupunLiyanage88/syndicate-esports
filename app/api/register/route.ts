import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = registrationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Placeholder: Log the registration data
    console.log("=== New Team Registration ===");
    console.log("Team Name:", result.data.teamName);
    console.log("Captain:", result.data.captainName);
    console.log("Phone:", result.data.captainPhone);
    console.log("WhatsApp:", result.data.captainWhatsApp);
    console.log("Discord:", result.data.captainDiscord);
    console.log("Players:", result.data.players.length);
    console.log("Substitutes:", result.data.substitutes.length);
    console.log("==============================");

    // Placeholder: In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify Discord webhook

    return NextResponse.json(
      { success: true, message: "Registration submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
