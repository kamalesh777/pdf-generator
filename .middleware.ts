import { NextResponse } from 'next/server'
// eslint-disable-next-line no-duplicate-imports
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, consistent-return
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('access_token')?.value
  if (request.nextUrl.pathname === '/' && !cookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  console.log("renderd time", cookie)
  if (cookie && request.nextUrl.pathname === '/corp-details') {
    return NextResponse.redirect(new URL('/corp-details', request.url))
  }
  if (cookie && request.nextUrl.pathname === '/invoice') {
    return NextResponse.redirect(new URL('/invoice', request.url))
  }
}
