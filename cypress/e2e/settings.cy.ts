/*
  Should have a header
  Should be able to access settings page from chatroom
  Click on arrow with no change should result in no change
  In settings
    Should see current avatar
    Should be able to click on avatar modifier
      Should see "choose an avatar"
      Should see images
      If scroll over, should see them change
      Click on one, and the settings page should show it
      Arrow, then back to settings and the image should be changed
    Should be able to click X out of settings
*/

import mockDefaultAvatarsResponse from 'cypress/fixtures/responses/settings/getDefaultAvatars'

describe('Settings Page', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should have a header', () => {
    cy.visit('/settings')

    cy.get('header')
      .should('be.visible')
      .and('contain.text', 'chatter')
      .and('contain.text', 'settings')
      .and('contain.text', 'log out')

    cy.contains('settings').should('have.css', 'color', 'rgb(255, 255, 255)')
  })

  it('should be able to modify avatar', () => {
    cy.visit('/settings')

    cy.get('[data-cy="content"]') // This is the non-header section of the site
      .should('contain.text', 'settings')

    cy.intercept('GET', '/api/authed/defaultAvatars', {
      statusCode: 200,
      body: mockDefaultAvatarsResponse
    })

    cy.get('[data-cy="avatar-selector"]')
      .invoke('attr', 'src')
      .then((initialSrc) => {
        cy.get('[data-cy="avatar-selector"]')
          .trigger('mouseover')
          .should('have.not.css', 'cursor', 'pointer')
          .click()

        cy.get('[data-cy^="./avatars/default/avatar"]')
          .not(`[data-cy="${initialSrc}"]`)
          .first() // Select the first avatar that is not the current one
          .then((avatar) => {
            cy.wrap(avatar)
              .trigger('mouseover')
              .should('have.not.css', 'cursor', 'pointer')
              .click()
          })

        cy.get('[data-cy="avatar-selector"]')
          .invoke('attr', 'src')
          .then((finalSrc) => {
            expect(finalSrc).not.to.equal(initialSrc)

            // Submit settings

            // Check that localStorage's "avatarName" matches the final src
            cy.window().then((window) => {
              const avatarName = window.localStorage.getItem('avatarName')
              expect(avatarName).to.equal(finalSrc)
            })
          })
      })
  })
})
