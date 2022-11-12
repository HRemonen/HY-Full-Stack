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
    beforeEach(function() {
      cy.login({ username: 'Hene', password: 'salasana' })
      cy.createBlog({
        title: 'First blog by Kalevi',
        author: 'Kalevi man',
        url: 'www.kalvein.io'
      })
      cy.createBlog({
        title: 'Another blog by Kalevi',
        author: 'Kalevi man',
        url: 'www.kalevinkotisivut.fi'
      })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Kalevon Cypress testi blogi')
      cy.get('#author-input').type('Cypress kalevi')
      cy.get('#url-input').type('www.cypress-kalevi.fi')
      cy.contains('create').click()

      cy.get('.success-msg').should('contain',
        // eslint-disable-next-line quotes
        "Added a new blog: 'Kalevon Cypress testi blogi' by Cypress kalevi")

      //new blog appears on the list
      cy.contains('Kalevon Cypress testi blogi')
    })

    it('a blog can be liked', function() {
      //Open the blog
      cy.contains('Another blog by Kalevi')
        .click()

      //click like button
      cy.contains('like')
        .click()

      cy.contains('likes 1')
    })

    it('a blog can be deleted by the user who created it', function() {
      //Open the blog
      cy.contains('First blog by Kalevi')
        .click()

      //click like button
      cy.contains('delete')
        .click()

      cy.contains('First blog by Kalevi').should('not.exist')
      cy.get('.success-msg').should('contain', 'Blog deleted successfully')
    })

    it.only('most liked blog is on top of the list', function() {
      //At first the first blog is at the top of the blog list
      cy.get('.blog-wrapper').eq(0).should('contain', 'First blog by Kalevi')

      //Open the last blog on the list and like it
      cy.contains('Another blog by Kalevi')
        .click()

      //click like button
      cy.contains('like')
        .click()

      //Now the second blog should be on top
      cy.get('.blog-wrapper').eq(0).should('contain', 'Another blog by Kalevi')
      //and the first blog should be at the bottom
      cy.get('.blog-wrapper').eq(1).should('contain', 'First blog by Kalevi')

      //Like the 'First' blog two times and it should be on the top again

      //First lets close the another blog...
      cy.contains('Another blog by Kalevi')
        .click()

      //Now open the first blog and like it two times
      cy.contains('First blog by Kalevi')
        .click()
      cy.contains('like')
        .click()
        .click()

      //check that the list order has changed
      //Now the first blog should be on top
      cy.get('.blog-wrapper').eq(0).should('contain', 'First blog by Kalevi')
      //and the first blog should be at the bottom
      cy.get('.blog-wrapper').eq(1).should('contain', 'Another blog by Kalevi')
    })
  })
})