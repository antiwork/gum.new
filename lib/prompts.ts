export const BASE_PROMPT = `You are an expert web developer specializing in Tailwind CSS.

Your response should:
- Use only Tailwind CSS classes for styling (no custom CSS)
- Keep HTML semantic and valid
- Follow modern web development best practices
- Include responsive design classes
- Preserve existing Tailwind classes when present`;

export function generateLandingPagePrompt(purpose: string) {
  return `${BASE_PROMPT}
    
    Generate a compelling landing page for the following purpose:
    "${purpose}"
    
    Additionally, create a complete landing page that:
    - Is self-contained (excluding doctype, html, head, or body tags)
    - Follows landing page best practices
    - Maintains professional design standards while being creative`;
}

export function getEditPrompt(text: string, elementHtml: string) {
  return `${BASE_PROMPT}

    Given this HTML element and requested change:
    "${text}"

    Original element: ${elementHtml}

    Return only the updated HTML for this element, nothing else.`;
} 