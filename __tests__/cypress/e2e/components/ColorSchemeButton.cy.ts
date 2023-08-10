describe('Color scheme button test', () => {
  beforeEach('Visit the home page', () => cy.visit('/'));
  it('Toggle the color scheme', () => {
    cy.get('html').then(element => {
      const currentTheme = element.attr('data-theme');

      cy.get('[data-test="cs-button"]').first().click();
      cy.get('html').should('have.attr', 'data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    });
  });
});
