Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

context('Given I login as an active user', () => {
  before(() => {
      
  cy.fixture("users.json").then((user) => {
    cy.login(user.UkDev.username, user.UkDev.password)
    cy.wait(2000)
    
    })
  });
context('And I open favourites page', () => {
  before(() => {
    cy.openFavourites()
  });
  context('When i check GUI', () => {
    
    it('Headline should be visible', () => {
      cy.get('.headline1-text').should('be.visible')
    });
    it('Description should be visible', () => {
      cy.get('.subtitle-text').should('be.visible')
    });
    it('All categories should be visible', () => {
      for(let i=0; i<=5;i++){
        cy.get('.p-accordion-header').eq(i).should('be.visible')
        }
    });
});  
context('When i check Interested to bid ', () => {
  
    it('Interested to bid should be expanded by default', () => {
      cy.get('.p-accordion-header').eq(0).should('have.class','p-highlight')
    });
    it('Checkbox should not be checked', () => {
      cy.get('.p-datatable-thead').eq(0).find('th').eq(0).find(':checkbox').should('not.be.checked')
    });

  context(' And There are no tenders in that category ', () => {      

    it('"No items" should be shown ', () => {
      cy.noTenders(0)
    });
  })

  context(' And There are tenders in that category ', () => {      

    it('Title column should be visible ', () => {
      cy.withTendersTableheader(0,1)
    });
    it('Note column should be visible ', () => {
      cy.withTendersTableheader(0,1)
    });
    it('Published column should be visible ', () => {
      cy.withTendersTableheader(0,3)
    });
    it('Deadline column should be visible ', () => {
      cy.withTendersTableheader(0,4)
    });
    it('Reminder column should be visible ', () => {
      cy.withTendersTableheader(0,5)
    });
    it('Mass update buttons should be visible ', () => {
      cy.withTendersTableheader(0,6)
    });
    it('Select tender checkbox in all tenders should be visible', () => {
        cy.tenderData(0,0)
    });
    it('Tender title in all tenders should be visible', () => {
        cy.tenderData(0,1)
    });
    it('Notes field in all tenders should be visible', () => {
        cy.tenderData(0,2)
    });
    it('Published field in all tenders should be visible', () => {
        cy.tenderData(0,3)
    });
    it('Deadline field in all tenders should be visible', () => {
        cy.tenderData(0,4)
    });
    it('Reminder field in all tenders should be visible', () => {
        cy.tenderData(0,5)
    });
    it('Edit buttons in all tenders should be visible', () => {
        cy.tenderData(0,6)
    });
    
    it('Pagination should be visible and functional', () => {
      cy.get('#p-accordiontab-2 > .header > .header__title')
      .then((header)=>{
        let title=header.text()
        cy.log(title)
        let number=title.substring(title.indexOf('#') + 1);
        cy.log(title,number)
        if(number='0'){
          assert('OK')
        } else{
      cy.get('.p-paginator-bottom').should('be.visible')
      cy.get('.p-paginator-bottom').find('.p-paginator-first').should('be.visible').and('be.disabled')
      cy.get('.p-paginator-bottom').find('.p-paginator-prev').should('be.visible').and('be.disabled')
      cy.get('.p-paginator-bottom').find('.p-paginator-next').should('be.visible')
      cy.get('.p-paginator-bottom').find('.p-paginator-last').should('be.visible')
      cy.get('.p-paginator-bottom').find('.p-dropdown-label').should('contain','10')
      cy.get('.p-paginator-bottom').find('.p-dropdown-trigger-icon').should('be.visible').click({force:true})
      cy.get('.p-dropdown-item').should('have.length',4)
      for(let i=0;i<=3;i++){
          let items=[5,10,25,50]
      cy.get('.p-dropdown-item').eq(i).should('contain', items[i])
      }
    }
  })
    });
  })
});
context('When i check Bid in progress', () => {
    before(() => {
      
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
        })
      cy.openFavourites()
    cy.get('#p-accordiontab-1').click({force:true})
    });
  
  it('Checkbox should not be checked', () => {
    cy.get('.p-datatable-thead').eq(1).find('th').eq(0).find(':checkbox').should('not.be.checked')
  });


  context(' And There are tenders in that category ', () => {      

  it('Title column should be visible ', () => {
    cy.withTendersTableheader(1,1)
  });
  it('Note column should be visible ', () => {
    cy.withTendersTableheader(1,2)
  });
  it('Published column should be visible ', () => {
    cy.withTendersTableheader(1,3)
  });
  it('Deadline column should be visible ', () => {
    cy.withTendersTableheader(1,4)
  });
  it('Reminder column should be visible ', () => {
    cy.withTendersTableheader(1,5)
  });
  it('Mass update buttons should be visible ', () => {
    cy.withTendersTableheader(1,6)
  });
  it('Select tender checkbox in all tenders should be visible', () => {
      cy.tenderData(1,0)
  });
  it('Tender title in all tenders should be visible', () => {
      cy.tenderData(1,1)
  });
  it('Notes field in all tenders should be visible', () => {
      cy.tenderData(1,2)
  });
  it('Published field in all tenders should be visible', () => {
      cy.tenderData(1,3)
  });
  it('Deadline field in all tenders should be visible', () => {
      cy.tenderData(1,4)
  });
  it('Reminder field in all tenders should be visible', () => {
      cy.tenderData(1,5)
  });
  it('Edit buttons in all tenders should be visible', () => {
      cy.tenderData(1,6)
  });
  it('Pagination should be visible and functional', () => {
    cy.get('#p-accordiontab-2 > .header > .header__title')
.then((header)=>{
  let title=header.text()
  cy.log(title)
  let number=title.substring(title.indexOf('#') + 1);
  cy.log(title,number)
  if(number='0'){
    assert('OK')
  } else{
    cy.get('.p-paginator-bottom').should('be.visible')
    cy.get('.p-paginator-bottom').find('.p-paginator-first').should('be.visible').and('be.disabled')
    cy.get('.p-paginator-bottom').find('.p-paginator-prev').should('be.visible').and('be.disabled')
    cy.get('.p-paginator-bottom').find('.p-paginator-next').should('be.visible')
    cy.get('.p-paginator-bottom').find('.p-paginator-last').should('be.visible')
    cy.get('.p-paginator-bottom').find('.p-dropdown-label').should('contain','10')
    cy.get('.p-paginator-bottom').filter(':visible').find('.p-dropdown-trigger-icon').should('be.visible').click({force:true})
    cy.get('.p-dropdown-item').filter(':visible').should('have.length',4)
    for(let i=0;i<=3;i++){
        let items=[5,10,25,50]
    cy.get('.p-dropdown-item').filter(':visible').eq(i).should('contain', items[i])
    }
  }
})
  });
})

});
context('When i check Bid won', () => {
  before(() => {
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
        })
      cy.openFavourites()
  cy.get('#p-accordiontab-2').click({force:true})
  });

context(' And There are no tenders in that category ', () => {      

it('"No items" should be shown ', () => {
  cy.noTenders(2)
});
})

context(' And There are tenders in that category ', () => {      

it('Title column should be visible ', () => {
  cy.withTendersTableheader(2,1)
});
it('Note column should be visible ', () => {
  cy.withTendersTableheader(2,2)
});
it('Published column should be visible ', () => {
  cy.withTendersTableheader(2,3)
});
it('Deadline column should be visible ', () => {
  cy.withTendersTableheader(2,4)
});
it('Reminder column should be visible ', () => {
  cy.withTendersTableheader(2,5)
});
it('Mass update buttons should be visible ', () => {
  cy.withTendersTableheader(2,6)
});
it('Select tender checkbox in all tenders should be visible', () => {
    cy.tenderData(2,0)
});
it('Tender title in all tenders should be visible', () => {
    cy.tenderData(2,1)
});
it('Notes field in all tenders should be visible', () => {
    cy.tenderData(2,2)
});
it('Published field in all tenders should be visible', () => {
    cy.tenderData(2,3)
});
it('Deadline field in all tenders should be visible', () => {
    cy.tenderData(2,4)
});
it('Reminder field in all tenders should be visible', () => {
    cy.tenderData(2,5)
});
it('Edit buttons in all tenders should be visible', () => {
    cy.tenderData(2,6)
});
it('Pagination should be visible and functional', () => {
  cy.get('#p-accordiontab-2 > .header > .header__title')
  .then((header)=>{
    let title=header.text()
    cy.log(title)
    let number=title.substring(title.indexOf('#') + 1);
    cy.log(title,number)
    if(number='0'){
      assert('OK')
    } else{
  cy.get('.p-paginator-bottom').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-first').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-prev').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-next').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-last').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-dropdown-label').should('contain','10')
  cy.get('.p-paginator-bottom').filter(':visible').find('.p-dropdown-trigger-icon').should('be.visible').click({force:true})
  cy.get('.p-dropdown-item').filter(':visible').should('have.length',4)
  for(let i=0;i<=3;i++){
      let items=[5,10,25,50]
  cy.get('.p-dropdown-item').filter(':visible').eq(i).should('contain', items[i])
  }
  }
  })
});
})
});
context('When i check Bid lost', () => {
  before(() => {
      
    cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      })
    cy.openFavourites()
  cy.get('#p-accordiontab-3').click({force:true})
  });

