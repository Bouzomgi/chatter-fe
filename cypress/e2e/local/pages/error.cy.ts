/*
  error page renders when an unfamiliar URL is requested
*/

describe('Error Page', () => {
  it('should appear when attempting to access an invalid URL', () => {
    cy.visit('/madeUpRoute')

    cy.contains('Sorry, an unexpected error has occurred')
  })
})
