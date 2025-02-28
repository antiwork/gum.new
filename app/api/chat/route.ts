import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";
import { createGum } from "@/services/gums";
import { generateLandingPagePrompt } from "@/lib/prompts";
import { auth } from "@/auth";
import { sanitizeHtml } from "@/lib/sanitize";
import sanitizeHtmlLib from "sanitize-html";
import { extractImageColors } from "@/services/colors";

export const maxDuration = 100;
const DEBUG_MODE = false;

function htmlToPlainText(html: string): string {
  return sanitizeHtmlLib(html, {
    allowedTags: [], // Allow no tags
    allowedAttributes: {}, // Allow no attributes
  }).trim();
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
  const purpose = lastMessage.content;
  const productInfo = lastMessage.productInfo;
  const selectedTemplateIds = lastMessage.selectedTemplateIds || []; // Get selected template IDs from the message
  const productData = JSON.parse(productInfo);

  // Extract colors from product cover image if available
  let extractedColors = null;
  if (productData.preview_url) {
    extractedColors = await extractImageColors(productData.preview_url);
  }

  const prompt = generateLandingPagePrompt(purpose, productInfo, extractedColors, selectedTemplateIds);

  if (DEBUG_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1250));
    const { gum, version } = await createGum({
      userId,
      title: productData.name,
      description: htmlToPlainText(productData.description),
      coverUrl: productData.preview_url,
      productId: productData.id,
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
    model: anthropic("claude-3-7-sonnet-20250219") || openai("gpt-4o-mini"),
    temperature: 0.7,
    schema: z.object({
      landingPage: z.string().describe("A landing page using HTML with Tailwind CSS classes"),
    }),
    prompt,
  });

  let landingPage = "";
  for await (const partialObject of partialObjectStream) {
    if (partialObject.landingPage) {
      landingPage = partialObject.landingPage;
    }
  }

  // Sanitize the AI-generated HTML, blocking any JavaScript execution vectors
  const sanitizedHtml = sanitizeHtml(landingPage);

  const { gum, version } = await createGum({
    userId,
    title: productData.name,
    description: htmlToPlainText(productData.description),
    coverUrl: productData.preview_url,
    productId: productData.id,
    version: {
      html: sanitizedHtml,
      prompt,
    },
  });

  return new Response(JSON.stringify({ id: gum.id, html: version.html }), {
    headers: { "Content-Type": "application/json" },
  });
}
