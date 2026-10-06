// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to update the site.
// TODO before launch:
//   1. Set `site.email` to your real email (Email button stays hidden while empty).
//   2. Replace each project's `github` with its exact repo URL.
//   3. Set `demo` for Social Hub once the live URL is ready.
//   4. Add screenshots to /public/projects/ and list them in `screenshots`.
//   5. Review the "decisions", "challenges" and "learned" text in case studies.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Praveen Kumar",
  role: "Software Engineer · AI Engineer",
  github: "https://github.com/channupraveen",
  linkedin: "https://www.linkedin.com/in/praveen-kumar2001",
  email: "channupraveen66@gmail.com",
  // Export your resume as PDF and save it in /public with exactly this name.
  cv: "/Channu-Praveen-Kumar-CV.pdf",
};

export const experience = [
  {
    role: "Founder & Lead Engineer",
    company: "AiOpsCare",
    place: "Hyderabad",
    period: "Oct 2025 – Present",
    summary: "Building a multi-tenant, AI-powered hospital operations SaaS from scratch.",
    points: [
      "Designed schema-per-tenant PostgreSQL isolation with tenant context resolved from JWT, plus RBAC for four roles.",
      "Built a multilingual voice assistant (EN, HI, TE, TA) with speech-to-text, LLM reasoning and TTS for hands-free ticket creation.",
      "Built an OpenAI + Groq LLM client with automatic fallback and structured JSON outputs.",
      "Delivered tickets with SLA and auto-assignment, assets, PM, contracts, housekeeping, laundry, utilities and compliance modules.",
      "Deployed on Render, Neon PostgreSQL and Netlify.",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "Angular 18", "OpenAI", "Groq", "Voice AI"],
  },
  {
    role: "Full Stack Developer",
    company: "Nushift Technologies",
    place: "Hyderabad",
    period: "Jul 2024 – Sep 2025",
    summary: "Healthcare platform with real-time data features.",
    points: [
      "Developed Angular modules and integrated REST APIs, improving performance and responsiveness.",
      "Debugged and fixed production issues, improving stability.",
      "Built reusable UI components and worked with backend teams on API efficiency in agile sprints.",
    ],
    tags: ["Angular", "TypeScript", "RxJS", "REST APIs"],
  },
  {
    role: "Full Stack Software Developer",
    company: "SNAD Developers Pvt Ltd",
    place: "Hyderabad",
    period: "Apr 2022 – Feb 2024",
    summary: "Backend services and Angular frontends for business applications.",
    points: [
      "Built REST APIs and backend services integrated with Angular frontends.",
      "Developed responsive UI with Angular, HTML, CSS and Bootstrap.",
      "Optimised SQL queries and indexes on data-heavy screens.",
    ],
    tags: ["REST APIs", "Angular", "SQL", "Bootstrap"],
  },
];

export const education = [
  { degree: "B.Sc Electronics", school: "Bhavans Vivekananda College", year: "2022" },
];

/** A layer is one node, or several nodes side by side. */
export type ArchLayer = string | string[];

export type Section = { title: string; body: string };

export type Project = {
  aiFeatures?: Section[];
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem?: string;
  why?: string;
  solution?: string;
  highlights: string[];
  architecture: ArchLayer[];
  secondaryArchitecture?: { label: string; layers: ArchLayer[] };
  benchmark?: {
    rows: { label: string; seconds: number }[];
    result: string;
    note: string;
  };
  tech: string[];
  decisions?: Section[];
  challenges?: Section[];
  learned?: string[];
  takeaway: string;
  github?: string;
  demo?: string;
  screenshots?: { src: string; alt: string }[];
  primaryCta: "case-study" | "architecture" | "demo" | "github";
};

