import { NextResponse } from 'next/server'

import { parseCookiesFromCookies } from '@/utils/cookies'

import { PagePath } from '@/constants/urls'

import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll()
  const { jwt, userId } = parseCookiesFromCookies(cookies)
  const isLogin = !!jwt && !!userId
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()
  const loggedInPaths = Object.values(PagePath.loggedIn)

  if (loggedInPaths.includes(pathname) && !isLogin) {
    url.pathname = PagePath.auth.login
    return NextResponse.redirect(url)
  }

  if (PagePath.auth.login === pathname && isLogin) {
    url.pathname = PagePath.loggedIn.home
    return NextResponse.redirect(url)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('path-name', pathname)

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  })
}
