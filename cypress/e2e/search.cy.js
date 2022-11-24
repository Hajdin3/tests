Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

/*
Given('I login page', () => {
  cy.fixture("users.json").then((user) => {
    cy.login(user.UkDev.username, user.UkDev.password);
  })
})
When('I click search', (username, password) => {
  cy.get('#navigation-menu > ul > app-navigation-element:nth-child(4) > li > span > span').click() 
})
Then('Search profiles should be visible', () => {
  cy.get('body > app-root > div > main > app-search-profile > div > app-search-profiles-filters > div.flex.flex-wrap.ng-star-inserted > p-togglebutton:nth-child(1) > div > span').should('be.visible', {timeout: 10000})
})
*/





  context("Given i access portal as a costumer", () => {
    before(() => {
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
        cy.intercept('/api/tender-search/numberOfTendersByDocumentType').as("list")
        cy.intercept('/api/customer-profile/customerSearchProfiles').as('CSPs')
      })
    })
  context("When i Click search page", () => {
    before(()=>{
      cy.visit("/search-profile");
      cy.wait(2000)
    })
      it("Search page should open", () => {
        cy.url().should("contain", "search-profile");
        cy.wait(500)
      });
      it("Filters should be visible", () => {
        
        cy.get("app-filter-list-item")
        .should("have.length.at.least", 3);
      });
      it("Search results should be visible", () => {
        cy.get("app-tender-table")
        .find("tbody")
        .find("td")
        .should("have.length.greaterThan", 0);
      });
      it("Search profiles should be visible", () => {
        cy.get("app-search-profiles-filters")
          .find("p-togglebutton")
          .should("have.length", 5);
      });
    });

    
  context( "When I Save a CSP",() => {
    before(() => {
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
        cy.visit("/search-profile");
        cy.wait(2000)
        // cy.get(".content").find("button").click();
      })
        cy.intercept('/api/tender-search/numberOfTendersByDocumentType').as("list")
        cy.intercept('/api/customer-profile/customerSearchProfiles').as('CSPs')
        cy.get("app-search-profiles-filters")
          .find("p-togglebutton")
          .eq(0)
          .click();
          cy.wait(1000)
        cy.get('[inlinesvg="assets/icons/ic_content-save-outline.svg"]').click({ force: true });
        cy.get('[role="dialog"]')
          .find(".p-dialog-content")
          .find("input")
          .eq(0)
          .clear({ force: true })
          .type("Cy test CSP");
        cy.get(".p-dialog-footer")
          .find("button")
          .eq(1)
          .click({ force: true });
        cy.wait('@CSPs')
    });

      it("Should be visible on My search querries", () => {
        cy.visit("/my-search-queries");
        cy.get("p-table").should("contain", "Cy test CSP");
      });

    afterEach("Delete created CSP", () => {
        cy.visit("/my-search-queries");
        cy.get("p-table")
          .find("tr")
          .last()
          .find("img")
          .eq(0)
          .click({ force: true });
        cy.get(".p-confirm-dialog").find('.p-dialog-footer').find('button').eq(1).click({force:true});
        });
    });
  });
  context('Given i disable editing CSPs in Ariadne', () => {
      before(() => {
          cy.fixture("users.json").then((user)=>{
            cy.loginAriadne(user.testAriadne.username,user.testAriadne.password)
          });
          cy.get('[name="portalid"]').select('DEV-UK-Portal')
          cy.fixture("users.json").then((user)=>{
            cy.get('#search-fld').type(user.UkDev.username+"{enter}")
            cy.get('.linkNotDecorated > .fa').click()
          })

            cy.get('#content').find('div').eq(1).find('a').eq(0).click().wait(500)
            cy.get('#allowCspUpdate > .checkbox > i').click().wait(500)
            cy.get('#submit-edit-customer-form').click()
            cy.wait(5000)
          })
      context('When I open CSPs on TS4', () => {
        before(() => {
          cy.fixture("users.json").then((user) => {
          cy.login(user.UkDev.username, user.UkDev.password);
          cy.openTestCSP()
        });
      });
      it('Then i should not be able to edit CSPs', () => {
        cy.get('[disabled=""] > :nth-child(2)').should('be.visible')
        cy.url().should('contain', 'search-profile');
      });
      });
      after(() => {
        cy.visit('https://test:ts3@dev-ariadne.tender-service.co.uk/admin/')

        cy.get('[name="portalid"]').select('DEV-UK-Portal')
        cy.fixture("users.json").then((user)=>{
          cy.get('#search-fld').type(user.UkDev.username+"{enter}")
          cy.get('.linkNotDecorated > .fa').click()
          cy.get('#content').find('div').eq(1).find('a').eq(0).click().wait(500)
          cy.get('#allowCspUpdate > .checkbox > i').click().wait(500)
          cy.get('#submit-edit-customer-form').click()
          cy.wait(5000)
        })
      });
  });
  context('Given i open a CSP', () => {
    before(() => {
      cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      cy.openCSPs()
      cy.get("table").find("tr").last().find("td").eq(0).click({force:true});
    });
  });
  context('When i change its name', () => {
    before(() => {
      cy.get('app-command-bar').find('[inlinesvg="assets/icons/ic_content-save-outline.svg"]').click()
      cy.get('#profileNameInput').clear().type('testNameChanged')
      cy.get('.p-dialog-footer').find('button').last().click()
      cy.wait(2000)
    });
    
    
    it('Name should be changed', () => {
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
        cy.openCSPs()
      })
      cy.get("table").find("tr").last().should('contain', 'testNameChanged')    
      });
    });
    context('When i add a keyword, excluded keyword, CVP code and excluded CVP code', () => {
      before(() => {
          cy.fixture("users.json").then((user) => {
            cy.login(user.UkDev.username, user.UkDev.password);
          })
          cy.openTestCSP()
          cy.get('app-keyword-input').first().find('[inputid="chipsInput"]').type('tkw{enter}')
          cy.get('app-keyword-input').last().find('[inputid="chipsInput"]').type('tekw{enter}')
          cy.get('app-cpv-input').first().find('input').type('1').wait(1000)
          cy.get('[role="option"]').first().click()
          cy.get('app-cpv-input').last().find('input').type('4').wait(1000)
          cy.get('[role="option"]').first().click()
          cy.get('app-command-bar').find('[inlinesvg="assets/icons/ic_content-save-outline.svg"]').click()
          cy.get('.p-dialog-footer').find('button').last().click()
          cy.wait(2000)
        });
        it('Keyword should be shown', () => {
          cy.get("table").find("tr").last().find("td").eq(0).click({force:true});
          cy.get('app-keyword-input').should('contain', 'tkw').and('contain', 'tekw')
          cy.get('app-cpv-input').should('contain', '1*').and('contain', '4*')

        });
    });
    context('When i delete keywords and CVPs', () => {
      before(() => {
          cy.fixture("users.json").then((user) => {
            cy.login(user.UkDev.username, user.UkDev.password);
          })
          cy.openTestCSP()
          cy.get('app-keyword-input').first().find('[inputid="chipsInput"]').type('{backspace}')
          cy.get('app-keyword-input').last().find('[inputid="chipsInput"]').type('{backspace}')
          cy.get('app-cpv-input').first().find('input').type('{backspace}')
          cy.get('app-cpv-input').last().find('input').type('{backspace}')
          cy.get('app-command-bar').find('[inlinesvg="assets/icons/ic_content-save-outline.svg"]').click()
          cy.get('.p-dialog-footer').find('button').last().click()
          cy.wait(2000)
        });
        it('Keyword should be shown', () => {
          cy.openTestCSP()
          cy.get('app-keyword-input').should('not.contain', 'tkw').and('not.contain', 'tekw').and('not.contain', '1').and('not.contain', '4')
        });
    });
    context('When i add filters', () => {
      before(() => {
          cy.fixture("users.json").then((user) => {
            cy.login(user.UkDev.username, user.UkDev.password);
          })
          cy.openTestCSP()
          cy.get('app-filter-list').find('app-filter-list-item').eq(1).click()
          .wait(500)
          cy.get('.p-listbox-list > :nth-child(1)').click();  
          cy.get('app-command-bar').find('[inlinesvg="assets/icons/ic_content-save-outline.svg"]').click()
          cy.get('.p-dialog-footer').find('button').last().click()
          cy.wait(2000)
        });
        it('Keyword should be shown', () => {
          cy.get("table").find("tr").last().find("td").eq(0).click({force:true});
          cy.get('p-panel').should('contain', 'Nature of Contract:')
        });
        after(() => {
          cy.get('p-chip').contains('Nature of Contract:').find('.pi-chip-remove-icon').click()
          cy.get('app-command-bar').find('[inlinesvg="assets/icons/ic_content-save-outline.svg"]').click()
          cy.get('.p-dialog-footer').find('button').last().click()
          cy.wait(2000)
        });
    });
    context('When i open a complex CSP', () => {
      before(() => {
          cy.fixture("users.json").then((user) => {
            cy.login(user.UkDev.username, user.UkDev.password);
          })
          cy.openCSPs()
          cy.get("table").find('tbody').find("tr").first().find("td").eq(0).click({force:true});
          cy.wait(2000)
        });
        it('Keyword should be shown', () => {
          cy.get('[inlinesvg="assets/icons/ic_read_only.svg"]').should('be.visible');
          cy.get('app-command-bar').find('[disabled=""]').click({force:true})
          cy.get('[role="dialog"]').should('not.exist')
          cy.get('app-filter-list .flex-wrap [type="button"]').should('not.exist');
        });

    });
      
  });
  context("Given i open a CSP", () => {
    before(() => {
      cy.intercept('/api/tender-search/numberOfTendersByDocumentType').as('tendersByType')
      cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      cy.visit("/my-search-queries");
      cy.get("table").find("td").eq(0).click({force:true});
      });
    });

    context("When I open tender from results", () => {
      before(() => {
        cy.wait('@tendersByType')
        cy.get("#pr_id_15-table > tbody > tr:nth-child(1) > td.tender-td-title > a > span").click();
      });

        it("I should be taken to private tender details page", () => {
          cy.url().should("contain", "/p/dv/");
        });
        it.only("Tender title should be shown", () => {
          cy.get(".headline1-text").should("be.visible");
        });
        it("Basic details", () => {
          cy.get("app-subheading-summary").should("be.visible");
        });
        it("Quick action buttons should be shown", () => {
          cy.get("app-quick-actions")
            .find("button")
            .should("be.visible")
            .and("have.length", 6);
        });
        it("Other tabs should be shown", () => {
          cy.get("p-tabview")
            .find('[role="presentation"]')
            .should("be.visible")
            .and("have.length", 5);
        });

        it("Basic information should be shown", () => {
          cy.get("app-details").should("be.visible");
        });
    });
  })
