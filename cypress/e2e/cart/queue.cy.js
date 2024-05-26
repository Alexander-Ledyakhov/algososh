describe("queue page works correctly", () => {

  beforeEach(() => cy.visit(`/queue`))
  
  it('Кнопка добавления недоступна, если инпут пуст', () => {
    cy.get('input').should('have.value', '')
    cy.get('div>button').first().should('be.disabled')
  })

  it('Добавление элемента в очередь', () => {
    cy.get('input').type('t1')
    cy.get('div>button').first().click()

    cy.get('[class^=circle_content__]').eq(0).contains(`t1`)
    cy.get('[class^=circle_content__]').eq(0).contains(`head`)
    cy.get('[class^=circle_content__]').eq(0).contains(`tail`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')

    cy.get('input').type('t2')
    cy.get('div>button').first().click()
    cy.get('[class^=circle_content__]').eq(0).contains(`t1`)
    cy.get('[class^=circle_content__]').eq(1).contains(`t2`)
    cy.get('[class^=circle_content__]').eq(0).contains(`head`)
    cy.get('[class^=circle_content__]').eq(1).contains(`tail`)
    cy.get('[class^=circle_content__]').eq(1).should('not.contain', `head`)
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `tail`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_default]')
  })

  it('Удаление элемента из очереди', () => {
    cy.get('input').type('t1')
    cy.get('div>button').first().click()
    cy.wait(500);
    cy.get('input').type('t2')
    cy.get('div>button').eq(0).click()
    cy.wait(500);
    cy.get('div>button').eq(1).click()

    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `t1`)
    cy.get('[class^=circle_content__]').eq(1).contains(`t2`)
    cy.get('[class^=circle_content__]').eq(1).contains(`head`)
    cy.get('[class^=circle_content__]').eq(1).contains(`tail`)
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `head`)
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `tail`)
  })

  it('Очистка элементов из очереди', () => {
    cy.get('input').type('t1')
    cy.get('div>button').eq(0).click()
    cy.wait(500);
    cy.get('input').type('t2')
    cy.get('div>button').eq(0).click()
    cy.wait(500);
    cy.get('div>button').eq(2).click()

    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `head`)
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `tail`)
    cy.get('[class^=circle_content__]').eq(1).should('not.contain', `head`)
    cy.get('[class^=circle_content__]').eq(1).should('not.contain', `tail`)
    cy.get('[class^=circle_content__]').then(item => {
        cy.get(item).should('not.include.text', 't1')
        cy.get(item).should('not.include.text', 't2')
    })
  })
})