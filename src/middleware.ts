import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Every Vercel preview host is a second indexable copy of the site. Block it. */
function isVercelPreviewHost(host: string): boolean {
  const hostname = host.split(":")[0] ?? "";
  return hostname.endsWith(".vercel.app");
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (!isVercelPreviewHost(host)) {
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
