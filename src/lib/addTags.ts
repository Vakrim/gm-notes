export function addTags(content: string) {
  const parsed =
    new DOMParser().parseFromString(content, "text/html").body.textContent ??
    "";

  const tagRegexp = /([^#]*)(#\w*)?/g;

  let match: RegExpExecArray | null;

  const nodes: Node[] = [];

  while ((match = tagRegexp.exec(parsed))) {
    if (!match[1] && !match[2]) {
      break;
    }

    if (match[1]) {
      nodes.push(document.createTextNode(match[1]));
    }

    if (match[2]) {
      const span = document.createElement("span");
      span.className = "note-tag";
      span.textContent = match[2];

      nodes.push(span);
    }
  }

  const container = document.createElement("div");
  nodes.forEach((node) => container.appendChild(node));
  return container.innerHTML;
}
