describe("string page works correctly", () => {

  beforeEach(() => cy.visit(`/recursion`))
  
  it('Кнопка добавления недоступна, если инпут пуст', () => {
    cy.get('input').should('have.value', '')
    cy.get('button').should('be.disabled')
  })

  it('Cтрока разворачивается корректно', () => {
    const text = 'sasha'
    const reverseText = 'ahsas'

    cy.get('input').type(text)
    cy.get('button').last().click()

    cy.get('[class^=circle_content__]')
      .should('have.text', text)
      .then((itrm, index) => {
        if (index === 0 || index === 4) {
            cy.get(itrm).find('[class*=circle_changing]')
        } else {
            cy.get(itrm).find('[class*=circle_default]')
        }
      })

    cy.get('[class^=circle_content__]')
      .should('have.text', reverseText)
      .then((item, index) => {
        if (index === 0 || index === 4) {
            cy.get(item).find('[class*=circle_modified]')
        } else if (index === 1 || index === 3) {
            cy.get(item).find('[class*=circle_changing]')
        } else {
            cy.get(item).find('[class*=circle_default]')
        }
      })

    cy.get('[class^=circle_content__]')
      .then((item) => cy.get(item).find('[class*=circle_default]'))
  })
})