context('Given i open a tender detail page', () => {
before(() => {
  cy.fixture("users.json").then((user)=>{
    cy.login(user.UkDev.username,user.UkDev.password)
  })
    cy.fixture("tenders.json").then((tenders)=>{
      cy.visit("/p/dv/"+tenders.UkDev.tenderWithAttachment+"/attached-documents")
    })
});
    

    context("When i click on 'full text'", () => {
      before(() => {
        cy.get("p-tabview").find("span").eq(1);
      });

      it("Full text should be shown", () => {
        cy.get("p-tabview")
          .find("span")
          .should("be.visible")
          .and("have.length", 6);
      });
    });

    context("When i click on Attached documents", () => {
      before(() => {
        cy.get("p-tabview").find("span").eq(2);
      });

        it("Download all button sholuld be shown", () => {
          cy.get("body").then(($body) => {
            if ($body.find("app-attached-documents").length) {
              cy.get("app-attached-documents")
                .find("img")
                .should(
                  "have.attr",
                  "src",
                  'assets/icons/ic_arrow-collapse-down-secondary.svg'
                );
              cy.get("app-attached-documents").find("span").should("be.visible");
            } else {
              assert("ok");
            }
        });
      });
    });
    context("When i click on 'Contractors'", () => {
      before(() => {
        cy.get("p-tabview").find("span").eq(3).click();
      });

      it("Contractors table should be shown", () => {
        cy.get("table").should("be.visible");
      });
    });

    context("When i click on 'Related notifications'", () => {
      before(() => {
        cy.get("p-tabview").find("span").eq(4).click();
      });
      it("Related notifications table should be shown", () => {
        cy.get("table").should("be.visible");
      });

    });
    });
