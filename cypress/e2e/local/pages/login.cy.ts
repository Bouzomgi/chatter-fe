/*
  - Login
    - Block login if a field is not inputted
    - On successful login, a cookie should be returned
      - should be taken to chatroom page
    - On failed login, should throw error
    - Register button should take you to registration
*/

import { HttpStatusCode } from 'axios'
import mockLoginResponse from 'cypress/fixtures/responses/auth/postLogin'
import mockChatsResponse from 'cypress/fixtures/responses/chat/getChats'
import { mockChatUsersDetailsResponse } from 'cypress/fixtures/responses/chat/getChatUsersDetails'
import mockReadThread from 'cypress/fixtures/responses/chat/patchReadThread'

describe('Login Page', () => {
  it('should have a header', () => {
    cy.visit('/')

    cy.get('header')
      .should('be.visible')
      .and('contain.text', 'chatter')
      .and('not.contain.text', 'settings')
      .and('not.contain.text', 'log out')
  })

  it('should block login if both fields are missing', () => {
    cy.visit('/')

    cy.url().then((initialUrl) => {
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq', initialUrl)
      cy.get('[data-cy="username-field"]').contains('This field is required')
      cy.get('[data-cy="username-field"]').contains('This field is required')
    })
  })

  it('should block login if username is missing', () => {
    cy.visit('/')

    cy.url().then((initialUrl) => {
      cy.get('[data-cy="password-field"]').find('input').type('testPassword')
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq', initialUrl)
      cy.get('[data-cy="username-field"]').contains('This field is required')
    })
  })

  it('should block login if password is missing', () => {
    cy.visit('/')

    cy.url().then((initialUrl) => {
      cy.get('[data-cy="username-field"]').find('input').type('testUser')
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq', initialUrl)
      cy.get('[data-cy="password-field"]').contains('This field is required')
    })
  })

  it('should successfully login with valid input', () => {
    cy.mockWebSocket(`${Cypress.env('baseWsUrl')}/ws/api/authed`, {
      useDefaultWebSocket: true
    })

    cy.visit('/')

    cy.areUserDetailsSetInLocalStorage().should('be.false')

    cy.get('[data-cy="username-field"]').find('input').type('testUser')
    cy.get('[data-cy="password-field"]').find('input').type('testPassword')

    cy.intercept('POST', '/api/login', {
      statusCode: HttpStatusCode.Ok,
      body: mockLoginResponse
    })

    cy.intercept('GET', '/api/authed/chatUsersDetails', {
      statusCode: HttpStatusCode.Ok,
      body: mockChatUsersDetailsResponse
    })

    cy.intercept('GET', '/api/authed/chats', {
      statusCode: HttpStatusCode.Ok,
      body: mockChatsResponse
    })

    cy.intercept('PATCH', '/api/authed/readThread/*', {
      statusCode: HttpStatusCode.Ok,
      body: mockReadThread
    })

    cy.get('[data-cy="submit"]').click()
    cy.url().should('include', '/chatroom')

    cy.areUserDetailsSetInLocalStorage().should('be.true')
  })

  it('should show an error if the login fails', () => {
    cy.visit('/')

    cy.get('[data-cy="username-field"]').find('input').type('fakeUser')
    cy.get('[data-cy="password-field"]').find('input').type('fakePassword')

    cy.intercept('POST', '/api/login', {
      statusCode: 400,
      body: {}
    })

    cy.get('[data-cy="submit"]').click()

    cy.location('pathname').should('eq', '/')
    cy.get('[data-cy="submission-message"]')
      .invoke('text')
      .should('not.be.empty')
    cy.areUserDetailsSetInLocalStorage().should('be.false')
  })

  it('should direct the user to the registration link', () => {
    cy.visit('/')

    cy.contains('register?').click()

    cy.location('pathname').should('eq', '/register')
  })
})
