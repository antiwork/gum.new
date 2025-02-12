import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";
import { createGum } from "@/services/gums";

export const maxDuration = 30;

/** Returns a dummy page instead of pinging Anthropic */
const DEBUG_MODE = false;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  const prompt = `You are an expert web developer specializing in creating landing pages with Tailwind CSS.
    Generate a compelling landing page for the following purpose:
    "${lastMessage}"

    The section should:
    - Use only Tailwind CSS classes for styling (no custom CSS)
    - Be complete, self-contained HTML, not including the doctype, html, head, or body tags
    - Follow modern landing page best practices
    - Include responsive design classes
    - Use semantic HTML elements
    - Be creative while maintaining professional design standards`;

  if (DEBUG_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1250));
    const { gum, version } = await createGum({
      title: lastMessage,
      version: {
        html: "<div classname='bg-red-200 p-10 font-bold text-2xl'>Testing landing page</div>",
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
      landingPage: z.string().describe("A landing page using HTML with Tailwind CSS classes"),
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
    title: lastMessage,
    version: {
      html: landingPage,
      prompt: prompt,
    },
  });

  return new Response(JSON.stringify({ id: gum.id, html: version.html }), {
    headers: { "Content-Type": "application/json" },
  });
}
