import { anthropic } from "@ai-sdk/anthropic";
//import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  const prompt = `You are an expert web developer specializing in creating landing pages with Tailwind CSS.
  Generate a compelling landing page for the following purpose:
  "${lastMessage}"

  The section should:
  - Use only Tailwind CSS classes for styling (no custom CSS)
  - Be complete, self-contained HTML
  - Follow modern landing page best practices
  - Include responsive design classes
  - Use semantic HTML elements
  - Be creative while maintaining professional design standards`;

  const { partialObjectStream } = streamObject({
    model: anthropic("claude-3-5-sonnet-20241022"),
    temperature: 0.7,
    schema: z.object({
      landingPage: z
        .string()
        .describe("A landing page using HTML with Tailwind CSS classes"),
    }),
    prompt,
  });

  console.log("hello");

  let landingPage = "";
  for await (const partialObject of partialObjectStream) {
    console.clear();
    console.log(partialObject);
    landingPage = partialObject.landingPage;
  }

  return new Response(JSON.stringify([landingPage]), {
    headers: { "Content-Type": "application/json" },
  });
}
