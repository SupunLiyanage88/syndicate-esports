"use client";

import { useEffect, useState } from "react";
import { Settings, Save, Loader2, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TournamentSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [form, setForm] = useState<TournamentSettings>({
    registrationDeadline: "",
    groupStageStart: "",
    groupStageEnd: "",
    semiFinals: "",
    grandFinal: "",
    maxTeams: 8,
    championPrize: "",
    mvpPrize: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setForm({
          registrationDeadline: data.settings.registrationDeadline || "",
          groupStageStart: data.settings.groupStageStart || "",
          groupStageEnd: data.settings.groupStageEnd || "",
          semiFinals: data.settings.semiFinals || "",
          grandFinal: data.settings.grandFinal || "",
          maxTeams: data.settings.maxTeams || 8,
          championPrize: data.settings.championPrize || "",
          mvpPrize: data.settings.mvpPrize || "",
        });
      }
    } catch (err) {
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to save settings");
      }
    } catch {
      setError("Connection error");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "maxTeams" ? parseInt(value) || 0 : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-rajdhani font-bold text-3xl text-gold uppercase tracking-wider">
          Tournament Settings
        </h1>
        <p className="font-inter text-muted mt-1">
          Configure tournament dates, prizes, and limits.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-6 h-6 text-gold" />
            <h2 className="font-rajdhani font-semibold text-xl text-white uppercase tracking-wider">
              Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Registration Deadline
              </label>
              <input
                type="date"
                name="registrationDeadline"
                value={form.registrationDeadline}
                onChange={handleChange}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Max Teams
              </label>
              <input
                type="number"
                name="maxTeams"
                value={form.maxTeams}
                onChange={handleChange}
                min={1}
                max={64}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Group Stage Start
              </label>
              <input
                type="date"
                name="groupStageStart"
                value={form.groupStageStart}
                onChange={handleChange}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Group Stage End
              </label>
              <input
                type="date"
                name="groupStageEnd"
                value={form.groupStageEnd}
                onChange={handleChange}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Semi-Finals
              </label>
              <input
                type="date"
                name="semiFinals"
                value={form.semiFinals}
                onChange={handleChange}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Grand Final
              </label>
              <input
                type="date"
                name="grandFinal"
                value={form.grandFinal}
                onChange={handleChange}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
              />
            </div>
          </div>
        </Card>

        <Card className="mt-6">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-6 h-6 text-gold" />
            <h2 className="font-rajdhani font-semibold text-xl text-white uppercase tracking-wider">
              Prizes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Champion Prize
              </label>
              <input
                type="text"
                name="championPrize"
                value={form.championPrize}
                onChange={handleChange}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="5 × MLBB Starlight Memberships"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                MVP Prize
              </label>
              <input
                type="text"
                name="mvpPrize"
                value={form.mvpPrize}
                onChange={handleChange}
                className="w-full bg-surface-high border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="1 × Starlight Premium Membership"
              />
            </div>
          </div>
        </Card>

        {error && (
          <div className="flex items-center gap-2 text-danger text-sm font-inter mt-4">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gold text-background font-rajdhani font-semibold uppercase tracking-wider rounded-buttons text-lg hover:bg-gold-light hover:shadow-gold-glow transition-all duration-200 disabled:opacity-50"
          >
            {saving ? (
<>
              <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Settings
              </>
            )}
          </button>
          {success && (
            <span className="ml-4 text-success text-sm font-inter">
              Settings saved successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
