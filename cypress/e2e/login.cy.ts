/*
  - Login
    - Block login if a field is not inputted
    - On successful login, a cookie should be returned
      - should be taken to chatroom page
    - On failed login, should throw error
    - Register button should take you to registration
*/

import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type LoginResponse = ExtractResponseBody<
  '/api/login',
  'post',
  HttpStatusCode.Ok
>

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
    cy.visit('/')

    cy.areUserDetailsSetInLocalStorage().should('be.false')

    cy.get('[data-cy="username-field"]').find('input').type('testUser')
    cy.get('[data-cy="password-field"]').find('input').type('testPassword')

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
