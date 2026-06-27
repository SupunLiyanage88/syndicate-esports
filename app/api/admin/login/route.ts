import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Admin } from "@/lib/models/admin";
import { Settings } from "@/lib/models/settings";
import { comparePassword, signToken, hashPassword } from "@/lib/auth";

async function seedData() {
  // Seed admin if not exists
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const hashed = await hashPassword(process.env.ADMIN_PASSWORD || "Admin@2026");
    await Admin.create({
      email: process.env.ADMIN_EMAIL || "admin@syndicate-esports.lk",
      password: hashed,
      name: "Syndicate Admin",
    });
    console.log("Default admin seeded");
  }

  // Seed settings if not exists
  const settingsCount = await Settings.countDocuments();
  if (settingsCount === 0) {
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
    console.log("Default settings seeded");
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Auto-seed on first login
    await seedData();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await comparePassword(password, admin.password);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({ id: admin._id.toString(), email: admin.email });

    const response = NextResponse.json({
      success: true,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
