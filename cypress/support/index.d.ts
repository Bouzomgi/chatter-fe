/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    areUserDetailsSetInLocalStorage(): Chainable<any>
    loadImageFixture(imageName: string): Chainable<any>
    setupAvatarUrlInterceptors(): Chainable<any>
    login(): Chainable<any>
  }
}
