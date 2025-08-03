import mockLoginResponse from 'cypress/fixtures/responses/auth/postLogin'
import { mockChatUsersDetailsResponse } from 'cypress/fixtures/responses/chat/getChatUsersDetails'
import mockChatsResponse from 'cypress/fixtures/responses/chat/getChats'
import mockReadThreadResponse from 'cypress/fixtures/responses/chat/patchReadThread'
import 'cypress-mock-websocket-plugin'
import { HttpStatusCode } from 'axios'

Cypress.Commands.add('areUserDetailsSetInLocalStorage', () =>
  cy
    .window()
    .then((window) =>
      window.localStorage.getItem('userId') &&
      window.localStorage.getItem('username') &&
      window.localStorage.getItem('avatarName') &&
      window.localStorage.getItem('avatarUrl')
        ? true
        : false
    )
)

Cypress.Commands.add('login', (options?: Cypress.loginOptions) => {
  const haveNoUnseenMessages = options?.haveNoUnseenMessages

  cy.mockWebSocket('ws://localhost:5173/ws/api/authed', {
    useDefaultWebSocket: true
  })

  cy.intercept('POST', '/avatars/default/avatar*', {
    statusCode: HttpStatusCode.Ok
  })

  cy.visit('/')

  cy.get('[data-cy="username-field"]').find('input').type('fakeUser')
  cy.get('[data-cy="password-field"]').find('input').type('fakePassword')

  cy.intercept('POST', '/api/login', {
    statusCode: HttpStatusCode.Ok,
    body: mockLoginResponse
  })

  cy.intercept('GET', '/api/authed/chatUsersDetails', {
    statusCode: HttpStatusCode.Ok,
    body: mockChatUsersDetailsResponse
  })

  if (haveNoUnseenMessages) {
    cy.intercept('GET', '/api/authed/chats', {
      statusCode: HttpStatusCode.Ok,
      body: mockChatsResponse.map((chat) => ({
        ...chat,
        unseenMessageId: undefined
      }))
    })
  } else {
    cy.intercept('GET', '/api/authed/chats', {
      statusCode: HttpStatusCode.Ok,
      body: mockChatsResponse
    })
  }

  cy.intercept('PATCH', '/api/authed/readThread/*', {
    statusCode: HttpStatusCode.Ok,
    body: mockReadThreadResponse
  })

  cy.get('[data-cy="submit"]').click()
  cy.url().should('include', '/chatroom')
  cy.areUserDetailsSetInLocalStorage().should('be.true')
})
