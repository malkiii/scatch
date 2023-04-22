describe.skip('Image modal test', () => {
  let currentURL: string;
  before('display the modal', () => {
    cy.visit('/search');
    cy.url().then(url => (currentURL = url));
    cy.get('[data-test="modal-link"]:first').click();
    cy.url().should('match', /\/image\/\d+/);
  });
  it('display an image modal then exit', () => {
    cy.wait(1000);
    cy.get('[data-test="image-modal"]').click(10, 10).should('not.exist');
    cy.url().should('eq', currentURL);
  });
});

describe('Test the modal action', () => {
  before('search for "juce" that contains only 2 images', () => {
    cy.visit('/search/juce');
  });
  it('swiching between the modals', () => {
    cy.get('[data-test="modal-link"]:first').click();
    cy.wait(1000);
    cy.get('.modal-arrow:first').as('prevButton').should('be.disabled');
    cy.get('.modal-arrow:last')
      .as('nextButton')
      .should('not.be.disabled')
      .click();
    cy.wait(1000);
    cy.get('@nextButton').should('be.disabled');
    cy.get('@prevButton').should('not.be.disabled');
  });
});
