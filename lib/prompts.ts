export const BASE_PROMPT = `You are an expert web developer specializing in Tailwind CSS.

Your response should:
- Use only Tailwind CSS classes for styling (no custom CSS style attributed)
- Add significant padding/margin to ensure elements don't overlap
- Include responsive design classes
- Preserve existing Tailwind classes when present

Before you start generating the landing page, pick a color scheme for the page.
It is extremely important that you do not use light text on light backgrounds or dark text on dark backgrounds.    
`;

export function generateLandingPagePrompt(purpose: string, productContext?: string) {
  return `${BASE_PROMPT}
    
    Generate a compelling landing page for the following purpose:
    "${purpose}"
    
    ${
      productContext
        ? `Use this existing product data to inform the landing page content:
    ${productContext}`
        : ""
    }
 
    Additionally, create a complete landing page that:
    - Is self-contained (excluding doctype, html, head, or body tags)
    - Follows landing page best practices
    - Maintains professional design standards while being creative
    - Incorporates the product information naturally into the page content
    - Appends ?wanted=true to the short_url parameter if present and uses it as the href for the CTA
    - Uses images from the product's information
    - Uses the product's name as the title of the page
    - Uses the product's description on the page
    - Uses the short_url with the ?variant query parameter set to the version's name for the version's CTA if present along with ?wanted=true
    - When there are multiple recurrences, use the ?recurrence query parameter (monthly, quarterly, yearly) to set the recurrence for a given CTA`;
}

export function editLandingPagePrompt(text: string, elementHtml: string) {
  return `${BASE_PROMPT}

    Given this HTML element and requested change:
    "${text}"

    Original element: ${elementHtml}

    Return only the updated HTML for this element, nothing else.`;
}
