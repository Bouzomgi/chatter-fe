describe('smoke tests', () => {
  it('should load the homepage', () => {
    cy.visit('/')
    cy.contains('chatter')
  })
})
