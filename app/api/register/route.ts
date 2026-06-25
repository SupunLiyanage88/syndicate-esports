import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/lib/models/team";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registrationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if team name already exists
    const existing = await Team.findOne({ teamName: result.data.teamName });
    if (existing) {
      return NextResponse.json(
        { success: false, errors: { teamName: ["Team name already registered"] } },
        { status: 409 }
      );
    }

    // Check max teams from settings
    const { Settings } = await import("@/lib/models/settings");
    const settings = await Settings.findOne().sort({ updatedAt: -1 });
    const maxTeams = settings?.maxTeams || 8;
    const teamCount = await Team.countDocuments();
    if (teamCount >= maxTeams) {
      return NextResponse.json(
        { success: false, message: "Maximum number of teams reached" },
        { status: 400 }
      );
    }

    const team = await Team.create({
      teamName: result.data.teamName,
      captainName: result.data.captainName,
      captainPhone: result.data.captainPhone,
      captainWhatsApp: result.data.captainWhatsApp,
      captainDiscord: result.data.captainDiscord,
      players: result.data.players,
      substitutes: result.data.substitutes,
      status: "pending",
    });

    console.log("New team registered:", team._id);

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
