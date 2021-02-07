/*
Script Name: test.js
Description: flight-managament Test Page Navigation
Author:       Juan Pablo Romero
Data Preconditions Flow:
   1. Access to plane flights page
*/

describe('Flight search a page', () => {

  context('Flight booking', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    it('Book a flight Bogota - Miami roundtrip', function() {

      cy.intercept({
        method: 'POST',
        pathname: '/staticweb/**',
      }).as('static_web')

      cy.visit('https://www.avianca.com/co/es/', {
        headers: {
          'Accept-Encoding': 'gzip, deflate, es',
        },
      })

      cy.get('#cookiePolicy').within(() => {
        cy.get('button[name="cookies-confirm"]').click()
      })

      cy.wait('@static_web')
      cy.scrollTo('topRight')
      cy.get('[data-widget="selectBookingMobile"]', { timeout: 5000 }).within(() => {
        cy.findByRole('heading', { name: /¿a dónde viajas\?/i })
          .should('be.visible')
        cy.findByRole('heading', { name: /¿cuándo viajas\?/i })
          .should('be.visible')
        cy.findByRole('heading', { name: /¿cómo viajas\?/i })

        cy.findByRole('presentation', { name: /ida y vuelta/i }).click()
        cy.findByRole('textbox',
          { name: /selecciona o autocompleta la ciudad de origen/i })
          .type('Bogotá{downarrow}{Enter}')
        cy.findByRole('textbox',
          { name: /selecciona o autocompleta la ciudad de destino/i })
          .type('Miami{downarrow}{Enter}')

        cy.get('.new-container-flexible').eq(1).click()
        cy.get('[aria-label="9 febrero 2021"]').eq(0).click({ force: true })
        cy.get('[aria-label="18 febrero 2021"]').eq(0).click({ force: true })

        cy.findByRole('button', { name: /buscar vuelos/i }).click()
      })

      cy.get('#modal-warning', { timeout: 5000 }).within(() => {
        cy.findByRole('button', { name: /continuar/i }).click()
      })

      cy.url().should('include', 'booking.avianca.com/av/booking/')
    }),

      it('Search for flights Bogota-Cartagena', function() {
        cy.intercept({
          method: 'POST',
          pathname: '/staticweb/**',
        }).as('static_web')

        cy.visit('https://www.avianca.com/co/es/', {
          headers: {
            'Accept-Encoding': 'gzip, deflate, es',
          },
        })

        cy.get('#cookiePolicy').within(() => {
          cy.get('button[name="cookies-confirm"]').click()
        })

        cy.wait('@static_web')
        cy.scrollTo('topRight')
        cy.get('.header-padding', { timeout: 5000 }).within(() => {
          cy.findByRole('button', { name: /menu/i }).click()
        })
        cy.get('a[href*="/co/es/tu-reserva/consulta-itinerarios/"]').eq(0).click()

        cy.url().should('include', '/tu-reserva/consulta-itinerarios/')

        cy.get('.contenedor-herramientas', { timeout: 5000 }).within(() => {
          cy.findByRole('combobox',
            { name: /ida y vuelta, selecciona o autocompleta la ciudad de origen/i })
            .click()
            .type('Bogotá{downarrow}{Enter}')

          cy.findByRole('combobox',
            { name: /ida y vuelta, selecciona o autocompleta la ciudad de destino/i })
            .click()
            .type('Cartagena{downarrow}{Enter}')
          cy.get('#fechaIdaIter', { timeout: 5000 }).click({ force: true }).click({force:true})

          cy.get('[aria-label="20 febrero 2021"]').eq(1).dblclick()
          cy.get('#fechaRegresoIter', { timeout: 5000 }).click({ force: true }).click()
          cy.get('[aria-label="28 febrero 2021"]').eq(3).click({ force: true })

          cy.findByRole('button', { name: /consultar/i }).click()
        })
      })
  })
})


