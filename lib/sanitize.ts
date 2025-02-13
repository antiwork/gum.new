import sanitizeHtmlLib from "sanitize-html";

export const sanitizeHtml = (html: string) => {
  return sanitizeHtmlLib(html, {
    allowedTags: [
      "a",
      "b",
      "br",
      "div",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "i",
      "li",
      "ol",
      "p",
      "span",
      "strong",
      "ul",
      "img",
    ],
    allowedAttributes: {
      "*": ["class", "id", "style", "src", "href", "alt", "title"],
    },
    disallowedTagsMode: "discard",
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: true,
  });
};
