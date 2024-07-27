import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});

export default vitestConfig;
