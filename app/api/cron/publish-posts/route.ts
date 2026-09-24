import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

/** Ranked CMS integration is disabled site-wide; this cron no longer does anything. */
export async function GET() {
  return NextResponse.json({ ok: false, error: 'Ranked integration disabled' }, { status: 410 })
}
