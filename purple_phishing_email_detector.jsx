import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MailWarning,
  ScanLine,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
  Copy,
  Upload,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sampleEmail = `Subject: Urgent Action Required - Account Verification

Dear Customer,

We detected unusual activity on your account. Your access will be suspended within 24 hours unless you verify your identity now.

Click here to verify: http://secure-bank-login.verify-user-alert.com

Failure to complete this process may result in permanent account closure.

Security Team`;

function analyzeEmail(text) {
  const rules = [
    {
      label: "Urgent pressure language",
      test: /(urgent|immediately|within 24 hours|suspended|permanent account closure|act now)/i,
      severity: "High",
      points: 25,
      tip: "Attackers often create panic to make users click quickly.",
    },
    {
      label: "Suspicious link detected",
      test: /(http:\/\/|bit\.ly|verify|login|secure).*(\.com|\.net|\.org)/i,
      severity: "High",
      points: 30,
      tip: "Always hover over links and verify the real domain before opening.",
    },
    {
      label: "Generic greeting",
      test: /(dear customer|dear user|hello user|valued customer)/i,
      severity: "Medium",
      points: 15,
      tip: "Legitimate services usually address you by name.",
    },
    {
      label: "Credential/identity request",
      test: /(verify your identity|password|login|account verification|confirm your account)/i,
      severity: "High",
      points: 20,
      tip: "Never submit credentials from email links.",
    },
    {
      label: "Threat of account loss",
      test: /(account closure|blocked|locked|disabled|access will be suspended)/i,
      severity: "Medium",
      points: 15,
      tip: "Threats are commonly used in phishing campaigns.",
    },
  ];

  const matches = rules.filter((rule) => rule.test.test(text));
  const score = Math.min(100, matches.reduce((total, rule) => total + rule.points, 0));
  const level = score >= 70 ? "High Risk" : score >= 35 ? "Medium Risk" : "Low Risk";

  return { score, level, matches };
}

