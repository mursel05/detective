import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { buildSuspectSystemPrompt } from "@/lib/suspect-prompt";
import { getInvestigationById, getSuspectById } from "@/data/investigations";

interface HistoryTurn {
  role: "user" | "model";
  text: string;
}

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

function findMentionedClueIds(caseId: string, allText: string): string[] {
  const caseDetail = getInvestigationById(caseId);
  if (!caseDetail) return [];
  const lower = allText.toLowerCase();
  return caseDetail.evidence
    .filter(
      (item) =>
        lower.includes(item.id.toLowerCase()) ||
        lower.includes(item.title.toLowerCase()),
    )
    .map((item) => item.id);
}

export async function POST(req: NextRequest) {
  const { caseId, suspectId, message, history } = (await req.json()) as {
    caseId: string;
    suspectId: string;
    message: string;
    history: HistoryTurn[];
  };

  const brain = getSuspectById(caseId, suspectId);
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
  const mentionedClueIds = findMentionedClueIds(caseId, allPlayerText);

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
  } catch {
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
