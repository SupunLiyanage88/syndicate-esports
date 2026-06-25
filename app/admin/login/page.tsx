"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trophy, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/syndicate logo.png"
            alt="Syndicate Esports"
            width={80}
            height={80}
            className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(201,162,39,0.3)]"
          />
          <h1 className="font-rajdhani font-bold text-3xl text-gold-light uppercase tracking-wider">
            Admin Login
          </h1>
          <p className="font-inter text-muted text-sm mt-2">
            Ascendant League Season 1
          </p>
        </div>

        <div className="bg-surface border border-border rounded-cards p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="admin@syndicate-esports.lk"
              />
            </div>

            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-background border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200 pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-gold-light transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/30 rounded-lg px-4 py-3">
                <p className="text-danger text-sm font-inter">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-background font-rajdhani font-semibold uppercase tracking-wider py-3 rounded-buttons text-lg hover:bg-gold-light hover:shadow-gold-glow transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Trophy size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="font-inter text-sm text-muted hover:text-gold-light transition-colors">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
