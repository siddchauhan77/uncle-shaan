// ─────────────────────────────────────────────
// Archetype definitions — Uncle Shaan quiz
// ─────────────────────────────────────────────

export type ArchetypeId =
  | "ramen-era"
  | "ambitious-employee"
  | "stuck-starter"
  | "ready-to-leap";

export type Prescription = {
  type: "quote" | "action" | "mindset";
  contentId?: string; // references content.json id
  label: string;
  body: string;
};

export type Archetype = {
  id: ArchetypeId;
  name: string;
  tagline: string;
  diagnosis: string;
  prescriptions: Prescription[];
  mfmSearches: { label: string; query: string }[];
};

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  "ramen-era": {
    id: "ramen-era",
    name: "The Ramen Era",
    tagline: "Maximum flexibility. Nothing to lose.",
    diagnosis:
      "You're in the golden window. You can sleep on a couch and call it an adventure. No mortgage, no dependents, nothing worth protecting — which means you have everything. Warren Buffett would give every dollar he has to be where you are right now. The problem isn't your situation. It's that you're treating it like one.",
    prescriptions: [
      {
        type: "quote",
        contentId: "someday-3",
        label: "What Shaan said",
        body: "You're in the Ramen Era. Maximum flexibility, nothing to lose. Warren Buffett would give every dollar he has to trade places with the average 22-year-old.",
      },
      {
        type: "action",
        label: "Do this",
        body: "Pick one thing you've been saying \"someday\" about. Give it a two-week trial — not a two-year commitment. Shadow someone, do a free version, test it. You'll learn more in two weeks than two years of thinking about it.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "You don't need a plan. You need a direction. Point yourself at something that feels slightly irresponsible and start moving. The plan shows up while you walk — not before.",
      },
    ],
    mfmSearches: [
      { label: "Ramen Era", query: "ramen era" },
      { label: "Taking risk while young", query: "take risk young" },
      { label: "Season of wandering", query: "season of wandering" },
    ],
  },

  "ambitious-employee": {
    id: "ambitious-employee",
    name: "The Ambitious Employee",
    tagline: "Good job. Good life. Wrong game.",
    diagnosis:
      "You've done everything right. Stable job, decent money, reliable. But something feels off. You're watching other people build things and wondering why it isn't you. Shaan was here. He says the worst trap is being good at something you don't actually care about. The job isn't the problem — comfort is. And your job is where comfort lives rent-free.",
    prescriptions: [
      {
        type: "quote",
        contentId: "proximity-3",
        label: "What Shaan said",
        body: "You've got a comfortable life. Which is great, if that's what you want. But sounds like it isn't what you want.",
      },
      {
        type: "action",
        label: "Do this",
        body: "Pick one project — not a business plan, just a project — and work on it every morning before your job starts. Not weekends. Mornings. The weekends never come consistently. The mornings always do.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "Your current job is funding your real education. Be a student in it, not just an employee. Extract everything — skills, contacts, patterns — then use it.",
      },
    ],
    mfmSearches: [
      { label: "Side project advice", query: "side project" },
      { label: "Leaving a safe job", query: "quit your job" },
      { label: "Building while employed", query: "build while working" },
    ],
  },

  "stuck-starter": {
    id: "stuck-starter",
    name: "The Stuck Starter",
    tagline: "The idea exists. The ship date doesn't.",
    diagnosis:
      "You've started. That already puts you in the top 5%. But starting isn't the same as shipping. You're in the research spiral — the infinite loop of learning about doing the thing instead of just doing the thing. Shaan calls this analysis paralysis with extra steps. The antidote isn't a better plan. It's a deadline.",
    prescriptions: [
      {
        type: "quote",
        contentId: "3step-2",
        label: "What Shaan said",
        body: "Don't let your dream float in a magical theoretical bubble. Pop the bubble and find out what you really love.",
      },
      {
        type: "action",
        label: "Do this",
        body: "Set a 30-day deadline and pick one metric to hit. If you hit it, keep going. If not, pivot or quit — no shame either way. Remove indefinite runway. It's the thing that kills urgency most.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "Doing is data. Every week you don't ship is a week you don't learn. A mediocre thing shipped beats a perfect thing planned every single time.",
      },
    ],
    mfmSearches: [
      { label: "Launching your first thing", query: "first launch" },
      { label: "Build in public", query: "build in public" },
      { label: "Overcoming overthinking", query: "stop overthinking start doing" },
    ],
  },

  "ready-to-leap": {
    id: "ready-to-leap",
    name: "The Ready to Leap",
    tagline: "Already in motion. Just needs the right fuel.",
    diagnosis:
      "You're already doing it. The question isn't whether to jump — you're mid-air. The only thing that trips people at your stage is over-optimizing instead of distributing. Shaan's best advice for where you are: compress your timeline. Most people think they have five years. The real window is usually eighteen months. Use that urgency.",
    prescriptions: [
      {
        type: "quote",
        contentId: "finding-thing-3",
        label: "What Shaan said",
        body: "It took me 10 years to find my thing. I was a B+ founder. But in the real world, B+ doesn't get you jack sh*t.",
      },
      {
        type: "action",
        label: "Do this",
        body: "Find your distribution channel this week. Not someday — this week. Build in public, send it to 10 specific people, post about the process. Revenue is the only real signal. Go get your first 10 sales.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "Stop working harder. Find the thing that's so natural to you it doesn't feel like work — then get paid a king's ransom for it. Energy is the key, not hustle.",
      },
    ],
    mfmSearches: [
      { label: "Finding distribution", query: "distribution audience" },
      { label: "Building an audience", query: "build audience" },
      { label: "Getting first customers", query: "first customers revenue" },
    ],
  },
};

// ─────────────────────────────────────────────
// Mapping logic — quiz answers → archetype
// ─────────────────────────────────────────────

type Answers = {
  situation: string;
  mindset: string;
  risk: string;
  winning: string;
  plan: string;
};

export function getArchetype(answers: Answers): Archetype {
  const { situation, mindset, plan } = answers;
  const risk = parseInt(answers.risk) || 3;

  // Building with some conviction → Ready to Leap
  if (situation === "building" && (plan === "yes" || plan === "kind-of")) {
    return ARCHETYPES["ready-to-leap"];
  }

  // Building but no plan → Stuck Starter
  if (situation === "building") {
    return ARCHETYPES["stuck-starter"];
  }

  // Working a job → Ambitious Employee
  if (situation === "working-job") {
    return ARCHETYPES["ambitious-employee"];
  }

  // High risk, money-focused, just graduated → Stuck Starter
  if (
    situation === "just-graduated" &&
    risk >= 4 &&
    mindset === "money"
  ) {
    return ARCHETYPES["stuck-starter"];
  }

  // Default for in-school / just-graduated / figuring-out
  return ARCHETYPES["ramen-era"];
}
