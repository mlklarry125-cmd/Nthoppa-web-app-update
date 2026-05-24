"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft, Rocket, Target, Flame, BookOpen,
  Activity, CheckCircle, Lock, Star, Trophy,
  TrendingUp, ArrowRight, Clock, Award, Zap
} from "lucide-react";

// --- Mock data (replace with real API calls) ---
const profile = {
  name: "Josephine",
  gritScore: 74,
  savingsStreak: 62, // days
  moduleCompletion: 58, // %
  weeklyActivity: true,
  currentStage: 1, // 0=Not Started, 1=Building, 2=Ready, 3=Referred, 4=Enrolled
};

const requirements = [
  {
    id: "grit",
    label: "Grit Score",
    description: "Behaviour-based resilience & discipline score",
    target: 70,
    current: profile.gritScore,
    unit: "pts",
    icon: Star,
    met: profile.gritScore >= 70,
    tip: "Complete financial literacy modules and maintain savings streaks to raise your Grit score.",
  },
  {
    id: "streak",
    label: "Savings Streak",
    description: "Consecutive days of consistent saving activity",
    target: 90,
    current: profile.savingsStreak,
    unit: "days",
    icon: Flame,
    met: profile.savingsStreak >= 90,
    tip: "Save any amount daily for 90 consecutive days. You're 28 days away!",
  },
  {
    id: "modules",
    label: "Module Completion",
    description: "Financial literacy course progress",
    target: 50,
    current: profile.moduleCompletion,
    unit: "%",
    icon: BookOpen,
    met: profile.moduleCompletion >= 50,
    tip: "Complete 2 more modules to hit 50%. Start with 'Cash Flow Management'.",
  },
  {
    id: "activity",
    label: "Weekly Activity",
    description: "Consistent platform engagement this week",
    target: 1,
    current: profile.weeklyActivity ? 1 : 0,
    unit: "",
    icon: Activity,
    met: profile.weeklyActivity,
    tip: "Log in and complete at least one action every week.",
  },
];

const metCount = requirements.filter((r) => r.met).length;
const overallReadiness = Math.round((metCount / requirements.length) * 100);

const stages = [
  { id: 0, label: "Not Started", desc: "Begin your financial journey" },
  { id: 1, label: "Building Foundations", desc: "Developing financial habits" },
  { id: 2, label: "Incubator Ready", desc: "All criteria met — apply now" },
  { id: 3, label: "Referred", desc: "Application under review" },
  { id: 4, label: "Enrolled", desc: "Welcome to Accelerate!" },
];

const upcomingMilestones = [
  { label: "Complete 'Cash Flow Management' module", points: "+8 Grit", done: false },
  { label: "Reach 90-day savings streak", points: "+12 Grit", done: false },
  { label: "Set up a business savings goal", points: "+5 Grit", done: true },
  { label: "Complete KYC Tier 2 verification", points: "+10 Grit", done: true },
];

const incubatorBenefits = [
  { icon: "🏫", title: "Business Skills Training", desc: "12-week structured programme covering operations, marketing, and finance" },
  { icon: "🤝", title: "Mentorship Access", desc: "One-on-one sessions with experienced entrepreneurs and Stanbic advisors" },
  { icon: "💰", title: "Working Capital Support", desc: "Access to Stanbic Business Banking and enterprise funding pathways" },
  { icon: "🌐", title: "Network & Ecosystem", desc: "Connect with other SMEs and potential investors in the Accelerate cohort" },
];

