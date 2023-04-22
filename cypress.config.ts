import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    videosFolder: '__tests__/cypress/videos',
    fixturesFolder: '__tests__/cypress/fixtures',
    downloadsFolder: '__tests__/cypress/downloads',
    screenshotsFolder: '__tests__/cypress/screenshots',
    supportFile: '__tests__/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: '__tests__/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
});
