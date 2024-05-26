import data from '../../fixtures/example.json'

describe("list page works correctly", () => {

  beforeEach(() => cy.visit(`${data.baseUrl}/list`))
  
  it('Кнопки добавления и кнопка удаления по индексу недоступны, если инпут пуст', () => {
    cy.get('input').eq(0).should('have.value', '')
    cy.get('input').eq(1).should('have.value', '')

    cy.get("button").contains("Добавить в head").parent().should("be.disabled")
    cy.get("button").contains("Добавить в tail").parent().should("be.disabled")
    cy.get("button").contains("Добавить по индексу").parent().should("be.disabled")
    cy.get("button").contains("Удалить по индексу").parent().should("be.disabled")
  })

  it('Корректность отрисовки дефолтного списка', () => {
    cy.get('[class^=circle_content__]')
      .then((itrm) => {
        cy.get(itrm).find('[class*=circle_default]')
      })

    cy.get('[class^=circle_content__]').eq(0).contains(`head`)
    cy.get('[class^=circle_content__]').eq(0).contains(`0`)
    cy.get('[class^=circle_content__]').eq(1).contains(`34`)
    cy.get('[class^=circle_content__]').eq(2).contains(`8`)
    cy.get('[class^=circle_content__]').eq(3).contains(`1`)
    cy.get('[class^=circle_content__]').eq(3).contains(`tail`)
  })

  it('Корректность добавления элемента в head', () => {
    cy.get('input').eq(0).type('t1')
    cy.get("button").contains("Добавить в head").parent().click()

    cy.get('[class^=circle_content__]').eq(0).contains(`t1`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(0).should('not.contain', `head`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_modified]')
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
  })

  it('Корректность добавления элемента в tail', () => {
    cy.get('input').eq(0).type('t1')
    cy.get("button").contains("Добавить в tail").parent().click()

    cy.get('[class^=circle_content__]').eq(3).contains(`t1`)
    cy.get('[class^=circle_content__]').eq(3).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(3).should('not.contain', `tail`)
    cy.get('[class^=circle_content__]').eq(3).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(4).find('[class*=circle_modified]')
    cy.get('[class^=circle_content__]').eq(4).find('[class*=circle_default]')
  })

  it('Корректность добавления элемента по индексу', () => {
    cy.get('input').eq(0).type('t1')
    cy.get('input').eq(1).type('2')
    cy.get("button").contains("Добавить по индексу").parent().click()

    cy.get('[class^=circle_content__]')
      .then((itrm, index) => {
        if (index <= 2) {
            cy.get(itrm).eq(index).contains(`t1`)
            cy.get(itrm).eq(index).find('[class*=circle_changing]')
        }
      })
    cy.get('[class^=circle_content__]').eq(2).should('not.contain', `tail`)
    cy.get('[class^=circle_content__]').eq(2).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(2).find('[class*=circle_modified]')
    cy.get('[class^=circle_content__]').eq(2).find('[class*=circle_default]')
  })

  it('Корректность удаления элемента из head', () => {
    cy.get("button").contains("Удалить из head").parent().click()

    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').eq(0).contains(`0`)
    cy.get('[class^=circle_content__]').eq(0).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(0).contains(`34`)
    cy.get('[class^=circle_content__]').should('have.length', 3)
  })

  it('Корректность удаления элемента из tail', () => {
    cy.get("button").contains("Удалить из tail").parent().click()

    cy.get('[class^=circle_content__]').eq(3).should('not.contain', `tail`)
    cy.get('[class^=circle_content__]').eq(4).contains(`1`)
    cy.get('[class^=circle_content__]').eq(4).find('[class*=circle_changing]')
    cy.get('[class^=circle_content__]').should('have.length', 3)
  })

  it('Корректность удаления элемента по индексу', () => {
    cy.get('input').eq(1).type('2')
    cy.get("button").contains("Удалить по индексу").parent().click()

    cy.get('[class^=circle_content__]')
      .then((itrm, index) => {
        if (index <= 2) {
            cy.get(itrm).eq(index).find('[class*=circle_changing]')
        }
      })
    cy.get('[class^=circle_content__]').eq(2).find('[class*=circle_default]')
    cy.get('[class^=circle_content__]').eq(2).should('not.contain', `8`)
    cy.get('[class^=circle_content__]').eq(2).contains(`1`)
    cy.get('[class^=circle_content__]').should('have.length', 3)
  })
})