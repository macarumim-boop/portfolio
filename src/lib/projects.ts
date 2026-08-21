/* ------------------------------------------------------------------
   CASE STUDIES
   This is the heart of the portfolio. Replace the placeholder content
   below with your real projects. The shape follows the senior
   case-study formula: context → problem → process → solution → impact.

   TODO(camila): send me 2–3 real projects and I'll fill these in.
------------------------------------------------------------------- */

export type MetricAccent = "green" | "accent" | "pink" | "ink";
export type Metric = {
  value: string;
  label: string;
  note?: string; // small context line under the label
  accent?: MetricAccent; // color of the big number (green = a win)
};

// Structured content blocks a section can render after its prose. Keeps the
// case study out of long text walls, each block is its own information design.
export type BlockKey =
  | "contextStats"
  | "findings"
  | "competition"
  | "principles"
  | "decisions"
  | "pillars"
  | "impactStats"
  | "reviews"
  | "before"
  | "personas"
  | "flow"
  | "prototype"
  | "appFeatures"
  | "desktopFeatures"
  | "ethics"
  | "designTone"
  | "challenge"
  | "statCards"
  | "dashboard"
  | "aiBuildsHub"
  | "dsAgentDashboard";

export type Section = {
  kicker: string; // small label, e.g. "01, Contexto"
  title: string;
  body: string[]; // short intro paragraphs (kept brief on purpose)
  after?: BlockKey; // structured block rendered after the prose
};

export type Discipline =
  | "Product Design"
  | "Design Systems"
  | "AI Product Design";

// A feature-comparison table against competitors (rendered as a custom
// component, not an embedded image).
export type CompetitionTable = {
  competitors: string[];
  rows: { feature: string; values: boolean[] }[]; // values aligned to competitors
};

// Product pillar with strategic depth: goal, the UX tactics it focused on,
// and the design principle that governed it.
export type Pillar = {
  icon: string;
  name: string;
  tag?: string; // e.g. "Talk → Harmony"
  goal: string;
  focus: string[];
  principle: string;
};

// Research findings, "what we heard" from the interviews.
export type Finding = { title: string; detail: string };

// A capability of one of the products, rendered in a feature list. Used to
// present the app and the desktop tool as the two distinct products they were.
// `icon` leads the card; `accent` overrides the controlled color rotation.
export type Feature = {
  title: string;
  detail?: string;
  icon?: string;
  accent?: "accent" | "green" | "pink" | "ink";
};

// The two products shown side by side under the summary (orientation cards).
export type ProductCard = { icon: string; title: string; detail: string };

// A dashboard-style data card: a headline number with a labelled icon, a
// coloured delta pill, and a comparison line. `good` colours the pill green
// (a win) independent of the arrow direction, since a drop can be good.
export type StatCard = {
  label: string; // card title
  value: string; // the headline number, e.g. "40%", "78.3"
  icon: string; // icon name
  delta?: { dir: "up" | "down"; text: string; good?: boolean };
  sub?: string; // comparison / context line
};

// The design stance: anti-patterns we refused, plus the tone we held.
export type DesignToneData = { guardrails: string[]; line: string; sub: string };

// The clinical challenge, split by user: what patients experience, what
// clinicians face, and the goals the design had to hit for both.
export type ChallengeItem = { icon: string; text: string };
export type Challenge = {
  patients: ChallengeItem[];
  clinicians: ChallengeItem[];
  goals?: ChallengeItem[];
};

// Design principles distilled from research.
export type Principle = { name: string; detail: string };

// Key UX decisions with their rationale, the "why", front and center.
export type Decision = {
  decision: string;
  rationale: string;
  // optional metadata for the "job" card variant (label pill + two meta items)
  job?: {
    tag: string;
    color?: string;
    surface: string;
    surfaceIcon: string;
    aspect: string;
    aspectIcon: string;
  };
};

// A metric given its own moment in the narrative (bigger + contextualized),
// distinct from the generic top-of-page metrics banner.
export type ImpactStat = {
  value: string;
  label: string;
  context: string;
  accent?: "green" | "accent" | "pink"; // colors the number + rule (green = a win)
};

// A user segment we designed for, rendered as a persona card.
export type Persona = {
  name: string; // e.g. "The major donor"
  descriptor: string; // one line: who they are
  gives: string; // the headline stat value (giving behavior, life stage, …)
  statLabel?: string; // label above the stat, defaults to "Gives"
  needs: string[]; // what they need from the product
  accent: "accent" | "green" | "pink";
  avatar?: "older" | "younger"; // illustrated avatar variant
  photo?: string; // /public path to a real photo, overrides the illustration
  icon?: string; // small icon shown beside the stat (profile variant)
};

// Real App Store reviews, rendered with the authentic App Store card design.
export type Review = {
  author: string;
  title: string;
  rating: number; // 1–5
  quote: string;
};

// Image gallery group. `shots` renders real phone mockups (horizontal
// showcase); `count` renders N labeled placeholder slots when images aren't
// ready yet.
export type Shot = { src: string; caption: string };
export type GalleryGroup = {
  label: string;
  note?: string;
  count?: number;
  shots?: Shot[];
  display?: "strip" | "phone"; // strip = horizontal cards; phone = device mockup
  builtAround?: string[]; // design constraints the wireframes were built on
  avoided?: string[]; // anti-patterns deliberately rejected
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  company: string;
  team: string;
  timeline: string;
  discipline: Discipline; // shown as the card's category
  aiFirst?: boolean; // true for AI Product Design work, gets a distinct badge
  tags: string[];
  accent: "violet" | "lime" | "ink"; // card personality
  cover?: string; // /public path, optional
  coverPosition?: string; // CSS object-position, e.g. "top" or "20% 40%"
  summary: string; // one punchy line for the card
  atAGlance?: { problem: string; approach: string; impact: string }; // 5-second TL;DR
  atAGlanceVariant?: "editorial"; // opt into the solid-colour, serif card style
  contextStatsAsCards?: boolean; // render the "why it matters" stats as cards
  products?: ProductCard[]; // dual-product orientation cards in the header
  statHighlights?: StatCard[]; // dashboard-style metric cards (replaces the banner)
  roleFocus?: string[]; // "my role focused on" competency chips
  metrics: Metric[];
  sections: Section[];
  // Structured data blocks, each is placed by a section's `after` key.
  contextStats?: ImpactStat[];
  findings?: Finding[];
  appFeatures?: Feature[];
  desktopFeatures?: Feature[];
  ethics?: Feature[];
  designTone?: DesignToneData;
  challenge?: Challenge;
  resultStats?: StatCard[]; // dashboard-style results cards
  personas?: Persona[];
  personasVariant?: "profile"; // photo-topped profile card style
  findingsVariant?: "quote"; // testimonial-style quote cards
  principlesVariant?: "project"; // project-status-style principle cards
  decisionsVariant?: "job"; // job-listing-style decision cards
  competition?: CompetitionTable;
  principles?: Principle[];
  decisions?: Decision[];
  pillars?: Pillar[];
  impactStats?: ImpactStat[];
  reviews?: Review[];
  // TODO: add real image paths under /public/work/<slug>/
  gallery?: { src: string; caption?: string }[];
  galleryGroups?: GalleryGroup[];
  reflection?: { title: string; body: string[] }; // closing note, rendered last
};

