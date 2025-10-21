import Anthropic from "@anthropic-ai/sdk";
import { editLandingPagePrompt } from "@/lib/prompts";
import { createVersion } from "@/services/versions";
import { auth } from "@/auth";
import db from "@/db";
import { sanitizeHtml } from "@/lib/sanitize";

export const maxDuration = 100;

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { text, element, fullHtml, gumId, versionId } = await req.json();

  const gum = await db.query.gums.findFirst({
    where: (gums, { eq }) => eq(gums.id, gumId),
  });

  if (!gum || gum.userId !== userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const prompt = editLandingPagePrompt(text, element.html);

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const message = await client.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 8000,
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let updatedHtml = "";
  if (message.content[0].type === "text") {
    updatedHtml = message.content[0].text.trim();
  }

  if (!updatedHtml.startsWith("<")) {
    throw new Error("Invalid HTML response from AI");
  }

  // Sanitize the AI-generated HTML, blocking any JavaScript execution vectors
  const sanitizedHtml = sanitizeHtml(updatedHtml);

  const normalizedOriginal = element.html.replace(/\s+/g, " ").trim();
  const normalizedFullHtml = fullHtml.replace(/\s+/g, " ").trim();
  const newHtml = normalizedFullHtml.replace(normalizedOriginal, sanitizedHtml);

  const version = await createVersion({
    html: newHtml,
    prompt,
    gumId,
    parentId: versionId,
  });

  return new Response(
    JSON.stringify({
      html: version.html,
      success: true,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
