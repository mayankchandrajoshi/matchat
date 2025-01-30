import { vi } from "vitest";

export const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

export const studResizeObserver = () => vi.stubGlobal('ResizeObserver', ResizeObserverMock);