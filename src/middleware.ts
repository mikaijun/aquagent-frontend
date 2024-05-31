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
  const authPaths = Object.values(PagePath.auth)

  if (loggedInPaths.includes(pathname) && !isLogin) {
    url.pathname = PagePath.auth.login
    return NextResponse.redirect(url)
  }

  if (authPaths.includes(pathname) && isLogin) {
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
