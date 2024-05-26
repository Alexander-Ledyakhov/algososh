import data from '../../fixtures/example.json'

describe("string page works correctly", () => {

  beforeEach(() => cy.visit(`${data.baseUrl}/fibonacci`))
  
  it('Кнопка добавления недоступна, если инпут пуст', () => {
    cy.get('input').should('have.value', '')
    cy.get('button').should('be.disabled')
  });

  it('Числа Фибоначчи генерируются корректно', () => {
    cy.get('input').type(4)
    cy.get('button').last().click()
    cy.get('[class^=circle_content__]').eq(0).contains(`1`)
    cy.get('[class^=circle_content__]').eq(1).contains(`1`)
    cy.get('[class^=circle_content__]').eq(2).contains(`2`)
    cy.get('[class^=circle_content__]').eq(3).contains(`3`)
    cy.get('[class^=circle_content__]').eq(4).contains(`5`)
  })
})