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

import { HttpStatusCode } from 'axios'
import { Server } from 'mock-socket'
import env from '@src/config'

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

    cy.intercept('PATCH', '/api/authed/readThread/*', {
      statusCode: HttpStatusCode.Ok
    })

    cy.get('.chat-head')
      .eq(2)
      .click()
      .find('img')
      .should('not.have.class', 'unseen')
  })

  it('should display new chathead when sending a message', () => {
    cy.login()

    cy.intercept('POST', '/api/authed/message', {
      statusCode: HttpStatusCode.Ok,
      body: {
        conversationId: 1,
        threadId: 1,
        members: [1, 2],
        message: {
          messageId: 13,
          fromUserId: 1,
          createdAt:
            'Tue Dec 31 2024 01:35:50 GMT+0000 (Coordinated Universal Time)',
          content: 'test'
        }
      }
    })

    cy.get('.chat-head')
      .first()
      .invoke('text')
      .then((initialChathead) => {
        cy.get('[data-cy="message-input"]').type('test{enter}')

        cy.get('.chat-head').first().should('not.contain.text', initialChathead)
      })
  })

  it.only('should display new chathead from new foreign message in an existing chat', () => {
    const mockWss = new Server('ws://localhost:4001/api/authed')

    mockWss.on('connection', (socket) => {
      cy.log('EGGYYYYY')

      socket.send('ELLO GOVNA')
      cy.log('We are INNNNN')
    })

    cy.wait(1000)

    cy.login()
    cy.log('Logged in')

    cy.get('SJSJJH')
  })

  it('should display new chathead from new foreign message in a new chat')

  it(
    'should not show a chathead as unseen if a new message is sent to the active thread'
  )
})
