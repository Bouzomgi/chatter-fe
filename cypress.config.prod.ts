import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://chitchatter.link',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
