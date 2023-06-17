describe('Infinit scroll test', () => {
  const searchQuery = 'nature';
  beforeEach(`Go to "${searchQuery}" page that contains alot of images`, () => {
    cy.visit(`/search/${searchQuery}`);
  });
  it('should be in the fixed search input', () => {
    cy.get('[data-test="navbar-search-input"]').should('have.value', searchQuery);
  });
  it('should display more images on scroll', () => {
    cy.get('[data-test="modal-link"]').as('images').should('have.length', 24);
    cy.get('footer').scrollIntoView({ duration: 1000 });
    cy.get('@images').should('have.length', 48);
    cy.get('footer').scrollIntoView({ duration: 1000 });
    cy.get('@images').should('have.length', 72);
  });
});
