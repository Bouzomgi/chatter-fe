/*
  unauthorized api requests should logout the user and boot them
  unauthorized page access should ^

  if localStorage credentials are given, user should be automatically logged in
    (this tests multiple pages open at once)
*/

import { HttpStatusCode } from 'axios'

describe('Unauthorized protection', () => {
  it('should boot a user that sends an unauthorized request to the login screen', () => {
    cy.login()

    cy.intercept('POST', '/api/authed/message', {
      statusCode: HttpStatusCode.Unauthorized
    })

    cy.get('[data-cy="message-input"]').type('test{enter}')

    cy.location('pathname').should('eq', '/')
    cy.areUserDetailsSetInLocalStorage().should('be.false')
  })

  it('should boot an unauthorized requester to the login screen', () => {
    cy.areUserDetailsSetInLocalStorage().should('be.false')

    cy.visit('/chatroom')

    cy.location('pathname').should('eq', '/')
  })
})

describe('Authorized protection', () => {
  it('should automatically move a logged in user to chatroom if they are on a non-authed route', () => {
    cy.login()

    cy.visit('/')

    cy.location('pathname').should('eq', '/chatroom')
  })
})
