import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/constant/ApiConstant'
// eslint-disable-next-line no-duplicate-imports
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, consistent-return
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const isAuth = !!token ? await validateAuth(token) : false
  const pathname = request.nextUrl.pathname
  const origin = request.nextUrl.origin

  // if user loggedin then user will stay on same page
  if (isAuth) {
    if (pathname === '/' || pathname === '/sign-in') {
      return NextResponse.redirect(`${origin}/corp-details`)
    }
    return NextResponse.next()
  }
  // redirect to login page if user is not logged in
  return NextResponse.redirect(`${origin}/sign-in`)
}

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

export const config = {
  matcher: ['/', '/corp-details', '/invoice', '/invoice-bill/:path*'],
}
