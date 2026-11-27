import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isOfficialMarketingHost } from "@/lib/officialHost";

/**
 * Only the official marketing domain may be crawled. Every other host —
 * *.vercel.app, preview aliases, other subdomains, localhost — is a second
 * copy and must stay out of the index even when Deployment Protection is off.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (isOfficialMarketingHost(host)) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow"
      }
    });
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
