import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/encryption'
import { cookies } from 'next/headers'

const protectedRoutes = ['/chats','/communities','/user','/status']

export default async function middleware(req: NextRequest) {
    
    const cookie = (await cookies()).get('login-session')?.value;

    const session = await decrypt(cookie);

    if(session?.id && req.nextUrl.pathname.startsWith('/auth')){ 
        return NextResponse.redirect(new URL('/chats', req.url));
    }

    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !session?.id) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico).*)',
    ],
};