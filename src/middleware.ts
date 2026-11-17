import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Plan §8 — noindex the reachable Vercel preview host only. */
const PREVIEW_HOST = "pixelette-marketing-website.vercel.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const response = NextResponse.next();
  if (host === PREVIEW_HOST || host.startsWith(`${PREVIEW_HOST}:`)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
