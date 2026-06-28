"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swords, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TournamentBracketDisplay } from "./TournamentBracket";
import { TournamentBracket } from "./types";

export function BracketSection() {
  const [bracket, setBracket] = useState<TournamentBracket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBracket();
  }, []);

  const fetchBracket = async () => {
    try {
      const res = await fetch("/api/bracket");
      const data = await res.json();
      if (data.success && data.bracket) {
        setBracket(data.bracket);
      }
    } catch (err) {
      console.error("Failed to fetch bracket:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest mb-4">
              Live Bracket
            </span>
            <h2 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider">
              Tournament Bracket
            </h2>
          </div>
          <Card className="py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-chakra text-sm text-muted mt-4">Loading bracket...</p>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (!bracket) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest mb-4">
              Coming Soon
            </span>
            <h2 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider">
              Tournament Bracket
            </h2>
          </div>
          <Card className="py-12">
            <div className="text-center">
              <Swords className="w-12 h-12 text-muted mx-auto mb-4" />
              <h3 className="font-russo text-lg text-white uppercase tracking-wide mb-2">
                Bracket Coming Soon
              </h3>
              <p className="font-chakra text-sm text-muted max-w-md mx-auto">
                The tournament bracket will be revealed once teams are confirmed.
                Stay tuned for updates!
              </p>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest mb-4">
            Live Bracket
          </span>
          <h2 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider">
            Tournament Bracket
          </h2>
        </motion.div>

        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{bracket.tournamentName || "Tournament Bracket"}</CardTitle>
              {bracket.rounds.some((r) =>
                r.matches.some((m) => m.isLive)
              ) && (
                <span className="flex items-center gap-2 text-primary text-sm font-chakra">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Live Match
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <TournamentBracketDisplay bracket={bracket} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
