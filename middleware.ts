import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const secret = process.env.NEXTAUTH_SECRET;
const i18nMiddleware = createIntlMiddleware({
    locales: ['en', 'ru', 'lv'],
    defaultLocale: 'en',
});
export async function middleware(req: NextRequest) {
    const i18nResponse = i18nMiddleware(req);
    const token = await getToken({ req, secret });
    const { pathname } = req.nextUrl;

    const localePattern = /^\/(en|ru|lv)/;
    const normalizedPathname = pathname.replace(localePattern, '');

    const protectedRoutes = ['/task-management', '/users-management', 'group-management'];
    const adminRoutes = ['/task-management/task-adding', '/users-management'];

    if (protectedRoutes.some((route) => normalizedPathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth-management/login', req.url));
        }

        if (adminRoutes.some((route) => normalizedPathname.startsWith(route)) && !token.roles.includes('admin')) {
            return NextResponse.redirect(new URL('/task-management/task-list', req.url));
        }
    }
    if (i18nResponse) {
        return i18nResponse;
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
