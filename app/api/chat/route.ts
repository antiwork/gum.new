import Anthropic from "@anthropic-ai/sdk";
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
  const productData = JSON.parse(productInfo);

  // Extract colors from product cover image if available
  let extractedColors = null;
  if (productData.preview_url) {
    extractedColors = await extractImageColors(productData.preview_url);
  }

  const prompt = generateLandingPagePrompt(purpose, productInfo, extractedColors);

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

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 8000,
    temperature: 0.75,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let landingPage = "";
  if (message.content[0].type === "text") {
    landingPage = message.content[0].text;
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
