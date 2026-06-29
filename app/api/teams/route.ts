import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/lib/models/team";

export async function GET() {
  try {
    await connectDB();
    const teams = await Team.find()
      .select("-captainPhone -captainWhatsApp -captainDiscord -players.mlbbId -players.role")
      .sort({ registeredAt: -1 });
    return NextResponse.json({ success: true, teams });
  } catch (error) {
    console.error("Error fetching teams");
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
