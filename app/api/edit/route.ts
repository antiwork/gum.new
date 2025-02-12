import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { text, element, fullHtml } = await req.json();

  console.log('Received request:', { text, element });

  const prompt = `You are an expert web developer. Given an HTML element and a user's requested change, 
      generate the updated HTML for that element. The changes should:
      - Preserve all existing Tailwind CSS classes exactly as they are
      - Only add new Tailwind classes if necessary for the requested change
      - Keep the same basic structure
      - Only modify the element as needed based on the user's request
      - Ensure the HTML is valid and semantic
      - Return ONLY the HTML element without doctype or surrounding tags

      Original element: ${element.html}
      User's requested change: "${text}"

      Return only the updated HTML for this element, nothing else.`;

  const { partialObjectStream } = streamObject({
    model: anthropic('claude-3-5-sonnet-20241022') || openai('gpt-4o-mini'),
    temperature: 0.7,
    schema: z.object({
      updatedHtml: z.string().describe('The updated HTML for the element with the requested changes')
    }),
    prompt
  });

  let updatedHtml = '';
  for await (const partialObject of partialObjectStream) {
    if (partialObject.updatedHtml) {
      updatedHtml = partialObject.updatedHtml.trim();
    }
  }

  // Validate that we got HTML back
  if (!updatedHtml.startsWith('<')) {
    throw new Error('Invalid HTML response from AI');
  }

  console.log('Original element:', element.html);
  console.log('AI response:', updatedHtml);
  
  // Normalize whitespace and trim both strings to ensure reliable replacement
  const normalizedOriginal = element.html.replace(/\s+/g, ' ').trim();
  const normalizedFullHtml = fullHtml.replace(/\s+/g, ' ').trim();
  const newHtml = normalizedFullHtml.replace(normalizedOriginal, updatedHtml);

  return new Response(
    JSON.stringify({
      html: newHtml,
      success: true
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0'
      }
    }
  );
}
