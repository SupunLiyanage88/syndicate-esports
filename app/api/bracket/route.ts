import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Bracket } from "@/lib/models/bracket";
import { Team } from "@/lib/models/team";

export async function GET() {
  try {
    await connectDB();

    const bracket = await Bracket.findOne({ isVisible: true })
      .sort({ updatedAt: -1 })
      .populate("rounds.matches.team1.teamId", "teamName")
      .populate("rounds.matches.team2.teamId", "teamName")
      .populate("rounds.matches.winner", "teamName")
      .populate("champion", "teamName")
      .populate("mvp", "teamName");

    if (!bracket) {
      return NextResponse.json(
        { success: true, bracket: null, message: "Bracket not available yet" },
        { status: 200 }
      );
    }

    // Transform data for frontend
    const transformedBracket = {
      _id: bracket._id,
      tournamentName: bracket.tournamentName,
      isVisible: bracket.isVisible,
      isGenerated: bracket.isGenerated,
      champion: bracket.champion?._id?.toString() || null,
      mvp: bracket.mvp?._id?.toString() || null,
      rounds: bracket.rounds.map((round: any) => ({
        name: round.name,
        roundNumber: round.roundNumber,
        matches: round.matches.map((match: any) => ({
          matchId: match.matchId,
          position: match.position,
          team1: match.team1?.teamId
            ? {
                id: match.team1.teamId._id?.toString() || match.team1.teamId.toString(),
                name: match.team1.teamId.teamName || "Unknown",
                score: match.team1.score,
              }
            : null,
          team2: match.team2?.teamId
            ? {
                id: match.team2.teamId._id?.toString() || match.team2.teamId.toString(),
                name: match.team2.teamId.teamName || "Unknown",
                score: match.team2.score,
              }
            : null,
          winner: match.winner?._id?.toString() || match.winner?.toString() || null,
          isLive: match.isLive,
          isCompleted: match.isCompleted,
          scheduledTime: match.scheduledTime,
        })),
      })),
    };

    return NextResponse.json({ success: true, bracket: transformedBracket });
  } catch (error) {
    console.error("Error fetching bracket:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bracket" },
      { status: 500 }
    );
  }
}
