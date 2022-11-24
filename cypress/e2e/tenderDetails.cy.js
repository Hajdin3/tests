Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
context('Given i open a tender', () => {
    before(() => {
        
    cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
    })
    cy.fixture("tenders.json").then((tender) => {
        cy.visit('/p/dv/'+tender.UkDev.tenderWithAttachment);
    })
    });
    context('When i check elements', () => {
    it('All data should be visible', () => {
        cy.get('.header')
        .get('app-subheading-summary')
        .get('app-quick-actions')
        .get('app-quick-actions') 
        .get('.p-tabview-nav') 
        .get('app-details') 
        .should('be.visible') 
    });  
    });  
    context('When i check other tabs', () => {
    it('Full text should be shown', () => {
        cy.get('#p-tabpanel-1-label > .p-tabview-title').click()
        cy.url().should('contain', 'full-text')
    });  
    it('Attached document should be shown', () => {
        cy.get('#p-tabpanel-2-label > .p-tabview-title').click()
        cy.url().should('contain', 'attached-documents')
    });
    it('Contractors should be shown', () => {
        cy.get('#p-tabpanel-3-label > .p-tabview-title').click()
        cy.url().should('contain', 'contractors')
    });
    it('Related notifications should be shown', () => {
        cy.get('#p-tabpanel-4-label > .p-tabview-title').click()
        cy.url().should('contain', 'related-notifications')
    });
    });
    // context('When i click "print"', () => {
    //     before(() => {
    //       cy.window().then(win => {
    //         printStub = cy.stub(win, 'printJS')
    //       })
    //         cy.get('app-quick-actions').find('button').eq(1).click()
    //     });
    //     it('Printing page should open', () => {
    //     });
    // });
    context('When i click Download button', () => {
    before(() => {
        // cy.deleteFile('/cypress/downloads/72520862.pdf', '') // clears the file before each tests
        cy.exec('del cypress/downloads/72520862.pdf', { log: true, failOnNonZeroExit: false });
        cy.get('app-quick-actions').find('button').eq(2).click()
    });
    it('File should be downloaded', () => {
        
        cy.readFile("cypressdownloads/72520862.pdf").should('exist')
    });
    });
    context('When i add a note', () => {
    before(() => {
        cy.fixture("users.json").then((user) => {
            cy.login(user.UkDev.username, user.UkDev.password);
        })
        cy.fixture("tenders.json").then((tender) => {
            cy.visit('/p/dv/'+tender.UkDev.tenderWithAttachment);
        })
        cy.intercept('/api/tender/customerTenderNote').as('addNote')
        cy.get('app-quick-actions').find('button').eq(5).click()
        cy.get('#float-input-note').type('test note')
        cy.get('.p-dialog-footer').find('button').click()
        cy.wait('@addNote')
    });
    it('Note icon should have filled marker', () => {
        cy.get('app-quick-actions').find('button').eq(5).find('img').should('have.attr', 'src', 'assets/icons/ic_note-text-outline_filled.svg')
    });
    });
    context('When i delete note', () => {
    before(() => {
        cy.fixture("users.json").then((user)=>{
        cy.login(user.UkDev.username,user.UkDev.password)
        })
        cy.fixture("tenders.json").then((tender) => {
        cy.visit('/p/dv/'+tender.UkDev.tenderWithAttachment);
        })
        cy.get('app-quick-actions').find('button').eq(5).click()
        cy.get('.p-dialog-footer').find('button').eq(0).click()
    });
    it('Note icon should not have filled marker', () => {
        cy.get('app-quick-actions').find('button').eq(5).find('img').should('have.attr', 'src', 'assets/icons/ic_note-text-outline.svg')
    });
    });
});


context("Given i open tender detail pages of a tender that has attachments", () => {
  beforeEach(() => {
    cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      cy.fixture("tenders.json").then((tenders) => {
      cy.visit(
        "/p/dv/" +
          tenders.UkDev.tenderWithAttachment +
          "/attached-documents"
        );
      });
    });
  });
  context("When i click on 'Download all'", () => {
    beforeEach(() => {
      cy.get("app-attached-documents").find("div>div>span").click();
    });

    it("A zip folder named after tender ID should be downloaded", () => {
      /*
      cy.get("app-subheading-summary").then((summary) => {
        let ID = summary
          .find(
            ".ng-star-inserted:nth-of-type(1) [class='flex py-1 p-0 lg:col-3 lg:align-self-center']"
          )
          .text();
        console.log(ID);
      });
*/
        cy.readFile(
          "cypressdownloads/72520862_attachments.zip"
        ).should("exist");
    });
  });

  context("When i click on an attachment", () => {
    beforeEach(() => {
      cy.get("app-attached-documents")
        .find(".p-datatable-tbody > .p-element").eq(0)
        .click();
    });

    it("A file with attachment's name should be downloaded", () => {
      
      cy.get("app-attached-documents").then((attachment) => {
        let ID = attachment.find("tr:nth-of-type(1)").text();
        let name = ID.split("(").shift();
        console.log(ID, name);

        cy.readFile("cypressdownloads/" + name).should("exist");
      });
    });
  });
});
