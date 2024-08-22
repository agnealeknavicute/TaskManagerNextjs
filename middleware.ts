import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });
    const { pathname } = req.nextUrl;

    const protectedRoutes = ['/task-management'];
    const adminRoutes = ['/task-management/task-adding'];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth-management/login', req.url));
        }
        if (adminRoutes.some((route) => pathname.startsWith(route)) && !token.roles.includes('admin')) {
            return NextResponse.redirect(new URL('/task-management/task-list', req.url));
        }
    }

    return NextResponse.next();
}
