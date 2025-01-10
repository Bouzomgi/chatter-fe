/*
  Should have a header
  Should be able to access settings page from chatroom
  Click on arrow with no change should result in no change
  In settings
    Should see current avatar
    Should be able to click on avatar modifier
      Should see "choose an avatar"
      Should see images
      Click on one, and the settings page should show it
      Arrow, then back to settings and the image should be changed
  Should be able to click X out of settings
*/

import { HttpStatusCode } from 'axios'
import mockDefaultAvatarsResponse from 'cypress/fixtures/responses/settings/getDefaultAvatars'
import mockSetSettingsResponse from 'cypress/fixtures/responses/settings/postSetSettings'

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

    cy.get('[data-cy="content"]') // This is the non-header section of the site
      .should('contain.text', 'settings')
  })

  it('should be able to modify avatar', () => {
    cy.visit('/settings')

    cy.intercept('GET', '/api/authed/defaultAvatars', {
      statusCode: HttpStatusCode.Ok,
      body: mockDefaultAvatarsResponse
    })

    cy.window().then((window) => {
      const initialAvatarName = window.localStorage.getItem('avatarName')
      const initialAvatarUrl = window.localStorage.getItem('avatarUrl')

      cy.get('[data-cy="avatar-selector"]')
        .invoke('attr', 'src')
        .then((initialSrc) => {
          cy.get('[data-cy="avatar-selector"]')
            .trigger('mouseover')
            .should('have.not.css', 'cursor', 'pointer')
            .click()

          cy.get('[data-cy="avatar-selection-modal"]').should('be.visible')

          cy.get('[data-cy^="./avatars/default/avatar"]')
            .not(`[data-cy="${initialAvatarName}"]`)
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

              cy.intercept('POST', '/api/authed/setSettings', {
                statusCode: HttpStatusCode.Ok,
                body: mockSetSettingsResponse
              })

              cy.get('[data-cy="submit"]')
                .trigger('mouseover')
                .should('have.not.css', 'cursor', 'pointer')
                .click()
            })
        })

      const finalAvatarName = window.localStorage.getItem('avatarName')
      const finalAvatarUrl = window.localStorage.getItem('avatarUrl')
      expect(initialAvatarName !== finalAvatarName)
      expect(initialAvatarUrl !== finalAvatarUrl)
    })
  })

  it("should should keep the avatar unchanged if the user's current avatar is selected", () => {
    cy.visit('/settings')

    cy.intercept('GET', '/api/authed/defaultAvatars', {
      statusCode: HttpStatusCode.Ok,
      body: mockDefaultAvatarsResponse
    })

    cy.window().then((window) => {
      const initialAvatarName = window.localStorage.getItem('avatarName')
      const initialAvatarUrl = window.localStorage.getItem('avatarUrl')

      cy.get('[data-cy="avatar-selector"]')
        .invoke('attr', 'src')
        .then((initialSrc) => {
          cy.get('[data-cy="avatar-selector"]').click()

          cy.get('[data-cy="avatar-selection-modal"]').should('be.visible')

          cy.get(`[data-cy="${initialAvatarName}"]`).click()

          cy.get('[data-cy="avatar-selector"]')
            .invoke('attr', 'src')
            .then((finalSrc) => {
              expect(finalSrc).to.equal(initialSrc)

              cy.intercept('POST', '/api/authed/setSettings', {
                statusCode: HttpStatusCode.Ok,
                body: mockSetSettingsResponse
              })

              cy.get('[data-cy="submit"]').click()
            })
        })

      const finalAvatarName = window.localStorage.getItem('avatarName')
      const finalAvatarUrl = window.localStorage.getItem('avatarUrl')
      expect(initialAvatarName === finalAvatarName)
      expect(initialAvatarUrl === finalAvatarUrl)
    })
  })

  it('should keep the avatar unchanged if the avatar selector is closed', () => {
    cy.visit('/settings')

    cy.intercept('GET', '/api/authed/defaultAvatars', {
      statusCode: HttpStatusCode.Ok,
      body: mockDefaultAvatarsResponse
    })

    cy.window().then((window) => {
      const initialAvatarName = window.localStorage.getItem('avatarName')
      const initialAvatarUrl = window.localStorage.getItem('avatarUrl')

      cy.get('[data-cy="avatar-selector"]')
        .invoke('attr', 'src')
        .then((initialSrc) => {
          cy.get('[data-cy="avatar-selector"]').click()

          cy.get(`[data-cy="exit-button"]`).click()

          cy.get('[data-cy="avatar-selector"]')
            .invoke('attr', 'src')
            .then((finalSrc) => {
              expect(finalSrc).to.equal(initialSrc)

              cy.intercept('POST', '/api/authed/setSettings', {
                statusCode: HttpStatusCode.Ok,
                body: mockSetSettingsResponse
              })

              cy.get('[data-cy="submit"]').click()
            })
        })

      const finalAvatarName = window.localStorage.getItem('avatarName')
      const finalAvatarUrl = window.localStorage.getItem('avatarUrl')
      expect(initialAvatarName === finalAvatarName)
      expect(initialAvatarUrl === finalAvatarUrl)
    })
  })
})
