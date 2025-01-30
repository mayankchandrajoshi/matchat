import { vi } from "vitest";

export const mockUseRouter = () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
});
