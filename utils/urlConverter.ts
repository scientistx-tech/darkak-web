const slugMap = new Map();

export function textToSlug(text: string): string {
  const slug = text.toLowerCase().replace(/[^a-z\s]/g, "").trim().replace(/\s+/g, "-");
  slugMap.set(slug, text); // save mapping
  return slug;
}

export function slugToText(slug: string): string {
  return slugMap.get(slug) || slug.replace(/-/g, " ");
}

