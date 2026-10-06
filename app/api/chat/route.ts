import { localAnswer, systemPrompt } from "@/lib/assistant";

// POST /api/chat  { messages: [{ role: "user" | "assistant", content: string }] }
// Uses Groq when GROQ_API_KEY is set; otherwise (or on any error) answers from the CV data.

type Msg = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 8;
const MAX_CHARS = 800;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw = (body as { messages?: unknown })?.messages;
  const messages: Msg[] = (Array.isArray(raw) ? raw : [])
    .filter(
      (m): m is Msg =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim() !== "",
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return Response.json({ error: "No question" }, { status: 400 });

  const key = process.env.GROQ_API_KEY;
  if (!key) return Response.json({ answer: localAnswer(lastUser.content), source: "local" });

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 450,
        messages: [{ role: "system", content: systemPrompt() }, ...messages],
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`Groq ${res.status}`);
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error("Empty answer");
    return Response.json({ answer, source: "llm" });
  } catch (err) {
    console.error("[chat] falling back to local answer:", err);
    return Response.json({ answer: localAnswer(lastUser.content), source: "local" });
  }
}
