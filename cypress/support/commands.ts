import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type LoginResponse = ExtractResponseBody<
  '/api/login',
  'post',
  HttpStatusCode.Ok
>

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

Cypress.Commands.add('loadImageFixture', (imageName: string) =>
  cy
    .fixture(`/images/${imageName}`, 'base64')
    .then((base64Image) => `data:image/svg+xml;base64,${base64Image}`)
)

Cypress.Commands.add('login', (username) => {
  cy.visit('/')

  cy.loadImageFixture('avatar1.svg').then((imageUrl) => {
    const mockedResponse: LoginResponse = {
      userId: 1,
      username: 'testUser',
      avatar: {
        name: 'avatars/default/avatar1.svg',
        url: imageUrl
      }
    }

    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: mockedResponse
    })
  })

  cy.intercept('GET', '/api/authed/chatUsersDetails', {
    statusCode: 200,
    body: {}
  })

  cy.get('[data-cy="submit"]').click()
  cy.url().should('include', '/chatroom')
  cy.areUserDetailsSetInLocalStorage().should('be.true')
})