export default function PurplePhishingEmailDetector() {
  const [email, setEmail] = useState(sampleEmail);
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => analyzeEmail(email), [email]);

  const scoreWidth = `${result.score}%`;

  const copyReport = async () => {
    const report = `Phishing Email Detector Report\nRisk: ${result.level}\nScore: ${result.score}/100\nFindings:\n${result.matches
      .map((m) => `- ${m.label} (${m.severity})`)
      .join("\n")}`;
    await navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0614] text-white">
      <section className="relative px-4 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,.35),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(236,72,153,.22),transparent_26%),linear-gradient(135deg,#0b0614,#160a2b_45%,#0d0718)]" />
        <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-purple-400/20 bg-white/5 px-5 py-4 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-purple-500 shadow-lg shadow-purple-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">PhishGuard AI</p>
              <p className="text-xs text-purple-200">Email Threat Scanner</p>
            </div>
          </div>
          <div className="hidden items-center gap-7 text-sm text-purple-100 md:flex">
            <a href="#scanner" className="hover:text-white">Scanner</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#tips" className="hover:text-white">Safety Tips</a>
          </div>
          <Button className="rounded-2xl bg-white px-5 text-purple-900 hover:bg-purple-100">
            Try Free
          </Button>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-10 py-16 lg:grid-cols-[1fr_.9fr] lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-100">
              <Sparkles className="h-4 w-4 text-fuchsia-300" />
              AI-powered phishing email analysis
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Detect suspicious emails before they steal your data.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-purple-100/80">
              Paste any email text and scan it for phishing signals, fake urgency, suspicious links, credential requests, and social engineering patterns.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button className="rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-7 py-6 text-base shadow-xl shadow-purple-700/30 hover:from-purple-400 hover:to-fuchsia-400">
                <ScanLine className="mr-2 h-5 w-5" /> Start Analysis
              </Button>
              <Button variant="outline" className="rounded-2xl border-purple-300/30 bg-white/5 px-7 py-6 text-base text-white hover:bg-white/10">
                <Upload className="mr-2 h-5 w-5" /> Upload Email
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <Card className="rounded-[2rem] border-purple-300/20 bg-white/10 shadow-2xl shadow-purple-950/60 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-200">Live Security Score</p>
                    <h2 className="text-3xl font-black text-white">{result.level}</h2>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-purple-500/20 text-2xl font-black text-fuchsia-200 ring-1 ring-purple-300/20">
                    {result.score}
                  </div>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-purple-950/80">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-500" style={{ width: scoreWidth }} />
                </div>
                <div className="mt-6 grid gap-3">
                  {result.matches.slice(0, 4).map((item) => (
                    <div key={item.label} className="flex gap-3 rounded-2xl border border-purple-300/15 bg-purple-950/35 p-4">
                      <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-fuchsia-300" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-white">{item.label}</p>
                          <span className="rounded-full bg-fuchsia-500/20 px-2 py-1 text-xs text-fuchsia-100">{item.severity}</span>
                        </div>
                        <p className="mt-1 text-sm text-purple-100/75">{item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="scanner" className="px-4 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_.8fr]">
          <Card className="rounded-[2rem] border-purple-300/20 bg-[#120821]/90 shadow-2xl shadow-purple-950/30">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Email Analyzer</h2>
                  <p className="text-sm text-purple-200">Paste suspicious email content below.</p>
                </div>
                <MailWarning className="h-7 w-7 text-fuchsia-300" />
              </div>
              <textarea
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[360px] w-full resize-none rounded-3xl border border-purple-300/20 bg-black/30 p-5 text-sm leading-7 text-purple-50 outline-none ring-0 placeholder:text-purple-200/40 focus:border-fuchsia-300/60"
                placeholder="Paste email header, subject, and body here..."
              />
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-2xl bg-purple-500 px-6 py-5 hover:bg-purple-400">
                  <Zap className="mr-2 h-5 w-5" /> Analyze Email
                </Button>
                <Button onClick={() => setEmail("")} variant="outline" className="rounded-2xl border-purple-300/20 bg-white/5 px-6 py-5 text-white hover:bg-white/10">
                  Clear Text
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-purple-300/20 bg-white/10 shadow-2xl shadow-purple-950/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-black text-white">Analysis Report</h2>
              <p className="mt-1 text-sm text-purple-200">Risk summary generated from common phishing indicators.</p>

              <div className="my-6 rounded-3xl border border-purple-300/20 bg-purple-950/40 p-5">
                <p className="text-sm text-purple-200">Risk Level</p>
                <p className="mt-1 text-4xl font-black text-white">{result.level}</p>
                <p className="mt-3 text-purple-100/75">Score: {result.score}/100</p>
              </div>

              <div className="space-y-3">
                {result.matches.length ? (
                  result.matches.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-black/20 p-4 ring-1 ring-purple-300/15">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-purple-100/75">{item.tip}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-300/20">
                    <div className="flex items-center gap-2 font-semibold text-emerald-100">
                      <CheckCircle2 className="h-5 w-5" /> No major warning signs found
                    </div>
                    <p className="mt-1 text-sm text-emerald-100/70">Still verify sender identity before clicking links or downloading files.</p>
                  </div>
                )}
              </div>

              <Button onClick={copyReport} className="mt-6 w-full rounded-2xl bg-white py-5 text-purple-900 hover:bg-purple-100">
                <Copy className="mr-2 h-5 w-5" /> {copied ? "Copied!" : "Copy Report"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="px-4 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-black text-white">Built for safer inboxes</h2>
            <p className="mt-3 text-purple-100/70">Clean interface, fast checks, and practical security guidance.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [ShieldCheck, "Threat Scoring", "Instantly grades email risk using common phishing red flags."],
              [Lock, "Privacy First", "Paste and review content without storing sensitive email text."],
              [ScanLine, "Clear Findings", "Shows exactly why an email may be dangerous."],
            ].map(([Icon, title, text]) => (
              <Card key={title} className="rounded-[2rem] border-purple-300/20 bg-white/10 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-purple-500/20 ring-1 ring-purple-300/20">
                    <Icon className="h-7 w-7 text-fuchsia-200" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2 text-purple-100/70">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer id="tips" className="border-t border-purple-300/10 bg-black/20 px-4 py-8 text-center text-sm text-purple-100/60">
        Never enter passwords from email links. Visit official websites directly and enable multi-factor authentication.
      </footer>
    </main>
  );
}
