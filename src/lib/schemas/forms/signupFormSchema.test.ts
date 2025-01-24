import { expect } from "vitest";
import { SignupFormSchema } from "./signupFormSchema"; 

describe('SignupFormSchema', () => {
    it('validates a correct email address', () => {
        const result = SignupFormSchema.safeParse({ email: 'test@example.com' });
        expect(result.success).toBe(true);
    });

    it('rejects an invalid email address', () => {
        const result = SignupFormSchema.safeParse({ email: 'invalid-email' });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]?.message).toBe('Invalid email address');
    });

    it('trims whitespace from email address', () => {
        const result = SignupFormSchema.safeParse({ email: '  test@example.com  ' });
        expect(result.success).toBe(true);
        expect(result.data?.email).toBe('test@example.com');
    });

    it('rejects missing email field', () => {
        const result = SignupFormSchema.safeParse({});
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]?.path).toEqual(['email']);
    });
});
