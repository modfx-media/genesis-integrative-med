import type { Metadata } from "next";

import { BRAND } from "@/app/lib/site-config";

/**
 * The site layout title template is `%s | ${BRAND.name}` and Next applies it
 * to child routes. A string that already names the brand is the full document
 * title, so it has to be `title.absolute` or the brand is appended again.
 * The homepage is the same segment as the layout, so the template does not
 * apply there; absolute is still the same string.
 */
export function titleForLayout(title: string): Metadata["title"] {
  if (title.includes(BRAND.name)) {
    return { absolute: title };
  }
  return title;
}

export function withLayoutSafeTitle(metadata: Metadata): Metadata {
  if (typeof metadata.title !== "string") return metadata;
  const title = titleForLayout(metadata.title);
  if (title === metadata.title) return metadata;
  return { ...metadata, title };
}