export const projects: Project[] = [
  {
    slug: "aiopscare",
    name: "AIOpsCare",
    tagline: "AI-Powered Hospital Operations SaaS",
    description:
      "A multi-tenant, voice-first SaaS platform for hospital operations and compliance — assets, maintenance, tickets, contracts, housekeeping, laundry, utilities and workflows — with a multilingual AI voice assistant and LLM-powered dashboard chat and reports.",
    aiFeatures: [
      {
        title: "Multilingual voice assistant",
        body: "Hospital staff can speak to the system in English, Hindi, Telugu and Tamil. The assistant understands the request, holds a short conversation and replies with speech in the same language.",
      },
      {
        title: "Voice-to-ticket creation",
        body: "Staff record a WhatsApp-style voice note to report a problem. The audio is transcribed and an LLM turns it into a structured maintenance ticket, including the likely asset issue.",
      },
      {
        title: "AI dashboard chat",
        body: "Supervisors and admins ask questions about operations in plain language. Answers are grounded in tenant-scoped query APIs, so the AI only sees that hospital's data.",
      },
      {
        title: "AI narrative reports",
        body: "The LLM turns operational data into readable summaries, so managers get a written explanation instead of only charts and tables.",
      },
      {
        title: "Provider-agnostic LLM layer with fallback",
        body: "One LLM client supports OpenAI (GPT-4o / GPT-4o-mini) and Groq (Llama 3.3 70B) through a shared chat-completions interface, with automatic fallback between providers and a deterministic fallback when no model is available.",
      },
      {
        title: "Indian-language text-to-speech",
        body: "Spoken replies use a primary and fallback TTS engine. A transliteration step rewrites common English terms (ticket, AC, ICU) into native script for correct Telugu, Hindi and Tamil pronunciation, and an LRU cache serves repeated phrases instantly.",
      },
    ],
    problem:
      "Hospital facility operations span many departments, assets, maintenance teams, compliance requirements and recurring workflows — usually tracked across spreadsheets, paper checklists and disconnected tools.",
    why: "Hospital facility operations involve multiple departments, assets, maintenance teams, compliance requirements, and recurring workflows. Many frontline staff are more comfortable speaking their own language than filling in English forms. AIOpsCare brings these processes into one platform that staff can simply talk to.",
    solution:
      "A single multi-tenant platform where each hospital gets an isolated data space, and every operational module — maintenance, assets, utilities, contracts, compliance, housekeeping, laundry — shares one consistent workflow, permission and analytics model. An AI layer on top lets staff report issues by voice in their own language and lets managers query operations in plain language.",
    highlights: [
      "Multilingual AI voice assistant",
      "Voice-note → structured ticket with LLMs",
      "AI dashboard chat & narrative reports",
      "OpenAI + Groq LLM layer with fallback",
      "Multi-tenant SaaS architecture",
      "PostgreSQL schema-per-tenant isolation",
      "Tenant-aware database routing",
      "JWT authentication",
      "Role-based access control",
      "Maintenance & ticket management",
      "Preventive maintenance workflows",
      "Asset management",
      "Meter & utility management",
      "Contract management",
      "Compliance & checklist workflows",
      "Housekeeping & laundry management",
      "Incident & CAPA tracking",
      "Workflow & approval engine",
      "Automatic worker assignment",
      "Operational analytics",
    ],
    architecture: [
      "Angular App (voice + chat)",
      "FastAPI API",
      "Auth / Tenant Context",
      ["Service Layer", "AI Layer"],
      "Repository Layer",
      "PostgreSQL",
      ["tenant_a", "tenant_b", "tenant_n"],
    ],
    secondaryArchitecture: {
      label: "AI voice pipeline",
      layers: [
        "Voice input (EN / HI / TE / TA)",
        "Speech-to-text",
        "LLM client",
        ["OpenAI GPT-4o", "Groq Llama 3.3"],
        "Structured JSON → action",
        "Transliteration + TTS",
      ],
    },
    tech: [
      "Angular 18",
      "PrimeNG",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "OpenAI",
      "Groq",
      "Llama 3.3",
      "Speech-to-Text",
      "Text-to-Speech",
      "JWT",
      "Render",
      "Neon",
      "Netlify",
    ],
    decisions: [
      {
        title: "Schema-per-tenant in PostgreSQL",
        body: "Each hospital's data lives in its own PostgreSQL schema. This gives stronger isolation than a shared table with a tenant_id column, while still running a single database that is simple to operate and back up.",
      },
      {
        title: "Tenant context resolved from the JWT",
        body: "The tenant is identified from the authenticated token on every request and used to route the database session to the right schema, so business logic never has to pass tenant identifiers around manually.",
      },
      {
        title: "Layered backend",
        body: "API routes stay thin; business rules live in a service layer and data access in a repository layer. This keeps a large number of modules consistent and testable.",
      },
      {
        title: "Role-based access control",
        body: "Permissions are enforced at the API layer by role, so maintenance staff, supervisors and administrators see and act on only what they should.",
      },
      {
        title: "LLMs return structured JSON",
        body: "Voice and chat requests ask the model for structured JSON rather than free text, so the backend can validate the output and turn it into real actions such as creating a ticket.",
      },
      {
        title: "Never depend on one AI provider",
        body: "The LLM client falls back from one provider to another, and to a deterministic path, so a provider outage or rate limit doesn't stop hospital staff from working.",
      },
    ],
    challenges: [
      {
        title: "Keeping every query tenant-scoped",
        body: "In a multi-tenant system, one unscoped query is a data leak. Centralising tenant routing in the request context — rather than in individual queries — was key.",
      },
      {
        title: "Many modules, one model",
        body: "Maintenance, compliance, housekeeping and utilities each have their own workflows. Designing shared patterns for status, assignment and recurrence kept the platform coherent as modules grew.",
      },
      {
        title: "Voice on real phones",
        body: "Android allows only one microphone consumer at a time, which blocked speech recognition when the audio meter was also listening. The mic stream was made session-scoped, the meter replaced with a synthetic animation on Android, and recognition given auto-retry and timeouts.",
      },
      {
        title: "Correct Indian-language pronunciation",
        body: "English words inside Telugu, Hindi or Tamil sentences were pronounced badly by TTS. A transliteration table converts them into native script before synthesis.",
      },
      {
        title: "Silent audio on mobile",
        body: "Mobile browsers block audio that isn't started by a tap. Audio playback is unlocked during the user's tap, and a size guard stops error responses from being played as audio.",
      },
    ],
    learned: [
      "How tenant isolation, authorization and database design depend on each other",
      "Building production voice AI: speech-to-text, LLMs and text-to-speech working together",
      "Designing LLM features that are reliable: structured outputs, provider fallback, caching",
      "Structuring a large FastAPI codebase into clear service and repository boundaries",
      "Modelling real operational workflows rather than CRUD screens",
    ],
    takeaway:
      "The project gave me hands-on experience designing a real multi-tenant SaaS architecture where tenant isolation, authorization, database design, operational workflows and production AI features all have to work together.",
    demo: "https://aiopscare.com",
    github: site.github,
    primaryCta: "case-study",
  },
  {
    slug: "swarmai",
    name: "SwarmAI",
    tagline: "Distributed Local LLM Inference",
    description:
      "An open-source system that turns multiple machines running local Ollama models into a coordinated AI compute swarm.",
    problem: "Running LLM workloads locally is limited by the compute available on a single machine.",
    why: "I wanted to see how far local, self-hosted models could go if several ordinary machines worked together instead of one doing everything.",
    solution:
      "SwarmAI coordinates multiple worker machines and distributes AI workloads across the available local models through a central coordinator and scheduler.",
    highlights: [
      "Coordinator / worker architecture",
      "Ollama integration",
      "FastAPI APIs",
      "Async Python",
      "Worker heartbeat",
      "Least-busy worker routing",
      "Retry handling",
      "Agent orchestration",
      "Internet-accessible swarm nodes",
      "CLI for joining workers",
      "Benchmarking",
    ],
    architecture: ["Client", "Coordinator", "Scheduler / Router", ["Worker 1 · Ollama", "Worker 2 · Ollama", "Worker N · Ollama"]],
    benchmark: {
      rows: [
        { label: "1 node", seconds: 113.3 },
        { label: "2 nodes", seconds: 68.3 },
      ],
      result: "1.66× measured speedup",
      note: "Measured in the project's own test environment. Not a universal performance guarantee.",
    },
    tech: ["Python", "FastAPI", "AsyncIO", "Ollama", "REST APIs", "AWS EC2", "ngrok"],
    decisions: [
      {
        title: "Coordinator / worker model",
        body: "A central coordinator owns scheduling and state, while workers stay simple: they run Ollama and report health. This keeps the system easy to reason about and debug.",
      },
      {
        title: "Heartbeats + least-busy routing",
        body: "Workers send regular heartbeats, so the scheduler knows which nodes are alive and how loaded they are, and routes each job to the least-busy worker.",
      },
      {
        title: "Async from the ground up",
        body: "FastAPI with asyncio lets the coordinator hold many in-flight requests to slow model calls without blocking.",
      },
      {
        title: "Retries on worker failure",
        body: "If a worker fails or drops mid-request, the job is retried on another node instead of failing the client call.",
      },
    ],
    challenges: [
      {
        title: "Workers on different networks",
        body: "Joining machines that aren't on the same LAN required internet-accessible nodes, tested with AWS EC2 and ngrok tunnels.",
      },
      {
        title: "Measuring honestly",
        body: "Distribution adds overhead, so speedup is not linear. Benchmarking 1 vs 2 nodes made the real gain — and its limits — visible.",
      },
    ],
    learned: [
      "Distributed systems fundamentals: health checks, routing, failure handling",
      "Asynchronous workloads and concurrency in Python",
      "Local LLM infrastructure with Ollama",
    ],
    takeaway:
      "This project helped me explore distributed systems, asynchronous workloads, model routing, worker coordination, and local LLM infrastructure.",
    github: site.github,
    primaryCta: "architecture",
  },
  {
    slug: "devsparkai-social-hub",
    name: "DevSparkAI Social Hub",
    tagline: "AI-Powered Social Media Management SaaS",
    description:
      "A social media management platform that uses AI to generate, customize, schedule and manage social media content.",
    problem:
      "Planning and producing consistent, platform-specific social content takes significant time for small teams and businesses.",
    why: "I wanted to build a product where AI is part of the core workflow — planning, writing and adapting content — not a bolt-on chat box.",
    solution:
      "Users provide a topic and timeframe, and the system generates a structured content plan, then platform-specific variants that can be edited, scheduled and published.",
    highlights: [
      "AI content generation & planning",
      "Brand profiles",
      "Platform-specific content variants",
      "Post scheduling & publishing",
      "Analytics",
      "Multiple AI providers (OpenAI, Gemini, others)",
      "Bring-your-own API keys",
      "X/Twitter OAuth2 PKCE",
      "Encrypted API credentials",
      "JWT-protected API routes",
    ],
    architecture: ["Angular Frontend", "FastAPI Backend", "AI Provider Layer", ["OpenAI", "Gemini", "Other Providers"], "PostgreSQL"],
    tech: ["Angular", "TypeScript", "RxJS", "Python", "FastAPI", "PostgreSQL", "JWT", "OAuth2 PKCE", "LLM APIs"],
    decisions: [
      {
        title: "Provider abstraction layer",
        body: "All AI calls go through one provider layer, so OpenAI, Gemini and other compatible providers are interchangeable without changing product logic.",
      },
      {
        title: "Bring your own key — encrypted",
        body: "Users can supply their own provider API keys. Keys are encrypted before storage and secrets are kept in environment configuration.",
      },
      {
        title: "OAuth2 PKCE for X/Twitter",
        body: "Publishing to X uses the OAuth2 PKCE flow, so the app never handles user passwords.",
      },
    ],
    learned: [
      "Integrating LLMs into a full product workflow",
      "Secure credential handling and OAuth flows",
      "Designing for multiple AI providers from the start",
    ],
    takeaway:
      "This project demonstrates how I integrate AI capabilities into a complete SaaS product rather than building AI as an isolated prototype.",
    github: site.github,
    demo: "https://socialhub.devsparkai.com/login",
    primaryCta: "demo",
  },
  {
    slug: "ai-agent-job-applier",
    name: "AI Agent Job Applier",
    tagline: "AI-powered job search and application automation",
    description:
      "An AI-driven application that automates parts of the job discovery and application workflow using intelligent agents.",
    problem: "Job searching involves many repetitive, multi-step tasks: discovering roles, filtering them and preparing applications.",
    solution:
      "LLM-powered agents work through structured, multi-step workflows — discovering jobs and making decisions along the way — exposed through backend APIs and an Angular UI.",
    highlights: ["AI agents", "Job discovery", "Automation", "Backend APIs", "Structured workflows", "LLM-powered decision making"],
    architecture: ["Angular UI", "FastAPI API", "Agent Workflow", ["Job Discovery", "LLM Decisions", "Automation"]],
    tech: ["Python", "FastAPI", "AI/LLMs", "Angular", "REST APIs"],
    takeaway: "This project explores how AI agents can perform multi-step tasks rather than simply generating text.",
    github: site.github,
    primaryCta: "github",
  },
];

