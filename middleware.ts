import createMiddleware from 'next-intl/middleware';
import {defaultLocale, locales} from "@/i18n";

// acceptLanguage.languages(languages)
export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  localePrefix: "always"
})

export const config = {
  // matcher: '/:lng*'
  // matcher: ['/((?!api|files|_next/static|_next/image|assets|images|favicon.ico).*)']
  matcher: ['/((?!api|files|_next|_vercel|.*\\..*).*)']
}
