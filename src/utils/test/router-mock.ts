export const mockUseRouter = () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
});
