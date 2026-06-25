import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Settings } from "@/lib/models/settings";

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne().sort({ updatedAt: -1 });

    if (!settings) {
      settings = {
        registrationDeadline: "2026-07-20",
        groupStageStart: "2026-07-27",
        groupStageEnd: "2026-08-02",
        semiFinals: "2026-08-09",
        grandFinal: "2026-08-16",
        maxTeams: 8,
        championPrize: "5 × MLBB Starlight Memberships",
        mvpPrize: "1 × Starlight Premium Membership",
      };
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
