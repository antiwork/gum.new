export const BASE_PROMPT = `You are an expert web developer specializing in Tailwind CSS.

OUTPUT FORMAT (CRITICAL):
Your response MUST be raw HTML code only. Start immediately with the opening HTML tag (e.g., <div). Do NOT include:
- Markdown code fences (\`\`\`html or \`\`\`)
- Explanations or commentary
- Anything other than pure HTML

Your HTML response should:
- Use only Tailwind CSS classes for styling (no custom CSS style attributed)
- Always use sections to divide the page into logical sections
- Add significant padding and margin to these sections (e.g. <section class="py-12">) and other elements to ensure they don't overlap nor touch the edges of the screen
- Include responsive design classes to support mobile, tablet, and desktop views
- Add Tailwind classes for both light and dark mode
- Preserve existing Tailwind classes when present
- Follow the 3-3-3 Rule: use maximum 3 font sizes, 3 font weights, and 3 colors throughout the page
- Keep decorative styles (italics, underline, etc.) to a minimum unless intentionally required for emphasis

Before you start generating the landing page:
- When colors are provided, use the first color as your primary brand color, black/white (if provided) for minimalist contrast, and any additional colors for modern accents
- When no colors are provided, pick a color scheme that matches the product's theme
- Choose appropriate fonts and other design elements
It is extremely important that you do not use light text on light backgrounds or dark text on dark backgrounds.

IMPORTANT TIME INFORMATION:
- The current year is ${new Date().getFullYear()}. Always use this as the current year in copyright notices, date references, or any content that mentions the current year.
`;

// Import at the top level to avoid require() calls
import { TEMPLATES, TemplateInfo } from "./templates";

export function generateLandingPagePrompt(
  purpose: string,
  productContext?: string,
  colors?: string[] | null,
  selectedTemplateIds?: string[],
) {
  const colorGuidance = colors?.length
    ? `\nUse these colors from the product image:
    ${colors
      .map((color, i) =>
        i === 0
          ? `Primary brand color: ${color}`
          : i === 1 && color.toLowerCase().includes("fff")
            ? `Background/contrast: ${color} (white)`
            : i === 1 && color.toLowerCase().includes("000")
              ? `Background/contrast: ${color} (black)`
              : `Accent color: ${color}`,
      )
      .join("\n    ")}`
    : "";

  // Use the imported TEMPLATES instead of requiring them
  let templatesSection = "";
  if (selectedTemplateIds && selectedTemplateIds.length > 0) {
    const selectedTemplates = TEMPLATES.filter((template) => selectedTemplateIds.includes(template.id));

    if (selectedTemplates.length > 0) {
      templatesSection = `\n\nINSPIRATION TEMPLATES:
      Below are selected design templates for inspiration. Mix and match elements from these templates based on their purposes and styles to create a cohesive design that matches the product's needs:

      ${selectedTemplates
        .map(
          (template: TemplateInfo) =>
            `${template.name} - ${template.description}:
        ${template.content}`,
        )
        .join("\n\n")}

      Combine design patterns, layouts, and UI elements from these templates as appropriate. Draw inspiration from their strengths while ensuring the final design is unified and tailored to the product's specific requirements.`;
    }
  }

  return `${BASE_PROMPT}${colorGuidance}

    You are using the Claude 3.7 Sonnet model, which excels at analyzing content and making intelligent decisions about how to present information.

    First, analyze the existing product data to determine if it already contains high-quality sales copy:
    "${purpose}"

    ${
      productContext
        ? `Existing product data:
    ${productContext}`
        : ""
    }

    IMPORTANT ANALYSIS INSTRUCTIONS:
    1. Carefully examine the existing product data and determine if it contains high-quality sales copy.
    2. Consider the following factors in your analysis:
       - Length and completeness of the copy
       - Persuasiveness and clarity of value propositions
       - Professional tone and language
       - Presence of key marketing elements (benefits, features, social proof, etc.)

    DECISION MAKING:
    - If the product already has well-crafted, lengthy sales copy: PRESERVE ALL EXISTING TEXT CONTENT. Focus only on improving the presentation through layout, styling, and visual hierarchy.
    - If the product has minimal or bare-bones copy: Generate compelling new sales copy while maintaining any key existing messages.
    - For products that fall in between: Preserve the strongest elements of the existing copy and enhance areas that are lacking.

    Generate a compelling landing page that:
    - Is self-contained (excluding doctype, html, head, or body tags)
    - Starts with an opening <div> or <section> tag
    - Follows landing page best practices
    - Maintains professional design standards while being creative
    - Incorporates the product information naturally into the page content
    - Appends ?wanted=true to the short_url parameter if present and uses it as the href for the CTA
    - Uses images from the product's information
    - Uses the product's name as the title of the page
    - Uses the product's description on the page (preserving it if it's high-quality)
    - Uses the short_url with the ?variant query parameter set to the version's name for the version's CTA if present along with ?wanted=true
    - When there are multiple recurrences, use the ?recurrence query parameter (monthly, quarterly, yearly) to set the recurrence for a given CTA
    - The page should be optimized for SEO.${templatesSection}

    Remember: Output raw HTML only. No markdown, no code blocks, no explanations.`;
}

export function editLandingPagePrompt(text: string, elementHtml: string) {
  return `${BASE_PROMPT}

    Given this HTML element and requested change:
    "${text}"

    Original element: ${elementHtml}

    When handling styling commands:
    - For background color changes (e.g., "change the background white", "make background blue"):
      - Use appropriate Tailwind background classes (bg-white, bg-blue-500, etc.)
      - If the element already has a background class, replace it with the new one
      - If the element doesn't have a background class, add the new one
    - For text color changes:
      - Use appropriate Tailwind text color classes (text-white, text-blue-500, etc.)
    - For sizing changes:
      - Use appropriate Tailwind width/height classes (w-full, h-screen, etc.)
    - For spacing changes:
      - Use appropriate Tailwind padding/margin classes (p-4, m-2, etc.)
    - For border changes:
      - Use appropriate Tailwind border classes (border, border-2, border-blue-500, etc.)
    - For shadow changes:
      - Use appropriate Tailwind shadow classes (shadow, shadow-lg, etc.)
    - For rounded corner changes:
      - Use appropriate Tailwind rounded classes (rounded, rounded-lg, etc.)

    Return the updated HTML element. Remember: Output raw HTML only. No markdown, no code blocks, no explanations. Start with the opening tag.`;
}
