import { NextResponse } from 'next/server'
import { API_BASE_URL, SIGN_IN_URL } from '@/constant/ApiConstant'
// eslint-disable-next-line no-duplicate-imports
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const isAuth = !!token ? await validateAuth(token) : false
  const pathname = request.nextUrl.pathname
  const origin = request.nextUrl.origin

  // for root pathname if isAuth true then it will redirect to corp-details otherwise it will redirect to sign-in
  if (pathname === '/') {
    if (isAuth) {
      return NextResponse.redirect(`${origin}/corp-details`)
    }
    return NextResponse.redirect(`${origin}${SIGN_IN_URL}`)
  }
  if (pathname === SIGN_IN_URL) {
    if (isAuth) {
      return NextResponse.redirect(`${origin}/corp-details`)
    }
    return NextResponse.rewrite(`${origin}${SIGN_IN_URL}`)
  }
  if (!isAuth) {
    return NextResponse.redirect(`${origin}${SIGN_IN_URL}`)
  }

  return NextResponse.next()
}

// middleware will run only for these match file
export const config = {
  matcher: ['/corp-details', '/invoice', '/', '/sign-in', '/invoice-bill/:path*'],
}

// fetch sign-in and used the token to check valid auth or not
const validateAuth = async (token: string): Promise<boolean> => {
  const API_ENDPOINT = `${API_BASE_URL}/api/user-srv/sign-in`
  const response = await fetch(`${API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => data.success)
    .catch(() => false)
  return response
}