context(' And There are no tenders in that category ', () => {      

it('"No items" should be shown ', () => {
  cy.noTenders(3)
});
})

context(' And There are tenders in that category ', () => {      

it('Title column should be visible ', () => {
  cy.withTendersTableheader(3,1)
});
it('Note column should be visible ', () => {
  cy.withTendersTableheader(3,2)
});
it('Published column should be visible ', () => {
  cy.withTendersTableheader(3,3)
});
it('Deadline column should be visible ', () => {
  cy.withTendersTableheader(3,4)
});
it('Reminder column should be visible ', () => {
  cy.withTendersTableheader(3,5)
});
it('Mass update buttons should be visible ', () => {
  cy.withTendersTableheader(3,6)
});
it('Select tender checkbox in all tenders should be visible', () => {
    cy.tenderData(3,0)
});
it('Tender title in all tenders should be visible', () => {
    cy.tenderData(3,1)
});
it('Notes field in all tenders should be visible', () => {
    cy.tenderData(3,2)
});
it('Published field in all tenders should be visible', () => {
    cy.tenderData(3,3)
});
it('Deadline field in all tenders should be visible', () => {
    cy.tenderData(3,4)
});
it('Reminder field in all tenders should be visible', () => {
    cy.tenderData(3,5)
});
it('Edit buttons in all tenders should be visible', () => {
    cy.tenderData(3,6)
});
it('Pagination should be visible and functional', () => {
  cy.get('#p-accordiontab-2 > .header > .header__title')
  .then((header)=>{
    let title=header.text()
    cy.log(title)
    let number=title.substring(title.indexOf('#') + 1);
    cy.log(title,number)
    if(number='0'){
      assert('OK')
    } else{
  cy.get('.p-paginator-bottom').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-first').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-prev').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-next').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-last').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-dropdown-label').should('contain','10')
  cy.get('.p-paginator-bottom').filter(':visible').find('.p-dropdown-trigger-icon').should('be.visible').click({force:true})
  cy.get('.p-dropdown-item').filter(':visible').should('have.length',4)
  for(let i=0;i<=3;i++){
      let items=[5,10,25,50]
  cy.get('.p-dropdown-item').filter(':visible').eq(i).should('contain', items[i])
  }
  }
  })
});
})
});
context('When i check Follow progress', () => {
  before(() => {
      
    cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      })
    cy.openFavourites()
  cy.get('#p-accordiontab-4').click({force:true})
  });

