import type { Metadata } from "next";

import { queryRoutedContentByPath } from "./queries";
import { resolveCmsMetadata } from "./resolve-metadata";

export async function cmsMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  const routed = await queryRoutedContentByPath(path);
  return resolveCmsMetadata(routed, fallback);
}
