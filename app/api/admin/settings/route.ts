import { NextResponse } from "next/server";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Settings } from "@/lib/models/settings";
import { settingsUpdateSchema } from "@/lib/validation";

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
    console.error("Error fetching settings");
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
    const body = await request.json();

    // Validate input
    const result = settingsUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();

    let settings = await Settings.findOne().sort({ updatedAt: -1 });

    if (settings) {
      // Only update allowed fields
      const allowedFields = [
        "registrationDeadline",
        "groupStageStart",
        "groupStageEnd",
        "semiFinals",
        "grandFinal",
        "maxTeams",
        "championPrize",
        "mvpPrize",
      ];

      for (const field of allowedFields) {
        if (result.data[field as keyof typeof result.data] !== undefined) {
          (settings as any)[field] = result.data[field as keyof typeof result.data];
        }
      }

      settings.updatedAt = new Date();
      await settings.save();
    } else {
      settings = await Settings.create(result.data);
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Error updating settings");
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
