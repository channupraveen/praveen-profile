# Praveen Kumar — Portfolio

Personal portfolio of **Praveen Kumar**, Software Engineer & AI Engineer (Python full stack + AI, 3+ years).

It includes an **AI chat assistant** in the hero section that answers recruiters' questions — experience, projects, skills, "why hire him" — using Llama 3.3 on Groq, grounded only in the site's own data.

<!-- Add your live URL after deploying: **Live:** https://your-site.vercel.app -->

## Features

- **AI chat assistant** — ChatGPT-style interface, typing animation, suggested questions (scroll with wheel, drag or arrows). Uses Groq when `GROQ_API_KEY` is set, and falls back to built-in answers from the CV data when it isn't, so it never breaks.
- **Project case studies** — AIOpsCare, SwarmAI, DevSparkAI Social Hub and AI Agent Job Applier, each with animated architecture diagrams, technical decisions, challenges and results.
- **Experience timeline, skills and CV download.**
- **Mobile-first** — app-style bottom navigation, safe-area support, installable to the home screen (web manifest).
- **Motion with restraint** — scroll reveals, animated data-flow diagrams, cursor spotlight; all disabled when the visitor prefers reduced motion.
- **SEO** — page metadata, Open Graph and per-project titles.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Groq API (Llama 3.3 70B)

No UI or animation libraries — all components and animations are hand-built.

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your Groq key (optional)
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `GROQ_API_KEY` | No | Groq API key ([get one free](https://console.groq.com/keys)). Without it, the chat uses built-in answers. |
| `GROQ_MODEL` | No | Model name. Defaults to `llama-3.3-70b-versatile`. |

Never commit `.env.local` — it is already in `.gitignore`.

## Editing content

All site content lives in **`lib/data.ts`**: profile links, experience, projects, skills and education. The AI chat builds its knowledge from the same file, so updating it updates the chat too.

- **Profile photo:** `public/img.jpeg`
- **CV:** save the PDF as `public/Channu-Praveen-Kumar-CV.pdf`
- **Project screenshots:** add images to `public/projects/` and list them in each project's `screenshots`

## Project structure

```
app/
  page.tsx              Homepage (hero + chat, work, skills, experience, contact)
  work/[slug]/page.tsx  Project case study pages
  api/chat/route.ts     Chat API (Groq + fallback)
  layout.tsx            Metadata, fonts, navigation
  manifest.ts           Web app manifest
components/
  HeroChat.tsx          AI chat interface
  ArchDiagram.tsx       Animated architecture diagrams
  ProjectCard.tsx       Project cards
  Nav.tsx, MobileDock.tsx
lib/
  data.ts               All site content
  assistant.ts          Chat system prompt, knowledge and fallback answers
```

## Deploy

Deploy on [Vercel](https://vercel.com/new): import this repository and add `GROQ_API_KEY` under **Environment Variables**. Every push to `main` redeploys automatically.

## Contact

- Email: channupraveen66@gmail.com
- LinkedIn: [praveen-kumar2001](https://www.linkedin.com/in/praveen-kumar2001)
- GitHub: [channupraveen](https://github.com/channupraveen)
