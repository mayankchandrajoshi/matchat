import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { decrypt, encrypt } from './encryption'


export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + Number(process.env.LOGIN_SESSION_SECRET_KEY_EXPIRY!))

    const session = await encrypt(userId)
    const cookieStore = await cookies()
    
    cookieStore.set('login-session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('login-session')?.value
    const session = await decrypt(cookie)

    if (!session?.id) {
        redirect('/auth/login')
        return;
    }
    
    return { sessionId: session.id }
})

export const deleteSession = cache(async () => {
    const cookieStore = await cookies()
    cookieStore.delete('login-session')
})