context(' And There are no tenders in that category ', () => {      

it('"No items" should be shown ', () => {
  cy.noTenders(4)
});
})

context(' And There are tenders in that category ', () => {      

it('Title column should be visible ', () => {
  cy.withTendersTableheader(4,1)
});
it('Note column should be visible ', () => {
  cy.withTendersTableheader(4,2)
});
it('Published column should be visible ', () => {
  cy.withTendersTableheader(4,3)
});
it('Deadline column should be visible ', () => {
  cy.withTendersTableheader(4,4)
});
it('Reminder column should be visible ', () => {
  cy.withTendersTableheader(4,5)
});
it('Mass update buttons should be visible ', () => {
  cy.withTendersTableheader(4,6)
});
it('Select tender checkbox in all tenders should be visible', () => {
    cy.tenderData(4,0)
});
it('Tender title in all tenders should be visible', () => {
    cy.tenderData(4,1)
});
it('Notes field in all tenders should be visible', () => {
    cy.tenderData(4,2)
});
it('Published field in all tenders should be visible', () => {
    cy.tenderData(4,3)
});
it('Deadline field in all tenders should be visible', () => {
    cy.tenderData(4,4)
});
it('Reminder field in all tenders should be visible', () => {
    cy.tenderData(4,5)
});
it('Edit buttons in all tenders should be visible', () => {
    cy.tenderData(4,6)
});
it('Pagination should be visible and functional', () => {
  cy.get('#p-accordiontab-2 > .header > .header__title')
  .then((header)=>{
    let title=header.text()
    cy.log(title)
    let number=title.substring(title.indexOf('#') + 1);
    cy.log(title,number)
    if(number=String(0)){
      assert('OK')
    } else{
  cy.get('.p-paginator-bottom').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-first').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-prev').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-next').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-last').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-dropdown-label').should('contain','10')
  cy.get('.p-paginator-bottom').filter(':visible').find('.p-dropdown-trigger-icon').should('be.visible').click({force:true})
  cy.get('.p-dropdown-item').filter(':visible').should('have.length',4)
  for(let i=0;i<=3;i++){
      let items=[5,10,25,50]
  cy.get('.p-dropdown-item').filter(':visible').eq(i).should('contain', items[i])
  }
  }
  })
});
})
});
context('When i check Archived', () => {
  before(() => {
      
    cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      })
    cy.openFavourites()
  cy.get('#p-accordiontab-5').click({force:true})
  });

