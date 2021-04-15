describe('Form App tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('sanity checks', () => {
    expect(10).to.equal(10);
    expect(5 - 2).to.equal(10 - 2 - 3 - 2);
  });

  const firstNameInput = () =>
    cy.get('input[name="first_name"]').should('exist');
  const lastNameInput = () => cy.get('input[name="last_name"]').should('exist');
  const passwordInput = () => cy.get('input[name="password"]').should('exist');
  const termsCheckbox = () => cy.get('input[name="terms"]').should('exist');
  const emailInput = () => cy.get('input[name="email"]').should('exist');

  it('has the proper elements', () => {
    firstNameInput().should('exist');
    lastNameInput().should('exist');
    passwordInput().should('exist');
    emailInput().should('exist');
    termsCheckbox().should('exist');
  });

  describe('filling out inputs and submitting', () => {
    it('can interact with input fields', () => {
      const submitButton = cy.contains(/submit/i);
      submitButton.should('be.disabled');
      firstNameInput()
        .should('have.value', '')
        .type('test')
        .should('have.value', 'test');
      lastNameInput()
        .should('have.value', '')
        .type('user')
        .should('have.value', 'user');
      emailInput()
        .should('have.value', '')
        .type('test@test.com')
        .should('have.value', 'test@test.com');
      passwordInput()
        .should('have.value', '')
        .type('test1234')
        .should('have.value', 'test1234');
      termsCheckbox().check().should('be.checked');
    });

    it('can submit a user after filling out input fields', () => {
      firstNameInput().type('test');
      lastNameInput().type('user');
      emailInput().type('test@test.com');
      passwordInput().type('test1234');
      termsCheckbox().check();
      const submitButton = cy.contains(/submit/i);
      submitButton.click();
    });

    it('can not submit if an input is left empty', () => {
      firstNameInput().type('test');
      lastNameInput().type('user');
      passwordInput().type('test1234');
      termsCheckbox().check();
      const submitButton = cy.contains(/submit/i);
      submitButton.should('be.disabled');
    });
  });
});
