import { NextResponse } from "next/server";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Settings } from "@/lib/models/settings";

function unauthorized() {
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    await connectDB();
    let settings = await Settings.findOne().sort({ updatedAt: -1 });

    if (!settings) {
      settings = await Settings.create({
        registrationDeadline: "2026-07-20",
        groupStageStart: "2026-07-27",
        groupStageEnd: "2026-08-02",
        semiFinals: "2026-08-09",
        grandFinal: "2026-08-16",
        maxTeams: 8,
        championPrize: "5 × MLBB Starlight Memberships",
        mvpPrize: "1 × Starlight Premium Membership",
      });
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

export async function PATCH(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    const data = await request.json();
    await connectDB();

    let settings = await Settings.findOne().sort({ updatedAt: -1 });

    if (settings) {
      Object.assign(settings, data);
      settings.updatedAt = new Date();
      await settings.save();
    } else {
      settings = await Settings.create(data);
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
