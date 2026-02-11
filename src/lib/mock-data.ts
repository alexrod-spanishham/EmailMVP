import { DailyDigest, DigestItem } from "./types";

function hoursAgo(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

const MOCK_ITEMS: DigestItem[] = [
  // === ACTION REQUIRED (4) ===
  {
    id: "ar-1",
    subject: "Contract review needed by Friday",
    senderName: "Lisa Chen",
    senderEmail: "lisa.chen@outsidecounsel.com",
    summary:
      "Outside counsel sent the revised vendor agreement for the data processing partnership. Key changes include updated liability caps and a new IP assignment clause in Section 7. They need your sign-off before the Friday deadline.",
    category: "action_required",
    priority: "high",
    originalSnippet:
      "Hi, please find attached the revised vendor agreement (v3). We've incorporated your feedback on Sections 4 and 7. The liability cap has been adjusted to...",
    receivedAt: hoursAgo(2),
    actionSuggestion: "Review Sections 4 and 7, reply with approval by Friday COB",
    tags: ["legal", "contracts"],
  },
  {
    id: "ar-2",
    subject: "Board deck feedback request",
    senderName: "Marcus Thompson",
    senderEmail: "marcus@company.com",
    summary:
      "Marcus shared the Q1 board deck draft and is asking for your input on the product roadmap slides (slides 12-18). The board meeting is next Tuesday, so feedback is needed by end of day Monday.",
    category: "action_required",
    priority: "high",
    originalSnippet:
      "Hey! Board deck is coming together. I've attached the latest draft — could you take a look at the product section? Specifically slides 12-18 where we cover the...",
    receivedAt: hoursAgo(5),
    actionSuggestion: "Review slides 12-18 and send comments by Monday EOD",
    tags: ["board", "Q1"],
  },
  {
    id: "ar-3",
    subject: "Production incident: API latency spike",
    senderName: "PagerDuty",
    senderEmail: "alerts@pagerduty.com",
    summary:
      "API response times spiked to 4.2s (p95) at 2:15 AM, triggering a SEV-2 alert. The on-call engineer applied a temporary fix by scaling up the worker pool, but the root cause appears to be a slow database query in the billing service that needs investigation.",
    category: "action_required",
    priority: "high",
    originalSnippet:
      "[SEV-2] Service: api-gateway | Metric: p95_latency | Threshold: >2000ms | Current: 4217ms | Duration: 45 minutes | On-call: Jake Rivera...",
    receivedAt: hoursAgo(8),
    actionSuggestion:
      "Check incident channel for RCA, ensure billing query is optimized today",
    tags: ["engineering", "incident"],
  },
  {
    id: "ar-4",
    subject: "Your input needed: Q1 OKR draft",
    senderName: "Priya Patel",
    senderEmail: "priya@company.com",
    summary:
      "Priya compiled the team's Q1 OKR proposals into a single doc and is asking each lead to confirm their key results and target metrics. She's scheduled the OKR review for Thursday's leadership meeting.",
    category: "action_required",
    priority: "medium",
    originalSnippet:
      "Hi team, I've pulled together everyone's OKR drafts into one doc (link below). Please review your section and confirm the target numbers are accurate before...",
    receivedAt: hoursAgo(6),
    actionSuggestion: "Confirm your OKR targets in the shared doc before Thursday",
    tags: ["planning", "Q1"],
  },

  // === DELEGATE (3) ===
  {
    id: "dl-1",
    subject: "New partnership inquiry from Acme Corp",
    senderName: "David Rodriguez",
    senderEmail: "d.rodriguez@acmecorp.com",
    summary:
      "The VP of Product at Acme Corp reached out about a potential integration partnership. They have 50K+ users on their platform and want to explore embedding our analytics widget. Seems like a solid mid-market opportunity.",
    category: "delegate",
    priority: "medium",
    originalSnippet:
      "Hello, I'm David Rodriguez, VP Product at Acme Corp. We've been following your product and believe there's a strong opportunity for an integration...",
    receivedAt: hoursAgo(10),
    actionSuggestion: "Forward to Sarah on the partnerships team for initial call",
    tags: ["partnerships", "inbound"],
  },
  {
    id: "dl-2",
    subject: "Customer requesting enterprise pricing",
    senderName: "Support Team",
    senderEmail: "support@company.com",
    summary:
      "A prospect from a Fortune 500 healthcare company submitted an enterprise pricing inquiry through the website. They mentioned a team of 200+ users and need SOC 2 compliance documentation as part of their evaluation.",
    category: "delegate",
    priority: "medium",
    originalSnippet:
      "New enterprise inquiry from: Jennifer Walsh, VP Operations at MedCore Health Systems. Company size: 2,500 employees. Requested: Enterprise pricing for 200+ seats...",
    receivedAt: hoursAgo(7),
    actionSuggestion: "Route to Alex on sales — this looks like a qualified enterprise lead",
    tags: ["sales", "enterprise"],
  },
  {
    id: "dl-3",
    subject: "Intern onboarding checklist needs review",
    senderName: "HR Team",
    senderEmail: "hr@company.com",
    summary:
      "HR updated the summer intern onboarding checklist and wants engineering leads to verify the technical setup section. Three interns are starting March 3rd and need dev environment access, GitHub org invites, and Slack channel additions.",
    category: "delegate",
    priority: "low",
    originalSnippet:
      "Hi Engineering Leads, we're finalizing the onboarding plan for our three summer interns starting March 3rd. Could you review the technical setup section...",
    receivedAt: hoursAgo(14),
    actionSuggestion: "Ask your tech lead to review the setup checklist",
    tags: ["hiring", "onboarding"],
  },

  // === FYI (5) ===
  {
    id: "fyi-1",
    subject: "Weekly metrics dashboard update",
    senderName: "Analytics Bot",
    senderEmail: "analytics@company.com",
    summary:
      "Weekly active users grew 12% to 34.2K. Retention at day-7 held steady at 41%. Revenue was up 8% WoW driven by a bump in annual plan conversions. Churn ticked down slightly to 3.1%.",
    category: "fyi",
    priority: "medium",
    originalSnippet:
      "Weekly Report — Feb 3-9, 2026\n\nWAU: 34,218 (+12%)\nDAU: 8,105 (+6%)\nD7 Retention: 41.2% (flat)\nMRR: $127,400 (+8%)...",
    receivedAt: hoursAgo(3),
    tags: ["metrics", "weekly"],
  },
  {
    id: "fyi-2",
    subject: "Engineering sprint retrospective notes",
    senderName: "Jake Rivera",
    senderEmail: "jake@company.com",
    summary:
      "Sprint 14 retrospective highlights: the team shipped the new onboarding flow ahead of schedule. Main concern raised was flaky end-to-end tests causing CI delays — Jake proposed dedicating 20% of next sprint to test infrastructure.",
    category: "fyi",
    priority: "low",
    originalSnippet:
      "Sprint 14 Retro Summary\n\nWhat went well:\n- Onboarding flow shipped 2 days early\n- Good cross-team collaboration on the billing migration\n\nWhat could improve:...",
    receivedAt: hoursAgo(4),
    tags: ["engineering", "sprint"],
  },
  {
    id: "fyi-3",
    subject: "New hire announcement: Sarah joining Design",
    senderName: "People Team",
    senderEmail: "people@company.com",
    summary:
      "Sarah Kim is joining as Senior Product Designer on February 24th. She's coming from Figma where she led the design system team. She'll be embedded with the growth squad.",
    category: "fyi",
    priority: "low",
    originalSnippet:
      "Excited to announce that Sarah Kim will be joining us as Senior Product Designer starting February 24th! Sarah comes to us from Figma where she spent 3 years...",
    receivedAt: hoursAgo(9),
    tags: ["hiring", "design"],
  },
  {
    id: "fyi-4",
    subject: "Office lease renewal reminder",
    senderName: "Operations",
    senderEmail: "ops@company.com",
    summary:
      "The office lease expires April 30th. The landlord offered a 2-year renewal at a 6% rate increase. Operations is evaluating whether to renew, downsize, or explore co-working alternatives given the hybrid work policy.",
    category: "fyi",
    priority: "low",
    originalSnippet:
      "Quick update on the office lease situation: our current lease at 450 Market St expires April 30, 2026. The landlord has offered renewal terms...",
    receivedAt: hoursAgo(11),
    tags: ["operations", "facilities"],
  },
  {
    id: "fyi-5",
    subject: "Industry report: AI in SaaS 2026",
    senderName: "Research Team",
    senderEmail: "research@company.com",
    summary:
      "The research team compiled a competitive landscape report on AI adoption in B2B SaaS. Key takeaway: 73% of mid-market SaaS companies now ship AI features, up from 31% in 2024. The report includes positioning recommendations for our roadmap.",
    category: "fyi",
    priority: "medium",
    originalSnippet:
      "Attached: Q1 2026 Competitive Intelligence Report — AI in B2B SaaS. Executive Summary: The adoption of AI-powered features in B2B SaaS has accelerated...",
    receivedAt: hoursAgo(12),
    tags: ["research", "strategy"],
  },

  // === NEWSLETTERS (6) ===
  {
    id: "nl-1",
    subject: "Stratechery: The Platform Shift",
    senderName: "Ben Thompson",
    senderEmail: "ben@stratechery.com",
    summary:
      "Ben Thompson argues that the current wave of AI agents represents the third major platform shift after mobile and cloud. He draws parallels to the early App Store era and predicts which incumbents are best positioned to capture value.",
    category: "newsletters",
    priority: "medium",
    originalSnippet:
      "Good morning,\n\nThe most consequential technology shifts are obvious in retrospect but feel uncertain in the moment. I believe we are in the early days of...",
    receivedAt: hoursAgo(4),
    tags: ["strategy", "AI"],
  },
  {
    id: "nl-2",
    subject: "Morning Brew: Markets recap",
    senderName: "Morning Brew",
    senderEmail: "crew@morningbrew.com",
    summary:
      "S&P 500 closed up 0.8% on strong earnings from big tech. Fed minutes suggested rate cuts may come sooner than expected. In other news, a major retailer announced plans to integrate AI shopping assistants across 2,000 stores.",
    category: "newsletters",
    priority: "low",
    originalSnippet:
      "Good morning! Here's what you need to know today:\n\nMARKETS: The S&P 500 rose 0.8% to close at 6,142, buoyed by better-than-expected earnings from...",
    receivedAt: hoursAgo(3),
  },
  {
    id: "nl-3",
    subject: "TLDR Tech: Daily digest",
    senderName: "TLDR",
    senderEmail: "dan@tldrnewsletter.com",
    summary:
      "Top stories: GitHub launched a new AI code review feature, Google released Gemini 3.0 with improved reasoning benchmarks, and a YC-backed startup raised $40M for autonomous database management.",
    category: "newsletters",
    priority: "low",
    originalSnippet:
      "TLDR 2026-02-11\n\n📱 Big Tech & Startups\n\nGitHub launches AI-powered code review (3 minute read)\nGitHub announced a new feature that uses AI to automatically...",
    receivedAt: hoursAgo(2),
  },
  {
    id: "nl-4",
    subject: "Lenny's Newsletter: Retention benchmarks for 2026",
    senderName: "Lenny Rachitsky",
    senderEmail: "lenny@substack.com",
    summary:
      "Lenny published updated retention benchmarks based on data from 500+ B2B SaaS companies. The new 'good' threshold for D30 retention is 25% (up from 20% in 2024). He also interviewed the head of growth at Linear about their activation flow.",
    category: "newsletters",
    priority: "medium",
    originalSnippet:
      "👋 Hey there,\n\nI've been working on this one for months — the most comprehensive retention benchmark study I've ever published. After surveying 500+ B2B SaaS...",
    receivedAt: hoursAgo(5),
    tags: ["growth", "benchmarks"],
  },
  {
    id: "nl-5",
    subject: "Dense Discovery: Issue #324",
    senderName: "Kai Brach",
    senderEmail: "kai@densediscovery.com",
    summary:
      "This week's curation includes a long-read on the ethics of persuasive design, a new open-source design system for accessibility, and a thoughtful essay about building products that respect users' time.",
    category: "newsletters",
    priority: "low",
    originalSnippet:
      "Dense Discovery — Issue 324\n\nHello friends, I hope this finds you well. This week I've been thinking about the tension between engagement metrics and...",
    receivedAt: hoursAgo(6),
  },
  {
    id: "nl-6",
    subject: "Hacker News Digest: Top 10",
    senderName: "HN Digest",
    senderEmail: "digest@hndigest.com",
    summary:
      "Top discussions: a deep dive into SQLite's new vector search extension (482 points), a Show HN for an open-source Figma alternative (371 points), and a heated debate about whether LLMs can truly reason (298 points).",
    category: "newsletters",
    priority: "low",
    originalSnippet:
      "Your Hacker News Daily Digest — February 11, 2026\n\n1. SQLite's New Vector Search Extension (sqlite.org) — 482 points, 187 comments\n2. Show HN: Open-source...",
    receivedAt: hoursAgo(1),
  },

  // === LOW PRIORITY (5) ===
  {
    id: "lp-1",
    subject: "LinkedIn: 3 people viewed your profile",
    senderName: "LinkedIn",
    senderEmail: "notifications@linkedin.com",
    summary:
      "Three people viewed your LinkedIn profile this week, including a recruiter from a Series B fintech company and a product manager at a competitor.",
    category: "low_priority",
    priority: "low",
    originalSnippet:
      "Your profile was viewed by 3 people this week. See who's looking at your profile and what they're interested in...",
    receivedAt: hoursAgo(1),
  },
  {
    id: "lp-2",
    subject: "Zoom: Your cloud recording is ready",
    senderName: "Zoom",
    senderEmail: "no-reply@zoom.us",
    summary:
      "The recording from yesterday's product sync meeting is now available. Duration: 47 minutes.",
    category: "low_priority",
    priority: "low",
    originalSnippet:
      "Hi, your cloud recording for 'Product Sync — Feb 10' is now available. Recording duration: 47:23. Click here to view...",
    receivedAt: hoursAgo(15),
  },
  {
    id: "lp-3",
    subject: "GitHub: Dependabot alert on email-digest-mvp",
    senderName: "GitHub",
    senderEmail: "notifications@github.com",
    summary:
      "Dependabot flagged a moderate severity vulnerability in a transitive dependency (lodash 4.17.20). A patch is available by updating to the latest version.",
    category: "low_priority",
    priority: "low",
    originalSnippet:
      "[email-digest-mvp] Dependabot alert: Moderate severity vulnerability in lodash (npm). Vulnerable versions: < 4.17.21. Patched version: 4.17.21...",
    receivedAt: hoursAgo(13),
    tags: ["engineering", "security"],
  },
  {
    id: "lp-4",
    subject: "Figma: Weekly activity summary",
    senderName: "Figma",
    senderEmail: "notifications@figma.com",
    summary:
      "Your team made 34 edits across 6 files this week. The most active file was 'Onboarding Redesign v2' with 18 edits by 3 collaborators.",
    category: "low_priority",
    priority: "low",
    originalSnippet:
      "Your weekly Figma summary: 34 edits across 6 files. Top file: 'Onboarding Redesign v2' — 18 edits by Sarah, Jake, and Marcus...",
    receivedAt: hoursAgo(2),
  },
  {
    id: "lp-5",
    subject: "Slack: Weekly digest for #random",
    senderName: "Slack",
    senderEmail: "notification@slack.com",
    summary:
      "The #random channel highlights include a debate about the best local coffee shops, someone's dog photo that got 47 reactions, and a link to a fascinating documentary about typography.",
    category: "low_priority",
    priority: "low",
    originalSnippet:
      "Here's what you missed in #random this week:\n\n🔥 Most reacted: 🐕 Cooper's first day at the dog park (47 reactions)\n💬 Most discussed: Best coffee shops near...",
    receivedAt: hoursAgo(3),
  },
];

export function getMockDigest(): DailyDigest {
  const today = new Date().toISOString().split("T")[0];
  const generatedAt = new Date();
  generatedAt.setHours(6, 0, 0, 0);

  return {
    date: today,
    generatedAt: generatedAt.toISOString(),
    totalEmails: MOCK_ITEMS.length,
    readingTimeMinutes: 5,
    executiveSummary:
      "A busy overnight inbox with a few time-sensitive items. A vendor contract needs your sign-off by Friday, and the board deck needs feedback by Monday — both high priority. There was a SEV-2 production incident around 2 AM (API latency spike) that's been temporarily mitigated but needs a root cause fix today. On the opportunity side, Acme Corp reached out about an integration partnership and a Fortune 500 healthcare company is asking for enterprise pricing — both worth routing to your team quickly. Weekly metrics look strong: WAU up 12%, revenue up 8% week-over-week. Six newsletters came in with good reads from Stratechery and Lenny's Newsletter worth bookmarking.",
    items: MOCK_ITEMS,
  };
}
