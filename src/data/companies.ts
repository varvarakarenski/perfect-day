import type { Company } from "../types";

export const mockCompanies: Company[] = [
  {
    id: "c1",
    name: "Nova Robotics",
    description: "Consumer robotics startup building home assistant devices.",
    location: "Austin, TX",
    industry: "Hardware / Robotics",
    tags: ["parental leave", "mentorship program", "flexible hours"],
    activities:
      "Engineers work in small cross-functional pods spanning hardware, firmware, and ML. The team runs quarterly hack days, pairs new hires with a senior mentor for their first six months, and holds a monthly all-hands where every pod demos progress.",
  },
  {
    id: "c2",
    name: "Bluepeak Analytics",
    description: "B2B data analytics platform for supply chain forecasting.",
    location: "Remote",
    industry: "Software / Data",
    tags: ["remote-friendly", "women in leadership"],
    activities:
      "Fully async-first, with a biweekly virtual show-and-tell instead of standups. There's a dedicated stipend for career-growth courses and conferences, and a women-in-leadership circle that meets monthly to talk promotion strategy and negotiation.",
  },
  {
    id: "c3",
    name: "Halcyon Biotech",
    description: "Early-stage biotech developing diagnostic assays.",
    location: "Cambridge, MA",
    industry: "Biotech",
    tags: ["strong onboarding", "pay transparency"],
    activities:
      "New hires rotate through both the wet lab and the data team during their first month so everyone understands the full assay pipeline. A weekly journal club covers new diagnostics research, and pay bands are posted internally for every role.",
  },
  {
    id: "c4",
    name: "Fernline Aerospace",
    description: "Small-satellite propulsion systems manufacturer.",
    location: "Seattle, WA",
    industry: "Aerospace",
    tags: ["long hours", "clearance required", "great benefits"],
    activities:
      "Most engineering roles require a security clearance and time in the cleanroom during integration builds. Development cycles run long, tied to fixed satellite launch windows, but the campus includes an on-site clinic and gym as part of the benefits package.",
  },
  {
    id: "c5",
    name: "Crestwave Semiconductors",
    description: "Fabless chip design company focused on low-power sensors.",
    location: "San Jose, CA",
    industry: "Hardware / Semiconductors",
    tags: ["ERG for women in tech", "on-site gym"],
    activities:
      "The women-in-tech ERG hosts monthly socials and a mentorship matching program open to all levels. Expect crunch periods in the weeks before a tape-out deadline, balanced by a well-used on-site gym and flexible time off afterward.",
  },
  {
    id: "c6",
    name: "Marrow Health",
    description: "Digital health startup building remote patient monitoring tools.",
    location: "Remote",
    industry: "Healthtech",
    tags: ["4-day workweek", "unlimited PTO"],
    activities:
      "The company runs on a 4-day workweek with unlimited PTO, and clinical and engineering teams share a weekly standup to keep monitoring features grounded in real patient outcomes. A quarterly review with partner hospitals shapes the roadmap.",
  },
];
