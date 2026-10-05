import { draftMode } from "next/headers";
import type { ReactNode } from "react";

import { LivePreviewListener } from "./LivePreviewListener";
import { queryRoutedContentByPath } from "./queries";
import { RenderRoutedContent } from "./RenderRoutedContent";

export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const [routed, draft] = await Promise.all([
    queryRoutedContentByPath(path),
    draftMode(),
  ]);
  if (!routed) return children;
  return (
    <>
      {draft.isEnabled ? <LivePreviewListener /> : null}
      <RenderRoutedContent
        collection={routed.collection}
        doc={routed.doc}
        fallback={children}
      />
    </>
  );
}
