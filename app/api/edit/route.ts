import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { editLandingPagePrompt } from '@/lib/prompts';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { text, element, fullHtml } = await req.json();

  console.log('Received request:', { text, element });

  const prompt = editLandingPagePrompt(text, element.html);

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

