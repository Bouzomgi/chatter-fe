/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    areUserDetailsSetInLocalStorage(): Chainable<any>
    login(options?: loginOptions): Chainable<any>
  }

  interface loginOptions {
    haveNoUnseenMessages?: boolean
  }
}
