import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Ranked CMS integration is disabled site-wide; this webhook no longer does anything. */
export async function POST() {
  return NextResponse.json({ ok: false, error: 'Ranked integration disabled' }, { status: 410 })
}
