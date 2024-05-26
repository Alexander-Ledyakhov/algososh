describe("string page works correctly", () => {

  beforeEach(() => cy.visit('/fibonacci'))
  
  it('Кнопка добавления недоступна, если инпут пуст', () => {
    cy.get('input').should('have.value', '')
    cy.get('button').should('be.disabled')
  });

  it('Числа Фибоначчи генерируются корректно', () => {
    cy.get('input').type(4)
    cy.get('button').last().click()
    cy.wrap(['1', '1', '2', '3', '5']).each((n, index) => {
      cy.get('[class^=circle_content__]').eq(index).contains(n)
    })
  })
})