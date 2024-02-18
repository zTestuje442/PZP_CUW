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

context('Postępowanie ponad unijne - nieograniczony', () => {
    // Logowanie
      beforeEach(() => {
        cy.login('ztestuje442@gmail.com', 'Storczyk7');
      })

// Wybór jednostki
it('Stworzenie oferty ponad unijne - nieograniczony', () => {
    cy.get('a.main-menu__link').contains('Jednostki').click();
    cy.contains('Jednostki').click();
    cy.get('a.au-target').contains('A.W.').click();
    cy.get('a.au-target').contains('Projekty postępowań').click();
    cy.get('a.form-button').contains('Rozpocznij postępowanie').click({force: true});
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
    cy.get('[au-target-id="572"]').first({multiple: true}).type('355');
    cy.get('[au-target-id="573"]').first().click();
    cy.get('[au-target-id="576"]').eq(2).click();
    cy.get('#wzorpunktacji').select('XD');
    cy.get("input[name='terminmies']").type('3');
    cy.exec('GenerateCertificates.ps1', { log: true });
    cy.log(`Executing command: powershell.exe -File ${powershellScriptPath}`);
    cy.checkFileExist('${randomFruit}.cer', 8000).then((fileExists) => {
      if (fileExists) {
      } else {}
    });
    cy.get('*[class^="form-field form-field--files"]').find('input').eq(1).selectFile(`${randomFruit}.cer`, {force: true});
    cy.get('[au-target-id="753"]').click();
    
    cy.get('button.form-button').contains('Zapisz').click();
        // Publikacja
    cy.get('[au-target-id="947"]').contains('Opublikuj').click();
    cy.get('[au-target-id="1246"]').contains('Tak').click();
    cy.get('[au-target-id="1012"]').contains('Opublikuj mimo to').click();
    cy.wait(1500);
    
})
        // PUBLIKACJA KWOTY
    it("Publikacja kwoty brutto", () => {
    cy.get('#image3797').click()
    cy.get('h2').contains(randomFruit).click() // Dodać ${randomFruit}
    cy.wait(3000)
    cy.get('[au-target-id="1548"]').contains('Upublicznij kwotę brutto przeznaczoną na sfinansowanie').click();
    cy.get("input[name='displayIntendedAmount']").type(120000);
    cy.get('[au-target-id="2507"]').contains('Zapisz').click();
    cy.wait(1500);
  })

})
        // ZŁOŻENIE OFERT 
    context('Postępowanie ponad unijne - nieograniczony cd.', () => {
    
    it("Złożenie oferty", () => {
   
    cy.visit('https://pzp-cuw-next.azurewebsites.net');
    cy.contains("a", 'Zaloguj się').click();
    cy.get("input[name='email']").type('testerolsztynwyk1@op.pl');
    cy.get("input[name='pass']").type('Ponczek123!');
    cy.get('button.form-button').click();
    cy.get('a.main-menu__link').contains('Strona główna').click();
    cy.get('#image3797').click();
    cy.get('h2').contains(randomFruit).click(); // Dodać ${randomFruit}.cer
    //cy.get('select').select(1);
    cy.get('button.form-button').contains('Dodaj ofertę').click();
    cy.get("input[name='token']").type('a');
    cy.get('button.form-button').contains('Dodaj ofertę').click();
    //cy.get('[au-target-id="356"]').click();
    cy.get('*[class^="form-field form-field--files"]').find('input').eq(0).selectFile(`Formularz ofertowy zal. nr 1do SIWZ.doc`, {force: true});
    cy.get('button.form-button').contains('Zapisz').click();
    cy.get("input[name='token']").type('a');
    cy.get('button.form-button').contains('Dodaj').click();
    cy.wait(2000);
    cy.get('button.form-button').contains('Złóż ofertę').click();
    cy.get('*[class^="modal-dialog"]').find('input').type('a');
    cy.wait(15000);
    cy.get('button.form-button').contains('Tak').click();
  })
})  
  
  // OTWARCIE OFERT
  context('Postępowanie ponad unijne - nieograniczony cd-2.', () => {

    beforeEach(() => {
          cy.login('ztestuje442@gmail.com', 'Storczyk7');
        })
    
    it("Otwarcie stworzeonej oferty", () => {
    cy.get('#image3797').click();
    cy.get('h2').contains(randomFruit).click(); // Dodać ${randomFruit}
    cy.get('[au-target-id="1540"]').contains('Otwórz oferty').click();
    cy.get('#commOpen').select('Komisja 1');
    cy.get('*[class^="form-button au-target"]').find('input').selectFile(`${randomFruit}.pfx`, {force: true}); // dodać ${randomFruit}.cer
    cy.get('*[class^="grid-line"]').find("input[id='hasloField']").type('a');
    cy.get('[au-target-id="2527"]').contains('Otwórz oferty').click();
  })
})

