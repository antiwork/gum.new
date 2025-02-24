import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect dashboard routes
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const expectedAuth = `Basic ${Buffer.from(`:${process.env.DASHBOARD_PASSWORD}`).toString("base64")}`;

  if (authHeader !== expectedAuth) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected Dashboard"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
