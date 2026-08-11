import type { JSONContent } from "@tiptap/core";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Document } from "@tiptap/extension-document";
import { Heading } from "@tiptap/extension-heading";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Image } from "@tiptap/extension-image";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { Text } from "@tiptap/extension-text";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";
import { generateHTML } from "@tiptap/html/server";
import DOMPurify from "isomorphic-dompurify";

const NewsImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: { default: null },
    };
  },
});

const NEWS_EXTENSIONS = [
  Document,
  Paragraph,
  Text,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  CodeBlock,
  Blockquote,
  HorizontalRule,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  NewsImage,
  Youtube,
  Table,
  TableHeader,
  TableRow,
  TableCell,
];

const ALLOWED_TAGS = [
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "col",
  "colgroup",
  "del",
  "div",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "iframe",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "span",
  "strike",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
];

const ALLOWED_ATTR = [
  "align",
  "allow",
  "allowfullscreen",
  "alt",
  "class",
  "colspan",
  "frameborder",
  "height",
  "href",
  "loading",
  "rel",
  "rowspan",
  "src",
  "start",
  "style",
  "target",
  "title",
  "width",
];

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
}

function parseJson(raw: string): JSONContent | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as JSONContent;
    return null;
  } catch {
    return null;
  }
}

function nodeHtml(node: JSONContent): string {
  return generateHTML({ type: "doc", content: [node] }, NEWS_EXTENSIONS);
}

export function newsToHtml(raw: string): string {
  const json = parseJson(raw);
  if (!json) return sanitizeHtml(raw);
  return sanitizeHtml(
    generateHTML(
      json.type === "doc" ? json : { type: "doc", content: [json] },
      NEWS_EXTENSIONS,
    ),
  );
}

export function newsToLedeHtml(raw: string): { lede: string; body: string } {
  const json = parseJson(raw);
  if (!json) return { lede: "", body: sanitizeHtml(raw) };

  const nodes = Array.isArray(json.content) ? json.content : [];
  const [first, ...rest] = nodes;
  if (!first || first.type !== "paragraph") {
    return { lede: "", body: newsToHtml(raw) };
  }
  const lede = sanitizeHtml(nodeHtml(first));
  const body = sanitizeHtml(
    generateHTML(
      {
        type: "doc",
        content: rest.filter((n): n is JSONContent => Boolean(n)),
      },
      NEWS_EXTENSIONS,
    ),
  );
  return { lede, body };
}
