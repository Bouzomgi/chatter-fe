import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  env: {
    serviceAccountUsername: process.env.SERVICE_ACCOUNT_USERNAME,
    serviceAccountPassword: process.env.SERVICE_ACCOUNT_PASSWORD
  }
})
