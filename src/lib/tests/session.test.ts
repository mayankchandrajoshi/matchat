// @vitest-environment node

import { Mock, vi } from 'vitest';
import { createSession, verifySession, deleteSession } from '../session';
import { mockCookieToken, mockUserId } from '../../../constants/test/auth';
import { decrypt, encrypt } from '../encryption';
import { redirect } from 'next/navigation'


vi.mock("server-only", () => { return {}; });

const mockCookies = {
    set: vi.fn(),
    get: vi.fn(() => ({ value: mockCookieToken })),
    delete: vi.fn(),
};

const mockedCookies = vi.mock('next/headers', () => ({
    cookies: vi.fn(() => mockCookies),
}));

vi.mock("../encryption", () => ({
    encrypt: vi.fn(),
    decrypt: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}))

describe('Session Handling Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('CreateSession should set a cookie', async () => {

        (encrypt as Mock).mockResolvedValueOnce(mockCookieToken);

        await createSession(mockUserId);

        expect(encrypt).toHaveBeenCalledWith(mockUserId);

        expect(mockCookies.set).toHaveBeenCalledWith("login-session", mockCookieToken, {
            httpOnly: true,
            secure: true,
            expires: expect.any(Date),
            sameSite: "lax",
            path: "/",
        });
    });

    it('VerifySession should verify session',async()=>{

        (decrypt as Mock).mockResolvedValueOnce({ id: mockUserId });
        
        const result = await verifySession();
        expect(mockCookies.get).toHaveBeenCalledWith("login-session");
        expect(decrypt).toHaveBeenCalledWith(mockCookieToken);

        expect(result).toEqual({ sessionId: mockUserId });
    })

    it('VerifySession should redirect if session is invalid', async () => {
        (decrypt as Mock).mockResolvedValueOnce(undefined);
    
        await verifySession();
    
        expect(redirect).toHaveBeenCalledWith('/auth/login'); 
    });

    it('DeleteSession should remove session cookie', async () => {
        await deleteSession();
        expect(mockCookies.delete).toHaveBeenCalledWith("login-session");
    });
});