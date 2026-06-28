# atie.dev

My personal site — [atie.dev](https://www.atie.dev). A deliberately minimal, text-first portfolio with a small AI agent that answers questions about my work.

I'm Atishay Jain (people also call me **atie**) — an SSD Firmware Intern at Micron working on simulation and analysis, and a CS grad student at Santa Clara University.

## Highlights

- **One quiet page** — intro, experience, projects, and a short blog in a single calm dark layout.
- **"Ask me anything"** — a [LangGraph](https://langchain-ai.github.io/langgraphjs/) ReAct agent on **Claude Haiku 4.5** that answers questions about my background, grounded in a small knowledge base (no invented facts, scoped to professional topics, rate-limited).
- **Writing** — occasional notes at `/blog`.
- A few **subtle easter eggs** for the curious (open the console 👀).

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| AI agent | LangGraph.js + `@langchain/anthropic` (Claude Haiku 4.5) |
| Images | `sharp` + `next/image` |

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Create a `.env.local` with:

```bash
ANTHROPIC_API_KEY=sk-ant-...   # required for the "Ask me anything" agent
GITHUB_TOKEN=...               # optional
```

## Structure

```
app/            routes (home, /blog, /api/chatgpt agent)
components/     hero, experience, projects, the AI chat, the name wordmark
lib/            agentKnowledge.ts (what the bot knows), projectsData, blogData
public/         images
```

To change what the assistant knows, edit `lib/agentKnowledge.ts`. To add a post, append to `lib/blogData.ts`.

---

Built by Atishay Jain. Say hi → [atishayjain@atie.dev](mailto:atishayjain@atie.dev)
