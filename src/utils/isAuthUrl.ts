const isAuthUrl = (pathname: string): boolean => {
  const authURLs = ['/sign-in', '/']

  const isAuth = authURLs.includes(pathname.toLowerCase().trim())
  return isAuth
}

export default isAuthUrl
