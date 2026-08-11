interface TiptapNode {
  type?: string;
  text?: string;
  content?: TiptapNode[];
}

function parseJson(raw: string): TiptapNode | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as TiptapNode;
    return null;
  } catch {
    return null;
  }
}

function walk(node: TiptapNode, out: string[]): void {
  if (node.type === "text" && typeof node.text === "string") {
    out.push(node.text);
    return;
  }
  for (const child of node.content ?? []) walk(child, out);
  if (
    node.type === "paragraph" ||
    node.type === "heading" ||
    node.type === "codeBlock"
  ) {
    out.push("\n");
  }
}

export function newsToText(raw: string): string {
  const json = parseJson(raw);
  if (json && Array.isArray(json.content)) {
    const out: string[] = [];
    for (const node of json.content) walk(node, out);
    return out.join("").replace(/\s+/g, " ").trim();
  }
  return (raw || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
