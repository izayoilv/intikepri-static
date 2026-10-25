/** Returns the URL only when it is an absolute http(s) URL, otherwise null. */
export function safeHttpUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

/** Absolute URL for a site-relative path or an already absolute URL. */
export function absoluteUrl(base: string, value: string): string {
  return /^https?:\/\//i.test(value) ? value : `${base}${value}`;
}
