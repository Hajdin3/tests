Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
context('Given i open sectors page as a costumer', () => {
    beforeEach(()=>{
      cy.fixture("users.json").then((user)=>{
        cy.login(user.UkDev.username,user.UkDev.password)
      })
      cy.openSectors()
    })
  context('When i check interface', () => {
      it('I should be on sectors page', () => {
          cy.url().should('contain', 'branch')
      });
      it('Title, description, search field and sectors list should be shown', () => {
        cy.get('.search-header').should('be.visible')
        cy.get('.body1-text').should('be.visible')
        cy.get('#searchText').should('be.visible')
        cy.get('table').should('be.visible')
        cy.get('tbody').should('be.visible')
      });
  });  
  context('When I type something on search', () => {
    beforeEach(() => {
      cy.get('#searchText').type('cons')
      cy.wait(1000)
    });
      it('Sectors that contain that keyword are shown', () => {
        cy.get('table').find('tbody').find('tr').should('contain','Cons')
      });
    });  
  context('When I click on a sector', () => {
    beforeEach(() => {
      cy.get('table').find('tbody').find('tr').eq(1).click()
      cy.wait(1000)
    });
      it('I should be taken to that sectors details page', () => {
          cy.url().should('contain', 'branch/')
      });
    });  
  context('When i check sectors detail pages', () => {
    beforeEach(() => {
      cy.fixture("tenders.json").then((tender)=>{

        cy.visit('/p/branch/'+tender.UkDev.sampleSector)
        cy.wait(3000)
      })
    });
      it('Title, graph, Main buyers, Main regions and results related to that sector should be shown ', () => {
        cy.get('.headline1-text')
        cy.get('#p-panel-0')
        cy.get('.p-datatable-thead').eq(0).should('contain', 'Main Buyers')
        cy.get('.p-datatable-thead').eq(1).should('contain', 'Main Suppliers')
        cy.get('.p-datatable-thead').eq(2).should('contain', 'Main Regions')
        cy.get('.p-datatable-thead').eq(3).find('th').should('have.length',4)


      });
    });  
});
context.only('Given i open public page', () => {
    before(() => {
        cy.visit('')
    });
    context('When i hover sectors(branches) tab', () => {
        before(() => {
          cy.get(':nth-child(4) > .nav-item > span.text-color-white > span').trigger('mouseover')
        });
        it('Regions list should open', () => {
            cy.get('app-navigation-element').contains('Branches').find('a').should('have.length.above', 2)
        });
        context('When i click on an sector', () => {
            before(() => {
              cy.get('app-navigation-element').find('li').eq(1).find('ul').find('a').eq(1).click()
            });
            it('I should be taken it that sectors public details page', () => {
              cy.url().should('contain', 'branch/').should('not.contain', /p/)
            });
        });
        context('When i click on "more branches"', () => {
            before(() => {
              cy.get('app-navigation-element').find('li').eq(1).find('ul').find('a').last().invoke('show').click({force:true})
            });
            it('I should be taken it that sectors public details page', () => {
              cy.url().should('contain', 'branch/').should('not.contain', /p/)
            });
        });
    });
});