describe('Document types', () => {
      context('Given i open search profiles as a user', () => {
          beforeEach(() => {
            cy.fixture("users.json").then((user) => {
              cy.login(user.UkDev.username, user.UkDev.password);
              cy.visit("/search-profile")
              cy.wait(2000)
            })
          });
        context('When i click on "tender"', () => {
            beforeEach(() => {
                cy.get('app-global-search-type').find('span').filter(':visible').eq(1).click()
            });
            it('Only tenders should be shown on results', () => {
              cy.get('.p-tabview-scrollable').should('not.exist')
              cy.get('#p-panel-2-titlebar').should('contain','Tenders')
              cy.get('app-tender-table').find('tr').should('have.length.least', 2)
            });
        });
        context('When i click on "Contracts"', () => {
            beforeEach(() => {
                cy.get('app-global-search-type').find('span').filter(':visible').eq(2).click()
            });
            it('Only contracts should be shown on results', () => {
                cy.get('.p-tabview-scrollable').should('not.exist')
                cy.get('#p-panel-2-titlebar').should('contain','contract')
                cy.get('app-tender-table').find('tr').should('have.length.least', 2)
            });
        });
        context('When i click on "Authorities"', () => {
            beforeEach(() => {
                cy.get('app-global-search-type').find('span').filter(':visible').eq(3).click()
            });
            it('Authorities should be shown on results', () => {
              cy.get('.p-datatable-tbody').find('tr').eq(0).find("td").eq(0).click()
              cy.wait(2000)
              cy.url().should('contain', 'authorit')
            });
        });
        context('When i click on "Contractors"', () => {
            beforeEach(() => {
                cy.get('app-global-search-type').find('span').filter(':visible').eq(4).click()
            });
            it('Authorities should be shown on results', () => {
              cy.get('.p-datatable-tbody').find('tr').eq(0).find("td").eq(0).click()
              cy.wait(2000)
              cy.url().should('contain', 'contractor')
            });
        });
      });
    });

      context('Given I login as a user who has XLS export enabled',()=>{
        beforeEach(()=>{
          cy.fixture("users.json").then((user) => {
          cy.login(user.UkDev.username, user.UkDev.password);
        })
        })
      context('When i open search-profile and click "Export results" button',()=>{
          beforeEach(()=>{
            cy.visit('/search-profile')
            cy.get('[inlinesvg="assets/icons/ic_arrow-collapse-down.svg"]').click()
            cy.get('p-confirmdialog').find('.p-confirm-dialog-accept').click()
          })
            it('a file named "Tender-Export.xlsx" should be downloaded ',()=>{
              cy.wait(5000)
              cy.readFile("C:\Users\hajdi\OneDrive\Desktop\TSG e2e cypress\UsershajdiOneDriveDesktopTSG e2e cypresscypressdownloads\Tender-Export.xlsx").should('exist');
            })
        })
      })
    
  context('Given I login as a user who does not have XLS export disabled',()=>{
    beforeEach(()=>{
      cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev2.username, user.UkDev2.password);
    })
  })
  
    context('When i open search-profile',()=>{
      beforeEach(()=>{
      cy.visit('/search-profile')    
      })
      it('The "Export results" button should not be shown',()=>{
        cy.get('[inlinesvg="assets/icons/ic_arrow-collapse-down.svg"]').should('not.exist')
      })
    })
  })

