import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Bracket } from "@/lib/models/bracket";
import { Team } from "@/lib/models/team";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { bracketUpdateSchema } from "@/lib/validation";

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

// GET - Fetch bracket (admin view, regardless of visibility)
export async function GET(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    await connectDB();

    const bracket = await Bracket.findOne()
      .sort({ updatedAt: -1 })
      .populate("rounds.matches.team1.teamId", "teamName")
      .populate("rounds.matches.team2.teamId", "teamName")
      .populate("rounds.matches.winner", "teamName")
      .populate("champion", "teamName")
      .populate("mvp", "teamName");

    if (!bracket) {
      return NextResponse.json({ success: true, bracket: null });
    }

    // Transform data
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

// POST - Generate bracket from approved teams
export async function POST(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    await connectDB();

    // Check if bracket already exists
    const existingBracket = await Bracket.findOne();
    if (existingBracket && existingBracket.isGenerated) {
      return NextResponse.json(
        { success: false, error: "Bracket already generated. Delete it first to regenerate." },
        { status: 400 }
      );
    }

    // Get approved teams
    const approvedTeams = await Team.find({ status: "approved" }).sort({ registeredAt: 1 });

    if (approvedTeams.length < 2) {
      return NextResponse.json(
        { success: false, error: "Need at least 2 approved teams to generate bracket" },
        { status: 400 }
      );
    }

    // Shuffle teams for random seeding
    const shuffledTeams = [...approvedTeams].sort(() => Math.random() - 0.5);

    // Calculate bracket structure
    const teamCount = shuffledTeams.length;
    const bracketSize = getBracketSize(teamCount);
    const totalRounds = Math.log2(bracketSize);

    // Generate rounds
    const rounds = generateBracketRounds(shuffledTeams, bracketSize, totalRounds);

    // Create or update bracket
    let bracket;
    if (existingBracket) {
      bracket = existingBracket;
      bracket.rounds = rounds;
      bracket.isGenerated = true;
      bracket.isVisible = false;
      bracket.champion = null;
      bracket.mvp = null;
    } else {
      bracket = new Bracket({
        tournamentName: "Ascendant League Season 1",
        isVisible: false,
        isGenerated: true,
        rounds,
      });
    }

    await bracket.save();

    return NextResponse.json({
      success: true,
      message: "Bracket generated successfully",
      bracket: {
        _id: bracket._id,
        tournamentName: bracket.tournamentName,
        isVisible: bracket.isVisible,
        isGenerated: bracket.isGenerated,
        roundsCount: rounds.length,
        totalMatches: rounds.reduce((acc, r) => acc + r.matches.length, 0),
      },
    });
  } catch (error) {
    console.error("Error generating bracket:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate bracket" },
      { status: 500 }
    );
  }
}

// PATCH - Update bracket settings (visibility, etc.)
export async function PATCH(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    await connectDB();

    const body = await request.json();

    // Validate input
    const result = bracketUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { isVisible, champion, mvp } = result.data;

    const bracket = await Bracket.findOne();
    if (!bracket) {
      return NextResponse.json(
        { success: false, error: "No bracket found" },
        { status: 404 }
      );
    }

    if (typeof isVisible === "boolean") {
      bracket.isVisible = isVisible;
    }
    if (champion !== undefined) {
      bracket.champion = champion || null;
    }
    if (mvp !== undefined) {
      bracket.mvp = mvp || null;
    }

    await bracket.save();

    return NextResponse.json({
      success: true,
      message: "Bracket updated successfully",
      bracket: {
        _id: bracket._id,
        isVisible: bracket.isVisible,
        champion: bracket.champion?.toString(),
        mvp: bracket.mvp?.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating bracket");
    return NextResponse.json(
      { success: false, error: "Failed to update bracket" },
      { status: 500 }
    );
  }
}

// DELETE - Delete bracket
export async function DELETE(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    await connectDB();

    await Bracket.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "Bracket deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting bracket:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete bracket" },
      { status: 500 }
    );
  }
}

// Helper functions
function getBracketSize(teamCount: number): number {
  let size = 2;
  while (size < teamCount) {
    size *= 2;
  }
  return size;
}

function generateBracketRounds(
  teams: any[],
  bracketSize: number,
  totalRounds: number
) {
  const rounds = [];
  const firstRoundMatches = bracketSize / 2;

  // First round
  const firstRoundMatchesArray = [];
  for (let i = 0; i < firstRoundMatches; i++) {
    const team1Index = i * 2;
    const team2Index = i * 2 + 1;

    const match = {
      matchId: `R1-M${i + 1}`,
      position: i,
      team1: teams[team1Index]
        ? { teamId: teams[team1Index]._id, score: 0 }
        : null,
      team2: teams[team2Index]
        ? { teamId: teams[team2Index]._id, score: 0 }
        : null,
      winner: null,
      isLive: false,
      isCompleted: false,
      scheduledTime: null,
    };

    firstRoundMatchesArray.push(match);
  }

  rounds.push({
    name: getRoundName(1, totalRounds),
    roundNumber: 1,
    matches: firstRoundMatchesArray,
  });

  // Generate subsequent rounds (empty)
  for (let round = 2; round <= totalRounds; round++) {
    const matchesInRound = bracketSize / Math.pow(2, round);
    const matches = [];

    for (let i = 0; i < matchesInRound; i++) {
      matches.push({
        matchId: `R${round}-M${i + 1}`,
        position: i,
        team1: null,
        team2: null,
        winner: null,
        isLive: false,
        isCompleted: false,
        scheduledTime: null,
      });
    }

    rounds.push({
      name: getRoundName(round, totalRounds),
      roundNumber: round,
      matches,
    });
  }

  return rounds;
}

function getRoundName(roundNumber: number, totalRounds: number): string {
  if (roundNumber === totalRounds) return "Grand Final";
  if (roundNumber === totalRounds - 1) return "Semi Finals";
  if (roundNumber === totalRounds - 2) return "Quarter Finals";
  return `Round ${roundNumber}`;
}
