import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom', 
        clearMocks: true, 
        globals: true,
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            reportsDirectory: 'coverage', 
        },
    },
    resolve: {
        alias: {
            '@': '/src', 
        },
    },
});
