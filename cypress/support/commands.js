// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkFileExist', { prevSubject: false }, (path, timeout = 10000) => {
  const checkTime = timeout / 10;
  const delayTime = 6000; 
  let totalTime = 0;

  const checkFile = () => {
    return cy.task('checkFileExists', path)
      .then((fileExists) => {
        if (fileExists) {
          return true; 
        }

        totalTime += checkTime;
        if (totalTime >= timeout) {
          return false; 
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(checkFile()); 
          }, checkTime);
        });
      });
  };

  return cy.wait(delayTime).then(() => checkFile());
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://pzp-cuw-next.azurewebsites.net');
  cy.contains("a", 'Zaloguj się').click();
  cy.get("input[name='email']").type(username);
  cy.get("input[name='pass']").type(password);
  cy.get('button.form-button').click();
  cy.get('a.main-menu__link').contains('Strona główna').click();
})