import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import caseData from "@/data/case-001.json";
import { buildSuspectSystemPrompt, SuspectBrain } from "@/lib/suspect-prompt";

const brains = caseData.suspects as SuspectBrain[];

interface HistoryTurn {
  role: "user" | "model";
  text: string;
}

// Same defensive pattern as the essay evaluator: strip attempts to hijack
// the suspect's system prompt via the chat input.
const INJECTION_PATTERNS = [
  /ignore\s+(previous|all|above)\s+instructions?/gi,
  /system\s*:\s*/gi,
  /\[INST\]/gi,
  /\[\/INST\]/gi,
  /<\|im_start\|>/gi,
  /<\|im_end\|>/gi,
  /###\s*(instruction|system|prompt)/gi,
  /you\s+are\s+now\s+/gi,
  /pretend\s+to\s+be\s+/gi,
  /forget\s+(you'?re|you\s+are)\s+.*character/gi,
];

function sanitizePlayerMessage(text: string): string {
  let sanitized = text;
  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[removed]");
  }
  return sanitized.trim();
}

function findMentionedClueIds(allText: string): string[] {
  const lower = allText.toLowerCase();
  return caseData.clues
    .filter(
      (clue) =>
        lower.includes(clue.id.toLowerCase()) ||
        lower.includes(clue.title.toLowerCase()),
    )
    .map((clue) => clue.id);
}

export async function POST(req: NextRequest) {
  const { suspectId, message, history } = (await req.json()) as {
    suspectId: string;
    message: string;
    history: HistoryTurn[];
  };

  const brain = brains.find((s) => s.id === suspectId);
  if (!brain) {
    return NextResponse.json({ error: "Unknown suspect" }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Server is missing GEMINI_API_KEY" },
      { status: 500 },
    );
  }

  const sanitizedMessage = sanitizePlayerMessage(message);

  const allPlayerText = [
    ...history.filter((h) => h.role === "user").map((h) => h.text),
    sanitizedMessage,
  ].join(" ");
  const mentionedClueIds = findMentionedClueIds(allPlayerText);

  const systemPrompt = buildSuspectSystemPrompt(brain, mentionedClueIds);

  const contents = [
    ...history.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: sanitizedMessage }] },
  ];

  let responseText = "";
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
        maxOutputTokens: 256,
        responseMimeType: "application/json",
      },
    });
    responseText = result.text?.trim() ?? "";
  } catch (error) {
    console.error("Error generating suspect response:", error);
    return NextResponse.json(
      { error: "Suspect is unavailable right now" },
      { status: 502 },
    );
  }

  const cleaned = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed: { reply: string; mood: string };
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    parsed = { reply: cleaned || "...", mood: "calm" };
  }

  return NextResponse.json(parsed);
}
