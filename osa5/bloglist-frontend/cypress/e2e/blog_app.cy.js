describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Henri Remonen',
      username: 'Hene',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to blogs')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Hene')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.get('.success-msg').should('contain', 'Logged in as user: Henri Remonen')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Hene')
      cy.get('#password').type('123123')
      cy.get('#login-button').click()

      cy.get('.error-msg').should('contain', 'Wrong username or password')
      cy.get('.error-msg').should('have.css', 'color', 'rgb(216, 0, 12)')
    })
  })

  describe('when logged in', function() {
    //
  })
})