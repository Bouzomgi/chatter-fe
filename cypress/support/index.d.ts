/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    areUserDetailsSetInLocalStorage(): Chainable<any>
    login(options?: loginOptions): Chainable<any>
    triggerSocketEvent(event: any): Chainable<any>
    mockWebSocket(
      url: string,
      options?: { useDefaultWebSocket?: boolean }
    ): Chainable<Subject>
  }

  interface loginOptions {
    haveNoUnseenMessages?: boolean
  }
}
