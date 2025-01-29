import sanitizeHtml from "sanitize-html";

export function sanitizeNoteContent(content: string) {
  return sanitizeHtml(content, sanitizationConfig);
}

const sanitizationConfig: sanitizeHtml.IOptions = {
  allowedTags: ["span", "br"],
  allowedAttributes: {},
  allowedClasses: { span: ["note-tag"] },
};
