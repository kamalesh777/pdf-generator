import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/constant/ApiConstant'
import isAuthUrl from '@/utils/isAuthUrl'
// eslint-disable-next-line no-duplicate-imports
import type { NextRequest } from 'next/server'

const landpage = ['/corp-details', '/invoice', '/', '/sign-in']
const authURL = ['/sign-in']

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, consistent-return
export async function middleware(request: NextRequest) {
  const { origin } = request.nextUrl
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('access_token')?.value

  const isAuth = !!token ? await validateAuth(token) : false

  console.log("isAuth", authURL.includes(pathname), pathname)

  // redirect to login page if user is not logged in
  if (!isAuth && authURL.includes(pathname)) {
    return NextResponse.redirect(`${origin}${request.url}`)
  }
  // if user loggedin then user will stay on same page
  if (isAuth && landpage.includes(pathname)) {
    // const redirectUrl = pathname === '/' ? landpage[0] : pathname
    NextResponse.redirect(`${origin}${landpage[0]}`)
  }
  
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
    .catch(err => false)
  return response
}