export const credibility = ["3+ Years Experience", "AI Engineering", "Full-Stack Development", "Real SaaS Products"];

export const technologies = [
  "Python", "FastAPI", "Django", "Angular", "TypeScript", "PostgreSQL", "OpenAI GPT-4o", "Groq",
  "Llama 3.3", "Voice AI", "Speech-to-Text", "TTS", "AI Agents", "Ollama", "Celery", "Docker", "AWS",
];

export const buildAreas = [
  {
    title: "AI Engineering",
    items: [
      "Multilingual Voice AI",
      "Speech-to-Text & Text-to-Speech",
      "LLM Applications",
      "Structured LLM Outputs",
      "Multi-provider LLM Routing & Fallback",
      "AI Chat over Business Data",
      "AI Agents",
      "Prompt Engineering",
      "Local LLMs (Ollama)",
    ],
  },
  { title: "Backend Engineering", items: ["Python", "FastAPI", "Django / DRF", "Celery", "REST APIs", "PostgreSQL", "Authentication & RBAC", "Multi-tenant Architecture"] },
  { title: "Frontend Engineering", items: ["Angular 18", "PrimeNG", "Signals", "TypeScript", "RxJS", "i18n / Multilingual UI", "Web Speech & Audio APIs", "Responsive UI"] },
  { title: "Systems & Infrastructure", items: ["Distributed Systems", "Docker", "AWS", "Render", "Neon Postgres", "Netlify", "Async Processing", "Worker Architecture", "Cloud Deployment"] },
];

