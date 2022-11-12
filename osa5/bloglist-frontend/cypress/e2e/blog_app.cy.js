describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to blogs')
  })

  it('user can log in', function() {
    cy.get('#username').type('Hene')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()

    cy.contains('Logged in as user: Henri Remonen')
  })
})