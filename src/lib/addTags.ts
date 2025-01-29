export function addTags(content: string) {
  const body = new DOMParser().parseFromString(content, "text/html").body;

  removeTags(body.childNodes);

  for (const node of body.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE) {
      continue;
    }

    const nodes: Node[] = [];

    const tagRegexp = /([^#]*)(#\w*)?/g;

    let match: RegExpExecArray | null;

    while ((match = tagRegexp.exec(node.textContent ?? ""))) {
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

    node.replaceWith(...nodes);
  }

  return body.innerHTML;
}

function removeTags(nodeList: NodeListOf<ChildNode>) {
  nodeList.forEach((node) => {
    if (
      node instanceof HTMLSpanElement &&
      node.classList.contains("note-tag")
    ) {
      node.replaceWith(document.createTextNode(node.textContent ?? ""));
    }
  });
}
