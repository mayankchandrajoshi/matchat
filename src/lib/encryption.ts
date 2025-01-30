import 'server-only'

import { SignJWT, jwtVerify } from 'jose'


const secretKey = process.env.LOGIN_SESSION_SECRET_KEY!.padEnd(32, '0');
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(id: string) {
    return new SignJWT({id})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.LOGIN_SESSION_SECRET_KEY_EXPIRY_DAY!)
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session');
    }
}