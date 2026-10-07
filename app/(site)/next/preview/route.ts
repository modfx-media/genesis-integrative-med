import type { PayloadRequest } from "payload";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import configPromise from "@payload-config";
import { normalizeCmsPath, toPublicPath } from "@/lib/cms/urls";

export async function GET(request: Request) {
  const payload = await getPayload({ config: configPromise });
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const previewSecret = searchParams.get("previewSecret");

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  if (!path || path.includes("null") || path.includes("undefined")) {
    return new Response("Invalid path", { status: 400 });
  }

  if (!path.startsWith("/")) {
    return new Response("This endpoint can only be used for relative previews", {
      status: 400,
    });
  }

  const normalized = normalizeCmsPath(path);
  if (!normalized) {
    return new Response("Invalid path", { status: 400 });
  }

  let user;
  try {
    const authResult = await payload.auth({
      req: request as unknown as PayloadRequest,
      headers: request.headers,
    });
    user = authResult.user;
  } catch (error) {
    payload.logger.error({ err: error }, "Error verifying token for live preview");
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  const draft = await draftMode();
  if (!user) {
    draft.disable();
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  draft.enable();
  redirect(toPublicPath(normalized));
}
