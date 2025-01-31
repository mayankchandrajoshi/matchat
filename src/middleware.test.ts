import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import middleware from '@/middleware'; 
import { decrypt } from '@/lib/encryption';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { host, mockCookieToken, mockUserId } from '../constants/test/auth';

vi.mock('@/lib/encryption', () => ({
    decrypt: vi.fn(),
}));

const mockCookiesGet = vi.fn();
vi.mock('next/headers', () => ({
    cookies: vi.fn(() => ({
        get: mockCookiesGet,
    })),
}));

describe('Middleware Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should redirect authenticated users from /auth to /chats', async () => {
        mockCookiesGet.mockReturnValue({ value: 'valid_token' });
        (decrypt as Mock).mockResolvedValue({ id: mockUserId });

        const req = new NextRequest(new URL(`${host}/auth/login`));
        const res = await middleware(req);

        expect(res?.status).toBe(307); 
        expect(res?.headers.get('location')).toBe(`${host}/chats`);
    });

    it('should redirect unauthenticated users from protected routes to /auth/login', async () => {
        mockCookiesGet.mockReturnValue(undefined);
        (decrypt as Mock).mockResolvedValue(undefined);

        const req = new NextRequest(new URL(`${host}/chats`));
        const res = await middleware(req);

        expect(res?.status).toBe(307);
        expect(res?.headers.get('location')).toBe(`${host}/auth/login`);
    });

    it('should allow access for authenticated users on protected routes', async () => {
        mockCookiesGet.mockReturnValue({ value: mockCookieToken });
        (decrypt as Mock).mockResolvedValue({ id: mockUserId });

        const req = new NextRequest(new URL(`${host}/chats`));
        const res = await middleware(req);

        expect(res?.status).toBe(200);
        expect(res).toMatchObject(NextResponse.next());
    });

    it('should allow access for public routes', async () => {
        mockCookiesGet.mockReturnValue(undefined);
        (decrypt as Mock).mockResolvedValue(undefined);

        const req = new NextRequest(new URL(`${host}/`));
        const res = await middleware(req);

        expect(res).toMatchObject(NextResponse.next());
    });
});