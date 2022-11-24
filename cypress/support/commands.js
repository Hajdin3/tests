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


  
  export function login(username, password) {
    cy.visit("/login",{failOnStatusCode: false})
    cy.wait(3000)
    cy.intercept("/api/user").as("loginRequest");
    cy.get('[type="text"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.get('.content').find("button").click(); 
    // cy.wait("@loginRequest"), { setTimeout: 20000 };
    cy.intercept("/api/statistics/getTenderCount").as("load");
    cy.intercept('/api/customer-management').as('list')
  }
  
  Cypress.Commands.add("login", login);
  
  
  export function loginAriadne(username, password) {
    cy.visit('https://test:ts3@dev-ariadne.tender-service.co.uk/admin/login/auth');
    cy.get('#j_username').type(username)
    cy.get('#j_password').type(password)
    cy.get('#submit_login').click()
    cy.wait(2000)
  };
  
  Cypress.Commands.add("loginAriadne", loginAriadne);
  
  
  //Registration
  
  export function register(email) {
      let emailID=352
      cy.intercept('/api/registration/register').as('registration')
      cy.visit("/registration",{failOnStatusCode: false})
      cy.wait(3000)
      cy.get('#salutation').find('.p-dropdown-trigger-icon').click()
      cy.get('.p-dropdown-items-wrapper').find('li').eq(0).click()
      cy.get('#firstname').type('test')
      cy.get('#lastname').type('test')
      cy.get('[role="menuitem"]').click()
      cy.get('#company').type('test')
      cy.get('#tenderExperience').click()
      cy.get('.p-dropdown-items-wrapper').find('li').eq(0).click()
      cy.get('#email').clear().type(email)
      cy.get('#phone').clear().type('12343')
      cy.get('[role="menuitem"]').eq(1).click()
      cy.get('#branche').type("test",{force:true})
      cy.get('.checkbox-list').find('li').eq(0).click()
      cy.get('.checkbox-label > span').eq(0).click()
      cy.get('.checkbox-label > span').eq(3).click()
      cy.get('[role="menuitem"]').eq(1).click()
      cy.get('.checkbox-container').find('.checkbox-label > span').eq(1).click()
      cy.get('[role="menuitem"]').eq(1).click()
      cy.wait('@registration')
    }
    
    Cypress.Commands.add("register", register);
  
    
    
    
    //Favorites 
    
    export function noTenders(category) {
      cy.get('.p-accordion-header').eq(category).then((header)=>{
        let title=Cypress.$('.p-accordion-header').eq(category).find('.header__title').text()
        let number=title.substring(title.indexOf('#') + 1);
        let results=Number(number.replace(/[)]/g,''))
        
        cy.log(results)
        if(results===0){    
          cy.get('.noResults__message').should('be.visible')
        } else {
          assert("there are tenders")
        }
      })
    };
    Cypress.Commands.add("noTenders", noTenders);
    
    
    export function withTendersTableheader(category, item) {
      cy.get('.p-accordion-header').eq(category).then((header)=>{
        let title=Cypress.$('.p-accordion-header').eq(category).find('.header__title').text()
        let number=title.substring(title.indexOf('#') + 1);
        let results=Number(number.replace(/[)]/g,''))
        cy.log(results)
        if(results>0){    
          cy.get('.p-datatable-thead').filter(':visible').find('th').eq(item).should('be.visible')
        } else {
          assert("there are no tenders")
        }
      })
    };
    Cypress.Commands.add("withTendersTableheader", withTendersTableheader);
    
    
    export function tenderData(category, item) {
      cy.get('.p-accordion-header').eq(category).then((header)=>{
        let title=Cypress.$('.p-accordion-header').eq(category).find('.header__title').text()
        let number=title.substring(title.indexOf('#') + 1);
        let results=Number(number.replace(/[)]/g,''))
        cy.log(results)
        if(results>0){    
          for(let i=0;i<results;i++){
            cy.get('.p-accordion-tab').eq(category).find('.p-datatable-tbody').find('tr').eq(i).find('td').eq(item).should('not.be.checked')
          }
        } else {
          assert("there are no tenders")
        }
      })
    };
    Cypress.Commands.add("tenderData", tenderData);
  
  
    export function openFavourites() {
      cy.visit('/my-favorites')
        cy.wait(3000)
    };
    Cypress.Commands.add("openFavourites", openFavourites);
    
    
    export function openSectors() {
      cy.visit('/p/branch')
        cy.wait(3000)
    };
    Cypress.Commands.add("openSectors", openSectors);
    
    export function openRegions() {
      cy.visit('/p/regions')
        cy.wait(3000)
    };
    Cypress.Commands.add("openRegions", openRegions);
  
  
    export function openCSPs() {
      cy.visit('/my-search-queries')
        cy.wait(3000)
    };
    Cypress.Commands.add("openCSPs", openCSPs);
  
    export function openTestCSP() {
      cy.visit('/my-search-queries')
      cy.get('table').find('tbody').find('tr').last().find('td').first().click()
        cy.wait(3000)
    };
    Cypress.Commands.add("openTestCSP", openTestCSP);
  
  
    export function addTender(username,password) {
      cy.visit('https://test:ts3@dev-ariadne.infodienst-ausschreibungen.de/admin/tenderViewEdit/createTender/47/?userCountry=UK')
      cy.get('#j_username').type(username)
      cy.get('#j_password').type(password)
      cy.get('#submit_login').click()
      cy.wait(2000)
    };
    Cypress.Commands.add("addTender", addTender);
  
    
    
  