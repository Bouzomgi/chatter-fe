import mockRegisterResponse from 'cypress/fixtures/responses/auth/postRegister'

describe('Registration Page', () => {
  it('should have a header', () => {
    cy.visit('/register')

    cy.get('header')
      .should('be.visible')
      .and('contain.text', 'chatter')
      .and('not.contain.text', 'settings')
      .and('not.contain.text', 'log out')
  })

  it('should block registration if all fields are missing', () => {
    cy.visit('/register')

    cy.url().then((initialUrl) => {
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq', initialUrl)
      cy.get('[data-cy="email-field"]').contains('This field is required')
      cy.get('[data-cy="username-field"]').contains('This field is required')
      cy.get('[data-cy="password-field"]').contains('This field is required')
    })
  })

  it('should block registration if email is missing', () => {
    cy.visit('/register')

    cy.url().then((initialUrl) => {
      cy.get('[data-cy="username-field"]').find('input').type('testUsername')
      cy.get('[data-cy="password-field"]').find('input').type('testPassword')
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq', initialUrl)
      cy.get('[data-cy="email-field"]').contains('This field is required')
    })
  })

  it('should block registration if username is missing', () => {
    cy.visit('/register')

    cy.url().then((initialUrl) => {
      cy.get('[data-cy="email-field"]')
        .find('input')
        .type('testEmail@example.com')
      cy.get('[data-cy="password-field"]').find('input').type('testPassword')
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq', initialUrl)
      cy.get('[data-cy="username-field"]').contains('This field is required')
    })
  })

  it('should block registration if password is missing', () => {
    cy.visit('/register')

    cy.url().then((initialUrl) => {
      cy.get('[data-cy="email-field"]')
        .find('input')
        .type('testEmail@example.com')
      cy.get('[data-cy="username-field"]').find('input').type('testUser')
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq', initialUrl)
      cy.get('[data-cy="password-field"]').contains('This field is required')
    })
  })

  it('should successfully register with valid input', () => {
    cy.visit('/register')

    cy.get('[data-cy="email-field"]')
      .find('input')
      .type('testEmail@example.com')
    cy.get('[data-cy="username-field"]').find('input').type('testUser')
    cy.get('[data-cy="password-field"]').find('input').type('testPassword')

    cy.intercept('POST', '/api/register', {
      statusCode: 201,
      body: mockRegisterResponse
    })

    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="submission-message"]').contains(
      'Successfully created account'
    )
  })

  it('should show an error if the registration fails', () => {
    cy.visit('/register')

    cy.get('[data-cy="email-field"]')
      .find('input')
      .type('fakeEmail@example.com')
    cy.get('[data-cy="username-field"]').find('input').type('fakeUser')
    cy.get('[data-cy="password-field"]').find('input').type('fakePassword')

    cy.intercept('POST', '/api/register', {
      statusCode: 400,
      body: {}
    })

    cy.get('[data-cy="submission-message"]').should('not.be.empty')
  })

  it('should direct the user to the registration link', () => {
    cy.visit('/register')

    cy.contains('login?').click()

    cy.location('pathname').should('eq', '/')
  })
})
