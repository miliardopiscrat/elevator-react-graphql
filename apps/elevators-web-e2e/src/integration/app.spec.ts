import { getElevators } from '../support/app.po';

describe('elevators-web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display 6 elevators', () => {
    getElevators().should('have.length', 6);
  });
});
