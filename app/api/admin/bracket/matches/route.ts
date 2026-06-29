import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Bracket } from "@/lib/models/bracket";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { matchUpdateSchema } from "@/lib/validation";

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

// PATCH - Update match scores/winner
export async function PATCH(request: Request) {
  const token = getTokenFromCookies(request);
  if (!token || !verifyToken(token)) return unauthorized();

  try {
    await connectDB();

    const body = await request.json();

    // Validate input
    const result = matchUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { matchId, team1Score, team2Score, winnerId, isLive, scheduledTime } = result.data;

    const bracket = await Bracket.findOne();
    if (!bracket) {
      return NextResponse.json(
        { success: false, error: "No bracket found" },
        { status: 404 }
      );
    }

    // Find the match across all rounds
    let foundMatch: any = null;
    let foundRound: any = null;
    for (const round of bracket.rounds) {
      const match = round.matches.find((m: any) => m.matchId === matchId);
      if (match) {
        foundMatch = match;
        foundRound = round;
        break;
      }
    }

    if (!foundMatch || !foundRound) {
      return NextResponse.json(
        { success: false, error: "Match not found" },
        { status: 404 }
      );
    }

    // Update match
    if (team1Score !== undefined && foundMatch.team1) {
      foundMatch.team1.score = team1Score;
    }
    if (team2Score !== undefined && foundMatch.team2) {
      foundMatch.team2.score = team2Score;
    }
    if (winnerId !== undefined) {
      foundMatch.winner = winnerId || null;
      foundMatch.isCompleted = !!winnerId;
    }
    if (isLive !== undefined) {
      foundMatch.isLive = isLive;
    }
    if (scheduledTime !== undefined) {
      foundMatch.scheduledTime = scheduledTime;
    }

    // Auto-advance winner to next round
    if (winnerId && foundMatch.team1 && foundMatch.team2) {
      const nextRoundIndex = bracket.rounds.findIndex(
        (r: any) => r.roundNumber === foundRound.roundNumber + 1
      );

      if (nextRoundIndex !== -1) {
        const nextRound = bracket.rounds[nextRoundIndex];
        const nextMatchPosition = Math.floor(foundMatch.position / 2);
        const nextMatch = nextRound.matches.find(
          (m: any) => m.position === nextMatchPosition
        );

        if (nextMatch) {
          // Determine which slot to fill (top or bottom bracket)
          if (foundMatch.position % 2 === 0) {
            nextMatch.team1 = { teamId: winnerId, score: 0 };
          } else {
            nextMatch.team2 = { teamId: winnerId, score: 0 };
          }
        }
      }

      // Update champion if this is the final match
      const isGrandFinal = foundRound.roundNumber === bracket.rounds.length;
      if (isGrandFinal) {
        bracket.champion = winnerId;
      }
    }

    await bracket.save();

    return NextResponse.json({
      success: true,
      message: "Match updated successfully",
    });
  } catch (error) {
    console.error("Error updating match");
    return NextResponse.json(
      { success: false, error: "Failed to update match" },
      { status: 500 }
    );
  }
}
