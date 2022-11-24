Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
const emailID =Math.floor(Math.random() * 10000)
context('Given as a visiton access homepage',()=>{
  before(()=>{
    
    cy.visit('/')
    // cy.invoke(emailID).as('ID')
  })
  context('When i click "Free trial" button',()=>{
    before(()=>{
      // cy.get('[href="/registration"]').click()
      cy.visit('/registration')
    })
    it('Registration page should be shown',()=>{
      cy.url().should('contain','registration')
    })
  })
  context('When I dont fill salutation and click Next',()=>{
    before(()=>{
      cy.get('#firstname').type('test')
      cy.get('#lastname').type('test')
      cy.get('[role="menuitem"]').click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })  
  })
  context('When I dont fill first name and click Next',()=>{
    before(()=>{
      cy.get('#salutation').click()
      cy.wait(500)
      cy.get('.p-dropdown-items-wrapper').find('li').eq(0).click()
      cy.get('#firstname').clear()
      cy.get('[role="menuitem"]').click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })    
  })
  context('When I dont fill last name and click Next',()=>{
    before(()=>{
      cy.get('#firstname').type('test')
      cy.get('#lastname').clear()
      cy.get('[role="menuitem"]').click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })  
  })
  context('When i fill all data correctly and click Next',()=>{
    before(()=>{
      cy.get('#salutation').click()
      cy.wait(500)
      cy.get('.p-dropdown-items-wrapper').find('li').eq(0).click()
      cy.get('#firstname').type('test')
      cy.get('#lastname').type('test')
      cy.get('[role="menuitem"]').click()
    })
      it('Error message should be shown',()=>{
        cy.get('#company').should('be.visible')
      })  
  })
  context('When i click back button',()=>{
    before(()=>{
      cy.get('[role="menuitem"]').eq(0).click()
    })
      it('Personal information page should be shown',()=>{
        cy.get('#salutation').should('be.visible')
      })
    after(()=>{
      cy.get('[role="menuitem"]').click()
    })  
  })    
  context('When i dont fill tender experience and click Next',()=>{
    before(()=>{
      cy.get('#company').type('test')
      cy.get('#address-ort').type('test')
      cy.get('#address').type('test')
      cy.get('#email').type('test@test.cy')
      cy.get('#phone').type('123')
      cy.get('[role="menuitem"]').eq(1).click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })
  })    
  context('When i dont fill company name and click Next',()=>{
    before(()=>{
      cy.get('#tenderExperience').click()
      cy.get('.p-dropdown-items-wrapper').find('li').eq(0).click()
      cy.get('#company').clear()
      cy.get('[role="menuitem"]').eq(1).click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })
  })    
  context('When i type wrong email format and click Next',()=>{
    before(()=>{
      cy.get('#company').type('test')
      cy.get('#email').clear().type('test')
      cy.get('[role="menuitem"]').eq(1).click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })        
  })
  context('When i type wrong number format and click Next',()=>{
    before(()=>{ 
      cy.get('#email').clear().type('test@test.cy')
      cy.get('#phone').clear().type('test')
      cy.get('[role="menuitem"]').eq(1).click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })        
  })  
  context('When i fill all data correctly and click Next',()=>{
    before(()=>{ 
      
      cy.get('#email').clear().type('test'+emailID+'@test.cy')
      cy.get('#phone').clear().type('12343')
      cy.get('[role="menuitem"]').eq(1).click()
    })
    it('Search filters page should be shown',()=>{
      cy.get('#branche').should('be.visible')
    })        
  })  
  context('When i dont fill industry field and click Next',()=>{
    before(()=>{ 
      cy.get('[role="menuitem"]').eq(1).click()
    })
      it('Error message should be shown',()=>{
        cy.get('.input-wrapper > .error').should('be.visible')
      })        
  })  
  context('When i dont select any regions and click Next',()=>{
    before(()=>{ 
      cy.get('#branche').type("test")
      cy.get('[role="menuitem"]').eq(1).click()
    })
      it('Terms and conditions page should be shown',()=>{
        cy.get('#contact').should('be.visible')
      })
    after(()=>{
      cy.get('[role="menuitem"]').eq(1).click()
    })           
  })  
  context('When i select some regions and click Next',()=>{
    before(()=>{ 
      cy.get('.checkbox-label > span').filter(':visible').eq(0).click()
      cy.get('.checkbox-label > span').filter(':visible').eq(3).click()
      cy.get('[role="menuitem"]').eq(1).click()
    })
      it('Terms and conditions page should be shown',()=>{
        cy.get('#contact').should('be.visible')
      })
      after(() => {
          cy.reload()
      });
  })  
})
  context('When i try to create an account with an existing email', () => {
    before(() => {
      cy.fixture("users.json").then((user) => {
        cy.register(user.UkDev.username)
      }) 
    });
      it('Thank you message should be shown', () => {
          cy.get('.p-toast-message-content').should('be.visible')
      });
      it('New account should not be created in CRM', () => {
        cy.fixture("users.json").then((user) => {  
        cy.loginAriadne(user.testAriadne.username, user.testAriadne.password) 
        cy.get('.nav > :nth-child(1) > a').click()
//         cy.origin('https://test:ts3@dev-ariadne.infodienst-ausschreibungen.de', () => {
//          cy.visit('/admin/crm/index',{failOnStatusCode: false})

// })
        cy.get('#default-filter').click()
        cy.get('tbody').find('tr').eq(0).should('not.contain', user.UkDev.username);

      });
    });

  context('When i try to create an account with a new email', () => {
      before(() => {
        cy.register('test'+emailID+'@test.cy') 
      });
      it('New account should be created in CRM', () => {
        cy.fixture("users.json").then((user) => {  
        cy.loginAriadne(user.testAriadne.username, user.testAriadne.password) 
        cy.get('.nav > :nth-child(1) > a').click()
        cy.get('li').contains('All customers').click()
        cy.get('tbody').should('contain', emailID);
      });
    });
      it('New account should have status "Registered (without DOI)"', () => {
        cy.get('tbody').find('tr').contains('test'+emailID+'@test.cy').prev().prev().prev().prev().prev().should('contain','Registered (without DOI)')
    });
  
  context('When i open the link from email', () => {
    before(() => {
        
    
    cy.fixture("users.json").then((user)=>{
      cy.loginAriadne(user.testAriadne.username, user.testAriadne.password)
      cy.get('.nav > :nth-child(1) > a').click()
      cy.get('tbody').find('tr').contains('test'+emailID+'@test.cy').prev().prev().prev().prev().prev().prev().prev().prev().prev().find('.linkNotDecorated').click()
      cy.get('#myTab1').find('li').eq(4).click()
      cy.get('.table > tbody > :nth-child(2) > :nth-child(2) > a').then((opt)=>{
        let optin = opt.text()
        cy.log(optin)
        cy.get('#s1 > .table-responsive > .table > tbody > :nth-child(1) > :nth-child(4)').then((user)=>{
          let ID=user.text()
          cy.log(ID)
          cy.intercept('/api/registration/doi?doiToken='+optin).as('registration')
      cy.visit('https://test:ts3@dev.tender-service.co.uk/wizardRegistration/doubleOptIn/'+optin+'/'+ID+'?lang=en',{failOnStatusCode: false});
      cy.wait('@registration',{timeout:20000})

      })
    })
    }) 
  });
      it('New password page should open', () => {
        cy.url().should('contain', 'wizardRegistration')
    }); 
  });
  context('When i add new password shorter than 8 characters', () => {
    before(() => {
      cy.wait(3000)  
      cy.get('input').eq(0).type(String(123456))
      cy.get('input').eq(1).type(String(123456))
      cy.get('button').contains('Change').click()
      cy.wait(3000)
      })
      it('Error message should be shown', () => {
        cy.get('.p-message-error').should('be.visible');
    });
  })
  context('When i add new password with 8 characters', () => {
    before(() => {
        
      cy.get('input').eq(0).clear().type(String(12345678))
      cy.get('input').eq(1).clear().type(String(12345678))
      cy.get('button').contains('Change').click()
      })
      it('I should be taken to login', () => {
        cy.url().should('contain','login');
      });
      it('newly registered account should be able to login', () => {
        
        cy.wait(10000)
        cy.login('test'+emailID+'@test.cy',12345678)
        cy.url().should('contain','dashboard')
      });
      it('In CRM, its status should be "Test to be checked"', () => {
        cy.fixture("users.json").then((user) => {  
          cy.loginAriadne(user.testAriadne.username, user.testAriadne.password) })
          cy.get('.nav > :nth-child(1) > a').click()
        cy.get('tbody').find('tr').contains('test'+emailID+'@test.cy').prev().prev().prev().prev().prev().should('contain', 'Test to be checked');
      });
      it('Country address should  be correct', () => {
        cy.fixture("users.json").then((user) => {  
          cy.loginAriadne(user.testAriadne.username, user.testAriadne.password) }) 
          cy.get('.nav > :nth-child(1) > a').click()
        cy.get('tbody').find('tr').contains('test'+emailID+'@test.cy').prev().prev().prev().prev().prev().prev().prev().prev().prev().find('a').click()
        cy.get('#s1 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)').should('not.contain', 'DE');
        cy.get('#s1 > div > table > tbody > tr:nth-child(6) > td:nth-child(4)').should('not.contain', 'DE');
        cy.get('#myTab1 > li:nth-child(2) > a').click()
        .get('#s2 > div > table > tbody > tr:nth-child(4) > td:nth-child(4)')
        .should('not.contain', 'DE');
      });
  })
});
}) 

describe('Change password', () => {
context('Given i open password reset page', () => {
    before(() => {
    cy.visit('/login')
    cy.get('.content  a').click()
    });
    context('When i type email and click "Reset my password"', () => {
    before(() => {
      cy.fixture("users.json").then((user)=>{
        cy.wait(3000)
        cy.get('.form-input > .ng-untouched').type(user.UkDev.username)
      })
    });  
    it('Request should be succesful', () => {
      cy.intercept('/api/user/request-password-reset?captchaToken=&email=621082@test.com').as('resetPassword')
      cy.get('.forgot-password > button').click({force:true})
      cy.wait('@resetPassword').its('response.statusCode', {timeout:0}).should('eq', 200 || 204)
        });
    it('Validation message should be shown', () => {
        cy.get('.p-message-wrapper').should('be.visible')
    });
    it('Error message should not be shown', {
        retries: {
        runMode: 0,
        openMode: 0,
        },
    }, () => {
        cy.wait(1000)
            cy.get('.p-toast-message-content', {timeout:1000}).should('not.exist')
        });
    
        });
        });
});