import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/lib/models/team";

export async function GET() {
  try {
    await connectDB();
    const teams = await Team.find().sort({ registeredAt: -1 });
    return NextResponse.json({ success: true, teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
