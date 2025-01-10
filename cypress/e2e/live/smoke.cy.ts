describe('Smoke test', () => {
  it('should successfully complete a basic user flow', () => {
    const serviceAccountUsername = Cypress.env('serviceAccountUsername')
    const serviceAccountPassword = Cypress.env('serviceAccountPassword')

    cy.visit('/')

    // login
    cy.get('[data-cy="username-field"]')
      .find('input')
      .type(serviceAccountUsername)
    cy.get('[data-cy="password-field"]')
      .find('input')
      .type(serviceAccountPassword, { log: false })
    cy.get('[data-cy="submit"]').click()

    cy.url().should('include', '/chatroom')
    cy.areUserDetailsSetInLocalStorage().should('be.true')

    // click new chats and make sure users can be seen
    cy.get('[data-cy="new-chat"]').click()
    cy.get('.user-head').should('be.visible')

    cy.get('[data-cy="new-chat"]').click()
    cy.get('.user-head').should('not.exist')

    // click around the settings page
    cy.contains('settings').click()
    cy.get('[data-cy="avatar-selector"]').click()
    cy.get(`[data-cy="exit-button"]`).click()
    cy.get('[data-cy="submit"]').click()

    // logout
    cy.contains('log out').should('be.visible').click()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.areUserDetailsSetInLocalStorage().should('be.false')

    // attempt to visit chatroom after logging out
    cy.visit('/chatroom')
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.areUserDetailsSetInLocalStorage().should('be.false')
  })
})
