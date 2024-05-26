import data from '../../fixtures/example.json'

describe("stack page works correctly", () => {

  beforeEach(() => cy.visit(`${data.baseUrl}/stack`))
  
  it('Кнопка добавления недоступна, если инпут пуст', () => {
    cy.get('input').should('have.value', '')
    cy.get('div>button').first().should('be.disabled')
  })

  it('Добавление элемента в стек', () => {
    cy.get('input').type('t1')
    cy.get('div>button').first().click()
    cy.get('[class^=circle_content__]').eq(0).contains(`t1`)
    cy.get('[class^=circle_content__]').eq(0).contains(`top`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')

    cy.get('input').type('t2')
    cy.get('div>button').first().click()
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `top`)
    cy.get('[class^=circle_content__]').eq(1).contains(`top`)
    cy.get('[class^=circle_content__]').eq(0).contains(`t1`)
    cy.get('[class^=circle_content__]').eq(1).contains(`t2`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_default]')
  })

  it('Удаление элемента из стека', () => {
    cy.get('input').type('t1')
    cy.get('div>button').eq(0).click()
    cy.get('input').type('t2')
    cy.get('div>button').eq(0).click()
    cy.get('div>button').eq(1).click()

    cy.get('[class^=circle_content__]').eq(1).contains(`top`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(0).contains(`top`)
    cy.get('[class^=circle_content__]').should('have.length', 1)
  })

  it('Очистка элементов из стека', () => {
    cy.get('input').type('t1')
    cy.get('div>button').eq(0).click()
    cy.get('input').type('t2')
    cy.get('div>button').eq(0).click()
    cy.get('div>button').eq(2).click()

    cy.get('[class^=circle_content__]').eq(1).contains(`top`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(1).find('[class*=circle_changing]')
    cy.should('not.contain', `top`)
    cy.get('[class^=circle_content__]').should('have.length', 0)
  })
})