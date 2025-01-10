/*
  should show all users on new-chat click
  should migrate to an active chat if a user w/ an active chat is selected
  should be able to click between chats
  should migrate back to no-chat window when a message is sent to a new chat
*/

import { HttpStatusCode } from 'axios'
import { modifiedGetUsersDetailsResponse } from 'cypress/fixtures/responses/chat/getChatUsersDetails'
import mockUserHeadsResponse from 'cypress/fixtures/responses/chat/getUserHeads'
import { mockNewChatMessageResponse } from 'cypress/fixtures/responses/chat/postMessage'

describe('New Chat', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/authed/userHeads', {
      statusCode: HttpStatusCode.Ok,
      body: mockUserHeadsResponse
    })
  })

  it('should show all users on new-chat button click', () => {
    cy.login()

    cy.get('[data-cy="new-chat"]').click()
    cy.get('.user-head').should('be.visible').and('have.length', 5)
  })

  it('should migrate to an active chat if a user with an active chat is selected', () => {
    cy.login()

    cy.get('[data-cy="new-chat"]').click()
    cy.get('[data-cy="new-chat"]').should('have.class', 'active')

    cy.get('.user-head')
      .contains('carl')
      .parent()
      .within(() => {
        cy.get('[data-cy="submit"]').click()
      })

    cy.get('.chat-head')
      .contains('carl')
      .closest('.chat-head')
      .should('have.class', 'active')

    cy.get('[data-cy="new-chat"]').should('not.have.class', 'active')
  })

  it('should be able to click between chats', () => {
    cy.login()

    cy.get('[data-cy="new-chat"]').click()
    cy.get('[data-cy="new-chat"]').should('have.class', 'active')

    // these are other users that don't have active chats with the logged in user
    cy.get('.user-head')
      .contains('brian')
      .parent()
      .within(() => {
        cy.get('[data-cy="submit"]').click()
      })

    cy.get('.conversation-header').contains('brian')
    cy.get('.messages').should('have.text', '')
    cy.get('[data-cy="new-chat"]').should('have.class', 'active')

    cy.get('.user-head')
      .contains('edward')
      .parent()
      .within(() => {
        cy.get('[data-cy="submit"]').click()
      })

    cy.get('[data-cy="new-chat"]').should('have.class', 'active')
  })

  it('should migrate back to no-chat window when a message is sent to a new chat', () => {
    cy.login()

    cy.get('[data-cy="new-chat"]').click()
    cy.get('[data-cy="new-chat"]').should('have.class', 'active')

    cy.get('.user-head')
      .contains('edward')
      .parent()
      .within(() => {
        cy.get('[data-cy="submit"]').click()
      })

    cy.get('[data-cy="new-chat"]').should('have.class', 'active')

    cy.intercept('POST', '/api/authed/message', {
      statusCode: HttpStatusCode.Ok,
      body: mockNewChatMessageResponse
    })

    cy.intercept('GET', '/api/authed/chatUsersDetails', {
      statusCode: HttpStatusCode.Ok,
      body: modifiedGetUsersDetailsResponse
    })

    cy.get('[data-cy="message-input"]')
      .type('Sent from Cypress!{enter}')
      .should('not.contain', 'Sent from Cypress!')

    cy.get('[data-cy="new-chat"]').should('not.have.class', 'active')

    cy.get('.chat-head')
      .contains('edward')
      .closest('.chat-head')
      .should('have.class', 'active')

    cy.get('.chat-head')
      .contains('edward')
      .closest('.chat-head')
      .find('img')
      .should('not.have.class', 'unseen')
  })
})
