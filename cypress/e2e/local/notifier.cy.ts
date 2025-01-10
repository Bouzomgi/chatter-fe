/*
  Window title should be cleaned up when all unseen messages are seen
  Window title should be set when a new message arrives
  Window title not be set when a current chat gets a new message and no other messages are unseen
  Window title should be set if user is on Settings page and a new message arrives
*/

import {
  foreignMessageNotificationResponse,
  localMessageNotificationResponse
} from 'cypress/fixtures/responses/websocket/messageNotificationPayload'
import { modifiedGetUsersDetailsResponse } from 'cypress/fixtures/responses/chat/getChatUsersDetails'
import { HttpStatusCode } from 'axios'

describe('Notifier', () => {
  it('should not set window title if there are no unseen messages', () => {
    cy.login({ haveNoUnseenMessages: true })
    cy.title().should('eq', 'chatter')
  })

  it('should clean up window title when all unseen messages are seen', () => {
    cy.login()
    cy.title().should('eq', 'chatter!!!')

    cy.get('.chat-head').eq(2).click()
    cy.title().should('eq', 'chatter')
  })

  it('should set window title when a new message arrives', () => {
    cy.login()
      .intercept('GET', '/api/authed/chatUsersDetails', {
        statusCode: HttpStatusCode.Ok,
        body: modifiedGetUsersDetailsResponse
      })
      .triggerSocketEvent(foreignMessageNotificationResponse)
    cy.title().should('eq', 'chatter!!!')
  })

  it('should not set window title when a current chat gets a new message and no other messages are unseen', () => {
    cy.login({ haveNoUnseenMessages: true })
    cy.title().should('eq', 'chatter')

    cy.triggerSocketEvent(localMessageNotificationResponse)
    cy.title().should('eq', 'chatter')
  })

  it('should set window title if user is on Settings page and a new message arrives', () => {
    cy.login({ haveNoUnseenMessages: true })
    cy.title().should('eq', 'chatter')

    cy.visit('/settings')
    cy.triggerSocketEvent(localMessageNotificationResponse)
    cy.title().should('eq', 'chatter!!!')
  })
})
