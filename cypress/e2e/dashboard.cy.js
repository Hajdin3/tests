
  context('Given i login as a user', () => {
      before(() => {
          cy.fixture('users.json').then((user)=>{
            cy.login(user.UkDev.username, user.UkDev.password);
            cy.wait("@load");
          })
        })
    context('When i check page', () => {
        it('three CSPs should be shown',()=>{
            cy.get('.p-datatable-thead').filter(':visible').eq(0).find('th').filter(':visible').should('have.length',3)
            cy.get('.p-datatable-tbody').eq(0).find('tr').filter(':visible').should('have.length',3)
            })  
//         it('all components on Notifications per type should be shown',()=>{
//             cy.get('.charts__content').eq(0).find('.charts__content--header').find('.charts__content--header__title').should('be.visible')
//             cy.get('.charts__content').eq(0).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__title').should('be.visible')
//             cy.get('.charts__content').eq(0).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__value').should('be.visible')
//             cy.get('.charts__content').eq(0).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__units').should('be.visible')
//             cy.get('.charts__content').eq(0).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__units').find('.p-dropdown-trigger').should('be.visible')
//             })
//         it('Verify content on Viewed/Not Viewed Notifications',()=>{

//             cy.get('.charts__content').eq(1).find('.charts__content--header').find('.charts__content--header__title').should('be.visible')
//             cy.get('.charts__content').eq(1).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__title').should('be.visible')
//             cy.get('.charts__content').eq(1).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__value').should('be.visible')
//             cy.get('.charts__content').eq(1).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__units').should('be.visible')
//             cy.get('.charts__content').eq(1).find('.charts__content--header').find('.charts__content--header__timeframe').find('.timeframe__units').find('.p-dropdown-trigger').should('be.visible')
            })
        })