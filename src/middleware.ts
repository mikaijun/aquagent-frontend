import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  console.log("cookie", allCookies);

  return NextResponse.next();
}
