import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Admin } from "@/lib/models/admin";
import { Settings } from "@/lib/models/settings";
import { hashPassword } from "@/lib/auth";

export async function POST() {
  try {
    await connectDB();

    // Seed admin
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const hashed = await hashPassword(process.env.ADMIN_PASSWORD || "Admin@2026");
      await Admin.create({
        email: process.env.ADMIN_EMAIL || "admin@syndicate-esports.lk",
        password: hashed,
        name: "Syndicate Admin",
      });
      console.log("Admin account created");
    }

    // Seed settings
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
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: "Seed failed" },
      { status: 500 }
    );
  }
}