context(' And There are no tenders in that category ', () => {      

it('"No items" should be shown ', () => {
  cy.noTenders(5)
});
})

context(' And There are tenders in that category ', () => {      

it('Title column should be visible ', () => {
  cy.withTendersTableheader(5,1)
});
it('Note column should be visible ', () => {
  cy.withTendersTableheader(5,2)
});
it('Published column should be visible ', () => {
  cy.withTendersTableheader(5,3)
});
it('Deadline column should be visible ', () => {
  cy.withTendersTableheader(5,4)
});
it('Reminder column should be visible ', () => {
  cy.withTendersTableheader(5,5)
});
it('Mass update buttons should be visible ', () => {
  cy.withTendersTableheader(5,6)
});
it('Select tender checkbox in all tenders should be visible', () => {
    cy.tenderData(5,0)
});
it('Tender title in all tenders should be visible', () => {
    cy.tenderData(5,1)
});
it('Notes field in all tenders should be visible', () => {
    cy.tenderData(5,2)
});
it('Published field in all tenders should be visible', () => {
    cy.tenderData(5,3)
});
it('Deadline field in all tenders should be visible', () => {
    cy.tenderData(5,4)
});
it('Reminder field in all tenders should be visible', () => {
    cy.tenderData(5,5)
});
it('Edit buttons in all tenders should be visible', () => {
    cy.tenderData(5,6)
});
it('Pagination should be visible and functional', () => {
  cy.get('#p-accordiontab-2 > .header > .header__title')
  .then((header)=>{
    let title=header.text()
    cy.log(title)
    let number=title.substring(title.indexOf('#') + 1);
    cy.log(title,number)
    if(number='0'){
      assert('OK')
    } else{
  cy.get('.p-paginator-bottom').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-first').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-prev').should('be.visible').and('be.disabled')
  cy.get('.p-paginator-bottom').find('.p-paginator-next').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-paginator-last').should('be.visible')
  cy.get('.p-paginator-bottom').find('.p-dropdown-label').should('contain','10')
  cy.get('.p-paginator-bottom').filter(':visible').find('.p-dropdown-trigger-icon').should('be.visible').click({force:true})
  cy.get('.p-dropdown-item').filter(':visible').should('have.length',4)
  for(let i=0;i<=3;i++){
      let items=[5,10,25,50]
  cy.get('.p-dropdown-item').filter(':visible').eq(i).should('contain', items[i])
  }
  }
  })
});
})
});
context('When i click on select all button', () => {
    before(() => {
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
        })
      cy.openFavourites()
      cy.get('.p-datatable-thead').filter(':visible').find(':checkbox').check({force:true})
  });
  it('All items should be selected', () => {
    cy.get('.p-datatable-tbody').find(':checkbox').should('be.checked')
  });
  context('When i click on select all button', () => {
    before(() => {
        cy.get('.p-datatable-thead').filter(':visible').find(':checkbox').uncheck({force:true})
    });
    it('All items should be deselected', () => {
      cy.get('.p-datatable-tbody').find(':checkbox').should('not.be.checked')
    });
  });
})  
context('When i select one item', () => {
  before(()=>{
    cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      })
    cy.openFavourites()
    cy.get('.p-datatable-tbody').eq(0).find(':checkbox').eq(0).check({force:true})
  })
  it('It should be checked', () => {
    cy.get('.p-datatable-tbody').eq(0).find(':checkbox').eq(0).should('be.checked')
  });
});
context('When i click on an item title', () => {
  
    before(() => {
      cy.fixture("users.json").then((user) => {
        cy.login(user.UkDev.username, user.UkDev.password);
        cy.openFavourites()
        })
      cy.get('.p-datatable-tbody').eq(0).find('tr').eq(0).find('td').eq(1).then((element)=>{
          let title=element.text()
        
          cy.get('.p-datatable-tbody').eq(0).find('tr').eq(0).find('td').eq(1).click({force:true}).wait(1000)
          cy.get('.headline1-text').should('contain', title)  
  });
    })
    it('Tender should have same title', () => {
    });
});
context('When i add an item to favourites', () => {
  before(() => {
    cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      })
    cy.fixture("tenders.json").then((tender) => {
      cy.visit('/p/dv/'+tender.UkDev.tenderWithAttachment,{failOnStatusCode: false})
    })
    cy.wait(2000)
    cy.get('[src="assets/icons/ic_star-outline.svg"]').click()
    cy.wait(500)
    cy.get('[role="dialog"]').find('button').contains('Save').click()
    cy.wait(2000)

  });
  it('Element should be shown in favourites', () => {
    cy.openFavourites()
      cy.get('.p-datatable-tbody').eq(0).find('tr').eq(0).find('td').eq(1).click({force:true}).wait(1000)
      cy.fixture("tenders.json").then((tender) => {
        cy.url().should('contain', tender.UkDev.tenderWithAttachment)
      })
  });
});
context('When i delete an item from favourites', () => {
  before(() => {
    cy.fixture("users.json").then((user) => {
      cy.login(user.UkDev.username, user.UkDev.password);
      })
    cy.fixture("tenders.json").then((tender) => {
      cy.visit('/p/dv/'+tender.UkDev.tenderWithAttachment,{failOnStatusCode: false})
    })
    cy.wait(2000)
    cy.get('[src="assets/icons/ic_star-outline.svg"]').click()
    cy.wait(500)
    cy.get('[role="dialog"]').find('button').contains('Delete').click()
    cy.wait(2000)

  });
  it('Element should not be shown in favourites', () => {
    cy.openFavourites()
      cy.get('.p-datatable-tbody').eq(0).find('tr').eq(0).find('td').eq(1).click({force:true}).wait(1000)
      cy.fixture("tenders.json").then((tender) => {
        cy.url().should('not.contain', tender.UkDev.tenderWithAttachment)
      })
  });
});
})
});