function GaugeChart({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(value / max, 1);

  // Semicircle arc: left point to right point, curving upward
  const cx = 100, cy = 95, r = 72;
  // Arc circumference of a semicircle
  const arcLen = Math.PI * r; // ~226

  // SVG path for the semicircle track (left → right, sweep clockwise = arc above centre)
  const trackD = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // Fill length based on value percentage
  const fillLen = pct * arcLen;

  // Needle: starts pointing left (-180deg), rotates right by pct*180
  const needleAngleDeg = -180 + pct * 180;
  const needleAngleRad = (needleAngleDeg * Math.PI) / 180;
  const needleLen = 54;
  const nx = cx + needleLen * Math.cos(needleAngleRad);
  const ny = cy + needleLen * Math.sin(needleAngleRad);

  // Zone colour bands (decorative segments behind track)
  const zones = [
    { from: 0, to: 0.33, color: "rgba(239,68,68,0.25)" },
    { from: 0.33, to: 0.66, color: "rgba(251,146,60,0.25)" },
    { from: 0.66, to: 1, color: "rgba(34,197,94,0.20)" },
  ];

  const arcPoint = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  return (
    <svg viewBox="0 0 200 110" className="w-full" style={{ overflow: "visible" }}>
      {/* Zone bands */}
      {zones.map((z, i) => {
        const startAngle = -180 + z.from * 180;
        const endAngle = -180 + z.to * 180;
        const s = arcPoint(startAngle, r);
        const e = arcPoint(endAngle, r);
        const large = (z.to - z.from) > 0.5 ? 1 : 0;
        return (
          <path
            key={i}
            d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`}
            fill="none"
            stroke={z.color}
            strokeWidth="14"
            strokeLinecap="butt"
          />
        );
      })}

      {/* Background track */}
      <path
        d={trackD}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Value fill — dasharray trick for clean animation */}
      <path
        d={trackD}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${fillLen} ${arcLen + 1}`}
        style={{ transition: "stroke-dasharray 1.4s cubic-bezier(0.34,1.56,0.64,1)" }}
      />

      {/* Tick marks at 0, 25, 50, 75, 100 */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const angle = -180 + (tick / 100) * 180;
        const inner = arcPoint(angle, r - 10);
        const outer = arcPoint(angle, r + 4);
        return (
          <line key={tick}
            x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"
          />
        );
      })}

      {/* Needle shadow */}
      <line x1={cx} y1={cy} x2={nx + 1} y2={ny + 1}
        stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round" />

      {/* Needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny}
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
        style={{ transition: "x2 1.4s cubic-bezier(0.34,1.56,0.64,1), y2 1.4s cubic-bezier(0.34,1.56,0.64,1)" }}
      />

      {/* Hub rings */}
      <circle cx={cx} cy={cy} r="9" fill="rgba(255,255,255,0.15)" />
      <circle cx={cx} cy={cy} r="6" fill="white" />
      <circle cx={cx} cy={cy} r="3.5" fill={color} />

      {/* End labels */}
      <text x={cx - r - 2} y={cy + 15} fontSize="8.5" fill="rgba(255,255,255,0.35)" textAnchor="middle">0</text>
      <text x={cx + r + 2} y={cy + 15} fontSize="8.5" fill="rgba(255,255,255,0.35)" textAnchor="middle">{max}</text>
      <text x={cx} y={cy - r - 8} fontSize="8.5" fill="rgba(255,255,255,0.35)" textAnchor="middle">{Math.round(max / 2)}</text>
    </svg>
  );
}

export default function AccelerateReadinessPage() {
  const router = useRouter();
  const [expandedReq, setExpandedReq] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6 pb-10">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm group transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </div>
        Back
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-[#FF6B35]" />
            </div>
            <span className="text-xs font-semibold text-[#FF6B35] uppercase tracking-widest">Accelerate Incubator</span>
          </div>
          <h1 className="text-2xl font-black text-black">Your Readiness Tracker</h1>
          <p className="text-gray-500 text-sm mt-1">Track your progress toward the Accelerate Incubator programme</p>
        </div>
        <Badge className={`shrink-0 ${metCount === requirements.length ? "bg-green-100 text-green-700" : "bg-orange-100 text-[#FF6B35]"} border-0 text-xs px-3 py-1.5`}>
          {metCount}/{requirements.length} criteria met
        </Badge>
      </div>

      {/* Hero readiness card */}
      <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-3xl p-6 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF6B35]/5 rounded-full blur-[60px]" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Overall Readiness</p>
            <div className="w-full max-w-[200px]">
              <GaugeChart value={animated ? overallReadiness : 0} max={100} color="#FF6B35" />
            </div>
            <div className="mt-1">
              <span className="text-4xl font-black text-white">{overallReadiness}%</span>
              <span className="text-white/40 text-sm ml-2">ready</span>
            </div>
            <p className="text-white/50 text-sm mt-1">
              {overallReadiness < 50 ? "Keep building — you're on the right track." :
               overallReadiness < 75 ? "Good progress! Almost there." :
               overallReadiness < 100 ? "So close! Just one more criteria left." :
               "All criteria met! Apply now."}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-white/40 text-xs uppercase tracking-widest">Criteria Status</p>
            {requirements.map((r) => (
              <div key={r.id} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${r.met ? "bg-green-500" : "bg-white/10"}`}>
                  {r.met ? <CheckCircle className="w-3 h-3 text-white" /> : <Clock className="w-3 h-3 text-white/40" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-semibold truncate">{r.label}</span>
                    <span className={`text-xs font-bold ml-2 ${r.met ? "text-green-400" : "text-white/40"}`}>
                      {r.id === "activity" ? (r.met ? "Done" : "Pending") : `${r.current}/${r.target}${r.unit}`}
                    </span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${r.met ? "bg-green-500" : "bg-[#FF6B35]"}`}
                      style={{ width: animated ? `${Math.min((r.current / r.target) * 100, 100)}%` : "0%" }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {overallReadiness === 100 && (
              <Button className="w-full mt-2 bg-[#FF6B35] hover:bg-[#d44a18] text-white rounded-xl font-bold">
                Apply to Accelerate <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stage journey */}
      <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-gray-900">Your Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between relative">
            {/* Connector line */}
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-100 z-0" />
            <div
              className="absolute left-0 top-5 h-0.5 bg-[#FF6B35] z-0 transition-all duration-1000"
              style={{ width: animated ? `${(profile.currentStage / (stages.length - 1)) * 100}%` : "0%" }}
            />
            {stages.map((s, i) => {
              const done = i < profile.currentStage;
              const active = i === profile.currentStage;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2 z-10 flex-1">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    done ? "bg-[#FF6B35] border-[#FF6B35]" :
                    active ? "bg-white border-[#FF6B35] shadow-lg shadow-[#FF6B35]/20" :
                    "bg-white border-gray-200"
                  }`}>
                    {done ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : active ? (
                      <div className="w-3 h-3 rounded-full bg-[#FF6B35] animate-pulse" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold leading-tight ${active ? "text-[#FF6B35]" : done ? "text-gray-700" : "text-gray-300"}`}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-gray-400 hidden md:block leading-tight mt-0.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed requirement cards */}
      <div>
        <h2 className="text-base font-black text-black mb-3">Entry Requirements</h2>
        <div className="space-y-3">
          {requirements.map((req, i) => {
            const Icon = req.icon;
            const pct = Math.min((req.current / req.target) * 100, 100);
            const isExpanded = expandedReq === req.id;
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card
                  className={`border rounded-2xl cursor-pointer transition-all ${req.met ? "border-green-200 bg-green-50/30" : "border-gray-100"} ${isExpanded ? "shadow-md" : "shadow-sm"}`}
                  onClick={() => setExpandedReq(isExpanded ? null : req.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${req.met ? "bg-green-100" : "bg-[#FF6B35]/10"}`}>
                        <Icon className={`w-5 h-5 ${req.met ? "text-green-600" : "text-[#FF6B35]"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-900">{req.label}</span>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <span className="text-xs font-bold text-gray-500">
                              {req.id === "activity" ? (req.met ? "✓ Done" : "Pending") : `${req.current} / ${req.target}${req.unit}`}
                            </span>
                            {req.met && <CheckCircle className="w-4 h-4 text-green-500" />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{req.description}</p>
                        {req.id !== "activity" && (
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${req.met ? "bg-green-500" : "bg-[#FF6B35]"}`}
                              style={{ width: animated ? `${pct}%` : "0%" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-start gap-2">
                              <Zap className="w-3.5 h-3.5 text-[#FF6B35] mt-0.5 shrink-0" />
                              <p className="text-xs text-gray-600 leading-relaxed">{req.tip}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Upcoming milestones */}
      <Card className="border border-gray-100 shadow-sm rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#FF6B35]" /> Upcoming Milestones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcomingMilestones.map((m, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${m.done ? "bg-green-50" : "bg-gray-50"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${m.done ? "bg-green-500" : "bg-gray-200"}`}>
                  {m.done ? <CheckCircle className="w-3 h-3 text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                </div>
                <span className={`text-xs font-medium ${m.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{m.label}</span>
              </div>
              <span className={`text-xs font-bold shrink-0 ml-2 ${m.done ? "text-green-600" : "text-[#FF6B35]"}`}>{m.points}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* What you unlock */}
      <div>
        <h2 className="text-base font-black text-black mb-3">What You Unlock in Accelerate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {incubatorBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <Card className="border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center shrink-0 text-lg">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{b.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stanbic partnership note */}
      <Card className="border border-[#0f4c8a]/20 rounded-2xl bg-gradient-to-r from-[#0f4c8a]/5 to-white shadow-sm">
        <CardContent className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0f4c8a]/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-[#0f4c8a]" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 mb-1">Powered by Stanbic Business Banking</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Accelerate programme graduates gain direct access to Stanbic Business Banking, working capital solutions, and enterprise development support — your Nthoppa readiness data is shared with Stanbic to fast-track your application.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