export const projects: Project[] = [
  {
    slug: "prickly-pear",
    title: "Prickly Pear",
    subtitle: "Designing to support, not to direct",
    year: "2025",
    role: "Product Designer",
    company: "Prickly Pear Health",
    team: "Team of two designers · external agency with direct client contact",
    timeline: "2 weeks",
    discipline: "Product Design",
    tags: ["Healthtech", "0→1", "Research"],
    accent: "ink",
    cover: "/work/prickly-pear/cover.jpg",
    atAGlanceVariant: "editorial",
    contextStatsAsCards: true,
    findingsVariant: "quote",
    principlesVariant: "project",
    personasVariant: "profile",
    decisionsVariant: "job",
    summary:
      "A brain-health app that supports women through perimenopause and menopause at their own pace, designed from 50+ real conversations. They rated it 4.5★.",
    atAGlance: {
      problem:
        "Women in perimenopause and menopause were underserved by wellness apps that **directed and measured them**, through a long, isolating life stage the industry overlooks.",
      approach:
        "The women didn't want to be managed, they wanted to be supported. So every decision optimized for **accompaniment over control**: intentions instead of tasks, and an AI that names what they feel instead of telling them what to do.",
      impact:
        "It shipped to production unchanged and earned **4.5★** from the women it was built for, plus **$1.2M** in public-private research funding.",
    },
    roleFocus: [
      "UX Research synthesis",
      "Behavioral journey mapping",
      "Information architecture",
      "Conversational UX design",
      "Wireframing & interaction",
      "Personalization logic",
    ],
    metrics: [
      { value: "4.5★", label: "App Store rating", note: "89 reviews", accent: "green" },
      { value: "$1.2M", label: "Funding raised", note: "Public-private", accent: "green" },
      {
        value: "50+",
        label: "Research interviews",
        note: "Shaped the design",
        accent: "accent",
      },
    ],
    statHighlights: [
      {
        label: "App Store rating",
        value: "4.5★",
        icon: "heart",
        delta: { dir: "up", text: "top-rated", good: true },
        sub: "From 89 reviews",
      },
      {
        label: "Funding raised",
        value: "$1.2M",
        icon: "target",
        delta: { dir: "up", text: "public-private", good: true },
        sub: "PEI research centers",
      },
      {
        label: "Research interviews",
        value: "50+",
        icon: "users",
        sub: "Shaped the three pillars",
      },
    ],
    resultStats: [
      {
        label: "How the women rated it",
        value: "4.5★",
        icon: "heart",
        delta: { dir: "up", text: "loved", good: true },
        sub: "89 App Store reviews since launch",
      },
      {
        label: "Voices that shaped it",
        value: "50+",
        icon: "users",
        sub: "Interviews that defined the three pillars",
      },
      {
        label: "Funding raised",
        value: "$1.2M",
        icon: "target",
        delta: { dir: "up", text: "validated", good: true },
        sub: "Public-private, via PEI Applied Research Centers",
      },
    ],
    sections: [
      {
        kicker: "01, The challenge",
        title: "Designing for a life stage technology ignores",
        body: [
          "Prickly Pear is a behavioral support platform for women 40+ in perimenopause and menopause, a long, complex life stage technology has systematically underserved. The mandate: **support each woman at her own pace**, in a market that treated them all the same.",
        ],
        after: "contextStats",
      },
      {
        kicker: "02, Research",
        title: "We listened to 50+ women",
        body: [
          "Before drawing a single screen, we ran in-depth interviews. The same pattern surfaced again and again: they felt **directed, not supported; measured, not heard**.",
        ],
        after: "findings",
      },
      {
        kicker: "03, Who we designed for",
        title: "Two women, one journey",
        body: [
          "The same voices clustered along one axis: where a woman was in the transition. The product had to meet the newcomer and the navigator without treating either like the other.",
        ],
        after: "personas",
      },
      {
        kicker: "04, Competitive analysis",
        title: "What these women were still being denied",
        body: [
          "We audited the competition not to copy, but to find the real gap. Against Bonafide, Midday, Virtuleap, and BrainFit™, Prickly Pear was the only one to cover the six attributes they asked for.",
        ],
        after: "competition",
      },
      {
        kicker: "05, Design principles",
        title: "What this audience expects",
        body: [
          "From their voices we distilled four non-negotiable criteria. Every design decision that followed was measured against them.",
        ],
        after: "principles",
      },
      {
        kicker: "06, Key decisions",
        title: "Principles turned into UX decisions",
        body: [
          "We took the logic of Atomic Habits (moving step by step, without overwhelming) as the behavioral backbone, and from there resolved the decisions that define the experience. Almost always choosing the human option over the obvious one.",
        ],
        after: "decisions",
      },
      {
        kicker: "07, The solution",
        title: "Three pillars, one principle: support, don't direct",
        body: [
          "Prickly Pear was structured around three pillars. Each answers something they asked for: to be heard, to move at their own pace, and to have the app understand their body without demanding anything.",
        ],
        after: "pillars",
      },
      {
        kicker: "08, Results",
        title: "The women confirmed it first",
        body: [
          "The design shipped to production unchanged. The validation that matters most came from the women we designed for. Institutional recognition came only after the product already resonated with them: **$1.2M in public-private funding**, validated by researchers at **ASU, University of Arizona, and Mayo Clinic**.",
        ],
        after: "statCards",
      },
      {
        kicker: "09, In their words",
        title: "Real App Store reviews",
        body: [],
        after: "reviews",
      },
    ],
    reflection: {
      title: "What I took from it",
      body: [
        "The hardest part wasn't the interface, it was **restraint**. The instinct in a wellness app is to prescribe; the research kept telling us to hold back and accompany instead. Designing less, and trusting the woman more, was the actual work.",
        "If I picked it up again, I'd follow the same women over months, not a single session, to see whether **support, not direct** truly sustains the habit, and tune how much Harmony leads versus listens with that data.",
      ],
    },
    contextStats: [
      {
        value: "70%",
        label: "of Alzheimer's patients are women",
        context: "Women's brain health, historically ignored",
      },
      {
        value: "2×",
        label: "more likely to face depression",
        context: "Versus men, during this stage",
      },
      {
        value: "3–4×",
        label: "more likely to get migraines",
        context: "Neurological symptoms, not only hormonal",
      },
      {
        value: "10–14 yrs",
        label: "perimenopause can last",
        context: "A long stage, not a single moment",
      },
    ],
    findings: [
      {
        title: "“They tell me what to do”",
        detail:
          "Apps prescribed actions and schedules, with no room for their own judgment.",
      },
      {
        title: "“They ignore what I live”",
        detail:
          "A generic approach that overlooked the symptoms specific to perimenopause and menopause.",
      },
      {
        title: "“I want my own pace”",
        detail: "They wanted freedom and flexibility, not a rigid plan to follow.",
      },
      {
        title: "“I need to feel heard”",
        detail:
          "They sought emotional validation and psychological safety, not just metrics.",
      },
    ],
    personas: [
      {
        name: "The newcomer",
        descriptor: "In her 40s, symptoms just starting, unsure what's happening.",
        statLabel: "Stage",
        gives: "Perimenopause",
        icon: "user",
        needs: [
          "To understand what her body is doing",
          "To be heard, not measured",
          "No rigid plan she'll feel guilty for breaking",
        ],
        accent: "accent",
        avatar: "younger",
        photo: "/work/prickly-pear/persona-newcomer.jpg",
      },
      {
        name: "The navigator",
        descriptor: "In her 50s, deeper in, managing symptoms alongside a full life.",
        statLabel: "Stage",
        gives: "Menopause",
        icon: "users",
        needs: [
          "Emotional support without judgment",
          "To move entirely at her own pace",
          "Tools that adapt to her, not the reverse",
        ],
        accent: "pink",
        avatar: "older",
        photo: "/work/prickly-pear/persona-navigator.jpg",
      },
    ],
    principles: [
      {
        name: "Empathy without infantilization",
        detail: "Speak to them as adults, warm, never condescending.",
      },
      {
        name: "Personalization without complexity",
        detail: "Feels tailored to them, with no effort or setup required.",
      },
      {
        name: "Clarity without overwhelm",
        detail: "The essentials first; no dashboards that overwhelm.",
      },
      {
        name: "Trust and psychological safety",
        detail: "A judgment-free space where letting your guard down feels safe.",
      },
    ],
    decisions: [
      {
        decision: "“Intentions”, not “tasks”",
        rationale:
          "A task gets broken; an intention accompanies. The language shift removes pressure and sustains the habit through hormonal fluctuation.",
        job: { tag: "Language", color: "#0071e3", surface: "Daily focus", surfaceIcon: "target", aspect: "No pressure", aspectIcon: "heart" },
      },
      {
        decision: "Voice or text, her choice",
        rationale:
          "Speaking is more natural for venting; writing, more intimate. The user picks the channel, not the app.",
        job: { tag: "Input", color: "#17a673", surface: "Talk", surfaceIcon: "message", aspect: "Her channel", aspectIcon: "user" },
      },
      {
        decision: "Harmony explains, doesn't direct",
        rationale:
          "The AI doesn't tell her what to do: it names what she feels. Accompany instead of manage.",
        job: { tag: "AI tone", color: "#e0479e", surface: "Harmony", surfaceIcon: "message", aspect: "Accompany", aspectIcon: "heart" },
      },
      {
        decision: "Goals are born from the conversation",
        rationale:
          "On closing, Harmony proposes micro-goals from what she shared, never imposed from outside.",
        job: { tag: "Goals", color: "#f59e0b", surface: "Harmony", surfaceIcon: "message", aspect: "Emergent", aspectIcon: "activity" },
      },
      {
        decision: "Wearable optional, never required",
        rationale:
          "Cross data if it exists, allow manual logging if not. No hardware between her and the product.",
        job: { tag: "Data", color: "#0071e3", surface: "Health sync", surfaceIcon: "activity", aspect: "Never required", aspectIcon: "eye" },
      },
    ],
    impactStats: [
      {
        value: "4.5★",
        label: "How the women rated it",
        context: "89 App Store reviews since launch",
        accent: "green",
      },
      {
        value: "50+",
        label: "Voices that shaped the product",
        context: "Interviews that defined the three pillars",
        accent: "accent",
      },
      {
        value: "$1.2M",
        label: "Funding raised",
        context: "Public-private, via PEI Applied Research Centers",
        accent: "green",
      },
    ],
    reviews: [
      {
        author: "ArmstrongTrio",
        title: "They LISTEN to me!!!",
        rating: 5,
        quote:
          "I love this voice activated, AI integrated, app! How very cool to consider the intonation in my voice.",
      },
      {
        author: "SpiritualRN",
        title: "A must have!",
        rating: 5,
        quote:
          "I finally feel like I have a solution to better understand my body and help me prioritize things that matter to me!",
      },
      {
        author: "Kaitlyn FitzAllen",
        title: "Finally! An app to help me stay on top of my wellbeing.",
        rating: 5,
        quote:
          "The app gives you features to check in every day and has lovely aligned prompts to remind you to stick to your ritual.",
      },
      {
        author: "MynameisNG",
        title: "An app just for us!",
        rating: 5,
        quote:
          "Easy to use, great summary and insights, connects to my health app and smart watch.",
      },
    ],
    competition: {
      competitors: ["Prickly Pear", "Bonafide", "Midday", "Virtuleap", "BrainFit™"],
      rows: [
        {
          feature: "Health data collection",
          values: [true, false, true, true, true],
        },
        {
          feature: "No mandatory hardware / wearables",
          values: [true, false, true, false, true],
        },
        {
          feature: "Focus on perimenopause & menopause",
          values: [true, true, true, false, false],
        },
        {
          feature: "Personalized insights",
          values: [true, false, true, true, false],
        },
        {
          feature: "Experiences designed for joy",
          values: [true, false, false, true, false],
        },
        {
          feature: "Community and belonging",
          values: [true, false, false, false, false],
        },
      ],
    },
    pillars: [
      {
        icon: "💬",
        name: "Emotional support",
        tag: "Talk → Harmony",
        goal: "Reduce emotional isolation and increase daily self-awareness.",
        focus: [
          "Warm microcopy",
          "Progressive disclosure",
          "Soft behavioral prompts",
          "Tone modulation based on emotional input",
        ],
        principle: "Create a safe emotional container, without judgment.",
      },
      {
        icon: "🌱",
        name: "Self-reflection",
        tag: "Morning reflections",
        goal: "Structured behavioral activation for cognitive clarity and routine stability.",
        focus: ["Cognitive clarity", "Reduced overwhelm", "Sense of control"],
        principle:
          "Intentions, not tasks: reinforces the habit through hormonal fluctuation.",
      },
      {
        icon: "⚙️",
        name: "Personalized guidance",
        goal: "The system adapts to emotional inputs, behavioral patterns, and engagement frequency.",
        focus: [
          "Minimal cognitive load",
          "Contextual recommendations",
          "Emotional validation",
        ],
        principle: "Support, don't pressure.",
      },
    ],
    galleryGroups: [
      {
        label: "Wireframes",
        note: "The “Talk” flow explored in low fidelity: from entry to self-exploration and daily focus.",
        builtAround: [
          "Calm visual hierarchy",
          "Soft transitions",
          "Modular content blocks",
          "Clear primary actions",
          "Emotion-first layout",
          "Minimal cognitive load",
        ],
        avoided: [
          "Overstimulating dashboards",
          "Gamification pressure",
          "Clinical coldness",
        ],
        shots: [
          {
            src: "/work/prickly-pear/01.jpg",
            caption:
              "Entry point: choose between self-exploration, daily focus, or insights.",
          },
          {
            src: "/work/prickly-pear/02.jpg",
            caption:
              "Unburdening: “what do you want to talk about today?”, by voice or text, however she feels comfortable.",
          },
          {
            src: "/work/prickly-pear/03.jpg",
            caption:
              "Conversation with Harmony: accompanies and invites exploration, never dictates.",
          },
          {
            src: "/work/prickly-pear/04.jpg",
            caption: "Daily intentions: which areas to focus on, or “just flow”.",
          },
          {
            src: "/work/prickly-pear/05.jpg",
            caption: "Daily plans and suggested actions to manage stress.",
          },
          {
            src: "/work/prickly-pear/06.jpg",
            caption: "Morning voice reflection: the day's gratitude.",
          },
        ],
      },
      {
        label: "Final design",
        note: "The high-fidelity interface that shipped to production, navigate the screens inside the phone.",
        display: "phone",
        shots: [
          { src: "/work/prickly-pear/final/01.jpg", caption: "Welcome: sign in with email, Google, or Apple ID." },
          { src: "/work/prickly-pear/final/02.jpg", caption: "Sign up: create an account." },
          { src: "/work/prickly-pear/final/03.jpg", caption: "Onboarding: permissions and privacy, “welcome to our family”." },
          { src: "/work/prickly-pear/final/04.jpg", caption: "Connect a wearable, optional, never required." },
          { src: "/work/prickly-pear/final/05.jpg", caption: "Evening reflections: rate the day's habits." },
          { src: "/work/prickly-pear/final/06.jpg", caption: "Unburdening: send to Harmony by voice or text." },
          { src: "/work/prickly-pear/final/07.jpg", caption: "Insights: log the day's physical activity." },
          { src: "/work/prickly-pear/final/08.jpg", caption: "Insights: mental health." },
          { src: "/work/prickly-pear/final/09.jpg", caption: "See: the month's patterns, daily focus and reflections." },
          { src: "/work/prickly-pear/final/10.jpg", caption: "See: detail of a self-exploration session." },
        ],
      },
    ],
  },
  {
    slug: "veevart-donation",
    title: "Veevart Donation",
    subtitle: "Redesigning a donation checkout that lost 3 in 4 donors",
    year: "2025",
    role: "Product Designer, Fundraising",
    company: "Veevart",
    team: "Fundraising product squad (design, product, engineering)",
    timeline: "2 months",
    discipline: "Product Design",
    tags: ["Product Design", "B2B SaaS", "Conversion", "Payments", "Redesign"],
    accent: "violet",
    cover: "/work/veevart-donation/cover.jpg",
    coverPosition: "65% 0%",
    atAGlanceVariant: "editorial",
    contextStatsAsCards: true,
    findingsVariant: "quote",
    principlesVariant: "project",
    personasVariant: "profile",
    decisionsVariant: "job",
    summary:
      "A B2B fundraising checkout redesign that cut the form to a single field, dropping payment abandonment from 75% to 35% and growing the marketing pool by 85%.",
    atAGlance: {
      problem:
        "**75%** of donors abandoned at the payment step, blocked by a long personal-info form they had to fill in before they could give a cent.",
      approach:
        "Donors give partly for the tax receipt, so the billing details had to stay. The move was to **resequence, not remove**: pay first, add the receipt details only if you want them.",
      impact:
        "Payment drop-off fell from **75% to 35%**, and capturing the email first grew the marketing pool for abandoned gifts by **85%**.",
    },
    roleFocus: [
      "Funnel & conversion analysis (Pendo)",
      "Checkout & payment flow design",
      "Competitive benchmarking",
      "Interaction design",
      "B2B product design",
      "Designing for two donor segments",
    ],
    metrics: [
      { value: "35%", label: "Payment drop-off", note: "Down from 75%", accent: "green" },
      {
        value: "+85%",
        label: "Donor pool for marketing",
        note: "Captured email-first",
        accent: "green",
      },
      {
        value: "10K+",
        label: "Typical major-donor gift",
        note: "The segment we protected",
        accent: "accent",
      },
    ],
    statHighlights: [
      {
        label: "Payment drop-off",
        value: "35%",
        icon: "activity",
        delta: { dir: "down", text: "from 75%", good: true },
        sub: "More than halved",
      },
      {
        label: "Marketing pool",
        value: "+85%",
        icon: "users",
        delta: { dir: "up", text: "reachable", good: true },
        sub: "Captured email-first",
      },
      {
        label: "Major-donor gift",
        value: "10K+",
        icon: "target",
        sub: "The highest-value segment",
      },
    ],
    resultStats: [
      {
        label: "Payment drop-off",
        value: "35%",
        icon: "activity",
        delta: { dir: "down", text: "from 75%", good: true },
        sub: "The step Pendo flagged became the biggest win",
      },
      {
        label: "Reachable for marketing",
        value: "+85%",
        icon: "users",
        delta: { dir: "up", text: "more donors", good: true },
        sub: "Even an abandoned gift now leaves a lead",
      },
      {
        label: "Fields before payment",
        value: "1",
        icon: "clipboard",
        delta: { dir: "down", text: "simpler", good: true },
        sub: "An email, then the card, down from a full form",
      },
    ],
    sections: [
      {
        kicker: "01, Context",
        title: "A fundraising product falling behind its market",
        body: [
          "Veevart is a Salesforce-based B2B platform for museums, foundations, and cultural institutions. I designed for the **fundraising** product, mid-way through a full UX and technology overhaul.",
          "We were behind our competitors, and clients wanted two things: let donors personalize their gift, and, **above all, convert**.",
        ],
        after: "contextStats",
      },
      {
        kicker: "02, The problem",
        title: "Three out of four donors quit at payment",
        body: [
          "Pendo showed us exactly where we bled. **75% of prospective donors abandoned at step 2**, the payment step, defeated by how much information the checkout demanded before it would take a cent.",
          "The form asked everyone for everything, upfront. The people most willing to give were the ones we were turning away.",
        ],
        after: "before",
      },
      {
        kicker: "03, Research",
        title: "What today's donors expect",
        body: [
          "We paired the funnel data with donor interviews. What surfaced was a **generational shift in what giving means**, and how little friction today's donors will tolerate to get there.",
        ],
        after: "findings",
      },
      {
        kicker: "04, Who we designed for",
        title: "Two donors, one flow",
        body: [
          "The interviews surfaced two distinct donors the checkout had to serve at once. Designing for the average of them would have failed both.",
        ],
        after: "personas",
      },
      {
        kicker: "05, Competitive analysis",
        title: "Validate to convert, not to copy",
        body: [
          "Givebutter and Zeffy were ahead of us, easier to understand and to customize. We studied them not to copy features, but to **validate which patterns actually moved our metrics**, and to fix first where we were losing donors, not where a competitor happened to ship.",
        ],
      },
      {
        kicker: "06, Design principles",
        title: "The rules the redesign had to obey",
        body: [
          "From the research and the funnel data we set four principles. Every decision that followed was measured against them.",
        ],
        after: "principles",
      },
      {
        kicker: "07, Key decisions",
        title: "How we cut the form without losing the receipt",
        body: [
          "The hard constraint: we could not drop billing details. Donors care about the tax benefits, and the detailed receipt depends on that information. So the question was not whether to ask, but when.",
          "We split the flow. Checkout collects **only an email and a payment method**. After the gift is made, donors who want a detailed tax receipt can fill in the rest. The long form stops blocking the people who don't need it, and **the payment happens in seconds**.",
        ],
        after: "decisions",
      },
      {
        kicker: "08, The flow",
        title: "Three steps, with the friction moved to the end",
        body: [
          "The whole redesign in one view. Giving takes two screens, choose and pay, and the tax-receipt form only appears after the gift is secured, for the donors who actually want it.",
        ],
        after: "flow",
      },
      {
        kicker: "09, The prototype",
        title: "Try the redesigned checkout",
        body: [
          "An interactive recreation of the shipped flow, rebuilt in code. Give in someone's name, set the recurrence, then reach the payment step and notice what it asks for: an email and a card, nothing else. The tax receipt comes after the gift. Switch between desktop and mobile to see both.",
        ],
        after: "prototype",
      },
      {
        kicker: "10, Results",
        title: "Fewer donors lost, more donors reached",
        body: [
          "The redesign reframed the funnel around a single idea: secure the gift first, enrich it after. The numbers followed.",
          "Payment drop-off fell from **75% to 35%**, less than half of what it was. And because checkout now captures the email before anything else, the pool of donors we could reach with marketing grew by **85%**, an abandoned gift now leaves a lead instead of nothing.",
        ],
        after: "statCards",
      },
    ],
    reflection: {
      title: "What I took from it",
      body: [
        "The biggest lever wasn't a new feature, it was the **order of the questions**. Resequencing what we asked for, and when, moved the metric more than anything we could have added to the page.",
        "If I picked it up again, I'd instrument how many donors actually complete the optional receipt, and A/B how hard we nudge them, so the ask is right-sized with data instead of a guess.",
      ],
    },
    contextStats: [
      {
        value: "10K+",
        label: "Typical gift from a major donor",
        context: "Older donors, the highest-value contributors",
      },
      {
        value: "2",
        label: "Distinct donor segments",
        context: "High-value occasional givers, and smaller but frequent ones",
      },
      {
        value: "Step 2",
        label: "Where the funnel collapsed",
        context: "The payment step, blocked by an overloaded form",
      },
    ],
    findings: [
      {
        title: "“Where does my money actually go?”",
        detail:
          "Donors expect to see what their gift funds and the impact it creates, not just a thank-you page.",
      },
      {
        title: "“Let me choose what I support”",
        detail:
          "Directing a gift to a specific fund or program matters more than the institution's brand.",
      },
      {
        title: "“Recognize me, and thank me”",
        detail:
          "Acknowledgment turns a one-time gift into a relationship worth repeating.",
      },
      {
        title: "“I want to share it”",
        detail:
          "Posting the act on social media motivates others and gives the gift meaning beyond the transaction.",
      },
    ],
    personas: [
      {
        name: "The major donor",
        descriptor: "Older, high-trust, gives occasionally but big.",
        gives: "10K+ per gift",
        icon: "target",
        needs: [
          "A tax receipt for the deduction",
          "To feel recognized, not processed",
          "No friction that makes a large gift feel risky",
        ],
        accent: "accent",
        avatar: "older",
        photo: "/work/veevart-donation/donor-major.jpg",
      },
      {
        name: "The frequent giver",
        descriptor: "Younger, smaller amounts, but far more often.",
        gives: "Small, recurring",
        icon: "clock",
        needs: [
          "To see where the money goes",
          "To give in seconds, on mobile",
          "To share the act and bring others in",
        ],
        accent: "pink",
        avatar: "younger",
        photo: "/work/veevart-donation/donor-frequent.jpg",
      },
    ],
    principles: [
      {
        name: "Validate, don't copy",
        detail:
          "A borrowed pattern had to earn its place by moving a metric, not by matching a competitor.",
      },
      {
        name: "Ask only when it pays off",
        detail:
          "Collect the minimum needed to complete the gift; everything else is optional and comes later.",
      },
      {
        name: "Convert first, enrich after",
        detail:
          "Secure the payment, then invite the donor to add the details that serve them.",
      },
      {
        name: "The gift is a relationship",
        detail:
          "Recognize, thank, and let donors share, so a transaction becomes a reason to give again.",
      },
    ],
    decisions: [
      {
        decision: "Email-first checkout",
        rationale:
          "We ask only for an email and a payment method to complete a gift. If a donor still leaves, we have the email, so an abandoned checkout becomes a follow-up, not a loss.",
        job: { tag: "Conversion", color: "#0071e3", surface: "Checkout", surfaceIcon: "grid", aspect: "Email-first", aspectIcon: "message" },
      },
      {
        decision: "Tax receipt after payment, not before",
        rationale:
          "Billing details drive the tax benefit, so we couldn't remove them. We moved them past the payment: give first, then complete the receipt only if you want it.",
        job: { tag: "Sequencing", color: "#17a673", surface: "Checkout", surfaceIcon: "grid", aspect: "Post-payment", aspectIcon: "clock" },
      },
      {
        decision: "Give in someone's name",
        rationale:
          "Donors can dedicate a gift to a person and notify them it was made, turning a private transaction into a shared act.",
        job: { tag: "Sharing", color: "#e0479e", surface: "Donation", surfaceIcon: "heart", aspect: "Dedication", aspectIcon: "users" },
      },
      {
        decision: "Guaranteed recurrence",
        rationale:
          "Donors can set a fixed number of scheduled payments, so recurring support runs automatically instead of depending on them to return.",
        job: { tag: "Retention", color: "#f59e0b", surface: "Payments", surfaceIcon: "clock", aspect: "Scheduled", aspectIcon: "target" },
      },
      {
        decision: "An experience each side can shape",
        rationale:
          "Institutions tailor the donation page to their cause, and donors choose exactly which fund receives their money.",
        job: { tag: "Flexibility", color: "#0071e3", surface: "Both sides", surfaceIcon: "users", aspect: "Configurable", aspectIcon: "grid" },
      },
    ],
    impactStats: [
      {
        value: "75% → 35%",
        label: "Payment drop-off, cut by more than half",
        context: "The exact step Pendo had flagged became the redesign's biggest win",
        accent: "green",
      },
      {
        value: "+85%",
        label: "More donors reachable for marketing",
        context: "Email-first checkout turns even an abandoned gift into a lead",
        accent: "green",
      },
      {
        value: "1 field",
        label: "What checkout asks before payment",
        context: "An email, then the card, down from a full billing form",
        accent: "accent",
      },
    ],
  },
  {
    slug: "mypainpal",
    title: "MyPainPal",
    subtitle: "Pain care designed for the days between visits",
    year: "2024",
    role: "Product Designer",
    company: "Dana-Farber Cancer Institute",
    team: "Oncologists, palliative-care researchers, nurses & engineers",
    timeline: "4 months",
    discipline: "Product Design",
    tags: ["Healthtech", "Research", "Accessibility", "0→1"],
    accent: "lime",
    cover: "/work/mypainpal/cover.jpg",
    coverPosition: "75% 30%",
    summary:
      "A two-part system for advanced-cancer pain: a gentle patient app and a clinician triage tool, that earned a 78.3 usability score from the people hardest to design for.",
    atAGlance: {
      problem:
        "Patients with advanced cancer manage complex opioid regimens **at home, between visits**, where pain changes fast and the care team is blind. Most never report what's happening until it becomes an emergency or the next appointment.",
      approach:
        "The problem was two-sided. Patients needed to report pain **without it becoming another burden**, and clinicians needed that data to **become action, not noise**. So I designed a gentle, accessible daily check-in on one side, and a triage-first dashboard that surfaced only what needed a nurse on the other.",
      impact:
        "In a Dana-Farber pilot it earned a **78.3 SUS** from an older, seriously ill population, lifted **symptom-logging consistency by 40%**, and cut **clinician response time by 18%** through dashboard triage.",
    },
    atAGlanceVariant: "editorial",
    contextStatsAsCards: true,
    findingsVariant: "quote",
    principlesVariant: "project",
    decisionsVariant: "job",
    statHighlights: [
      {
        label: "Symptom-logging consistency",
        value: "40%",
        icon: "activity",
        delta: { dir: "up", text: "more logging", good: true },
        sub: "Patients reported more, and more often",
      },
      {
        label: "Clinician response time",
        value: "18%",
        icon: "clock",
        delta: { dir: "down", text: "faster", good: true },
        sub: "Faster triage via the dashboard",
      },
      {
        label: "SUS usability score",
        value: "78.3",
        icon: "target",
        delta: { dir: "up", text: "above 68", good: true },
        sub: "Benchmark is 68 (pilot study)",
      },
    ],
    products: [
      {
        icon: "phone",
        title: "Patient Mobile App",
        detail: "Daily symptom tracking and pain management",
      },
      {
        icon: "monitor",
        title: "Clinician Web Platform",
        detail: "Real-time monitoring and care coordination",
      },
    ],
    roleFocus: [
      "UX design for mobile and web",
      "Patient journey mapping",
      "Clinical workflow alignment",
      "Information architecture",
      "Wireframing",
      "Stakeholder collaboration",
    ],
    metrics: [
      {
        value: "↑40%",
        label: "Symptom-logging consistency",
        note: "Patients reported more, and more often",
        accent: "green",
      },
      {
        value: "↓18%",
        label: "Clinician response time",
        note: "Faster triage via the dashboard",
        accent: "green",
      },
      {
        value: "78.3",
        label: "SUS usability score",
        note: "Above the 68 benchmark (pilot study)",
        accent: "accent",
      },
    ],
    sections: [
      {
        kicker: "01, Context",
        title: "Care that happens where no one is watching",
        body: [
          "MyPainPal is a **dual-platform digital health system** built with **Dana-Farber Cancer Institute** to support patients with **advanced cancer** in palliative care. Its purpose: improve **pain visibility**, streamline symptom reporting, and strengthen communication between patients and their care teams.",
          "Pain affects **two in three** patients with advanced disease, and most of it is managed at home, between visits, on complex opioid regimens the patient has to navigate largely alone.",
        ],
        after: "contextStats",
      },
      {
        kicker: "02, The clinical challenge",
        title: "The hardest days happen off the clinic's radar",
        body: [
          "Between visits, the same gap hurt both sides of the room.",
        ],
        after: "challenge",
      },
      {
        kicker: "03, Research",
        title: "Empathy was the requirement, not the nice-to-have",
        body: [
          "I led research into a fragile audience: older, seriously ill, often tired or in pain. With a panel of **oncologists, nurses and researchers** validating every step, the same needs surfaced again and again.",
        ],
        after: "findings",
      },
      {
        kicker: "04, Who we designed for",
        title: "Two users, one system",
        body: [
          "The system had to serve two very different people at once: the patient at home and the clinician watching over a whole cohort. Neither could be an afterthought.",
        ],
        after: "personas",
      },
      {
        kicker: "05, Design principles",
        title: "Rules for designing around people in pain",
        body: [
          "From the research I distilled the non-negotiables. Every screen was measured against them, and when a principle and a feature collided, **the principle won**.",
        ],
        after: "principles",
      },
      {
        kicker: "06, What we refused to build",
        title: "The anti-patterns, and the tone we kept instead",
        body: [
          "In a space this sensitive, the wrong pattern does real harm. Naming what we would **not** build was as important as the features, and it kept the voice **compassionate, clear and dignified** throughout.",
        ],
        after: "designTone",
      },
      {
        kicker: "07, Key decisions",
        title: "Principles turned into interface",
        body: [
          "The through-line: **make participation effortless and optional, and make the data actionable**. Almost every decision chose the gentler, clearer path over the more feature-rich one.",
        ],
        after: "decisions",
      },
      {
        kicker: "08, The app",
        title: "Support in their pocket, on their terms",
        body: [
          "One calm place, reachable **however they wanted**, in language that stayed **plain, warm and never clinical**.",
        ],
        after: "appFeatures",
      },
      {
        kicker: "09, The desktop",
        title: "One place to run the study",
        body: [
          "A separate product for a separate user: one console to **review, assign, and respond**, with urgent alerts pulled to the top.",
        ],
        after: "dashboard",
      },
      {
        kicker: "10, Results",
        title: "It worked for the people hardest to design for",
        body: [
          "Validated in a pilot with patients in advanced cancer, MyPainPal proved both usable and trusted by a group many assume won't adopt technology, a **78.3 SUS**. Beyond usability, it moved the numbers that matter: patients reported more consistently, problems surfaced sooner, and clinicians responded faster. It **turned patient-reported pain into timely clinical action**.",
        ],
        after: "statCards",
      },
    ],
    reflection: {
      title: "What I took from it",
      body: [
        "Designing for people in pain reset my definition of good UX. Every extra tap, every ambiguous label, every hint of pressure costs more here than in any product I'd worked on. **Restraint and clarity weren't style choices, they were care.**",
        "The two-sided nature taught me the most: a patient's effortless check-in is only worth something if it becomes **a clinician's timely action**. Designing the handoff between those two surfaces, not just the two screens, was the real work.",
      ],
    },
    contextStats: [
      {
        value: "66%",
        label: "of advanced-cancer patients live with pain",
        context: "One of the most common and most feared symptoms",
      },
      {
        value: "At home",
        label: "is where the hardest management happens",
        context: "Days or weeks between clinic visits",
      },
      {
        value: "Opioids",
        label: "carry both relief and real risk",
        context: "Side effects, constipation, stigma, dosing errors",
      },
      {
        value: "Zero",
        label: "real-time visibility for the care team",
        context: "Clinicians saw a snapshot at each visit, nothing in between",
      },
    ],
    findings: [
      {
        title: "“I don't want to bother them”",
        detail:
          "Patients under-reported pain, not wanting to burden a busy care team.",
      },
      {
        title: "“Am I taking too much?”",
        detail:
          "Opioid stigma and fear of dosing wrong created silent anxiety, and mistakes.",
      },
      {
        title: "“Another app telling me what to do”",
        detail:
          "This audience had no appetite for pressure, streaks, or homework.",
      },
      {
        title: "“I just want it to be simple”",
        detail:
          "Older patients, low energy, sometimes impaired: clarity and accessibility were non-negotiable.",
      },
    ],
    appFeatures: [
      {
        icon: "book",
        title: "Resource library",
        detail:
          "Reading, meditation and video, browsable freely and reached independently, never handed out as homework.",
      },
      {
        icon: "bell",
        title: "Medication reminders",
        detail:
          "Gentle reminders for their own regimen, so the next dose was one less thing to hold in mind.",
      },
      {
        icon: "clipboard",
        title: "Daily check-in surveys",
        detail:
          "A short, skippable survey to report how the day felt: pain, mood and symptoms, in their own words.",
      },
      {
        icon: "grid",
        title: "Access on their own terms",
        detail:
          "Every tool reachable directly, in any order, so the app met the patient where they were that day.",
      },
    ],
    desktopFeatures: [
      {
        icon: "user",
        title: "Patient overview",
        detail:
          "Physical and emotional status plus full medical history, consolidated in one view.",
      },
      {
        icon: "file",
        title: "Resource assignment",
        detail:
          "Assign reading, meditation and video to a patient or a whole cohort.",
      },
      {
        icon: "pill",
        title: "Medication assignment",
        detail:
          "Set and adjust each patient's regimen, reflected back in their app.",
      },
      {
        icon: "alert",
        title: "Real-time alerts",
        detail:
          "Flags raised by what patients reported in the app, surfaced for immediate attention.",
        accent: "pink",
      },
      {
        icon: "clipboard",
        title: "Survey builder",
        detail:
          "Create and tailor the surveys patients answer, adapted to the study's needs.",
      },
      {
        icon: "users",
        title: "Cohort management",
        detail:
          "Organize patients into study groups and track them side by side.",
      },
    ],
    ethics: [
      {
        icon: "heart",
        title: "Patient dignity",
        detail:
          "Language and flows that respected people at their most vulnerable, never rushed or reduced to a data point.",
        accent: "pink",
      },
      {
        icon: "shield",
        title: "Privacy & HIPAA",
        detail:
          "Built HIPAA compliant end to end, handling real protected health data on both surfaces.",
        accent: "accent",
      },
      {
        icon: "message",
        title: "Sensitive language",
        detail:
          "Every word checked so nothing read as cold, clinical, or alarming.",
        accent: "accent",
      },
      {
        icon: "lock",
        title: "Secure data handling",
        detail: "Health data protected at every step, from the app to the console.",
        accent: "green",
      },
      {
        icon: "target",
        title: "No overpromising",
        detail:
          "Honest framing of what the tool could and could not do for someone in pain.",
        accent: "ink",
      },
    ],
    designTone: {
      guardrails: [
        "Gamification",
        "Pressure-based reminders",
        "Overwhelming dashboards",
        "Clinical coldness",
      ],
      line: "Compassionate, clear, dignified",
      sub: "Healthcare = empathy + clarity",
    },
    challenge: {
      patients: [
        { icon: "activity", text: "Rapidly fluctuating pain levels" },
        { icon: "pill", text: "Complex, changing medication regimens" },
        { icon: "brain", text: "Cognitive fatigue and low energy" },
        { icon: "heart", text: "Emotional vulnerability" },
      ],
      clinicians: [
        { icon: "eye", text: "Limited real-time symptom insight" },
        { icon: "clock", text: "Delayed reporting between appointments" },
        { icon: "users", text: "High patient volume" },
        { icon: "alert", text: "Narrow windows to respond" },
      ],
      goals: [
        { icon: "target", text: "Reduce reporting friction" },
        { icon: "eye", text: "Increase symptom visibility" },
        { icon: "heart", text: "Preserve dignity and emotional safety" },
      ],
    },
    resultStats: [
      {
        label: "Symptom-logging consistency",
        value: "40%",
        icon: "activity",
        delta: { dir: "up", text: "more logging", good: true },
        sub: "Patients reported more, and more often",
      },
      {
        label: "Pain-escalation reporting delay",
        value: "33%",
        icon: "clock",
        delta: { dir: "down", text: "less delay", good: true },
        sub: "Problems surfaced closer to when they happened",
      },
      {
        label: "Medication-adherence tracking",
        value: "25%",
        icon: "pill",
        delta: { dir: "up", text: "better", good: true },
        sub: "Regimens tracked and corrected between visits",
      },
      {
        label: "Clinician response time",
        value: "18%",
        icon: "eye",
        delta: { dir: "down", text: "faster", good: true },
        sub: "Triage-first dashboard shortened the loop",
      },
      {
        label: "Patient-provider communication",
        value: "30%",
        icon: "message",
        delta: { dir: "up", text: "clearer", good: true },
        sub: "From qualitative feedback with the care team",
      },
      {
        label: "SUS usability score",
        value: "78.3",
        icon: "target",
        delta: { dir: "up", text: "above 68", good: true },
        sub: "From an older, seriously ill population",
      },
    ],
    personasVariant: "profile",
    personas: [
      {
        name: "The patient at home",
        descriptor:
          "Advanced cancer, managing pain and a complex opioid regimen between clinic visits.",
        statLabel: "Median age",
        gives: "57",
        icon: "user",
        needs: [
          "To report pain without it feeling like a chore",
          "Plain language, low visual load, large targets",
          "Never to feel pressured or judged for opioid use",
          "A fast way to reach someone when pain spikes",
        ],
        accent: "accent",
        avatar: "older",
        photo: "/work/mypainpal/patient.jpg",
      },
      {
        name: "The care team",
        descriptor:
          "Palliative-care nurses and physicians watching over a whole cohort between visits.",
        statLabel: "Manages",
        gives: "The whole cohort",
        icon: "users",
        needs: [
          "To see who needs attention first, not every data point",
          "Trustworthy signals, not false alarms",
          "Patient status at a glance on a busy clinic day",
          "To act and document without leaving their workflow",
        ],
        accent: "green",
        avatar: "younger",
        photo: "/work/mypainpal/care-team.jpg",
      },
    ],
    principles: [
      {
        name: "Empathy over engagement",
        detail:
          "Never optimize for streaks or pressure. A seriously ill patient should feel supported, never nagged.",
      },
      {
        name: "Accessibility as the baseline",
        detail:
          "Large targets, high contrast, plain language, low visual load. Designed for a hard day, not an ideal one.",
      },
      {
        name: "Clarity over completeness",
        detail:
          "Show the essential first. Reduce visual noise so a tired patient can act in seconds.",
      },
      {
        name: "Participation, never obligation",
        detail:
          "Every action optional and guilt-free. Reporting made easy, never demanded.",
      },
      {
        name: "Signal over data",
        detail:
          "For clinicians, surface what needs action, not everything that was logged.",
      },
    ],
    decisions: [
      {
        decision: "A daily check-in, not a task list",
        rationale:
          "One gentle prompt a day, skippable without penalty. No streaks, no red badges, no guilt for missing it.",
      },
      {
        decision: "Empathic, adaptive microcopy",
        rationale:
          "Each response was tailored and warm, a brief human line before any education, so reporting felt met, not measured.",
      },
      {
        decision: "A medicine cabinet in their own words",
        rationale:
          "Each patient's real medications, named the way they know them, so logging didn't require translation.",
      },
      {
        decision: "Good / fair / poor, not a number to decode",
        rationale:
          "The app interpreted pain control into plain status and a next step, instead of leaving a tired patient to judge raw scores.",
      },
      {
        decision: "One tap to reach a human when it spikes",
        rationale:
          "When a check-in crossed a safety threshold, a one-tap call and a quiet alert to the nurse: help without a hurdle.",
      },
      {
        decision: "A triage-first clinician dashboard",
        rationale:
          "The desktop tool sorted each cohort by who needed attention, so a nurse saw the two patients that mattered before the eighteen who were fine.",
      },
    ],
    impactStats: [
      {
        value: "↑40%",
        label: "Symptom-logging consistency",
        context: "Patients reported more, and more often, across the study",
        accent: "green",
      },
      {
        value: "↓33%",
        label: "Delay in pain-escalation reporting",
        context: "Problems surfaced sooner, closer to when they happened",
        accent: "green",
      },
      {
        value: "↑25%",
        label: "Medication-adherence tracking",
        context: "Regimens tracked and corrected between visits",
        accent: "accent",
      },
      {
        value: "↓18%",
        label: "Clinician response time",
        context: "Triage-first dashboard shortened the loop",
        accent: "green",
      },
      {
        value: "↑30%",
        label: "Clarity in patient-provider communication",
        context: "From qualitative feedback with the care team",
        accent: "pink",
      },
    ],
  },
  {
    slug: "campminder-ai-builds",
    title: "AI-Builds",
    subtitle: "A shared home for prototypes built with AI",
    year: "2026",
    role: "Product Designer — hub architecture & workflow",
    company: "Campminder",
    team: "4 product designers, the whole design team",
    timeline: "Ongoing since March 2026",
    discipline: "AI Product Design",
    aiFirst: true,
    tags: ["Internal tooling", "AI Product Design", "Design Systems"],
    accent: "ink",
    summary:
      "The shared hub where Campminder's design team builds real, interactive prototypes with AI instead of static Figma flows.",
    atAGlance: {
      problem:
        "Each designer prototyped alone in their own repo, on their own deploy pipeline, so nothing was shared and reviewers needed a live walkthrough to see anything.",
      approach:
        "Built one shared hub where any designer can describe a flow to Claude Code and get a real, interactive React app, deployed automatically.",
      impact:
        "The whole design team adopted it, not just one champion. 30+ live prototypes exist today, each one a shareable link instead of a scheduled walkthrough.",
    },
    atAGlanceVariant: "editorial",
    statHighlights: [
      {
        label: "Designers building with AI",
        value: "4",
        icon: "users",
        delta: { dir: "up", text: "team-wide", good: true },
        sub: "Every product designer, not just one champion",
      },
      {
        label: "Live interactive prototypes",
        value: "30+",
        icon: "grid",
        sub: "Real React apps, not static Figma flows",
      },
      {
        label: "Time to a shareable link",
        value: "~30s",
        icon: "clock",
        delta: { dir: "down", text: "full deploy, on every push", good: true },
        sub: "Auto-deployed, no setup for the reviewer",
      },
    ],
    roleFocus: [
      "Workflow design",
      "Prototype architecture",
      "Claude Code tooling",
      "Team enablement",
      "Figma-to-code pipeline",
    ],
    metrics: [
      { value: "30+", label: "prototypes shipped", accent: "accent" },
    ],
    sections: [
      {
        kicker: "01, Context",
        title: "Four designers, four separate pipelines",
        body: [
          "Figma prototypes hit a consistent wall: complex flows, edge cases, and conditional logic are hard to express without custom code. Each designer who wanted more had built their own one-off repo and deploy setup, which meant redundant work, dead links, and nothing anyone else on the team could find.",
          "Handoff to engineering was lossy too, static screens rarely captured error states, loading behavior, or branching logic. And getting a PM a shareable link often meant a designer had to be online to walk them through it.",
        ],
        after: "contextStats",
      },
      {
        kicker: "02, The approach",
        title: "Designers direct, Claude builds",
        body: [
          "We built a shared, AI-assisted prototype hub where designers author interactive, code-based prototypes using Claude Code. Each prototype is a real React app, fully interactive, shareable via URL, deployed automatically on every push.",
          "The key insight: **designers don't need to know how to code.** Claude Code handles the implementation. Designers focus on the flows, the copy, the logic, and the experience, Claude writes the code.",
        ],
        after: "aiBuildsHub",
      },
      {
        kicker: "03, Key decisions",
        title: "What made it stick with the whole team",
        body: [
          "A tool only one person uses isn't a system. Every decision here optimized for the other three designers adopting it without a training session.",
        ],
        after: "decisions",
      },
      {
        kicker: "04, Proof at scale",
        title: "17+ flows, one migration",
        body: [
          "The Auth0 readiness prototype is what this approach enables at scale: 17+ interactive flows covering every caregiver scenario, from new-parent onboarding to expired-link recovery to multi-camp account linking, plus a one-click brand toggle between camp-branded and Campminder-branded views.",
          "It replaced a mix of Figma prototypes, static screens in Notion, and verbal walkthroughs, and it covered edge cases Figma couldn't express, with zero setup required for a PM to open and review it themselves.",
        ],
        after: "impactStats",
      },
      {
        kicker: "05, Results",
        title: "From presentation artifacts to living tools",
        body: [
          "This turned prototypes from something you present into something PMs explore on their own, engineers reference directly, and designers keep current without a separate production pipeline.",
        ],
        after: "statCards",
      },
    ],
    contextStats: [
      {
        value: "4",
        label: "designers, 4 separate pipelines",
        context: "Each one managing their own deploy setup before this existed",
      },
      {
        value: "0",
        label: "shared place to see anyone else's work",
        context: "Prototypes lived in personal repos, dead links piled up",
      },
      {
        value: "Lossy",
        label: "handoff to engineering",
        context: "Static screens couldn't capture error states or branching logic",
      },
      {
        value: "Async",
        label: "PM review, but painfully so",
        context: "A shareable link often meant waiting for a live walkthrough",
      },
    ],
    appFeatures: [
      {
        icon: "grid",
        title: "One shared hub",
        detail: "A single repo where every designer has their own folder. A landing page surfaces everyone's prototypes with a unique URL, no setup required to view.",
      },
      {
        icon: "message",
        title: "Describe it, Claude builds it",
        detail: "Open Claude Code, describe the flow, reference Figma screens or the design system, Claude writes the interactive prototype.",
      },
      {
        icon: "activity",
        title: "Iterate conversationally",
        detail: "“Add an error state when email isn't found,” “make the brand toggle show the camp logo,” changes ship as fast as you can describe them.",
      },
      {
        icon: "lock",
        title: "Isolated by design",
        detail: "Each designer's folder is isolated. You can't accidentally push someone else's changes.",
      },
      {
        icon: "file",
        title: "Figma-aware",
        detail: "With the Figma MCP integration, Claude reads component specs, tokens, and layout directly from the file.",
      },
      {
        icon: "clock",
        title: "Auto-deployed",
        detail: "Every push to main deploys automatically. A shareable link is ready in about 30 seconds.",
      },
    ],
    decisionsVariant: "job",
    decisions: [
      {
        decision: "One shared repo, not one per designer",
        rationale: "Separate repos didn't scale, each designer managing their own pipeline created redundancy, inconsistency, and dead links. One hub, one deploy story.",
        job: { tag: "Architecture", color: "#0071e3", surface: "Shared hub", surfaceIcon: "grid", aspect: "One pipeline", aspectIcon: "lock" },
      },
      {
        decision: "Designers don't need to know how to code",
        rationale: "Claude Code handles the implementation. Designers focus on the flows, the copy, the logic, the AI writes the code.",
        job: { tag: "Workflow", color: "#17a673", surface: "Claude Code", surfaceIcon: "message", aspect: "No code required", aspectIcon: "user" },
      },
      {
        decision: "Code over Figma for complex logic",
        rationale: "Figma prototypes break on conditional logic, edge cases, and branching flows. A real React app expresses any behavior a static prototype can't.",
        job: { tag: "Fidelity", color: "#e0479e", surface: "Real React app", surfaceIcon: "activity", aspect: "Handles any logic", aspectIcon: "shield" },
      },
      {
        decision: "Self-serve review over live walkthroughs",
        rationale: "A shareable URL that works with zero setup turns PM review from a scheduled walkthrough into something async, on their own time.",
        job: { tag: "Review", color: "#f59e0b", surface: "Shareable URL", surfaceIcon: "eye", aspect: "Fully async", aspectIcon: "clock" },
      },
      {
        decision: "Three views for three audiences",
        rationale: "The same prototype serves the design team's full exploration, a clean flow for user testing, and a scoped current-vs-new comparison for engineering, one build, three lenses.",
        job: { tag: "Audience", color: "#0071e3", surface: "One prototype", surfaceIcon: "grid", aspect: "Three lenses", aspectIcon: "eye" },
      },
    ],
    impactStats: [
      {
        value: "17+",
        label: "interactive flows built",
        context: "Covering every caregiver scenario: onboarding, recovery, guest accounts, role upgrades",
        accent: "accent",
      },
      {
        value: "3",
        label: "views from one prototype",
        context: "Exploration for design, a clean flow for testing, a scoped kickoff view for engineering",
        accent: "green",
      },
      {
        value: "1 click",
        label: "to toggle brand",
        context: "Every flow switchable between camp-branded and Campminder-branded, no duplicate files",
        accent: "pink",
      },
    ],
    resultStats: [
      {
        label: "Designers who adopted it",
        value: "4/4",
        icon: "users",
        delta: { dir: "up", text: "the whole team", good: true },
        sub: "Not just one AI-curious champion",
      },
      {
        label: "Live prototypes today",
        value: "30+",
        icon: "grid",
        sub: "Across onboarding, staffing, hiring, and camp-branding work",
      },
      {
        label: "Setup to view a prototype",
        value: "0",
        icon: "eye",
        delta: { dir: "down", text: "steps for the reviewer", good: true },
        sub: "Open the URL, no local install or walkthrough needed",
      },
      {
        label: "Deploy time per push",
        value: "~30s",
        icon: "clock",
        sub: "From `/push-live` to a live, shareable link",
      },
    ],
    reflection: {
      title: "What I took from it",
      body: [
        "The hardest part wasn't the tooling, it was designing a workflow the rest of the team would actually adopt without a training session. **A tool only one person uses isn't a system, it's a habit.**",
        "Watching Figma-only workflows give way to real interactive prototypes changed what I expect from my own process now, I reach for code earlier, not as a developer, but as a designer who wants the edge cases to be honest from day one.",
      ],
    },
  },
  {
    slug: "campminder-ds-agent",
    title: "Design System Agent",
    subtitle: "An agent that keeps every product honest to the design system",
    year: "2026",
    role: "Product Designer — agent design & scoring model",
    company: "Campminder",
    team: "Design systems team, used by every consuming product team",
    timeline: "2 weeks to first working version",
    discipline: "AI Product Design",
    aiFirst: true,
    tags: ["Design Systems", "AI Product Design", "Internal tooling"],
    accent: "violet",
    summary:
      "A Claude Code agent that audits any Campminder product against the design system, tells you exactly what to fix and how to ask AI to fix it, and proposes new components when it finds patterns the system doesn't have yet.",
    atAGlance: {
      problem:
        "Every product drifted from the design system a little differently, and nobody could see the drift until a designer happened to notice it in review.",
      approach:
        "Built an agent that treats the design system's own code as ground truth, scores any repo against it, and writes fixes in language a PM could read.",
      impact:
        "Turned a subjective “this doesn't look right” into a concrete score, a ranked list of fixes, and a trail of how adherence changes over time.",
    },
    atAGlanceVariant: "editorial",
    statHighlights: [
      {
        label: "Foundations audited",
        value: "5",
        icon: "grid",
        sub: "Component adoption, color, typography, spacing, radius",
      },
      {
        label: "Setup per new repo",
        value: "0",
        icon: "clock",
        delta: { dir: "down", text: "config files needed", good: true },
        sub: "Reads the design system's own code, not a manifest",
      },
      {
        label: "New components proposed",
        value: "Auto",
        icon: "activity",
        sub: "Flags recurring custom patterns as candidates to add upstream",
      },
    ],
    roleFocus: [
      "Scoring model design",
      "Agent behavior spec",
      "Dashboard design",
      "Plain-language reporting",
      "Design system governance",
    ],
    metrics: [
      { value: "81%", label: "adherence, illustrative run", accent: "accent" },
    ],
    sections: [
      {
        kicker: "01, Context",
        title: "Adherence lived in one reviewer's head",
        body: [
          "Design-system adherence depended on whichever reviewer happened to notice a raw `<button>` or a hardcoded hex value in a PR. There was no repo-wide picture of how far a product had drifted, and no way to catch it before merge instead of months later.",
          "Even the design system's own documentation couldn't always be trusted, a `DESIGN.md` can say one typeface while the real, shipped CSS says another. Adherence needed a source of truth that couldn't quietly go stale.",
        ],
        after: "contextStats",
      },
      {
        kicker: "02, How it works",
        title: "Ground truth is code, not docs",
        body: [
          "The agent syncs a read-only copy of the design system's real code, then scans the target repo, scores it, and writes both a plain-language report and a local dashboard with the adherence score and its trend over time.",
          "Adherence is defined as one thing, and only one thing: does the product use the design system's component at all? Color, typography, spacing, and radius are scored separately, so a messy-but-adopted component is never confused with one that was never adopted.",
        ],
        after: "dsAgentDashboard",
      },
      {
        kicker: "03, Key decisions",
        title: "The calls that made the score trustworthy",
        body: [
          "A scoring tool nobody trusts gets ignored after the first false positive. These decisions were about earning that trust.",
        ],
        after: "decisions",
      },
      {
        kicker: "04, Results",
        title: "From a gut feeling to a number you can track",
        body: [
          "The run below is an illustrative example, not one specific team's real audit, but the shape of it (adoption climbing, drift caught before merge, custom components proposed instead of duplicated) matches what happened in practice.",
        ],
        after: "statCards",
      },
    ],
    contextStats: [
      {
        value: "Manual",
        label: "design-system review, one PR at a time",
        context: "Adherence depended on whichever reviewer happened to notice",
      },
      {
        value: "Drift",
        label: "nobody could see accumulating",
        context: "No repo-wide picture of how far a product had drifted",
      },
      {
        value: "Docs vs. code",
        label: "quietly disagreed with each other",
        context: "A design doc could say one thing while the shipped code said another",
      },
      {
        value: "0",
        label: "path from finding to fix",
        context: "Even when drift was found, turning it into a concrete fix was manual",
      },
    ],
    desktopFeatures: [
      {
        icon: "grid",
        title: "Syncs the real design system",
        detail: "Pulls a read-only copy of the design system's own code, the actual source of truth, not whatever a README claims.",
      },
      {
        icon: "eye",
        title: "Scores what's real, not what's tidy",
        detail: "Adherence is one question: does the product use the design system's component at all? Foundations are scored separately alongside it.",
      },
      {
        icon: "clock",
        title: "Diff mode for every PR",
        detail: "Defaults to auditing just the diff against main, fast enough to run before a merge, not just as a quarterly audit.",
      },
      {
        icon: "activity",
        title: "Full-repo mode for real debt",
        detail: "A whole-repo scan surfaces the adoption picture no diff can show, and tracks the score's trend run over run.",
      },
      {
        icon: "file",
        title: "Proposes, doesn't just flag",
        detail: "Custom components with no design-system match are surfaced as candidates to propose upstream, not violations to feel bad about.",
      },
      {
        icon: "message",
        title: "Plain language first",
        detail: "The report leads with a short recap a PM could read, no jargon, before any of the technical detail.",
      },
    ],
    decisionsVariant: "job",
    decisions: [
      {
        decision: "Adherence = adoption, full stop",
        rationale: "Averaging in color, spacing, and typography used to conflate “uses the design system” with “styled cleanly.” Splitting them out means the headline score answers one honest question.",
        job: { tag: "Scoring", color: "#0071e3", surface: "One clear score", surfaceIcon: "grid", aspect: "No conflation", aspectIcon: "eye" },
      },
      {
        decision: "Code is ground truth, never a doc",
        rationale: "A design system's own docs can drift from its shipped code. The agent always reads the actual CSS and components, never assumes a markdown file is current.",
        job: { tag: "Rigor", color: "#17a673", surface: "Reads real code", surfaceIcon: "file", aspect: "Never assumes", aspectIcon: "shield" },
      },
      {
        decision: "Custom components are candidates, not violations",
        rationale: "A hand-built component might be the design system's next component, not a mistake. The report frames it as something to propose upstream.",
        job: { tag: "Tone", color: "#e0479e", surface: "Custom code found", surfaceIcon: "activity", aspect: "Propose, don't shame", aspectIcon: "heart" },
      },
      {
        decision: "Plain language before any jargon",
        rationale: "The person reading the report might be a PM, not an engineer. The recap always comes first, in one paragraph, with no unexplained jargon.",
        job: { tag: "Communication", color: "#f59e0b", surface: "Plain recap", surfaceIcon: "message", aspect: "Jargon after", aspectIcon: "user" },
      },
      {
        decision: "Diff by default, full scan on request",
        rationale: "Most asks are “does this PR introduce drift,” which needs to be fast. A full scan is reserved for when someone actually wants the whole adoption picture.",
        job: { tag: "Scope", color: "#0071e3", surface: "Fast by default", surfaceIcon: "clock", aspect: "Full scan on ask", aspectIcon: "grid" },
      },
    ],
    resultStats: [
      {
        label: "Adherence score",
        value: "81%",
        icon: "target",
        delta: { dir: "up", text: "+29 pts since first run", good: true },
        sub: "Component adoption, the headline metric",
      },
      {
        label: "Findings caught pre-merge",
        value: "7",
        icon: "eye",
        sub: "In a single diff-mode run, before it reached review",
      },
      {
        label: "Custom components flagged",
        value: "5",
        icon: "activity",
        sub: "Proposed upstream instead of quietly duplicated",
      },
      {
        label: "Setup time for a new repo",
        value: "0 min",
        icon: "clock",
        delta: { dir: "down", text: "no config needed", good: true },
        sub: "Point it at any consuming repo and run",
      },
    ],
    reflection: {
      title: "What I took from it",
      body: [
        "Designing the scoring model taught me more about design-system governance than any audit I'd done by hand. **Deciding what adherence should even mean** (adoption, not tidiness) was the real design work, the agent just made it consistent.",
        "The plain-language-first rule was the detail I almost skipped and I'm glad I didn't: a report only a design-systems engineer can parse doesn't change anyone's behavior. One a PM can read does.",
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
