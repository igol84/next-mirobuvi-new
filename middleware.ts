import {NextRequest, NextResponse} from 'next/server'
import acceptLanguage from 'accept-language'
import createMiddleware from 'next-intl/middleware';

// acceptLanguage.languages(languages)
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ua'],

  // Used when no locale matches
  defaultLocale: 'ua'
})

export const config = {
  // matcher: '/:lng*'
  // matcher: ['/((?!api|files|_next/static|_next/image|assets|images|favicon.ico).*)']
  matcher: ['/', '/(ua|en)/:path*']
}
//
// const cookieName = 'i18next'

// const getLanguage = (req: NextRequest): Lang => {
//   if (req.cookies.has(cookieName) && req.cookies.get(cookieName)?.value
//     && acceptLanguage.get(req.cookies.get(cookieName)?.value))
//     return acceptLanguage.get(req.cookies.get(cookieName)?.value) as Lang
//   if (req.headers.get('Accept-Language') && acceptLanguage.get(req.headers.get('Accept-Language')))
//     return acceptLanguage.get(req.headers.get('Accept-Language')) as Lang
//   return defaultLanguage
// }
// export function middleware(req: NextRequest) {
//   const language = getLanguage(req)
//   if (!languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`))) {
//     return NextResponse.redirect(new URL(`/${language}${req.nextUrl.pathname}`, req.url))
//   }
//
//   if (req.headers.has('referer')) {
//     const refererUrl = new URL(req.headers.get('referer') || '')
//     const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
//     const response = NextResponse.next()
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
//     return response
//   }
//   return NextResponse.next()
// }
//