context('Given i open my search querries', () => {
const emailID =Math.floor(Math.random() * 10000)
beforeEach(()=>{
  cy.fixture("users").then((user)=>{
    cy.login(user.UkDev.username,user.UkDev.password)
    cy.visit('/my-search-queries')
  })
})

  context('When i check interface', () => {

    it('My CSPs should be visible', () => {
        cy.get('table').find('tr').eq(1).find('td').should('have.length',3);
      });
    });
    context('When i click on alert emails', () => {
      beforeEach(()=>{
        cy.get('#p-tabpanel-1-label').click()
        cy.wait(1000)
      })
      it('My alert emails should be visible', () => {
        cy.get('table').should('be.visible');
        cy.get('table').filter(':visible').find('tr').eq(1).find('td').should('have.length',4);
    });
});
    context('When i edit a contact', () => {
      beforeEach(()=>{
        cy.intercept('/api/customer-profile/searchResultEmailConfigs').as('emailConfig')
        cy.get('#p-tabpanel-1-label').click()
        cy.wait(1000)
        cy.get('table').filter(':visible').find('tr').eq(1).find('.edit').last().click();
        cy.get('.p-dialog-content').find('[alt="edit_email"]').first().click()
        cy.get('#email').clear().type('email'+emailID+'@email.co')
        cy.get('.p-dialog-content').find('[type="submit"]').click({force:true,multiple:true})
        cy.wait(500)
        cy.get('[type="submit"]').click({force:true,multiple:true})
        cy.wait(500)

      })
      it('Changes should be shown', () => {
        cy.get('table').filter(':visible').find('tr').eq(1).should('contain','email'+emailID+'@email.co',);
    });
});
    context('When i add a contact', () => {
      beforeEach(()=>{
        cy.intercept('/api/customer-profile/searchResultEmailConfigs').as('emailConfig')
        cy.get('#p-tabpanel-1-label').click()
        cy.wait(1000)
        cy.get('table').filter(':visible').find('tr').eq(1).find('.edit').last().click();
        cy.get('.p-dialog-content').find('button').click()
        cy.get('#salutation').click()
        cy.get('p-dropdownitem').eq(1).click()
        cy.get('#firstName').type('firstName')
        cy.get('#lastName').type('lastName')
        cy.get('#email').type('email@cypress.io')
        cy.get('.p-dialog-content').find('[type="submit"]').click({force:true,multiple:true})
        cy.wait(500)
        cy.get('[type="submit"]').click({force:true,multiple:true})
        cy.wait(500)

      })
      it('Contact should be added', () => {
        cy.get('table').filter(':visible').find('tr').eq(1).should('contain','email@cypress.io');
    });
    after(()=>{
      cy.get('div').contains('email@cypress.io').find('img').click()
      cy.get('.p-dialog-content').find('button').eq(0).click()
      cy.wait(500)
    })
});
    context('When i add an Alert email', () => {
      beforeEach(()=>{
        cy.get('#p-tabpanel-1-label').click()
        cy.wait(1000)
        cy.get('p-button').find('button').click()
        cy.get('.p-dialog-content').find('#name').clear().type('testAlert')
        cy.get('.p-dialog-content').find('.p-button-label').click()
        cy.get('#salutation').click()
        cy.get('p-dropdownitem').eq(1).click()
        cy.get('#firstName').type('firstName')
        cy.get('#lastName').type('lastName')
        cy.get('#email').type('email@cypress.io')
        cy.get('.p-dialog-content').find('[type="submit"]').click({force:true,multiple:true})
        cy.wait(500)
        cy.get('.p-multiselect-label').click()
        cy.get('.p-multiselect-items').eq(0).click()
        cy.get('.p-multiselect-close-icon').click()
        cy.get('.p-dialog-footer').find('button').eq(1).click({force:true,multiple:true})
        cy.wait(500)
        
      })
      it('New alert should be shown', () => {
        cy.get('table').find('tr').last().should('contain','testAlert')
    });
    after(()=>{
      cy.get('table').find('tr').last().find('.edit').last().click()
      cy.get('.p-dialog-footer').find('button').eq(0).click()
      cy.get('.p-dialog-footer').find('button').eq(1).click()
      cy.wait(500)
    })
});
});

