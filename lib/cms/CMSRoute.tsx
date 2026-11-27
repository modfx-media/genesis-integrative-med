import { draftMode } from "next/headers";
import type { ReactNode } from "react";

import { canReplaceDesignedPage } from "./designed-page";
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
  const preview = draft.isEnabled ? <LivePreviewListener /> : null;
  // Designed-page guard. Metadata still comes from the published document.
  // The designed tree stays unless that document is a complete overlay.
  if (!canReplaceDesignedPage(routed)) {
    return (
      <>
        {preview}
        {children}
      </>
    );
  }
  return (
    <>
      {preview}
      <RenderRoutedContent
        collection={routed.collection}
        doc={routed.doc}
        fallback={children}
      />
    </>
  );
}
