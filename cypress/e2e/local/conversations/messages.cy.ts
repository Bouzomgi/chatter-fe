/*
  messages are displayed
  message window is scrollable
    messages at the bottom are more recent than the ones at the top
  can send a message
    on submission, message will be displayed
      sent message will be at the bottom
  site should not bug if user has no messages
  (realtime chat updater)
      foreign sent messages should show
*/
import { mockMessageResponse } from 'cypress/fixtures/responses/chat/postMessage'
import { localMessageNotificationResponse } from 'cypress/fixtures/responses/websocket/messageNotificationPayload'

describe('Messages', () => {
  it('should display a header and messages', { scrollBehavior: false }, () => {
    cy.login()

    cy.get('.conversation-header').contains('britta')
    cy.get('.messages').contains('Fri, Mar 29 at 4:00 AM')
    cy.get('.messages').contains('Grateful to have you as a friend!')
  })

  it('should send a message to another user', () => {
    cy.login()

    cy.intercept('POST', '/api/authed/message', mockMessageResponse)

    cy.get('[data-cy="message-input"]')
      .type('Sent from Cypress!{enter}')
      .should('not.contain', 'Sent from Cypress!')

    cy.get('.messages').should('contain', 'Sent from Cypress!')
  })

  it('should not sent an empty message', () => {
    cy.login()

    cy.get('.messages').then(($messagesBefore) => {
      const initialMessagesContent = $messagesBefore.text()

      cy.get('[data-cy="message-input"]').type('{enter}')

      cy.get('.messages').should(($messagesAfter) => {
        const currentMessagesContent = $messagesAfter.text()
        expect(currentMessagesContent).to.eq(initialMessagesContent)
      })
    })
  })

  it('should show new messages sent by other users in real time', () => {
    cy.login().triggerSocketEvent(localMessageNotificationResponse)
    cy.get('.messages').contains('this is a foreign message')
  })

  it("should show other chat's messages when that chat is selected", () => {
    cy.login()

    cy.get('.conversation-header').contains('britta')
    cy.get('.messages').contains('Grateful to have you as a friend!')

    cy.get('.chat-head').eq(1).click()

    cy.get('.conversation-header').contains('carl')
    cy.get('.messages').contains('Hey Adam, how have you been?')
  })
})
