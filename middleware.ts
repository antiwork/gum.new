import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Middleware function kept for potential future use
  return NextResponse.next();
}

export const config = {
  matcher: [], // Empty matcher as no routes need middleware protection
};
