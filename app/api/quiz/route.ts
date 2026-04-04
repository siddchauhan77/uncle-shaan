import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getContentMetadata, getEntriesByIds } from "@/lib/content";

const client = new Anthropic();

type Answers = {
  situation: string;
  mindset: string;
  risk: string;
  winning: string;
  plan: string;
};

export async function POST(req: NextRequest) {
  const { answers } = (await req.json()) as { answers: Answers };
  const metadata = getContentMetadata();

  const prompt = `You are Uncle Shaan's recommendation engine. A person answered these quiz questions:

- Where are you right now: ${answers.situation}
- Main thing on your mind: ${answers.mindset}
- Risk tolerance (1=safe, 5=all-in): ${answers.risk}
- What winning looks like in 2 years: "${answers.winning}"
- Do you have a plan: ${answers.plan}

Here is a list of available content entries with their IDs, themes, and life situations they address:

${metadata.map((m) => `ID: ${m.id} | Title: ${m.source_title} | Themes: ${m.themes.join(", ")} | Life situations: ${m.life_situations.join(", ")}`).join("\n")}

Select the 4 most relevant entries for this specific person. Return ONLY valid JSON in this exact format, no other text:
{
  "picks": [
    { "id": "entry-id-here", "reason": "One sentence explaining why this is perfect for them right now" },
    { "id": "entry-id-here", "reason": "One sentence explaining why this is perfect for them right now" },
    { "id": "entry-id-here", "reason": "One sentence explaining why this is perfect for them right now" },
    { "id": "entry-id-here", "reason": "One sentence explaining why this is perfect for them right now" }
  ]
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const parsed = JSON.parse(text);
  const picks: { id: string; reason: string }[] = parsed.picks;

  const entries = getEntriesByIds(picks.map((p) => p.id));
  const prescription = picks
    .map((pick) => {
      const entry = entries.find((e) => e.id === pick.id);
      if (!entry) return null;
      return { entry, reason: pick.reason };
    })
    .filter(Boolean);

  return NextResponse.json({ prescription });
}
