// @vitest-environment node

import { vi } from "vitest";
import { mockUserId } from "../../../constants/test/auth";
import { decrypt, encrypt } from "../encryption";


vi.mock("server-only", () => { return {}; });

describe('Encryption and Decryption', () => {
    it('Encrypt should generate a JWT token', async () => {
            const token = await encrypt(mockUserId);
            expect(typeof token).toBe('string');
        });
    
    it('Decrypt should return the correct userId from token', async () => {
        const token = await encrypt(mockUserId);
        const decoded = await decrypt(token);
        expect(decoded).toHaveProperty("id", mockUserId);
    });
})