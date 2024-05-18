import { NextResponse } from "next/server";

import { parseCookiesFromCookies } from "@/utils/cookies";

import { PagePath } from "@/constants/urls";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const { jwt, userId } = parseCookiesFromCookies(cookies);
  const isLogin = !!jwt && !!userId;
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (PagePath.home === pathname && !isLogin) {
    url.pathname = PagePath.login;
    return NextResponse.redirect(url);
  }

  if (PagePath.login === pathname && isLogin) {
    url.pathname = PagePath.home;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
