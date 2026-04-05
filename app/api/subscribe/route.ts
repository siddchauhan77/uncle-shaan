import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const NOTION_DATABASE_ID = "aea81fedddc640ae9e16dedaee5ec507";

export async function POST(req: NextRequest) {
  const { email, source, archetype } = (await req.json()) as {
    email: string;
    source: "homepage" | "quiz-result";
    archetype?: string;
  };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    // Graceful degradation — log and succeed silently so UX isn't broken
    console.warn("NOTION_API_KEY not set — email not saved:", email);
    return NextResponse.json({ ok: true });
  }

  const notion = new Client({ auth: apiKey });

  await notion.pages.create({
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Email: {
        title: [{ text: { content: email } }],
      },
      Source: {
        select: { name: source },
      },
      ...(archetype
        ? {
            Archetype: {
              rich_text: [{ text: { content: archetype } }],
            },
          }
        : {}),
    },
  });

  return NextResponse.json({ ok: true });
}
