describe('Color scheme button test', () => {
  beforeEach('Visit the home page', () => cy.visit('/'));
  it('Toggle the color scheme', () => {
    const htmlElementClasses = document.documentElement.classList;
    const currentTheme = htmlElementClasses.contains('dark') ? 'light' : 'dark';
    cy.get('[data-test="cs-button"]').click();
    cy.get('html').should('have.css', 'color-scheme', currentTheme == 'dark' ? 'light' : 'dark');
  });
});
