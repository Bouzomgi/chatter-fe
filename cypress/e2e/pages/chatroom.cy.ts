/*
  should have a header
  should have a settings button
  should have a logout button
*/

describe('Chatroom Page', () => {
  it('should have a header', () => {
    cy.login()

    cy.get('header')
      .should('be.visible')
      .and('contain.text', 'chatter')
      .and('contain.text', 'settings')
      .and('contain.text', 'log out')
  })

  it('should have a link to the settings page', () => {
    cy.login()

    cy.contains('settings').should('be.visible').click()
    cy.url().should('include', '/settings')
  })

  it('should have a link to logout', () => {
    cy.login()

    cy.contains('log out').should('be.visible').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
