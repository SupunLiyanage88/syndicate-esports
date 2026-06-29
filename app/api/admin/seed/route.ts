import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Admin } from "@/lib/models/admin";
import { Settings } from "@/lib/models/settings";
import { hashPassword, getTokenFromCookies, verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Require authentication for seed endpoint
    const token = getTokenFromCookies(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    await connectDB();

    // Seed settings only (admin should already exist)
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create({
        registrationDeadline: "2026-07-20",
        groupStageStart: "2026-07-27",
        groupStageEnd: "2026-08-02",
        semiFinals: "2026-08-09",
        grandFinal: "2026-08-16",
        maxTeams: 8,
        championPrize: "5 × MLBB Starlight Memberships",
        mvpPrize: "1 × Starlight Premium Membership",
      });
      console.log("Default settings created");
    }

    return NextResponse.json({ success: true, message: "Seed data created" });
  } catch (error) {
    console.error("Seed error");
    return NextResponse.json(
      { success: false, message: "Seed failed" },
      { status: 500 }
    );
  }
}
