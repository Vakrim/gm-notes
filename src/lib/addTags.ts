export function addTags(content: string) {
  const parsed = new DOMParser().parseFromString(content, "text/html").body;

  for (const node of parsed.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE) {
      continue;
    }

    const nodeContent = node.textContent;

    if (!nodeContent) {
      continue;
    }

    const tagRegexp = /([^#]*)(#\w*)?/g;

    let match: RegExpExecArray | null;

    const newNodes: Node[] = [];

    while ((match = tagRegexp.exec(nodeContent))) {
      if (!match[1] && !match[2]) {
        break;
      }

      if (match[1]) {
        newNodes.push(document.createTextNode(match[1]));
      }

      if (match[2]) {
        const span = document.createElement("span");
        span.className = "note-tag";
        span.textContent = match[2];

        newNodes.push(span);
      }
    }

    node.replaceWith(...newNodes);
  }

  return parsed.innerHTML;
}
