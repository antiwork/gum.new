import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";
import { createGum } from "@/services/gums";
import { generateLandingPagePrompt } from "@/lib/prompts";
import { auth } from "@/auth";

export const maxDuration = 30;
const DEBUG_MODE = false;

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;
  const prompt = generateLandingPagePrompt(lastMessage);

  if (DEBUG_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1250));
    const { gum, version } = await createGum({
      userId,
      title: lastMessage,
      version: {
        html: "<div class='bg-red-200 p-10 font-bold text-2xl'>Testing landing page</div>",
        prompt: "Testing prompt",
      },
    });
    return new Response(JSON.stringify({ id: gum.id, html: version.html }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { partialObjectStream } = streamObject({
    model: anthropic("claude-3-5-sonnet-20241022") || openai("gpt-4o-mini"),
    temperature: 0.7,
    schema: z.object({
      landingPage: z.string().describe(
        "A landing page using HTML with Tailwind CSS classes"
      ),
    }),
    prompt,
  });

  let landingPage = "";
  for await (const partialObject of partialObjectStream) {
    console.log(partialObject);
    if (partialObject.landingPage) {
      landingPage = partialObject.landingPage;
    }
  }

  const { gum, version } = await createGum({
    userId,
    title: lastMessage,
    version: {
      html: landingPage,
      prompt,
    },
  });

  return new Response(JSON.stringify({ id: gum.id, html: version.html }), {
    headers: { "Content-Type": "application/json" },
  });
}
