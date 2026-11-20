import type { Metadata } from "next";

import { withLayoutSafeTitle } from "./document-title";
import { queryRoutedContentByPath } from "./queries";
import { resolveCmsMetadata } from "./resolve-metadata";

export async function cmsMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  const safeFallback = withLayoutSafeTitle(fallback);
  const routed = await queryRoutedContentByPath(path);
  return resolveCmsMetadata(routed, safeFallback);
}
