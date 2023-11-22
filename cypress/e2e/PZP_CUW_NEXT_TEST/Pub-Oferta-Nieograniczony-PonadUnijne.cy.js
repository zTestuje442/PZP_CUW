context('Postępowanie ponad unijne - nieograniczony', () => {


  const powershellScriptPath = 'GenerateCertificates.ps1';
  
    // Generowanie numeru postępowania
    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomProcedureNumber = '';
      
        for (let i = 0; i < 21; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomProcedureNumber += characters.charAt(randomIndex);
        }
        return randomProcedureNumber;
      }
      let randomProcedureNumber = generateRandomString();

      // Dzisijesza data
      function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
      let currentDateFormatted = getCurrentDate();

      function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      
      const currentDate = new Date(currentDateFormatted);
      const futureDate = addDays(currentDate, 7);
      
      const futureYear = futureDate.getFullYear();
      const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
      const futureDay = String(futureDate.getDate()).padStart(2, '0');
      
      const futureDateFormatted = `${futureYear}-${futureMonth}-${futureDay}`;
      

// --------DANE POSTĘPOWANIA------------
const fruits = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry",
"Watermelon", "Cantaloupe", "Honeydew", "Kiwi", "Peach", "Pear", "Plum", "Cherry", "Lemon", "Lime",
"Grapefruit", "Papaya", "Coconut", "Avocado", "Fig", "Date", "Pomegranate", "Guava", "Lychee", "Passion fruit",
"Dragon fruit", "Durian", "Persimmon", "Jackfruit", "Cranberry", "Tangerine", "Apricot", "Nectarine", "Kiwifruit",
"Starfruit", "Plantain", "Elderberry", "Mulberry", "Gooseberry", "Quince", "Olive", "Boysenberry", "Ugli fruit",
"Tamarind", "Ackee", "Breadfruit", "Custard apple", "Feijoa", "Horned melon", "Jujube", "Kumquat", "Longan", "Loquat", "Miracle fruit",
"Pawpaw", "Salak", "Sapodilla", "Soursop", "Yuzu", "Buddha's hand", "Damson", "Gac fruit", "Jabuticaba", "Loganberry",
"Miracle berry", "Pomelo", "Santol", "Sugar apple", "Tamarillo", "Cupuacu", "Lucuma", "Mamey sapote", "Pepino", "Rambutan",
"Sapote", "Surinam cherry", "Yangmei", "Cherimoya", "Carambola"];

    const randomFruitIndex = Math.floor(Math.random() * fruits.length);
    const randomFruit = fruits[randomFruitIndex];
    const procedureName = `Postępowanie ponad unijne - nieograniczony ${randomFruit}`;


    // Logowanie
    Cypress.Commands.add('login', (username, password) => {
        cy.visit('https://pzp-cuw-next.azurewebsites.net');
        cy.contains("a", 'Zaloguj się').click();
        cy.get("input[name='email']").type(username);
        cy.get("input[name='pass']").type(password);
        cy.get('button.form-button').click();
        cy.get('a.main-menu__link').contains('Strona główna').click();
        //cy.url().should('contain', '/login-successful')
      })

      beforeEach(() => {
        cy.login('ztestuje442@gmail.com', 'Storczyk7');
      })
      
// Logowanie
    // it('Log in', () => {
    //     cy.visit('https://pzp-cuw-next.azurewebsites.net');
    //     cy.contains("a", 'Zaloguj się').click();
    //     cy.get("input[name='email']").type('ztestuje442@gmail.com');
    //     cy.get("input[name='pass']").type('Storczyk7');
    //     cy.get('button.form-button').contains('Zaloguj').click();
    // })
    
// Wybór jednostki
it('Postępowanie ponad unijne - nieograniczony', () => {
    cy.get('a.main-menu__link').contains('Jednostki').click();
    cy.contains('Jednostki').click();
    cy.get('a.au-target').contains('A.W.').click();
    cy.get('a.au-target').contains('Projekty postępowań').click();
    cy.get('a.form-button').contains('Rozpocznij postępowanie').click();
    cy.get("input[name='nazwa']").type(procedureName);
    cy.get('button.form-button').contains('Dodaj').click();
    cy.wait(3000)
    cy.get("input[name='numer']").type(randomProcedureNumber);
    cy.get('#appl-type').select('Nieplanowane');
    cy.get('#typ').select('Wartość zamówienia równa lub przekracza progi unijne');
    cy.get('#tryb').select('Przetarg nieograniczony');
    cy.get('#datapublikacji').type(currentDateFormatted);
    cy.get('#procurementType').select('Dostawy');
    cy.get('#przedmiotzamowienia').type('Testowy przedmiot zamówienia Tego typu BENC asdas asasas');
    cy.get('#opis').type('Opis Testowego postepowania - Przetarg nieograniczony - ponad unijne');
    cy.get('#terminskladania').type(futureDateFormatted);
    cy.get('[au-target-id="569"]').first({multiple: true}).type('355');
    cy.get('[au-target-id="570"]').first().click();
    cy.get('[au-target-id="573"]').eq(2).click();
    cy.get('#wzorpunktacji').select('XD');
    cy.get("input[name='terminmies']").type('3');
    cy.exec('GenerateCertificates.ps1', { log: true });
    cy.log(`Executing command: powershell.exe -File ${powershellScriptPath}`);
    cy.checkFileExist('${randomFruit}.cer', 15000).then((fileExists) => {
      if (fileExists) {
      } else {}
    });
    cy.get('*[class^="form-field form-field--files"]').find('input').eq(1).selectFile(`${randomFruit}.cer`, {force: true});
    cy.get('[au-target-id="750"]').click();
    //cy.get('#certFileInput').selectFile({force: true},'urzad.cer');
    //cy.get('#attachmentFileInput').selectFile('urzad.cer');
    // testerautomat1@gmail.com
    // olsztynautotest@buziaczek.pl
    cy.get('button.form-button').contains('Zapisz').click();
        // Publikacja
    cy.get('[au-target-id="944"]').contains('Opublikuj').click();
    cy.get('[au-target-id="1243"]').contains('Tak').click();
    cy.get('[au-target-id="1009"]').contains('Opublikuj mimo to').click();

    // SKŁADANIE OFERTY X2
    
})
})
