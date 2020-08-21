describe('Site Test', function() {
    it('visit site', function() {
        cy.visit('http://localhost:3000/');
    })
})

describe('Form Input Tests', function(){
    it('types name and checks/compares', function() {
        cy.get('input[name="name"]')
        .type('Cory')
        .should('have.value','Cory')
    })
    it('checks checkbox for Pepperoni', function() {
        cy.get(':nth-child(3) > :nth-child(1) > input')
        .type('Cory')
        .check()
    })
    it('checks checkbox for sausage', function() {
        cy.get(':nth-child(2) > input')
        .type('Cory')
        .check()
    })
    it('check if submit button can submit form, and also refreshes previous data', function(){
        cy.get('form').submit().reload()
    })
})