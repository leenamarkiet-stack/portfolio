// portfolio-data.jsx — placeholder content for Leena Markiet
// Replace with actual content from your Canva once you paste it.

const PORTFOLIO_BIO = {
  name: "Leena Markiet",
  role: "Service Designer & UX/UI",
  location: "Helsinki, Finland",
  email: "leena@markiet.studio",
  paragraph:
    "I'm a service designer and UX/UI lead with 8+ years shaping end-to-end experiences for healthcare, public sector, and fintech. I love untangling messy systems, facilitating cross-functional teams, and turning insight into shipped product. Currently freelancing.",
  skills: [
    "Service Design", "Journey Mapping", "Workshop Facilitation",
    "UX Research", "UI Design", "Digital Twins",
    "Vibecoding", "Figma", "Stakeholder Management",
  ],
  socials: [
    { label: "LinkedIn", url: "#" },
    { label: "Read.cv", url: "#" },
    { label: "Email", url: "mailto:leena@markiet.studio" },
  ],
};

const PORTFOLIO_PROJECTS = [
  {
    id: "p1",
    title: "Reimagining outpatient triage",
    client: "Nordic Health",
    role: "Lead Service Designer",
    year: "2025",
    tags: ["Service Design", "Healthcare", "Research"],
    description: "End-to-end redesign of a triage flow used by 2,400 nurses across 14 hospitals.",
    cover: { hue: 18, label: "Triage flow" },
  },
  {
    id: "p2",
    title: "A calmer banking app",
    client: "Pilvi Bank",
    role: "UX/UI Designer",
    year: "2024",
    tags: ["UX/UI", "Fintech", "Mobile"],
    description: "Reduced support tickets by 31% with a redesigned daily-banking experience.",
    cover: { hue: 200, label: "Mobile banking" },
  },
  {
    id: "p3",
    title: "Citizen permit service",
    client: "City of Tampere",
    role: "Service Designer",
    year: "2024",
    tags: ["Service Design", "Public Sector", "Research"],
    description: "Cross-departmental service blueprint and digital application portal.",
    cover: { hue: 140, label: "Permit service" },
  },
  {
    id: "p4",
    title: "Design system from scratch",
    client: "Verso (in-house)",
    role: "Design System Lead",
    year: "2023",
    tags: ["Design System", "UI", "Tooling"],
    description: "Built and shipped a 240-component Figma library with token pipeline.",
    cover: { hue: 280, label: "Design system" },
  },
  {
    id: "p5",
    title: "Onboarding for first-time investors",
    client: "Taimi Invest",
    role: "UX Designer",
    year: "2023",
    tags: ["UX/UI", "Fintech", "Onboarding"],
    description: "Lifted activation by 22% with a friendlier, less jargon-heavy first-run.",
    cover: { hue: 60, label: "Onboarding" },
  },
  {
    id: "p6",
    title: "Workshops in a box",
    client: "Self-initiated",
    role: "Designer & Facilitator",
    year: "2023",
    tags: ["Service Design", "Facilitation", "Toolkit"],
    description: "Open-source toolkit for journey-mapping workshops, used by 600+ teams.",
    cover: { hue: 340, label: "Workshop toolkit" },
  },
  {
    id: "p7",
    title: "Voice-first elderly care",
    client: "Hoiva Co.",
    role: "Service & UX Designer",
    year: "2022",
    tags: ["Service Design", "Voice UI", "Accessibility"],
    description: "Voice companion piloted with 80 residents across three care homes.",
    cover: { hue: 240, label: "Voice care" },
  },
  {
    id: "p8",
    title: "Restaurant ops dashboard",
    client: "Kitchn",
    role: "UI Designer",
    year: "2022",
    tags: ["UX/UI", "B2B", "Data"],
    description: "Dense, glanceable dashboard for restaurant managers running multi-site ops.",
    cover: { hue: 120, label: "Ops dashboard" },
  },
];

// Case study scaffolding — 6 image slots per project.
const CASE_STUDY_TEMPLATE = (project) => ({
  hero: { label: `${project.title} — hero` },
  overview: `Brief context: who I worked with, the problem they were facing, and the outcome we landed on. Two or three sentences max — keep the front door welcoming.`,
  meta: [
    { k: "Client", v: project.client },
    { k: "Role", v: project.role },
    { k: "Year", v: project.year },
    { k: "Team", v: "1 PM, 2 Engineers, 1 Researcher" },
    { k: "Duration", v: "16 weeks" },
  ],
  sections: [
    {
      heading: "Discovery",
      body: "What we found in research. Quotes from interviews, key tensions, the mess.",
      images: [{ label: "Research wall" }, { label: "Journey map" }],
    },
    {
      heading: "Synthesis",
      body: "How insights became opportunities. Frameworks, principles, where we placed bets.",
      images: [{ label: "Opportunity map" }, { label: "Workshop output" }],
    },
    {
      heading: "Design & Delivery",
      body: "What shipped, how it tested, what changed because of this work.",
      images: [{ label: "Final UI 01" }, { label: "Final UI 02" }],
    },
  ],
});

window.PORTFOLIO_BIO = PORTFOLIO_BIO;
window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
window.CASE_STUDY_TEMPLATE = CASE_STUDY_TEMPLATE;
