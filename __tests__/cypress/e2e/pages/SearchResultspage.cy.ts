describe('Infinit scroll test', () => {
  before('Go to "nature" page that contains alot of images', () => {
    cy.visit('/search/nature');
  });
  it('should display more images on scroll', () => {
    cy.get('[data-test="modal-link"]').as('images').should('have.length', 24);
    cy.get('footer').scrollIntoView({ duration: 1000 });
    cy.get('@images').should('have.length', 48);
    cy.get('footer').scrollIntoView({ duration: 1000 });
    cy.get('@images').should('have.length', 72);
  });
});
