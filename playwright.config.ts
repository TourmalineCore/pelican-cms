import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: `./playwright-tests`,
  outputDir: `./playwright-tests/playwright-test-results/e2e-tests`,
  timeout: 50000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry twice locally and in pipelines to avoid extra flackiness after a retry or two */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? `blob` : `html`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: `on-first-retry`,
  },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
  },
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
      teardown: 'removeFiles',
    },
    {
      name: 'removeFiles',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'ApiTests',
      use: {
        ...devices[`Desktop Chrome`],
      },
      testMatch: '**/api-tests/**',
      dependencies: ['setup'],
    },
    {
      name: `CmsUiInteractions`,
      use: {
        ...devices[`Desktop Chrome`],
      },
      testMatch: '**/e2e-check-cms-ui-interactions.spec.ts',
      dependencies: ['ApiTests'],
    },
    {
      name: `PreviewTests`,
      use: {
        ...devices[`Desktop Chrome`],
      },
      testMatch: '**/e2e-preview-check.spec.ts',
      dependencies: ['CmsUiInteractions'],
    },
  ],
});
