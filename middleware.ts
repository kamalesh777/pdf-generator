import { NextResponse } from 'next/server'
// eslint-disable-next-line no-duplicate-imports
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, consistent-return
export function middleware(request: NextRequest) {
  // const cookie = request.cookies.get('access_token').value
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/sign-in', request.url))
  }
}
