/*
  each chathead has a name, image, message, and date
  latest messages will show in chatheads
  on message send, the message should be updated
  unread threads should be displayed
    Clicking on an unread chathead should remove the unread thread dot
  chatheads should be click-able
    active threads should show a bar
  should be scrollable if there are lots
  
  (realtime chat updater)
    foreign sent messages should show on the chathead 
*/

import {
  localMessageNotificationResponse,
  foreignMessageNotificationResponse
} from 'cypress/fixtures/responses/websocket/messageNotificationPayload'
import { modifiedGetUsersDetailsResponse } from 'cypress/fixtures/responses/chat/getChatUsersDetails'
import { mockMessageResponse } from 'cypress/fixtures/responses/chat/postMessage'
import { HttpStatusCode } from 'axios'

describe('Chatheads', () => {
  it('should display all necessary information', () => {
    cy.login()

    cy.get('.chat-head')
      .should('be.visible')
      .and('have.length', 3)
      .first()
      .should('contain.text', 'britta')
      .and('contain.text', 'Grateful to have you as a friend!')
      .and('contains.text', '3/29/24')
      .find('img')
      .should('exist')
  })

  it('should open a chat when clicked', () => {
    cy.login()

    cy.get('.chat-head').first().should('have.class', 'active')
    cy.get('.chat-head').eq(1).should('not.have.class', 'active')

    cy.get('.messages')
      .invoke('text')
      .then((initialText) => {
        cy.get('.chat-head').eq(1).click()

        cy.get('.messages').should('not.have.text', initialText)
      })

    cy.get('.chat-head').first().should('not.have.class', 'active')
    cy.get('.chat-head').eq(1).should('have.class', 'active')
  })

  it('should clear unseen messages when clicked', () => {
    cy.login()

    cy.get('.chat-head').eq(2).find('img').should('have.class', 'unseen')

    cy.get('.chat-head')
      .eq(2)
      .click()
      .find('img')
      .should('not.have.class', 'unseen')

    // even when clicking off of the chathead, should continue to be seen
    cy.get('.chat-head').eq(1).click()

    cy.get('.chat-head').eq(2).find('img').should('not.have.class', 'unseen')
  })

  it('should display new chathead from new foreign message in an existing chat', () => {
    cy.login().triggerSocketEvent(localMessageNotificationResponse)

    cy.get('.chat-head')
      .first()
      .should('exist')
      .and('contain.text', 'this is a foreign message')
      .find('img')
      .should('not.have.class', 'unseen')
  })

  it('should display new chathead from new foreign message in a new chat', () => {
    cy.login()
      .intercept('GET', '/api/authed/chatUsersDetails', {
        statusCode: HttpStatusCode.Ok,
        body: modifiedGetUsersDetailsResponse
      })
      .triggerSocketEvent(foreignMessageNotificationResponse)

    cy.get('.chat-head')
      .should('be.visible')
      .and('have.length', 4)
      .first()
      .should('contain.text', 'edward')
      .and('contain.text', 'this is a new chat foreign message')
      .find('img')
      .should('have.class', 'unseen')
  })

  it('should display new chathead when sending a message', () => {
    cy.login()

    cy.intercept('POST', '/api/authed/message', {
      statusCode: HttpStatusCode.Ok,
      body: mockMessageResponse
    })

    cy.get('.chat-head')
      .first()
      .invoke('text')
      .then((initialChathead) => {
        cy.get('[data-cy="message-input"]').type('test{enter}')

        cy.get('.chat-head').first().should('not.contain.text', initialChathead)
      })
  })
})