/** `used` marks the project where a skill is applied, shown as a tag. */
export const skills: { group: string; items: (string | { name: string; used: string })[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  {
    group: "LLMs & AI APIs",
    items: [
      { name: "OpenAI GPT-4o / 4o-mini", used: "AIOpsCare" },
      { name: "Groq · Llama 3.3 70B", used: "AIOpsCare" },
      { name: "Multi-provider LLM fallback", used: "AIOpsCare" },
      { name: "Structured JSON outputs", used: "AIOpsCare" },
      { name: "Ollama (local LLMs)", used: "SwarmAI" },
      { name: "Gemini API", used: "Social Hub" },
      "Anthropic Claude",
      "Prompt Engineering",
      "Tenant-scoped context injection",
    ],
  },
  {
    group: "Voice AI",
    items: [
      { name: "Speech-to-Text", used: "AIOpsCare" },
      { name: "Text-to-Speech pipelines", used: "AIOpsCare" },
      { name: "Multilingual AI (EN · HI · TE · TA)", used: "AIOpsCare" },
      { name: "Indic transliteration", used: "AIOpsCare" },
    ],
  },
  {
    group: "AI Systems",
    items: [
      { name: "AI chat over business data", used: "AIOpsCare" },
      { name: "AI narrative reports", used: "AIOpsCare" },
      { name: "AI Agents", used: "Job Applier" },
      { name: "Distributed LLM inference", used: "SwarmAI" },
    ],
  },
  {
    group: "Backend",
    items: [
      "FastAPI", "Django", "Django REST Framework", "SQLAlchemy", "Alembic", "Pydantic", "Celery", "asyncio",
      "Clean Architecture", "Multi-tenancy",
    ],
  },
  { group: "APIs & Security", items: ["REST APIs", "OpenAPI / Swagger", "Postman", "WebSockets", "JWT", "OAuth2 PKCE", "RBAC"] },
  { group: "Frontend", items: ["Angular 18", "Signals", "RxJS", "PrimeNG", "ngx-translate (i18n)", "HTML5", "CSS3", "Bootstrap"] },
  { group: "Databases", items: ["PostgreSQL", "Schema-per-tenant", "Neon", "MySQL", "SQL Server", "Query optimisation"] },
  { group: "Cloud & DevOps", items: ["Docker", "AWS EC2", "Render", "Netlify", "Git", "GitHub", "Linux"] },
];

export const principles = [
  { title: "Build real products", body: "I prefer building complete systems that solve real problems rather than isolated demos." },
  { title: "AI should solve a problem", body: "I use AI where it creates meaningful product value — not to add an AI feature for its own sake." },
  { title: "Architecture matters", body: "Authentication, authorization, tenant isolation, database design, API boundaries, observability and failure handling matter as much as the UI." },
  { title: "Learn by building", body: "Most of my strongest technical learning has come from designing and shipping actual systems." },
];

export const experienceFocus = [
  "Full-stack development",
  "Backend engineering",
  "SaaS development",
  "AI applications",
  "API development",
  "Database architecture",
  "Product engineering",
];