context.skip('Given i add a tender in Ariadne', () => {
  before(() => {
    cy.fixture("users.json").then((user) => {  
      cy.addTender(user.testAriadne.username, user.testAriadne.password) 
    })
    cy.fixture("tenders.json").then((tenders)=>{
    const iFrame=cy.get('#cke_6_contents > .cke_wysiwyg_frame')
    .its('0.contentDocument.body')
    .then(cy.wrap)
      iFrame.type('Full text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
    });
    cy.get('#status').select('ACTIVE')
    cy.get('#natureOfContract').select('PUBLIC_WORKS_CONTRACT')
    cy.get('#description_en').type('Short description about tender')
    cy.get('#title_en').type('test tender cypress')
    cy.get('[name="typeOfDocument"]').select('TENDER')
    cy.get('#tabs').find('li').eq(3).click()
    cy.get('#0_realisationAddressNutsCode').type('UKC')
    // cy.get('.pull-right').last().find('a').eq(5).click()
    // cy.wait('@user',{timeout:60000})
    })  
  it('Should be shown in TS4 search', () => {
      cy.fixture('users.json').then((user)=>{
        cy.login(user.UkDev.username,user.UkDev.password)
      })
      cy.visit('/search-profile')
      cy.get('.keywords').eq(0).find('li').filter(':visible').type('test tender cypress {enter}')
      cy.get('.tender-td-title').should('contain', 'test tender cypress')
  });
});  

describe.skip('Download attachment from Ariadne', () => {
before(() => { 
  cy.fixture("users.json").then((user)=>{
    cy.loginAriadne(user.testAriadne.username,user.testAriadne.password)
  })
  cy.fixture("tenders.json").then((tender)=>{
    cy.visit('https://test:ts3@test-ariadne.tender-service.co.uk/admin/tenderViewEdit/editTender/?tenderUuid='+tender.UkDev.tenderWithAttachment+'&userCountry=UK')
  })
  cy.get('#tenderAttachmentsTable').find('td').contains('a').filter(':visible').eq(0).then((table) => {
              table.attr('download', '');
          })
          .click();
  // cy.get('#tenderAttachmentsTable').find('td').contains('a').filter(':visible').eq(0).click();

});
it('File should be downloaded', () => {
  cy.wait(4000)
    cy.readFile('cypressdownloads/test-attachment.pdf').should('exist')
});
});


