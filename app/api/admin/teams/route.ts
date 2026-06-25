import { NextResponse } from "next/server";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/lib/models/team";

function unauthorized() {
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

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

export async function PATCH(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    const { id, status } = await request.json();

    if (!id || !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      );
    }

    await connectDB();
    const team = await Team.findByIdAndUpdate(id, { status }, { new: true });

    if (!team) {
      return NextResponse.json(
        { success: false, message: "Team not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Team ID required" },
        { status: 400 }
      );
    }

    await connectDB();
    await Team.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Team deleted" });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
