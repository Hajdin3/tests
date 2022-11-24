Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

context('Given i open regions page as a costumer', () => {
      beforeEach(()=>{
        cy.fixture("users.json").then((user)=>{
          cy.login(user.UkDev.username,user.UkDev.password)
        })
        cy.openRegions()
      })
    context('When i check interface', () => {
        it('I should be on regions page', () => {
            cy.url().should('contain', 'region')
        });
        it('Title, description, search field and regions list should be shown', () => {
          cy.get('.search-header').should('be.visible')
          cy.get('.body1-text').should('be.visible')
          cy.get('#searchText').should('be.visible')
          cy.get('table').should('be.visible')
          cy.get('tbody').should('be.visible')
        });
    });  
    context('When I type something on search', () => {
      beforeEach(() => {
        cy.get('#searchText').type('nor')
        cy.wait(1000)
      });
        it('regions that contain that keyword are shown', () => {
          cy.get('table').find('tbody').find('tr').should('contain','Nor')
        });
      });  
    context('When I click on a region', () => {
      beforeEach(() => {
        cy.get('table').find('tbody').find('tr').eq(1).click()
        cy.wait(1000)
      });
        it('I should be taken to that regions details page', () => {
            cy.url().should('contain', 'regions/')
        });
      });  
    context('When i check regions detail pages', () => {
      beforeEach(() => {
        cy.fixture("tenders.json").then((tender)=>{
          cy.visit('/p/regions/'+tender.UkDev.sampleRegion)
          cy.wait(3000)
        })
      });
        it('Title, graph, Main buyers, Main regions and results related to that sector should be shown ', () => {
          cy.get('.headline1-text').should('be.visible')
          cy.get('#p-panel-0').should('be.visible')
          cy.get('.p-datatable-thead').eq(0).should('contain', 'Main Suppliers')
          cy.get('.p-datatable-thead').eq(1).should('contain', 'Main Buyers')
          cy.get('.p-datatable-thead').eq(2).find('th').should('have.length',4)


        });
      });  
  });
  context('Given i open public page', () => {
      before(() => {
          cy.visit('')
      });
      context('When i hover regions(branches) tab', () => {
          before(() => {
            cy.wait(2000)
              cy.get('.nav-item').contains('Regions').trigger('mouseover',{force:true})
          });
          it('Regions list should open', () => {
            cy.get('.nav-item').contains('Regions').trigger('mouseover')
            cy.get('.submenu').should('be.visible')
          });
          context('When i click on an sector', () => {
              before(() => {
                cy.get('.nav-item').eq(2).find('li').eq(2).find('a').click()
              });
              it('I should be taken it that regions public details page', () => {
                cy.url().should('contain', 'region/').should('not.contain', /p/)
              });
          });
      });
  });

describe('About us', () => {
context('Given i open About Us page as a visitor', () => {
    before(() => {
        cy.visit('/about-us')
    });
    it('I should be taken to "About us" page', () => {
        cy.url().should('contain', 'about-us')
    });
    it('Content should be shown', () => {
        cy.get('.container').find('.title').should('be.visible')
        cy.get('.container').find('p').should('be.visible')
      
    });
});
context('Given i open About Us page as a user', () => {
    before(() => {
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);})
        cy.visit('/about-us')
    });
    it('I should be taken to "About us" page', () => {
        cy.url().should('contain', 'about-us')
    });
    it('Content should be shown', () => {
        cy.get('.container').find('.title').should('be.visible')
        cy.get('.container').find('p').should('be.visible')
    });
    })
})