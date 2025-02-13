import sanitizeHtmlLib from "sanitize-html";

export const sanitizeHtml = (html: string) => {
  return sanitizeHtmlLib(html, {
    allowedTags: false,
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
